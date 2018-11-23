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

...

## EdDSA Verify Signature

...

