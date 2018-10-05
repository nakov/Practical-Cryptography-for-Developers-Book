# AES Encryption / Decryption - Examples in Python

Let's illustrate the **AES encryption** and **AES decryption** concepts through working **source code** in Python. The example below will illustrate a **password-based AES encryption**, without message authentication.

## Install Python Libraries pyaes and pbkdf2

First, install the Python library `pyaes` that implements the **AES** symmetric key encryption algorithm:

```python
pip install pyaes
```

Next, install the Python library `pbkdf2` that implements the **PBKDF2** password-to-key derivation algorithm:

```python
pip install pbkdf2
```

Now, let's play with a simple AES encrypt / decrypt example.

## Password to Key Derivation

First start by **key derivation**: from password to 256-bit encryption key.

```python
import pyaes, pbkdf2, binascii, os, secrets

# Derive a 256-bit AES encryption key from the password
password = "s3cr3t*c0d3"
passwordSalt = os.urandom(32)
key = pbkdf2.PBKDF2(password, passwordSalt).read(32)
print('AES encryption key:', binascii.hexlify(key))
```

The above code **derives a 256-bit key** using the **PBKDF2** key derivation algorithm from the password `s3cr3t*c0d3`. It uses a random password derivation **salt**. This salt should be stored in the output, together with the ciphertext, because without it the decryption key cannot be derived again and the decryption will be impossible.

The output from the above code may look like this:

```
AES encryption key: b'7625e224dc0f0ec91ad28c1ee67b1eb96d1a5459533c5c950f44aae1e32f2da3'
```

The derived **key** consists of **64 hex digits** \(32 bytes\), which represents a 256-bit integer number. It will be different if you run the above code several times, because a random salt is used every time. If you use the same salt, the same key will be derived.

## AES Encryption \(CTR Block Mode\)

Next, generate a **random 256-bit initial vector \(IV\)** for the AES CTR block mode and perform the **AES-256-CTR encryption**:

```python
# Encrypt the plaintext with the given key:
#   ciphertext = AES-256-CTR-Encrypt(plaintext, key, iv)
iv = secrets.randbelow(2 << 256)
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

## AES Decryption \(CTR Block Mode\)

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
