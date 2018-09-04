# Overview of Modern Cryptography

In this chapter we shall introduce basic **cryptography concepts** like cryptographic **hash functions** \(SHA-256, SHA3, RIPEMD and others\), **HMAC** \(hashed message authentication code\), password to **key derivation** functions (like **Scrypt**), the Diffie-Hellman key-exchange protocol, **symmetric key** encryption schemes \(like the **AES **cipher\ with CBC and CTR block modes) and **asymmetric key** encryption schemes \(like the **RSA** cipher and elliptic curves-based cryptography / **ECC**, the secp256k1 curve and the Ed25519 cryptosystem\), **digital signatures** and **ECDSA**, as well as the concept of **entropy** and secure **random number** generation and **quantum-safe cryptography**.

We shall explain how the applied cryptography is related to **programming** and **blockchain development**.

## Encrypt / Decrypt Message - Live Demo

As a simple **example**, we shall demonstrate message encryption + decryption using the **AES** encryption algorithm. Play with this online tool: [https://aesencryption.net](https://aesencryption.net).

![](/assets/encrypt-decrypt-live-demo.jpg)

We shall learn later that behind this simple **AES encryption**, there are **many algorithms and settings** hidden inside, like password to key-derivation function and its parameters, block cipher mode, message authentication code and others.

# What is Cryptography?

**Cryptography **is the science of providing **security **and **protection **of information. It is widely used in blockchain systems to sign transactions, securely transfer blockchain assets, encrypt wallets and in many other scenarios.

Cryptography deals with **storing and transmitting data in a secure way**, such that only those, for whom it is intended, can read and process it. This may involve **encrypting and decrypting data** using symmetric or asymmetric encryption schemes \(like AES and RSA\), where one or more **keys** are used to transform data from plain to encrypted form and back. **Symmetric encryption** uses the same key to encrypt and decrypt messages, while **asymmetric encryption** uses a key pair \(encryption key and corresponding decryption key\). In blockchain encryption is used in wallets to protect the private keys and user's assets on the chain from unauthorized access.

Cryptography deals with **keys** \(large secret numbers\) and in many scenarios these **keys are derived **from numbers, passwords or passphrases using **key derivation algorithms** \(like PBKDF2 and Scrypt\). Wallets in the blockchain systems hold the user's keys, usually protected by a password or PIN code and sign transactions.

Cryptography defines **key-exchange algorithms** \(like Diffie-Hellman key exchange\), used to securely exchange data encryption **keys **between two parties that intend to transmit messages securely using **encryption**.

Cryptography uses **random numbers** and deals with **entropy** and secure generation of random numbers. Crypto wallets generate random keys to create a new blockchain account.

Cryptography provides **data hashing** functions \(like SHA-256, SHA3-256 and RIPEMD-160\), which transform messages to **message digest** \(hash of fixed length\), which cannot be reversed back to the original message and almost uniquely identifies it. In blockchain hashes are used for generating blockchain addresses, transaction identification and in many other algorithms and protocols.

Cryptography provides means of **digital signing of messages** which guarantee message authenticity, integrity and non-repudiation. Most digital signature algorithms \(like DSA, ECDSA and EdDSA\) use **asymmetric key pair** \(private and public key\): the message is **signed** by the private key and the signature is **verified** by the corresponding public key. In the blockchain systems **digital signatures **are used to sign transactions and allow users to transfer a blockchain asset from one address to another.