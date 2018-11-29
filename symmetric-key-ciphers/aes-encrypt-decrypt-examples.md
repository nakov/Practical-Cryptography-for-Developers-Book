# AES Encryption / Decryption \(AES-CTR, AES-GCM\) - Examples in Python

Let's illustrate the **AES encryption** and **AES decryption** concepts through working **source code** in Python.

The first example below will illustrate a simple **password-based AES encryption** \(PBKDF2 + AES-CTR\) without message authentication \(**unauthenticated encryption**\). The next example will add message authentication \(using the AES-GCM mode\), then will add password to key derivation \(AES-256-GCM + Scrypt\).

## Simple AES-CTR Example

Let's start with simple AES-256-CTR non-authenticated encryption.

### Install Python Libraries `pyaes` and `pbkdf2`

First, install the Python library `pyaes` that implements the **AES** symmetric key encryption algorithm:

```python
pip install pyaes
```

Next, install the Python library `pbkdf2` that implements the **PBKDF2** password-to-key derivation algorithm:

```python
pip install pbkdf2
```

Now, let's play with a simple AES encrypt / decrypt example.

### Password to Key Derivation

First start by **key derivation**: from password to 256-bit encryption key.

```python
import pyaes, pbkdf2, binascii, os, secrets

# Derive a 256-bit AES encryption key from the password
password = "s3cr3t*c0d3"
passwordSalt = os.urandom(16)
key = pbkdf2.PBKDF2(password, passwordSalt).read(32)
print('AES encryption key:', binascii.hexlify(key))
```

The above code **derives a 256-bit key** using the **PBKDF2** key derivation algorithm from the password `s3cr3t*c0d3`. It uses a random password derivation **salt** \(128-bit\). This salt should be stored in the output, together with the ciphertext, because without it the decryption key cannot be derived again and the decryption will be impossible.

The output from the above code may look like this:

```
AES encryption key: b'7625e224dc0f0ec91ad28c1ee67b1eb96d1a5459533c5c950f44aae1e32f2da3'
```

The derived **key** consists of **64 hex digits** \(32 bytes\), which represents a **256-bit** integer number. It will be different if you run the above code several times, because a random salt is used every time. If you use the same salt, the same key will be derived.

### AES Encryption \(CTR Block Mode\)

Next, generate a **random 256-bit initial vector \(IV\)** for the AES CTR block mode and perform the **AES-256-CTR encryption**:

```python
# Encrypt the plaintext with the given key:
#   ciphertext = AES-256-CTR-Encrypt(plaintext, key, iv)
iv = secrets.randbits(256)
plaintext = "Text for encryption"
aes = pyaes.AESModeOfOperationCTR(key, pyaes.Counter(iv))
ciphertext = aes.encrypt(plaintext)
print('Encrypted:', binascii.hexlify(ciphertext))
```

The output from the above code may look like this:

```
Encrypted: b'53022cf12c5959ddf3e733128930dd3d52e3ea'
```

The **ciphertext** consists of **38 hex digits** \(19 bytes, 152 bits\). This is the size of the input data, the message `Text for encryption`.

Note that after AES-CTR encryption the **initial vector \(IV\)** should be stored along with the ciphertext, because without it, the decryption will be impossible. The **IV** should be randomly generated for each AES encryption \(not hard-coded\) for higher security.

Note also that if you encrypt the same **plaintext** with the same encryption **key** several times, the output will be **different** every time, due to the randomness in the **IV**. This is intended behavior and it increases the security, e.g. resistance to dictionary attacks.

### AES Decryption \(CTR Block Mode\)

Now let's see how to **decrypt a ciphertext** using the AES-CTR-256 algorithm. The input consists of **ciphertext** + encryption **key** + the **IV** for the CTR counter. The output is the original **plaintext**. The code is pretty simple:

```python
# Decrypt the ciphertext with the given key:
#   plaintext = AES-256-CTR-Decrypt(ciphertext, key, iv)
aes = pyaes.AESModeOfOperationCTR(key, pyaes.Counter(iv))
decrypted = aes.decrypt(ciphertext)
print('Decrypted:', decrypted)
```

