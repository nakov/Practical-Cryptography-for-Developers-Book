# Elliptic Curve Cryptography \(ECC\) - Concepts

The [**Elliptic Curve Cryptography \(ECC\)**](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography) is modern **family of public-key cryptosystems**, which is based on the algebraic structures of the **elliptic curves over finite fields** and on the difficulty of the [**Elliptic Curve Discrete Logarithm Problem \(ECDLP\)**](https://en.wikipedia.org/wiki/Elliptic-curve_cryptography#Rationale).

The **ECC cryptography** is considered a natural modern **successor of the RSA** cryptosystem, because ECC uses **smaller keys**, signatures and ciphertexts than RSA for the same level of security and provides very fast key generation and fast signatures.

**ECC** implements all major capabilities of the asymmetric cryptosystems: **encryption**, **signatures** and **key exchange**.

## ECC Keys

The **private keys** in the ECC are integers \(in the range of the curve's field size, typically **256-bit** integers\). Example of 256-bit ECC private key \(hex encoded, 32 bytes, 64 hex digits\) is: `0x51897b64e85c3f714bba707e867914295a1377a7463a9dae8ea6a8b914246319`.

The **key generation** in the ECC cryptography is as simple as securely generating a **random integer** in certain range, so it is extremely fast. Any number within the range is valid ECC private key.

The **public keys** in the ECC are **EC points** in the elliptic curve's finite field \(a pair of integer coordinates {**_x_**, **_y_**}\), but can be compressed to just one coordinate + 1 bit \(odd or even\). Thus the **compressed public key**, corresponding to a 256-bit ECC private key, is a **257-bit** integer. Example of ECC public key \(corresponding to the above private key, encoded in the Ethereum format, as hex with prefix `02` or `03`\) is: `0x02f54ba86dc1ccb5bed0224d23f01ed87e4a443c47fc690d7797a13d41d2340e1a`. In this format the public key actually takes 66 hex digits \(33 bytes\), which can be optimized to exactly 257 bits.

## Curves and Key Length

**ECC** crypto algorithms can use different underlying **elliptic curves**. Different curves provide different level of **security** \(cryptographic strength\), different **performance** \(speed\) and different **key length**, and also may involve different algorithms.

**ECC curves**, adopted in the popular cryptographic libraries and security standards, have **name** \(named curves, e.g. `secp256k1` or `curve25519`\), **field size** \(which defines the key length, e.g. **256-bit**\), security **strength** \(the fields size / 2\), **performance** \(operations/sec\) and many other parameters.

**ECC keys** have **length**, which directly depends on the underlying curve. In most applications \(like OpenSSL, OpenSSH and Bitcoin\) the default **key length** for the ECC private keys is **256 bits**, but depending on the curve many different ECC key sizes are possible: 192-bit \(curve `secp192r1`\), 233-bit \(curve `sect233k1`\), 224-bit \(curve `secp224k1`\), 256-bit \(curves `secp256k1` and `curve25519`\), 283-bit \(curve `sect283k1`\), 384-bit \(curves `p384` and `secp384r1`\), 409-bit \(curve `sect409r1`\), 414-bit \(curve `curve41417`\), 448-bit \(curve `Ed448-Goldilocks`\), 511-bit \(curve `M-511`\), 521-bit \(curve `p521`\), 571-bit \(curve `sect571k1`\) and many others.

## ECC Algorithms

**Elliptic-curve cryptography** provides several groups of algorithms, based on the math of the elliptic curves over finite fields:

* ECC **digital signature** algorithms: [**ECDSA**](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) \(for classical curves\) and [**EdDSA**](https://en.wikipedia.org/wiki/EdDSA) \(for twisted Edwards curves\)
* ECC **encryption** algorithms and hybrid encryption schemes: the [**ECIES**](https://en.wikipedia.org/wiki/Schnorr_signature) integrated encryption scheme and [**EEECC**](https://cse.unl.edu/~ssamal/crypto/EEECC.pdf) \(EC-based ElGamal\)
* ECC **key agreement** algorithms: [**ECDH**](https://en.wikipedia.org/wiki/Elliptic-curve_Diffie–Hellman), [**X25519**](https://cryptography.io/en/latest/hazmat/primitives/asymmetric/x25519/) and [**FHMQV**](https://fastd.readthedocs.io/en/v18/crypto/fhmqvc.html)

## Elliptic Curves

...

### Elliptic Curves over a Finite Fields

...

### Calculating Elliptic Curves over Finite Fields

...

### Multiplying a Point Over an Elliptic Curve

...

### Example: Multiply Points Over Elliptic Curves

...

### Elliptic Curves Multiplication in Python

...

### Public Key Compression in the Elliptic Key Cryptosystems

...

### Compressing a Public Key in Python

...

### ECC Domain Parameters and the "secp256k1" Curve

...

### Safe ECC Curves

Currently cryptography only supports NIST curves, none of which are considered “**safe**” by the SafeCurves project run by Daniel J. Bernstein and Tanja Lange: [https://safecurves.cr.yp.to](https://safecurves.cr.yp.to).

### Python Examples with the "secp256k1" Curve

...

