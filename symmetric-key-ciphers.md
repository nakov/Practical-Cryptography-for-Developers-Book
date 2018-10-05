# Symmetric Key Ciphers - Overview

**Symmetric key ciphers** (like **AES**, **ChaCha20**,  **RC6**, **Twofish**, **CAST** and many others) use the same key \(or password\) to **encrypt** and **decrypt** data. They are often used in combination with other algorithms into a **symmetric encryption schemes** (like **ChaCha20-Poly1305** and **AES-256-CTR-HMAC-SHA256**), often with password to **key derivation** algorithms (like **Scrypt** and **Argon2**).

## Asymmetric Encryption / Decryption

The **secret key** used to encrypt and decrypt the data is usually 128 bits or 256 bits and is called "**encryption key**". Sometimes it is given as hex or base64-encoded integer number or is derived through a **password-to-key derivation scheme**.

When the input data is encrypted, it is transformed to **encrypted ciphertext** and when the ciphertext is decrypted, it is transformed back to the original input data.

![](/assets/symmetric-key-encryption-decryption.gif)

## Symmetric Encryption Uses a Set of Algorithms

It is important to know as a concept that symmetric-key encryption algorithms usually do not work standalone. They work together with other related crypto algorithms, into a **symmetric encryption scheme** / **symmetric encryption construction**.

In most encryption schemes an **encryption** is combined with password to **key derivation** algorithm and **message authentication** scheme (see [authenticated encryption](https://en.wikipedia.org/wiki/Authenticated_encryption)). Typically a symmetric encryption procedure uses a sequence of steps, involving different crypto algorithms:

* **Password-to-key derivation** algorithm \(like Scrypt or Argon2\): to allow using a password instead of a key and to make password cracking hard and slow to be performed.
* **Block to stream cipher transformation** algorithm \(block cipher mode like **CBC** or **CTR**\) + **message padding** algorithm like **PKCS7** \(in some modes\): to allow encrypting data of arbitrary size using a block cipher algorithm \(like **AES**\).
* **Block cipher algorithm** \(like **AES**\): to securely encrypt data blocks of fixed length using a secret key.
* **Message authentication** algorithm \(like **HMAC**\): to check whether after decryption the obtained result matches the original message before the encryption.

Later in this section we shall give **more details and examples** about how to configure and use symmetric block ciphers \(like AES\) along with the all above described algorithms to securely encrypt and decrypt messages of arbitrary size.
