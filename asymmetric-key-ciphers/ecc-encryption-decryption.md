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

The below Python code uses the `tinyec` library to calculate **ECC private-public key pair** \(based on the `brainpoolP256r1` curve\) and then derive a **secret key** from the ECC **public key** \(for encryption\) and later derive the same **secret key** \(for decryption\) from the **private key** and the generated for the encryption **ciphertext public key**:

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

The code is really simple and demonstrates that we can generate a pair { **secret key** + **cipher public key** } from given **public key** and later we can recover the **secret key** from the pair { **cipher public key** + **private key** }. The above code produces output like this:

```
private key: 0x935b43dc91b5f85ef13c13d0530205b6417039565c376a183bf422d84f460c0e
public key: 0x8eab50f3bc65c9a10ccba9451c5dcac51f330f582bb99666137094d01087257f1
ciphertext pubKey: 0x84058e1feef2db10ddb82377277488ed6e5f0e6b6c59fd4b254896e7ffee99100
encryption key: 0x2897fc0218c0f2ae06769645833b34d54fb356ee4a7a1d2e5031fddb11de7c991
decryption key: 0x2897fc0218c0f2ae06769645833b34d54fb356ee4a7a1d2e5031fddb11de7c991
```

It is clear that the **encryption key** \(derived from the public key\) and the **decryption key** \(derived from the corresponding private key\) **are the same**. This is due to the above discussed property of the ECC: pubKey \* ciphertextPrivKey = ciphertextPubKey \* privKey.

## ECC-Based Hybrid Encryption / Decryption - Example in Python

Once we have the **secret key**, we can use it for **symmetric data encryption**, using a symmetric encryption scheme like AES-GCM or ChaCha20-Poly1305. Let's implement a fully-functional **asymmetric ECC encryption and decryption** hybrid scheme. It will be based on the `brainpoolP256r1` curve and the **AES-256-GCM** authenticated symmetric cipher.

We shall use the `tinyec` and `pycryptodome` Python libraries:

```
pip install tinyec
pip install pycryptodome
```

Let's play with this full **ECC + AES hybrid encryption**:

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
    sha = hashlib.sha256()
    sha.update(int.to_bytes(point.x, 32, 'big'))
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



