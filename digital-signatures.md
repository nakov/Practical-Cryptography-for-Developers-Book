# Digital Signatures, DSA, ECDSA and EdDSA

[**Digital signatures**](https://en.wikipedia.org/wiki/Digital_signature) are a cryptographic tool to **sign messages** and **verify message signatures** in order to provide proof of **authenticity** for digital messages or electronic documents. Digital signatures provide:

* Message **authentication** - a proof that certain known sender \(secret key owner\) have created and signed the message.
* Мessage **integrity** - a proof that the message was not altered after the signing.
* **Non-repudiation** - the signer cannot deny the signing of the document after the signature is once created.

Digital signature schemes typically use a **public-key cryptosystem** \(such as RSA or ECC\) and use a **public / private key pairs**.

* Messages are **signed** by the sender using a **private key** \(signing key\). Typically the input message is **hashed** and then the **signature** is calculated by the signing algorithm. Most signature algorithms perform some calculation with the message hash + the signing key in a way that the result cannot be calculated without the signing key.
* Message signatures are **verified** by the corresponding **public key** \(verification key\). Typically the signed message is **hashed** and some calculation is performed using the message hash + the public key \(verification key\).

![](/assets/public-key-cryptography-sign-verify.png)

A **message signature** mathematically guarantees that certain message was signed by certain \(secret\) **private key**, which corresponds to certain \(non-secret\) **public key**. After a message is signed, the message and **the signature cannot be modified** and thus message **authentication** and **integrity** is guaranteed. Anyone, who knows the **public key** of the message signer, can **verify the signature**. Аfter signing the signature author cannot reject the act of signing \(this is known as **non-repudiation**\).

**Digital signatures** are widely used today for signing digital contracts, for authorizing bank payments and signing transactions in the public blockchain systems.

Most public-key cryptosystems like **RSA** and **ECC** provide secure digital signature schemes like [**DSA**](https://en.wikipedia.org/wiki/Digital_Signature_Algorithm), [**ECDSA**](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) and [**EdDSA**](https://en.wikipedia.org/wiki/EdDSA). We shall discuss the digital signatures in greater detail later in this section.

...

RSA Signature

ElGamal

DSA

ECDSA

EdDSA

## What is a Digital Signature?

...

## DSA \(Digital Signature Algorithm\)

...

## ECDSA \(Elliptic Curve Digital Signature Algorithm\)

...

## EdDSA \(Edwards-curve Digital Signature Algorithm\)

...

Signature schemes:  
ECDSA: r≡x\(\[H\(m\)s−1\]B+rs−1A\)\(mod n\)  
ECGDSA: r≡x\(\[r−1H\(m\)\]B+r−1sA\)\(mod n\)  
ECKCDSA: r=H\(x\(\[r⊕H\(m,h\)\]B+\[s\]A\)\)  
SM2 signature: [https://tools.ietf.org/html/draft-shen-sm2-ecdsa-00](https://tools.ietf.org/html/draft-shen-sm2-ecdsa-00)  
GOST R 34.10-2001: Digital Signature Algorithm: [https://tools.ietf.org/html/rfc5832](https://tools.ietf.org/html/rfc5832)