The output of the above should be like this:

```
Decrypted: b'Text for encryption'
```

Note that the `aes` object should be **initialized again**, because the CTR cipher block mode algorithm keeps an internal **state** that changes over the time.

Note also that the above code **cannot detect wrong key**, wrong **ciphertext** or wrong **IV**. If you use an incorrect key to decrypt the ciphertext, you will get a wrong unreadable text. This is clearly visible by the code below:

```python
key = os.urandom(32)   # random decryption key
aes = pyaes.AESModeOfOperationCTR(key, pyaes.Counter(iv))
print('Wrongly decrypted:', aes.decrypt(ciphertext))
```

The output of the above incorrect decryption attempt might be like this:

```
Wrongly decrypted: b'\xe6!\n\x9a\xa9\x15\x12\xd9\xcb\x9cS\x86\xcc\xe1\x1d\x1a\x8blw'
```

Now it is your time to **play with the above code example**. Try to to encrypt and decrypt different messages, to change the input message, the key size, to hard-code the IV, the key and other parameters, switch to CBC mode, and see how the results change. Enjoy learning by playing.

## AES-256-GCM Example

Now, let's give a full example how to use the **AES-256-GCM** symmetric encryption construction. We shall use a different Python library for AES, called [`pycryptodome`](https://pycryptodome.readthedocs.io), which supports the the AES-256-GCM construction:

```py
pip install pycryptodome
```

Next, let's play with the below **AES-GCM example in Python**, which generates a random encryption key \(secret key\) and uses it to **encrypt** a text message, then **decrypts** it back to the original plaintext message:

```py
from Crypto.Cipher import AES
import binascii, os

def encrypt_AES_GCM(msg, secretKey):
    aesCipher = AES.new(secretKey, AES.MODE_GCM)
    ciphertext, authTag = aesCipher.encrypt_and_digest(msg)
    return (ciphertext, aesCipher.nonce, authTag)

def decrypt_AES_GCM(encryptedMsg, secretKey):
    (ciphertext, nonce, authTag) = encryptedMsg
    aesCipher = AES.new(secretKey, AES.MODE_GCM, nonce)
    plaintext = aesCipher.decrypt_and_verify(ciphertext, authTag)
    return plaintext

secretKey = os.urandom(32)  # 256-bit random encryption key
print("Encryption key:", binascii.hexlify(secretKey))

msg = b'Message for AES-256-GCM + Scrypt encryption'
encryptedMsg = encrypt_AES_GCM(msg, secretKey)
print("encryptedMsg", {
    'ciphertext': binascii.hexlify(encryptedMsg[0]),
    'aesIV': binascii.hexlify(encryptedMsg[1]),
    'authTag': binascii.hexlify(encryptedMsg[2])
})

decryptedMsg = decrypt_AES_GCM(encryptedMsg, secretKey)
print("decryptedMsg", decryptedMsg)
```

The AES-GCM encryption takes as input a **message** + **encryption key** and produces as output a set of values: { **ciphertext** + **nonce** + **authTag** }.

* The **ciphertext** is the encrypted message.
* The **nonce** is the randomly generated initial vector \(IV\) for the GCM construction.
* The **authTag** is the message authentication code \(MAC\) calculated during the encryption.

The encryption **key size** generated in the above code is 256 bits \(32 bytes\) and it configures the AES-GCM cipher as AES-256-GCM. If we change the key size to 128 bits or 192 bits, we shall use AES-128-GCM or AES-192-GCM respectively.

The output from the above code looks like this:

```
Encryption key: b'233f8ce4ac6aa125927ccd98af5750d08c9c61d98a3f5d43cbf096b4caaebe80'
encryptedMsg {'ciphertext': b'1334cd5d487f7f47924187c94424a2079656838e063e5521e7779e441aa513de268550a89917fbfb0492fc', 'aesIV': b'2f3849399c60cb04b923bd33265b81c7', 'authTag': b'af453a410d142bc6f926c0f3bc776390'}
decryptedMsg b'Message for AES-256-GCM + Scrypt encryption'
```

