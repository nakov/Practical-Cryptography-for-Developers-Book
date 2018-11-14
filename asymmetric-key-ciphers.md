# Asymmetric Key Ciphers and Public-Key Cryptography - Overview

**Asymmetric key cryptosystems / public-key cryptosystems **\(like [**RSA**](https://en.wikipedia.org/wiki/RSA_%28cryptosystem%29), [**elliptic curve cryptography \(ECC\)**](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography), [**Diffie-Hellman**](https://en.wikipedia.org/wiki/Diffie–Hellman_key_exchange), [**ElGamal**](https://en.wikipedia.org/wiki/ElGamal_encryption), [**McEliece**](https://en.wikipedia.org/wiki/McEliece_cryptosystem), [**NTRU**](https://en.wikipedia.org/wiki/NTRU) and others\) use a pair of mathematically linked keys: **public key** \(encryption key\) and **private key** \(decryption key\).

The asymmetric key cryptosystems provide **key-pair generation** \(private + public key\), **encryption algorithms** \(asymmetric key ciphers and encryption schemes like **RSA-OAEP** and **ECIES**\), **digital signature algorithms** \(like **DSA**, **ECDSA** and **EdDSA**\) and **key exchange algorithms** \(like **DHKE** and **ECDH**\). 

A message **encrypted** by the **public key** is later **decrypted** by the **private key**. A message **signed** by the **private key** is later **verified** by the **public key**. The **public key** is typically shared with everyone, while the **private key** is kept secret. Calculating the private key from its corresponding public key is by design computationally infeasible.

## Public-Key Cryptosystems

Well-known **public-key cryptosystems** are: [**RSA**](https://en.wikipedia.org/wiki/RSA_%28cryptosystem%29), [**ECC**](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography), [**ElGamal**](https://en.wikipedia.org/wiki/ElGamal_encryption), [**DHKE**](https://en.wikipedia.org/wiki/Diffie–Hellman_key_exchange), [**ECDH**](https://en.wikipedia.org/wiki/Elliptic-curve_Diffie–Hellman), [**DSA**](https://en.wikipedia.org/wiki/Digital_Signature_Algorithm), [**ECDSA**](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm), [**EdDSA**](https://en.wikipedia.org/wiki/EdDSA), [**Schnorr signatures**](https://en.wikipedia.org/wiki/Schnorr_signature). Different public key cryptosystems may provide one or more of the following capabilities:

* **Key-pair generation**: generate random pairs of private key + corresponding public key.
* **Encryption **/ **decryption**: encrypt date by public key and decrypt data by private key \(often using a hybrid encryption scheme\).
* **Digital signatures** \(message authentication\): sign messages by private key and verify signatures by public key.
* **Key-exchange algorithms**: securely exchange cryptographic key between two parties over insecure channel.

The most important and most used public-key cryptosystems are **RSA** and **ECC**. Elliptic curve cryptography \(ECC\) is the recommended and most preferable modern public-key cryptosystem, especially with the modern highly optimized and secure curves \(like Curve25519 and Curve448\), because of smaller keys, shorter signatures and better performance.

The [**RSA public-key cryptosystem**](https://en.wikipedia.org/wiki/RSA_%28cryptosystem%29) is based on the mathematical concept of [**modular exponentiation**](https://en.wikipedia.org/wiki/Modular_exponentiation) \(numbers raised to a power by modulus\), along with some mathematical constructions and the [**integer factorization problem**](https://en.wikipedia.org/wiki/RSA_problem) \(which is considered to be computationally infeasible for large enough keys\).

The [**elliptic-curve cryptography \(ECC\) cryptosystem**](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) is based on the math of the on the algebraic structure of the **elliptic curves** over finite fields and the [**elliptic curve discrete logarithm problem \(ECDLP\)**](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography#Rationale), which is considered to be computationally infeasible for large keys. **ECC** comes together with the **ECDSA** algorithm \(elliptic-curve digital signature algorithm\). ECC uses smaller keys and signatures than RSA and is prefered in most modern apps. We shall discuss ECC and ECDSA later in details, along with examples.

## Asymmetric Encryption Schemes

**Asymmetric encryption** is more complicated than symmetric encryption, not only because it uses **public** and **private keys**, but because asymmetric encryption can encrypt / decrypt only small messages, which should be mapped to the underlying math of the public-key cryptosystem. In the RSA system, the input message should be transformed to big integer \(e.g. using OAEP padding\), while in ECC the message should be mapped to elliptic curve point to be encrypted. Additionally, asymmetric ciphers are significantly slower than symmetric ciphers \(e.g. the RSA encryption is 1000 times slower than AES\).

To overcome the above limitations and to allow encrypting messages of any size, modern cryptography uses **asymmetric encryption schemes** \(also known as **public key encryption schemes** / **asymmetric encryption constructions** / **hybrid encryption schemes**\), like **key encapsulation mechanisms** and **integrated encrypted schemes**, which combine asymmetric encryption with symmetric key ciphers.

This is how a large document or file can be **encrypted** by combining **public-key cryptography** and **symmetric crypto algorithm**:

![](/assets/hybrid-encryption.png)

This is the corresponding **decryption** process \(decrypt an encrypted large document using **public-key cryptography** and **symmetric crypto algorithm**\):

![](/assets/hybrid-decryption.png)

Examples of such asymmetric encryption schemes are: [**RSA-OAEP**](https://en.wikipedia.org/wiki/Optimal_asymmetric_encryption_padding), [**RSA-KEM**](https://tools.ietf.org/html/rfc5990#appendix-A) and [**ECIES-KEM**](https://www.w3.org/TR/xmlsec-generic-hybrid/#sec-ecies-kem).

### Integrated Encryption Schemes

[**Integrated encryption schemes \(IES\)**](https://en.wikipedia.org/wiki/Integrated_Encryption_Scheme) are modern public key encryption schemes, which combine symmetric ciphers, asymmetric ciphers and key-derivation algorithms to provide secure **public-key based encryption**. In EIS scheme asymmetric algorithms \(like RSA or ECC\) are used to encrypt or encapsulate a symmetric key, used later by symmetric ciphers \(like AES or ChaCha20\) to encrypt the input message. Some EIS schemes provide also message authentication. Examples of EIS schemes are [**DLIES**](https://en.wikipedia.org/wiki/Integrated_Encryption_Scheme) \(Discrete Logarithm Integrated Encryption Scheme\) and [**ECIES**](https://en.wikipedia.org/wiki/Integrated_Encryption_Scheme) \(Elliptic Curve Integrated Encryption Scheme\).

### Key Encapsulation Mechanisms \(KEMs\)

A [**key encapsulation mechanisms \(KEM\)**](https://en.wikipedia.org/wiki/Key_encapsulation) are asymmetric cryptographic techniques to encrypt a secret key that is used to encrypt an input message using symmetric cryptographic cipher, called a data encapsulation mechanism \(DEM\). **Key encapsulation mechanisms** are used in the hybrid encryption schemes and in the integrated encryption schemes, where a random element is generated in the underlying public-key cryptosystem and a symmetric key is derived from this random element by hashing. This approach simplifies the process of combining asymmetric and symmetric encryption. Examples of modern key encapsulation mechanisms are: **RSA-KEM**, **ECIES-KEM** and **PSEC-KEM.**

## Digital Signatures

In cryptography **digital signatures** provide message **authentication**, **integrity** and **non-repudiation** for digital documents. Digital signatures work in the public-key cryptosystems and use a public / private key pairs. Message **signing** is performed by the **private key** and message **verification** is performed by the corresponding **public key**.

A **message signature** mathematically guarantees that certain message was signed by certain \(secret\) **private key**, which corresponds to certain \(non-secret\) **public key**. After a message is signed, the message and **the signature cannot be modified** and thus message **authentication** and **integrity** is provided. Anyone, who knows the **public key** of the message signer, can **verify the signature**. Аfter signing the signature author cannot reject the act of signing \(this is known as **non-repudiation**\).

**Digital signatures** are widely used today for signing digital contracts, for authorizing bank payments and signing transactions in the public blockchain systems for transferring digital assets.

Most public-key cryptosystems like **RSA** and **ECC** provide secure digital signature schemes like [**DSA**](https://en.wikipedia.org/wiki/Digital_Signature_Algorithm), [**ECDSA**](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) and [**EdDSA**](https://en.wikipedia.org/wiki/EdDSA). We shall discuss the digital signatures in greater detail later in this section.

## Key Exchange Algorithms

In cryptography [**key exchange algorithms**](https://en.wikipedia.org/wiki/Key_exchange) \([**key agreement protocols**](https://en.wikipedia.org/wiki/Key-agreement_protocol) / **key negotiation schemes**\) allow cryptographic keys to be exchanged between two parties, allowing the use of a cryptographic algorithm, in most cases symmetric encryption cipher. For example, when a laptop connects to the home **WiFi router**, both parties agree on a **session key**, used to symmetrically encrypt the network traffic between them.

Most key-exchange algorithms are based on public-key cryptography and the math behind this system: discrete logarithms, elliptic curves or other.

**Anonymous key exchange**, like Diffie–Hellman \(**DHKE** and **ECDH**\), does not provide authentication of the parties, and is thus vulnerable to [man-in-the-middle attacks](https://en.wikipedia.org/wiki/Man-in-the-middle_attack), but is safe from [traffic interception \(sniffing\) attacks](https://en.wikipedia.org/wiki/Sniffing_attack).

**Authenticated key agreement** schemes authenticate the identities of parties involved in the key exchange and thus prevent man-in-the-middle attacks by use of **digitally signed keys** \(e.g. [PKI certificate](https://en.wikipedia.org/wiki/Public_key_certificate)\), [**password-authenticated key agreement**](https://en.wikipedia.org/wiki/Password-authenticated_key_agreement) or other method.

