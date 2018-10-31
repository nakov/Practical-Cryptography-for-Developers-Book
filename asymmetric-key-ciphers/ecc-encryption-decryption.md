# ECC-Based Encryption / Decryption

Assume we have a ECC **private-public key pair**. Asymmetric encryption says, that if we **encrypt data by ECC private key**, we will be able to **decrypt** the ciphertext later by the corresponding **public key**:

![](/assets/asymmetric-encryption-diagram.png)

The above process can be directly applied for the **RSA** cryptosystem, but not for **ECC**. The elliptic curve cryptography \(ECC\) **does not directly provide encryption** method. Instead, we can use the **ECDH** \(Elliptic Curve Diffie–Hellman\) key exchange scheme to derive a **shared secret key** for symmetric data encryption and decryption. Let's get into details how to do this.

## ECC-Based Secret Key Derivation

Assume we have a **cryptographic elliptic curve** over finite field, along with its generator point **G**. We can use the following two functions to calculate a **shared a secret key** for **encryption** and **decryption**:

* **calculateEncryptionKey**\(pubKey\) --&gt; \(sharedECCKey, ciphertextPubKey\)
  1. Generate **ciphertextPrivKey** = _new random private key_.
  2. Calculate **ciphertextPubKey** = ciphertextPrivKey \* G.
  3. Calculate the ECDH shared secret: **sharedECCKey** = pubKey \* ciphertextPrivKey.
  4. Return both the **sharedECCKey** + **ciphertextPubKey**. Use the **sharedECCKey** for symmetric encryption. Use the randomly generated **ciphertextPubKey** to calculate the decryption key.
* **calculateDecryptionKey**\(privKey, ciphertextPubKey\) --&gt; sharedECCKey
  1. Calculate the the ECDH shared secret: **sharedECCKey** = ciphertextPubKey \* privKey.
  2. Return the **sharedECCKey** and use it for the decryption.

The above calculations use the same math, like the **ECDH** algorithm. Recall that EC points have the following property:

* \(_**a**_ \* **G**\) \* _**b**_ = \(_**b**_ \* **G**\) \* _**a**_

Now, assume that _**a**_ = privKey, _**a**_ \* **G **= pubKey, _**b**_ = ciphertextPrivKey, _**b**_ \* **G** = ciphertextPubKey.

The above equation takes the following form:

* pubKey \* ciphertextPrivKey = ciphertextPubKey \* privKey = **sharedECCKey**

This is what exactly the above two functions calculate.

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

The code is pretty simple and demonstrates that we can generate a pair { **secret key** + **cipher public key** } from given **public key** and later we can recover the **secret key** from the pair { **cipher public key** + **private key** }. The above code produces output like this:

```
private key: 0x2e2921b4cde59cdf01e7a014a322abd530b3015085c31cb6e59502da761d29e9
public key: 0x850d3873cf4ac50ddb54ddbd27f8225fc43bd3f4c2cc0a4f9d1f9ce15fc4eb711
ciphertext pubKey: 0x71586f9999d3ee050005054bc681c1d96c5eb054ca15b080ba245e495627003b0
encryption key: 0x9d13d3f8f9747669432f575731926b5ed99a6883f00146cbd3203ffa7ff8b1ae1
decryption key: 0x9d13d3f8f9747669432f575731926b5ed99a6883f00146cbd3203ffa7ff8b1ae1
```

It is clear that the **encryption key** \(derived from the public key\) and the **decryption key** \(derived from the corresponding private key\) **are the same**. This is due to the above discussed property of the ECC: pubKey \* ciphertextPrivKey = ciphertextPubKey \* privKey. These keys will be used for encryption and decryption in an integrated encryption scheme.

## ECC-Based Hybrid Encryption / Decryption - Example in Python

