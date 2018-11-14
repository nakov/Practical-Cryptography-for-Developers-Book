# Digital Signatures, ECDSA and EdDSA

[**Digital signatures**](https://en.wikipedia.org/wiki/Digital_signature) are a cryptographic tool to **sign messages** and **verify message signatures** in order to provide proof of **authenticity** for digital messages or electronic documents. Digital signatures provide:

* Message **authentication** - a proof that certain known sender \(secret key owner\) have created and signed the message.
* Мessage **integrity** - a proof that the message was not altered after the signing.
* **Non-repudiation** - the signer cannot deny the signing of the document after the signature is once created.

**Digital signatures** are widely used today in the business and in the financial industry, e.g. for authorizing bank payments \(money transfer\), for exchange of signed electronic documents, for signing transactions in the public blockchain systems \(e.g. transfer of coins, tokens or other digital assets\), for signing digital contracts and in many other scenarios.

**Digital signatures** cannot identify who is the person, created a certain signature. This can be solved in combination with a [**digital certificate**](https://en.wikipedia.org/wiki/Public_key_certificate), which binds a public key owner with identity \(person, organization, web site or other\). By design digital signatures bind messages to public keys, not to digital identities.

## Sign Messages and Verify Signatures: How It Works?

**Digital signature** schemes typically use a **public-key cryptosystem** \(such as RSA or ECC\) and use a **public / private key pairs**. A message is signed by a private key and the signature is verified by the corresponding public key:

![](/assets/public-key-cryptography-sign-verify.png)

Messages are **signed** by the sender using a **private key** \(signing key\). Typically the input message is **hashed** and then the **signature** is calculated by the signing algorithm. Most signature algorithms perform some calculation with the message hash + the signing key in a way that the result cannot be calculated without the signing key. The result from message signing is the **digital signature** \(one or more integers\):

`signMsg(msg, privKey) 🡒 signature`

Message **signatures** are **verified** by the corresponding **public key** \(verification key\). Typically the signed message is **hashed** and some calculation is performed by the signature algorithm using the message hash + the public key. The result from signing is a boolean value \(valid or invalid signature\):

`verifyMsgSignature(msg, signature, pubKey) 🡒 valid / invalid`

A **message signature** mathematically guarantees that certain message was signed by certain \(secret\) **private key**, which corresponds to certain \(non-secret\) **public key**. After a message is signed, the message and **the signature cannot be modified** and thus message **authentication** and **integrity** is guaranteed. Anyone, who knows the **public key** of the message signer, can **verify the signature**. Аfter signing the signature author cannot reject the act of signing \(this is known as **non-repudiation**\).

**Digital signatures** are different from **MAC** \(message authentication codes\), because MACs are created and verified by the same secret key using a **symmetric algorithm,** while digital signatures are created by a signing key and are verified by a different verification key, corresponding to the signing key using an **asymmetric algorithm**. Both signatures and MAC codes provide message authentication and integrity.

## Digital Signature Schemes and Algorithms

Most public-key cryptosystems like **RSA** and **ECC** provide secure **digital signature schemes** \(signature algorithms\). Examples of well known digital signature schemes are: [**DSA**](https://en.wikipedia.org/wiki/Digital_Signature_Algorithm), [**ECDSA**](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm), [**EdDSA**](https://en.wikipedia.org/wiki/EdDSA), [**RSA signatures**](https://en.wikipedia.org/wiki/RSA_%28cryptosystem%29#Signing_messages), [**ElGamal signatures**](https://en.wikipedia.org/wiki/ElGamal_signature_scheme) and [**Schnorr signatures**](https://en.wikipedia.org/wiki/Schnorr_signature).

The above mentioned signature schemes are based on the difficulty of the **DLP** \(discrete logarithm problem\) and **ECDLP** \(elliptic-curve discrete logarithm problem\) and are **quantum-breakable** \(powerful enough quantum computers may calculate the signing key from the message signature\). Quantum-safe signatures \(like **BLISS**, **XMSS** and **McEliece**\) are massively used, because of long key length, long signatures and slower performance, compared to ECDSA and EdDSA.

The most popular digital signature schemes \(as of Nov 2018\) are: [**RSA signatures**](https://en.wikipedia.org/wiki/RSA_%28cryptosystem%29#Signing_messages), [**ECDSA**](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) and [**EdDSA**](https://en.wikipedia.org/wiki/EdDSA). Let's give some details about them, along with some live code examples.

### RSA Signatures

The **RSA** public-key cryptosystem provides a cryptographically secure **digital signature scheme** \(sign + verify\), based on the math of the **modular exponentiations** and discrete logarithms and the difficulty of the **integer factorization problem** \(**IFP**\). The [**RSA sign / verify**](https://en.wikipedia.org/wiki/RSA_%28cryptosystem%29#Signing_messages) algorithm calculates a message **hash**, then **encrypts** the hash with the private key exponent to obtain the **signature** and **decrypts** the message with the public key exponent at the signature verification stage to ensure the signature is valid. RSA signatures are **deterministic** \(the same message + same private key produce the same signature\).

**RSA signatures** are widely used in modern cryptography, e.g. for signing digital certificates to protect Web sites. For example \(as of Nov 2018\) the Microsoft's official Web site uses `Sha256RSA` for its digital certificate. Nevertheless, the trend in the last decade is to move from RSA and DSA to **elliptic curve-based signatures** \(like ECDSA and EdDSA\). Modern cryptographers and developers **prefer ECC signatures** for their shorter key length, shorter signature, higher security \(for the same key length\) and better performance.

### DSA \(Digital Signature Algorithm\)

The [**DSA \(Digital Signature Algorithm\)**](https://en.wikipedia.org/wiki/Digital_Signature_Algorithm) is a cryptographically secure standard for **digital signatures** \(signing messages and signature verification\), based on the math of the **modular exponentiations** and discrete logarithms and the difficulty of the discrete logarithm problem \(**DLP**\). It is alternative of RSA and is used instead of RSA, because of patents limitations with RSA \(until Sept 2000\). **DSA** is variant of the [ElGamal signature scheme](https://en.wikipedia.org/wiki/ElGamal_signature_scheme).

The **DSA signing **algorithm calculates a message **hash**, then generates a random integer **k** and computes the **signature** using the message **hash** + the **private key** exponent + the random number **k**. Due to randomness, the signature is **non-deterministic**. The **DSA signature verification** algorithm involves computations, based on the message hash + the public key exponent + the signature.

The **random value k** \(generated when the signature is computed\) opens a potential vulnerability: if two different messages are signed using the same value of **k **and the same **private key**, then an attacker can compute the signer's private key directly.

A **deterministic-DSA** variant is defined in [**RFC 6979**](https://tools.ietf.org/html/rfc6979), which calculates the random number **k** as **HMAC** from the private key, the message hash and few other parameters. The deterministic ECDSA is considered more secure.

In the modern cryptography, the **elliptic-curve-based signatures** \(liike ECDSA and EdDSA\) are **prefered to DSA**, because of shorter key lengths, shorter signature lengths, higher security levels \(for the same key length\) and better performance.

### ECDSA \(Elliptic Curve Digital Signature Algorithm\)

The [**ECDSA**](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) \(Elliptic Curve Digital Signature Algorithm\) is a cryptographically secure **digital signature** scheme, based on the elliptic-curve cryptography \(**ECC**\). ECDSA relies on the math of the **cyclic groups of elliptic curves** over finite fields and on the difficulty of the **ECDLP problem** \(elliptic-curve discrete logarithm problem\).

**ECDSA** is adaptation of the classical **DSA** algorithm, which is derived from the [**ElGamal signature scheme**](https://en.wikipedia.org/wiki/ElGamal_signature_scheme). More precisely, the **ECDSA** algorithm is a variant of the ElGamal signature, with some changes and optimizations to handle the representation of the group elements \(the points of the elliptic curve\). Like any other elliptic curve crypto algorithm, ECDSA uses a **curve** \(like the `secp256k1`\), **private key** \(random integer within the curve key length\) and **public key** \(EC point, calculated from the private key by multiplying it to the curve generator point\).

The **ECDSA signing **algorithm calculates a message **hash**, then generates a random integer **k** and computes the **signature** using the message **hash** + the **private key** + the random number **k**. Due to randomness, the signature is **non-deterministic**. The **ECDSA signature verification** algorithm involves computations, based on the message **hash** + the **public key** + the **signature**.

The **random value k** \(generated when the signature is computed\) opens a potential vulnerability: if two different messages are signed using the same value of **k **and the same **private key**, then an attacker can compute the signer's private key directly.

A **deterministic-ECDSA** variant is defined in [**RFC 6979**](https://tools.ietf.org/html/rfc6979), which calculates the random number **k** as **HMAC** from the private key, the message hash and few other parameters. The deterministic ECDSA is considered more secure.

Sha256ECDSA \(used in SSL certificates, e.g. by Amazon\)

### EdDSA \(Edwards-curve Digital Signature Algorithm\)

...

### Other Signature Schemes and Algorithms

Signature schemes:  
ECDSA: r≡x\(\[H\(m\)s−1\]B+rs−1A\)\(mod n\)  
ECGDSA: r≡x\(\[r−1H\(m\)\]B+r−1sA\)\(mod n\)  
ECKCDSA: r=H\(x\(\[r⊕H\(m,h\)\]B+\[s\]A\)\)  
SM2 signature: [https://tools.ietf.org/html/draft-shen-sm2-ecdsa-00](https://tools.ietf.org/html/draft-shen-sm2-ecdsa-00)  
GOST R 34.10-2001: Digital Signature Algorithm: [https://tools.ietf.org/html/rfc5832](https://tools.ietf.org/html/rfc5832)

