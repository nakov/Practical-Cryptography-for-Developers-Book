# EdDSA and Ed25519: Elliptic Curve Digital Signatures

**EdDSA** \(Edwards-curve Digital Signature Algorithm\) is a modern and secure digital signature algorithm based on performance-optimized elliptic curves, such as the 255-bit curve [**Curve25519**](https://en.wikipedia.org/wiki/Curve25519) and the 448-bit curve [**Curve448-Goldilocks**](https://en.wikipedia.org/wiki/Curve448). The EdDSA signatures use the **Edwards form** of the elliptic curves \(for performance reasons\), respectively `edwards25519` and `edwards448`. The **EdDSA** algorithm is based on the [**Schnorr signature algorithm**](https://en.wikipedia.org/wiki/Schnorr_signature) and relies on the difficulty of the **ECDLP problem**.

The **EdDSA** signature algorithm and its variants **Ed25519** and **Ed448** are technically described in the [RFC 8032](https://tools.ietf.org/html/rfc8032).

## EdDSA Key Generation

**Ed25519** and **Ed448** use small **private keys** \(32 or 57 bytes respectively\), small **public keys** \(32 or 57 bytes\) and **small signatures** \(64 or 114 bytes\) with **high security level** at the same time \(128-bit or 224-bit respectively\).

The **EdDSA key-pair** consists of:

* **private key** \(integer\): _**privKey**_
* **public key** \(EC point\): _**pubKey**_ = _**privKey**_ \* **G**

The **private key** is generated from a **random integer**, known as _**seed**_ \(which should have similar bit length, like the curve order\). The _**seed**_ is first hashed, then the last few bits, corresponding to the curve **cofactor** \(8 for Ed25519 and 4 for X448\) are cleared, then the highest bit is cleared and the second highest bit is set. These transformations guarantee that the private key will always belong to the same subgroup of EC points on the curve and that the private keys will always have similar bit length \(to protect from timing-based side-channel attacks\). For **Ed25519** the private key is 32 bytes. For **Ed448** the private key is 57 bytes.

The public key _**pubKey**_ is a point on the elliptic curve, calculated by the EC point multiplication: _**pubKey**_ = _**privKey**_ \* **G** \(the private key, multiplied by the generator point **G** for the curve\). The public key is encoded as **compressed** EC point: the **y**-coordinate, combined with the lowest bit \(the parity\) of the **x**-coordinate. For **Ed25519** the public key is 32 bytes. For **Ed448** the public key is 57 bytes.

## EdDSA Sign

The **EdDSA signing** algorithm \([RFC 8032](https://tools.ietf.org/html/rfc8032#page-13)\) takes as input a text message _**msg**_ + the signer's EdDSA **private key** _**privKey**_ and produces as output a pair of integers {_**r**_, _**s**_}. EdDSA signing works as follows \(with minor simplifications\):

`EdDSA_sign(msg, privKey) --> { r, s }`

1. Calculate _**h**_ = hash\(_**msg**_\). Calculate _**pubKey**_ = _**privKey**_ \* **G**.
2. Deterministically generate an integer _**r**_ = hash\(rightHalfBytes\(hash\(_**privKey**_\)\) + _**h**_\).
3. Calculate the public key point behind _**r**_ by multiplying it by the curve generator: _**R**_ = _**r**_ \* **G**.
4. Calculate _**k**_ = hash\(_**R**_ + _**pubKey**_ + _**h**_\).
5. Calculate _**S**_ = _**r**_ + _**k**_ \* _**privKey**_.
6. Return the **signature** { _**R**_, _**S**_ }.

The produced **digital signature** is 64 bytes \(32 + 32 bytes\) for **Ed25519** and 114 bytes \(57 + 57 bytes\) for **Ed448**.

## EdDSA Verify Signature

The **EdDSA signature verification **algorithm \([RFC 8032](https://tools.ietf.org/html/rfc8032#page-13)\) takes as input a text message _**msg**_ + the signer's EdDSA **public key** _**pubKey**_ + the EdDSA signature {_**r**_, _**s**_} and produces as output a boolean value \(valid or invalid signature\). EdDSA verification works as follows \(with minor simplifications\):

`EdDSA_signature_verify(msg, pubKey, signature { R, S} ) --> valid / invalid`

1. Calculate _**h**_ = hash\(_**msg**_\)
2. Calculate _**k**_ = hash\(_**R**_ + _**pubKey**_ + _**h**_\)
3. Calculate _**v1**_ = _**S**_ \* **G**
4. Calculate _**v2**_ = _**R**_ + _**k**_ \* _**pubKey**_
5. Return _**v1**_ == _**v2**_

## How Does it Work? {#how-does-it-work}

During the verification the point _**v1**_ is calculated as: _**v1**_ = _**S**_ \* **G**.

During the signing _**S**_ = _**r**_ + _**k**_ \* _**privKey**_. Now replace _**S**_ in the above equation:

* _**v1**_ = _**S**_ \* **G =** \(_**r**_ + _**k**_ \* _**privKey**_\) \* **G** = _**R**_ + _**k**_ \* _**pubKey**_

The above is exactly the other point _**v2**_.

