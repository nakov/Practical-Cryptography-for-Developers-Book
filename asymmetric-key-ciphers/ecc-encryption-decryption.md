# ECC-Based Encryption / Decryption

Assume we have a ECC **private-public key pair**. We want to encrypt and decrypt data using these keys. By definition, **asymmetric encryption** works as follows: if we **encrypt data by a private key**, we will be able to **decrypt** the ciphertext later by the corresponding **public key**:

![](/assets/asymmetric-encryption-diagram.png)

The above process can be directly applied for the **RSA** cryptosystem, but not for the **ECC**. The elliptic curve cryptography \(ECC\) **does not directly provide encryption** method. Instead, we can design a **hybrid encryption scheme** by using the **ECDH** \(Elliptic Curve Diffie–Hellman\) key exchange scheme to derive a **shared secret key** for symmetric data encryption and decryption. Let's get into details how to do this.

## ECC-Based Secret Key Derivation

Assume we have a **cryptographic elliptic curve** over finite field, along with its generator point **G**. We can use the following two functions to calculate a **shared a secret key** for **encryption** and **decryption**:

* **calculateEncryptionKey**\(pubKey\) --&gt; \(sharedECCKey, ciphertextPubKey\)
  1. Generate **ciphertextPrivKey** = _new **random** private key_.
  2. Calculate **ciphertextPubKey** = ciphertextPrivKey \* G.
  3. Calculate the ECDH shared secret: **sharedECCKey** = pubKey \* ciphertextPrivKey.
  4. Return both the **sharedECCKey** + **ciphertextPubKey**. Use the **sharedECCKey** for symmetric encryption. Use the randomly generated **ciphertextPubKey** to calculate the decryption key later.
* **calculateDecryptionKey**\(privKey, ciphertextPubKey\) --&gt; sharedECCKey
  1. Calculate the the ECDH shared secret: **sharedECCKey** = ciphertextPubKey \* privKey.
  2. Return the **sharedECCKey** and use it for the decryption.

The above calculations use the same math, like the **ECDH** algorithm \(see the [previous section](/asymmetric-key-ciphers/ecdh-key-exchange.md)\). Recall that EC points have the following property:

* \(_**a**_ \* **G**\) \* _**b**_ = \(_**b**_ \* **G**\) \* _**a**_

Now, assume that _**a**_ = privKey, _**a**_ \* **G **= pubKey, _**b**_ = ciphertextPrivKey, _**b**_ \* **G** = ciphertextPubKey.

The above equation takes the following form:

* pubKey \* ciphertextPrivKey = ciphertextPubKey \* privKey = **sharedECCKey**

This is what exactly the above two functions calculate, directly following the **ECDH key agreement** scheme.

## ECC-Based Secret Key Derivation - Example in Python

The below Python code uses the `tinyec` library to generate a **ECC private-public key pair** \(based on the `brainpoolP256r1` curve\) and then derive a **secret key** \(for encryption\) from the ECC **public key **and later derive the same **secret key** \(for decryption\) from the **private key** and the generated earlier **ciphertext public key**:

```py
from tinyec import registry
import secrets

curve = registry.get_curve('brainpoolP256r1')

def compress_point(point):
    return hex(point.x) + hex(point.y % 2)[2:]

def ecc_calc_encryption_keys(pubKey):
    ciphertextPrivKey = secrets.randbelow(curve.field.n)
    ciphertextPubKey = ciphertextPrivKey * curve.g
    sharedECCKey = pubKey * ciphertextPrivKey
    return (sharedECCKey, ciphertextPubKey)

def ecc_calc_decryption_key(privKey, ciphertextPubKey):
    sharedECCKey = ciphertextPubKey * privKey
    return sharedECCKey

privKey = secrets.randbelow(curve.field.n)
pubKey = privKey * curve.g
print("private key:", hex(privKey))
print("public key:", compress_point(pubKey))

(encryptKey, ciphertextPubKey) = ecc_calc_encryption_keys(pubKey)
print("ciphertext pubKey:", compress_point(ciphertextPubKey))
print("encryption key:", compress_point(encryptKey))

decryptKey = ecc_calc_decryption_key(privKey, ciphertextPubKey)
print("decryption key:", compress_point(decryptKey))
```

The code is pretty simple and demonstrates that we can generate a pair { **secret key** + **ciphertext public key** } from given **public key** and later we can recover the **secret key** from the pair { **ciphertext public key** + **private key** }. The above code produces output like this:

