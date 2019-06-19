# EdDSA and Ed25519

**EdDSA** \(Edwards-curve Digital Signature Algorithm\) is a modern and secure digital signature algorithm based on performance-optimized elliptic curves, such as the 255-bit curve [**Curve25519**](https://en.wikipedia.org/wiki/Curve25519) and the 448-bit curve [**Curve448-Goldilocks**](https://en.wikipedia.org/wiki/Curve448). The EdDSA signatures use the **Edwards form** of the elliptic curves \(for performance reasons\), respectively `edwards25519` and `edwards448`. The **EdDSA** algorithm is based on the [**Schnorr signature algorithm**](https://en.wikipedia.org/wiki/Schnorr_signature) and relies on the difficulty of the **ECDLP problem**.

The **EdDSA** signature algorithm and its variants **Ed25519** and **Ed448** are technically described in the [RFC 8032](https://tools.ietf.org/html/rfc8032).

## EdDSA Key Generation

**Ed25519** and **Ed448** use small **private keys** \(32 or 57 bytes respectively\), small **public keys** \(32 or 57 bytes\) and **small signatures** \(64 or 114 bytes\) with **high security level** at the same time \(128-bit or 224-bit respectively\).

Assume the elliptic curve for the EdDSA algorithm comes with a generator point **G** and a subgroup order _**q**_ for the EC points, generated from **G**.

The **EdDSA key-pair** consists of:

* **private key** \(integer\): _**privKey**_
* **public key** \(EC point\): _**pubKey**_ = _**privKey**_ \* **G**

The **private key** is generated from a **random integer**, known as _**seed**_ \(which should have similar bit length, like the curve order\). The _**seed**_ is first hashed, then the last few bits, corresponding to the curve **cofactor** \(8 for Ed25519 and 4 for X448\) are cleared, then the highest bit is cleared and the second highest bit is set. These transformations guarantee that the private key will always belong to the same subgroup of EC points on the curve and that the private keys will always have similar bit length \(to protect from timing-based side-channel attacks\). For **Ed25519** the private key is 32 bytes. For **Ed448** the private key is 57 bytes.

The public key _**pubKey**_ is a point on the elliptic curve, calculated by the EC point multiplication: _**pubKey**_ = _**privKey**_ \* **G** \(the private key, multiplied by the generator point **G** for the curve\). The public key is encoded as **compressed** EC point: the **y**-coordinate, combined with the lowest bit \(the parity\) of the **x**-coordinate. For **Ed25519** the public key is 32 bytes. For **Ed448** the public key is 57 bytes.

## EdDSA Sign

The **EdDSA signing** algorithm \([RFC 8032](https://tools.ietf.org/html/rfc8032#page-13)\) takes as input a text message _**msg**_ + the signer's EdDSA **private key** _**privKey**_ and produces as output a pair of integers {_**R**_, _**s**_}. EdDSA signing works as follows \(with minor simplifications\):

`EdDSA_sign(msg, privKey) --> { R, s }`

1. Calculate _**pubKey**_ = _**privKey**_ \* **G**
2. Deterministically generate a secret integer _**r**_ = hash\(hash\(_**privKey**_\) + _**msg**_\) mod _**q**_ \(this is a bit simplified\)
3. Calculate the public key point behind _**r**_ by multiplying it by the curve generator: _**R**_ = _**r**_ \* **G**
4. Calculate _**h**_ = hash\(_**R**_ + _**pubKey**_ + _**msg**_\) mod _**q**_
5. Calculate _**s**_ = \(_**r**_ + _**h**_ \* _**privKey**_\) mod _**q**_
6. Return the **signature** { _**R**_, _**s**_ }

The produced **digital signature** is 64 bytes \(32 + 32 bytes\) for **Ed25519** and 114 bytes \(57 + 57 bytes\) for **Ed448**. It holds a compressed point _**R**_ + the integer _**s**_ \(confirming that the signer knows the _**msg**_ and the _**privKey**_\).

## EdDSA Verify Signature

The **EdDSA signature verification** algorithm \([RFC 8032](https://tools.ietf.org/html/rfc8032#page-13)\) takes as input a text message _**msg**_ + the signer's EdDSA **public key** _**pubKey**_ + the EdDSA signature {_**R**_, _**s**_} and produces as output a boolean value \(valid or invalid signature\). EdDSA verification works as follows \(with minor simplifications\):

`EdDSA_signature_verify(msg, pubKey, signature { R, s } ) --> valid / invalid`

1. Calculate _**h**_ = hash\(_**R**_ + _**pubKey**_ + _**msg**_\) mod _**q**_
2. Calculate _**P1**_ = _**s**_ \* **G**
3. Calculate _**P2**_ = _**R**_ + _**h**_ \* _**pubKey**_
4. Return _**P1**_ == _**P2**_

## How Does it Work? <a id="how-does-it-work"></a>

During the verification the point _**P1**_ is calculated as: _**P1**_ = _**s**_ \* **G**.

During the signing _**s**_ = \(_**r**_ + _**h**_ \* _**privKey**_\) mod _**q**_. Now replace _**s**_ in the above equation:

* _**P1**_ = _**s**_ \* **G =** \(_**r**_ + _**h**_ \* _**privKey**_\) mod _**q**_ \* **G** = _**r**_ \* **G** + _**h**_ \* _**privKey**_ \* **G** = _**R**_ + _**h**_ \* _**pubKey**_

The above is exactly the other point _**P2**_. If these points _**P1**_ and _**P2**_ are the same EC point, this proves that the point _**P1**_, calculated by the private key matches the point _**P2**_, created by its corresponding public key.

## ECDSA vs EdDSA

If we compare the signing and verification for EdDSA, we shall find that **EdDSA is simpler than ECDSA**, easier to understand and to implement. Both signature algorithms have **similar security strength** for curves with similar key lengths. For the most popular curves \(liked `edwards25519` and `edwards448`\) the **EdDSA algorithm is slightly faster than ECDSA**, but this highly depends on the curves used and on the certain implementation. Unlike ECDSA the EdDSA signatures do not provide a way to **recover the signer's public key** from the signature and the message. Generally, it is considered that EdDSA is recommended for most modern apps.

