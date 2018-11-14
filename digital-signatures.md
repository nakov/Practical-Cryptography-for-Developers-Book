# Digital Signatures, DSA, ECDSA and EdDSA

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

* `signMsg(msg, privKey) 🡒 signature`

Message **signatures** are **verified** by the corresponding **public key** \(verification key\). Typically the signed message is **hashed** and some calculation is performed by the signature algorithm using the message hash + the public key. The result from signing is a boolean value \(valid or invalid signature\):

* `verifyMsgSignature(msg, signature, pubKey) 🡒 valid / invalid`

A **message signature** mathematically guarantees that certain message was signed by certain \(secret\) **private key**, which corresponds to certain \(non-secret\) **public key**. After a message is signed, the message and **the signature cannot be modified** and thus message **authentication** and **integrity** is guaranteed. Anyone, who knows the **public key** of the message signer, can **verify the signature**. Аfter signing the signature author cannot reject the act of signing \(this is known as **non-repudiation**\).

**Digital signatures** are different from **MAC** \(message authentication codes\), because MACs are created and verified by the same secret key using a **symmetric algorithm,** while digital signatures are created by a signing key and are verified by a different verification key, corresponding to the signing key using an **asymmetric algorithm**. Both signatures and MAC codes provide message authentication and integrity.

## Digital Signature Schemes and Algorithms

Most public-key cryptosystems like **RSA** and **ECC** provide secure **digital signature schemes** \(signature algorithms\). Examples of well known digital signature schemes are: [**DSA**](https://en.wikipedia.org/wiki/Digital_Signature_Algorithm), [**ECDSA**](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm), [**EdDSA**](https://en.wikipedia.org/wiki/EdDSA), [**RSA signatures**](https://en.wikipedia.org/wiki/RSA_%28cryptosystem%29#Signing_messages), [**ElGamal signatures**](https://en.wikipedia.org/wiki/ElGamal_signature_scheme) and [**Schnorr signatures**](https://en.wikipedia.org/wiki/Schnorr_signature). Most of these schemes are based on the difficulty of the **DLP** \(discrete logarithm problem\) and **ECDLP** \(elliptic-curve discrete logarithm problem\).



 We shall discuss the digital signatures in greater detail later in this section.



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