```
private key: 0x2e2921b4cde59cdf01e7a014a322abd530b3015085c31cb6e59502da761d29e9
public key: 0x850d3873cf4ac50ddb54ddbd27f8225fc43bd3f4c2cc0a4f9d1f9ce15fc4eb711
ciphertext pubKey: 0x71586f9999d3ee050005054bc681c1d96c5eb054ca15b080ba245e495627003b0
encryption key: 0x9d13d3f8f9747669432f575731926b5ed99a6883f00146cbd3203ffa7ff8b1ae1
decryption key: 0x9d13d3f8f9747669432f575731926b5ed99a6883f00146cbd3203ffa7ff8b1ae1
```

It is clear that the **encryption key** \(derived from the public key\) and the **decryption key** \(derived from the corresponding private key\) **are the same**. This is due to the above discussed property of the ECC: `pubKey * ciphertextPrivKey = ciphertextPubKey * privKey`. These keys will be used for encryption and decryption in an integrated encryption scheme. The above output will be different if you run the code \(due to the randomness used to generate `ciphertextPrivKey`, but the encryption and decryption keys will always be the same \(the ECDH shared secret\).

## ECC-Based Hybrid Encryption / Decryption - Example in Python

Once we have the **secret key**, we can use it for **symmetric data encryption**, using a symmetric encryption scheme like AES-GCM or ChaCha20-Poly1305. Let's implement a fully-functional **asymmetric ECC encryption and decryption** hybrid scheme. It will be based on the `brainpoolP256r1` curve and the **AES-256-GCM** authenticated symmetric cipher.

We shall use the `tinyec` and `pycryptodome` Python libraries respectively for ECC calculations and for the AES cipher:

```
pip install tinyec
pip install pycryptodome
```

Let's examine this full **ECC + AES hybrid encryption** example:

```py
from tinyec import registry
from Crypto.Cipher import AES
import hashlib, secrets, binascii

def encrypt_AES_GCM(msg, secretKey):
    aesCipher = AES.new(secretKey, AES.MODE_GCM)
    ciphertext, authTag = aesCipher.encrypt_and_digest(msg)
    return (ciphertext, aesCipher.nonce, authTag)

def decrypt_AES_GCM(ciphertext, nonce, authTag, secretKey):
    aesCipher = AES.new(secretKey, AES.MODE_GCM, nonce)
    plaintext = aesCipher.decrypt_and_verify(ciphertext, authTag)
    return plaintext

def ecc_point_to_256_bit_key(point):
    sha = hashlib.sha256(int.to_bytes(point.x, 32, 'big'))
    sha.update(int.to_bytes(point.y, 32, 'big'))
    return sha.digest()

curve = registry.get_curve('brainpoolP256r1')

def encrypt_ECC(msg, pubKey):
    ciphertextPrivKey = secrets.randbelow(curve.field.n)
    sharedECCKey = ciphertextPrivKey * pubKey
    secretKey = ecc_point_to_256_bit_key(sharedECCKey)
    ciphertext, nonce, authTag = encrypt_AES_GCM(msg, secretKey)
    ciphertextPubKey = ciphertextPrivKey * curve.g
    return (ciphertext, nonce, authTag, ciphertextPubKey)

def decrypt_ECC(encryptedMsg, privKey):
    (ciphertext, nonce, authTag, ciphertextPubKey) = encryptedMsg
    sharedECCKey = privKey * ciphertextPubKey
    secretKey = ecc_point_to_256_bit_key(sharedECCKey)
    plaintext = decrypt_AES_GCM(ciphertext, nonce, authTag, secretKey)
    return plaintext

msg = b'Text to be encrypted by ECC public key and ' \
      b'decrypted by its corresponding ECC private key'
print("original msg:", msg)
privKey = secrets.randbelow(curve.field.n)
pubKey = privKey * curve.g

encryptedMsg = encrypt_ECC(msg, pubKey)
encryptedMsgObj = {
    'ciphertext': binascii.hexlify(encryptedMsg[0]),
    'nonce': binascii.hexlify(encryptedMsg[1]),
    'authTag': binascii.hexlify(encryptedMsg[2]),
    'ciphertextPubKey': hex(encryptedMsg[3].x) + hex(encryptedMsg[3].y % 2)[2:]
}
print("encrypted msg:", encryptedMsgObj)

decryptedMsg = decrypt_ECC(encryptedMsg, privKey)
print("decrypted msg:", decryptedMsg)
```

The above example starts from generating an ECC public and private key **key pair**: `pubKey` + `privKey`, using the `tinyec` library. These keys will be used to **encrypt** the message `msg` through the hybrid encryption scheme \(asymmetric ECC + symmetric AES\) and to **decrypt** is later back to its original form.

Next, we **encrypt** `msg` by using the `pubKey` and we obtain as a result the following set of output: { `ciphertext`, `nonce`, `authTag`, `ciphertextPubKey` }. The `ciphertext` is obtained by the symmetric AES-GCM encryption, along with the `nonce` \(random AES initialization vector\) and `authTag` \(the MAC code of the encrypted text, obtained by the GCM block mode\). Additionally, we obtain a randomly generated `ciphertextPubKey`, which will be used to recover the AES symmetric key during the decryption \(using the ECDH key agreement scheme, as it was show before\).

To **decrypt** the encrypted message, we use the data produced during the encryption { `ciphertext`, `nonce`, `authTag`, `ciphertextPubKey` }, along with the decryption `privateKey`. The result is the decrypted plaintext message. We use authenticated encryption \(GCM block mode\), so if the decryption key or some other parameter is incorrect, the decryption will fail with an **exception**.

Internally, the `encrypt_ECC(msg, pubKey)` function first generates an **ECC key-pair** for the ciphertext and calculates the symmetric encryption shared ECC key `sharedECCKey = ciphertextPrivKey * pubKey`. This key is an EC point, so it is then transformed to **256-bit AES secret key** \(integer\) though hashing the point's `x` and `y` coordinates. Finally, the **AES-256-GCM** cipher \(from `pycryptodome`\) **encrypts** the message by the 256-bit shared secret key `secretKey` and produces as **output** `ciphertext` + `nonce` + `authTag`.

The `decrypt_ECC(encryptedMsg{ciphertext, nonce, authTag, ciphertextPubKey}, privKey)` function internally first calculates the symmetric encryption shared ECC key `sharedECCKey = privKey * ciphertextPubKey`. It is an EC point, so it should be first transformed to **256-bit AES secret key** though hashing the point's `x` and `y` coordinates. Then the **AES-256-GCM cipher** is used to **decrypt** the `ciphertext` + `nonce` + `authTag` by the 256-bit shared secret key `secretKey`. The produced output is the original plaintext message \(or an exception in case of incorrect decryption key or unmatching `authTag`\).

The output from the above code looks like this:

```
original msg: b'Text to be encrypted by ECC public key and decrypted by its corresponding ECC private key'
encrypted msg: {'ciphertext': b'b5953b3082fcefdbde91dd3c03cf83dde0822c19be6ae906a634db65115295e7cbcd7a1a492d69ba5be91990c70d8df9dc84360cf554f155ef81ce1f0ad44bd9fdabbc5f960517089262b3390e61b37610012bee4e6bcae335', 'nonce': b'9d55f4b5c87fff773d0457f3b23a953e', 'authTag': b'5c9d339778925aa4e44f43252a28681d', 'ciphertextPubKey': '0x21dbc985b625f2a42d0f86fc234b49b55477928bae73dfac73bafd9bed50abe70'}
decrypted msg: b'Text to be encrypted by ECC public key and decrypted by its corresponding ECC private key'
```

Enjoy the above example, **play with it**, try to understand how exactly it works, try to change the underlying ECC curve, try to change the symmetric encryption algorithm, try to decrypt the ciphertext with wrong private key.

## ECIES \(Elliptic Curve Integrated Encryption Scheme\)

A hybrid encryption scheme similar to the above demonstrated code is standardized under the name **Elliptic Curve Integrated Encryption Scheme** \(**ECIES**\) in many crypto standards like [SECG SEC-1](http://www.secg.org/sec1-v2.pdf), [ISO/IEC 18033-2](https://www.shoup.net/iso/std4.pdf), [IEEE 1363a](http://grouper.ieee.org/groups/1722/contributions/2012/1722a-butterworth-ieee1363.pdf) and [ANSI X9.63](ftp://ftp.iks-jena.de/mitarb/lutz/standards/ansi/X9/x963-7-5-98.pdf). **ECIES** is a public-key authenticated encryption scheme, which works similarly to the above code examples, but uses a **KDF** \(key-derivation function\) for deriving separate **MAC key** and symmetric **encryption key** from the ECDH shared secret. It has many variants.

The **ECIES standard** combines ECC-based **asymmetric cryptography** with **symmetric ciphers** to provide data encryption by EC private key and decryption by the corresponding EC public key. The **ECIES** encryption scheme uses **ECC** cryptography \(public key cryptosystem\) + key-derivation function \(**KDF**\) + **symmetric encryption** algorithm + **MAC** algorithm, combined together like it is shown on the figure below:

![](/assets/ECIES.png)

The input of the **ECIES encryption** consists of recipient's **public key** + **plain text message**. The output consists of sender's ephemeral public key \(**ciphertext public key**\) + **encrypted message** \(ciphertext + symmetric algorithm parameters\) + **authentication tag** \(MAC code\):

* `ECIES-encrypt(recipientPublicKey, plaintextMessage)` ➔ `{ cipherTextPublicKey, encryptedMessage, authTag }`

The **ECIES decryption** takes the output from the encryption + the **recipient's private key** and produces the original plaintext message or detects a problem \(e.g. integrity / authentication error\):

* `ECIES-decrypt(cipherTextPublicKey, encryptedMessage, authTag, recipientPrivateKey, )` ➔ `plaintextMessage`

The ECIES encryption scheme is a **framework**, not a concrete algorithm. It can be implemented by plugging different algorithms, e.g. the **secp256k1** or **P-521** elliptic curve for the public-key calculations + **PBKDF2** or **Scrypt** for KDF function + **AES-CTR** or **AES-GCM **or **ChaCha20-Poly1305** for symmetric cipher and authentication tag + **HMAC-SHA512** for MAC algorithm \(in case of unauthenticated encryption\).

## ECIES \(Elliptic Curve Integrated Encryption Scheme\) - Example

Now, let's demonstrate how the **ECIES encryption scheme** works in practice in **Python**. We shall use a Python library [`eciespy`](https://kigawas.me/eciespy/):

```py
pip install eciespy
```

A sample Python code to generate public / private key pair and encrypt and decrypt a message using ECIES is:

```py
from ecies.utils import generate_eth_key
from ecies import encrypt, decrypt
import binascii

privKey = generate_eth_key()
privKeyHex = privKey.to_hex()
pubKeyHex = privKey.public_key.to_hex()
print("Encryption public key:", pubKeyHex)
print("Decryption private key:", privKeyHex)

plaintext = b'Some plaintext for encryption'
print("Plaintext:", plaintext)

encrypted = encrypt(pubKeyHex, plaintext)
print("Encrypted:", binascii.hexlify(encrypted))

decrypted = decrypt(privKeyHex, encrypted)
print("Decrypted:", decrypted)
```

The above code is pretty simple: just generate ECC **public + private key pair** using `ecies.utils.generate\_eth\_key()` and call the `ecies.encrypt(pubKey, msg)` and `decrypt(privKey, encryptedMsg)` functions from the `eciespy` library.

The **output** form the above code looks like this:

```
Encryption public key: 0x0dc8e06c055b45ecf110258ed5c0261ce2019b1bd0f8f226dcd010dade448b8f304a0915c68cdf7ddded8e4021d28fb92e27d08df695f48a0d2c41ddee750fc7
Decryption private key: 0x487fd8b53c471e3c38484a0fbe4751ace67a9ed28e60ea6b0b44c445b881f99d
Plaintext: b'Some plaintext for encryption'
Encrypted: b'045699078bbd101e270572d0d68e87a8f7b6cc377ebeeffb60d2fcac5dc7bdd86a26d7f79d13b92e923a0e2cdbe418a7856b27157ef150d5c72f4f8f312467d13221ebe7049b7ed2f0ed253bce13117129a7b01bb881b8dfbf004ff11f3ebed4c732744bc49ea03230c2d1b2ec80774e79c075431d2019464d3de97ceb96'
Decrypted: b'Some plaintext for encryption'
```

The Python `eciespy` library internally uses **ECC** cryptography over the **secp256k1** curve + **AES-256-GCM** authenticated encryption. Note that the above encrypted message holds together 4 values: `{cipherPubKey, AES-nonce, authTag, AES-ciphertext}`, packed in binary form and not directly visible from the above output.