Once we have the **secret key**, we can use it for **symmetric data encryption**, using a symmetric encryption scheme like AES-GCM or ChaCha20-Poly1305. Let's implement a fully-functional **asymmetric ECC encryption and decryption** hybrid scheme. It will be based on the `brainpoolP256r1` curve and the **AES-256-GCM** authenticated symmetric cipher.

We shall use the `tinyec` and `pycryptodome` Python libraries:

```
pip install tinyec
pip install pycryptodome
```

Let's play with this full **ECC + AES hybrid encryption** example:

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

It starts from generating the ECC public and private key **key pair**: `pubKey` + `privKey`, using the `tinyec` library. These keys will be used to encrypt the message `msg` through the hybrid encryption scheme \(asymmetric ECC + symmetric AES\).

Next, we encrypt `msg` by using the `pubKey` and we obtain as a result the following set of output: { `ciphertext`, `nonce`, `authTag`, `ciphertextPubKey` }. The `ciphertext` is obtained by the symmetric AES-GCM encryption, along with the `nonce` \(random AES initialization vector\) and authTag \(the MAC code of the encrypted text, obtained by the GCM block mode\). Additionally, we obtain a randomly generated `ciphertextPubKey`, which will be used to recover the AES symmetric key during the decryption.

To decrypt the encrypted message, we use the data produces during the encryption { `ciphertext`, `nonce`, `authTag`, `ciphertextPubKey` }, along with the decryption `privateKey`. The result is the decrypted plaintext message. We use authenticated encryption \(GCM block mode\), so if the decryption key or some other parameter is incorrect, the decryption will fail with an exception.

Internally, the `encrypt_ECC(msg, pubKey)` function first generates an ECC key-pair for the ciphertext and calculates the symmetric encryption ECC key `sharedECCKey = ciphertextPrivKey * pubKey` \(it is an EC point\). It is then transformed from ECC point to 256-bit AES secret key though hashing the `x` and `y` coordinates. Finally, the AES-256-GCM cipher \(from `pycryptodome`\) encrypts the message by the 256-bit shared secret key `secretKey` and produces `ciphertext` + `nonce` + `authTag`.

The `decrypt_ECC(encryptedMsg{ciphertext, nonce, authTag, ciphertextPubKey}, privKey)` function internally first calculates the symmetric encryption ECC key `sharedECCKey = privKey * ciphertextPubKey` \(it is an EC point\). It is then transformed from ECC point to 256-bit AES secret key though hashing the `x` and `y` coordinates. Then the AES-256-GCM cipher is used to decrypt the `ciphertext` + `nonce` + `authTag` by the 256-bit shared secret key `secretKey`. The produces output is the original plaintext message \(or an exception in case of incorrect decryption key or unmatching `authTag`\).

The output from the above code looks like this:

```
original msg: b'Text to be encrypted by ECC public key and decrypted by its corresponding ECC private key'
encrypted msg: {'ciphertext': b'b5953b3082fcefdbde91dd3c03cf83dde0822c19be6ae906a634db65115295e7cbcd7a1a492d69ba5be91990c70d8df9dc84360cf554f155ef81ce1f0ad44bd9fdabbc5f960517089262b3390e61b37610012bee4e6bcae335', 'nonce': b'9d55f4b5c87fff773d0457f3b23a953e', 'authTag': b'5c9d339778925aa4e44f43252a28681d', 'ciphertextPubKey': '0x21dbc985b625f2a42d0f86fc234b49b55477928bae73dfac73bafd9bed50abe70'}
decrypted msg: b'Text to be encrypted by ECC public key and decrypted by its corresponding ECC private key'
```

Enjoy the above example, play with it, try to understand how exactly it works, try to change the underlying ECC curve, try to change the symmetric encryption algorithm. Try to decrypt the ciphertext with wrong private key.

## ECIES \(Elliptic Curve Integrated Encryption Scheme\)

A hybrid encryption scheme similar to the above demonstrated code is standardised under the name **Elliptic Curve Integrated Encryption Scheme** \(**ECIES**\). ECIES ...