It is visible that the **encryption key** above is 256 bits \(64 hex digits\), the **ciphertext** has the same length as the input message \(43 bytes\), the **IV** is 128 bits \(32 hex digits\) and the **authentication tag** is 128 bits \(32 hex digits\). If we change something before the decryption \(e.g. the **ciphertext** of the **IV**\), we will get and **exception**, because the message integrity will be broken:

```py
encryptedMsg = (b'wrong chiphertext', encryptedMsg[1], encryptedMsg[2])
decryptedMsg = decrypt_AES_GCM(encryptedMsg, secretKey)  # ValueError: MAC check failed
```

## AES-256-GCM + Scrypt Example

Now let's give a more complex example: **AES encryption of text by text password**. We shall use the authenticated encryption construction **AES-256-GCM**, combined with **Scrypt** key derivation:

```py
from Crypto.Cipher import AES
import scrypt, os, binascii

def encrypt_AES_GCM(msg, password):
    kdfSalt = os.urandom(16)
    secretKey = scrypt.hash(password, kdfSalt, N=16384, r=8, p=1, buflen=32)
    aesCipher = AES.new(secretKey, AES.MODE_GCM)
    ciphertext, authTag = aesCipher.encrypt_and_digest(msg)
    return (kdfSalt, ciphertext, aesCipher.nonce, authTag)

def decrypt_AES_GCM(encryptedMsg, password):
    (kdfSalt, ciphertext, nonce, authTag) = encryptedMsg
    secretKey = scrypt.hash(password, kdfSalt, N=16384, r=8, p=1, buflen=32)
    aesCipher = AES.new(secretKey, AES.MODE_GCM, nonce)
    plaintext = aesCipher.decrypt_and_verify(ciphertext, authTag)
    return plaintext

msg = b'Message for AES-256-GCM + Scrypt encryption'
password = b's3kr3tp4ssw0rd'
encryptedMsg = encrypt_AES_GCM(msg, password)
print("encryptedMsg", {
    'kdfSalt': binascii.hexlify(encryptedMsg[0]),
    'ciphertext': binascii.hexlify(encryptedMsg[1]),
    'aesIV': binascii.hexlify(encryptedMsg[2]),
    'authTag': binascii.hexlify(encryptedMsg[3])
})

decryptedMsg = decrypt_AES_GCM(encryptedMsg, password)
print("decryptedMsg", decryptedMsg)
```

The above code encrypts using **AES-256-GCM** given text **message** by given text **password**.

* During the **encryption**, the Scrypt KDF function is used \(with some fixed parameters\) to **derive a secret key** from the password. The randomly generated **KDF salt** for the key derivation is stored together with the encrypted message and will be used during the decryption. Then the input message is **AES-encrypted** using the secret key and the output consists of **ciphertext** + **IV** \(random nonce\) + **authTag**. The final output holds these 3 values + the **KDF salt**.

* During the **decryption**, the Scrypt key derivation \(with the same parameters\) is used to derive the same **secret key** from the encryption **password**, together with the **KDF salt** \(which was generated randomly during the encryption\). Then the ciphertext is **AES-decrypted** using the secret key, the IV \(nonce\) and the authTag. In case of success, the result is the decrypted original **plaintext**. In case of error, the authentication tag will fail to authenticate the decryption process and an **exception** will be thrown.

The **output** from the above code looks like this:

```
encryptedMsg {'kdfSalt': b'2dd0b783290747ba62a63fc53591170d', 'ciphertext': b'223ed888dcd216dcd40c47ff7cdaa7fd7eab65f4f0405350a43c5cad5b6b47b527c709edec29d7d6967518', 'aesIV': b'7f114d946c77508ed2e6afe652c78f21', 'authTag': b'e84a14b9542320a0b1473141c989c48f'}
decryptedMsg b'Message for AES-256-GCM + Scrypt encryption'
```

If you run the same code, the output will be different, due to randomness \(random KDF salt + random AES nonce\).

