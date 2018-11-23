# EdDSA and Ed25519: Elliptic Curve Digital Signatures

**Edwards-curve Digital Signature Algorithm** \(EdDSA\) is a modern and secure digital signature algorithm based on elliptic curves, highly optimized for performance, such as the 255-bit curve [**Curve25519**](https://en.wikipedia.org/wiki/Curve25519) and the 448-bit curve [**Curve448-Goldilocks**](https://en.wikipedia.org/wiki/Curve448). The EdDSA signatures use the **Edwards form** of the elliptic curves \(for performance reasons\), such as `edwards25519` and `edwards448`. The EdDSA algorithm is based on the [**Schnorr signature algorithm**](https://en.wikipedia.org/wiki/Schnorr_signature) and relies on the difficulty of the **ECDLP problem**. The EdDSA algorithm and the Ed25519 and Ed448 and are technically described in the [RFC 8032](https://tools.ietf.org/html/rfc8032).





EdDSA uses small **private keys** \(32 or 56 bytes\), small **public keys** \(32 or 57 bytes\) and **small signatures** \(64 or 114 bytes\) for **Ed25519** and **Ed448**, respectively, with **high security level** at the same time: 128-bit and 224-bit respectively.

 

The **Ed25519** is a cryptosystem is based on the ECC \(elliptic-curve cryptography\) concepts – [http://ed25519.cr.yp.to](http://ed25519.cr.yp.to)

Uses the Edwards's curve Curve25519 \(RFC7748\)

![](/assets/edwards-curve-equation)

**EdDSA** \(using curve25519\) is **faster** than ECDSA \(using secp256k1\) at **similar level of security** \(even slightly better\).

![](/assets/edwards-curve-visualization.png)

See also:

[https://download.libsodium.org/doc/advanced/ed25519-curve25519](https://download.libsodium.org/doc/advanced/ed25519-curve25519)

