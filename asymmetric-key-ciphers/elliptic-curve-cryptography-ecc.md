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

**Elliptic-curve cryptography** (ECC) provides several groups of algorithms, based on the math of the elliptic curves over finite fields:

* ECC **digital signature** algorithms like [**ECDSA**](https://en.wikipedia.org/wiki/Elliptic_Curve_Digital_Signature_Algorithm) \(for classical curves\) and [**EdDSA**](https://en.wikipedia.org/wiki/EdDSA) \(for twisted Edwards curves\).
* ECC **encryption** algorithms and hybrid encryption schemes like the [**ECIES**](https://en.wikipedia.org/wiki/Integrated_Encryption_Scheme) integrated encryption scheme and [**EEECC**](https://cse.unl.edu/~ssamal/crypto/EEECC.pdf) \(EC-based ElGamal\).
* ECC **key agreement** algorithms like [**ECDH**](https://en.wikipedia.org/wiki/Elliptic-curve_Diffie–Hellman), [**X25519**](https://cryptography.io/en/latest/hazmat/primitives/asymmetric/x25519/) and [**FHMQV**](https://fastd.readthedocs.io/en/v18/crypto/fhmqvc.html).

All these algorithms use a **curve** behind (like `secp256k1`, `curve25519` or `p521`) for the calculations and rely of the difficulty of the **ECDLP** (elliptic curve discrete logarithm problem). All these algorithms use public / private key pairs, where the **private key** is an integer and the **public key** is a point on the elliptic curve (EC point). Let's get into details about the elliptic curves over finite fields.

## Elliptic Curves (in Math)

In mathematics **elliptic curves** are plane algebraic curves, consisting of all points {**_x_**, **_y_**}, described by the equation:
 - x<sup>2</sup> = y<sup>3</sup> + **_a_**x + **_b_**

For example, the [NIST curve `secp256k1`](https://en.bitcoin.it/wiki/Secp256k1) (used in Bitcoin) is based on an elliptic curve in the form:
 - x<sup>2</sup> = y<sup>3</sup> + **_7_** (the general elliptic curve equation, where **_a_** = **0** and **_b_** = **7**)

This is a visualization of the above elliptic curve:

![](/assets/bitcoin-elliptic-curve.png)

To learn more about the equations of the elliptic curves and how they look like, play a bit with this **online elliptic curve visualization tool**: https://www.desmos.com/calculator/ialhd71we3.

![](/assets/ecc-visualization-tool.png)

### Elliptic Curves over Finite Fields (in Cryptography)

The **elliptic curve cryptography (ECC)** uses **elliptic curves over the [finite field](https://en.wikipedia.org/wiki/Finite_field) 𝔽<sub>p</sub>** (where **_p_** is prime and **_p_** > 3). This means that the field is a **square matrix** of size **_p_** x **_p_** and the points on the curve are limited to **integer coordinates** within the field only. All algebraic operations within the field (like point addition and multiplication) result in another point within the field. The elliptic curve equation over the finite field **𝔽<sub>p</sub>** takes the following modular form:
 - x<sup>2</sup> ≡ y<sup>3</sup> + **_a_**x + **_b_** (mod **_p_**)

Respectively, the "Bitcoin curve" `secp256k1` takes the form:
- x<sup>2</sup> ≡ y<sup>3</sup> + **_7_** (mod **_p_**)

Unlike **RSA**, which uses for its key space the **integers** in the range [0...**_p_**-1] (the field ℤ<sub>p</sub>), the **ECC** uses the **points** {**_x_**, **_y_**} within the Galois field **𝔽<sub>p</sub>** (where **_x_** and **_y_** are integers in the range [0...**_p_**-1]).

An elliptic curve over the finite field **𝔽<sub>p</sub>** consists of:
 - a set of integer coordinates {**_x_**, **_y_**}, such that **0** ≤ **_x_**, **_y_** < **_p_**
 - staying on the elliptic curve: **_y_**<sup>2</sup> ≡ x<sup>3</sup> + **_a_**x + **_b_** (mod **p**)

**Example** of elliptic curve over the finite field **𝔽<sub>17</sub>**:
 - y<sup>2</sup> ≡ x<sup>3</sup> + **7** (mod **17**)

This elliptic curve over **𝔽<sub>17</sub>** looks like this:

![](/assets/elliptic-curve-over-f17-example.png)

Note that the elliptic curve over finite field y<sup>2</sup> ≡ x<sup>3</sup> + **7** (mod **17**) consists of the blue points in the above figure, i.e. in practice it is a "_set of points_" is not "_curve_".

### Elliptic Curves over Finite Fields: Calculations

It is pretty easy to calculate whether **certain point belongs to certain elliptic curve** over a finite field. For example, a point {**_x_**, **_y_**} belongs to the curve y<sup>2</sup> ≡ x<sup>3</sup> + **7** (mod **17**) when and only when:
 - x<sup>3</sup> + **7** - y<sup>2</sup> ≡ 0 (mod **17**)

The point {**5**, **8**} **belongs** to the curve, because `(5**3 + 7 - 8**2) % 17 == 0`. The point {**9**, **15**} **does not belong** to the curve, because `(9**3 + 7 - 15**2) % 17 != 0`. These calculations are in Python style. The above mentioned elliptic curve and the points {**5**, **8**} and {**9**, **15**} are visualized below:

![](/assets/points-on-elliptic-curve-over-finite-field.png)

### Multiplying a Point over an Elliptic Curve

A point **G** over an elliptic curve in finite field can be multiplied by an integer **k**:
 - **P** = **k** \* **G**
 
The result from the multiplication is another point **P**, staying on the same curve. More details are not so valuable for developers, so just assume that **EC point can be multiplied by an integer** and this operation is **fast** and the result is another EC point on the same curve. Everyone is free to [read more about EC point multiplication](https://en.wikipedia.org/wiki/Elliptic_curve_point_multiplication).

In **ECC**, when we multiply a fixed EC point **G** (called the **generator** point) by certain **integer k** (**private key**), we obtain EC point **P** (its corresponding **public key**).

Consequently, in ECC we have:
 - **k** == **private key** (integer)
 - **P** == **public key** (point)
 - **G** == **generator point** (fixed constant, a starting point on the EC)
 
It is very **fast** to calculate **P** = **k** \* **G**, using the well-known [ECC multiplication algorithms](https://en.wikipedia.org/wiki/Elliptic_curve_point_multiplication) in time _log_<sub>2</sub>(**_k_**), e.g. the "[double-and-add algorithm](https://en.wikipedia.org/wiki/Elliptic_curve_point_multiplication#Double-and-add)".

It is **extremely slow** (considered infeasible) to calculate **k** = **P** / **G**.

This asymmetry (fast multiplication and unfeasible slow opposite operation) is the basis of the security behind the ECC cryptography, also known as the ECDLP problem.

### Elliptic-Curve Discrete Logarithm Problem (ECDLP)

The **Elliptic Curve Discrete Logarithm Problem (DLP)** in computer science is defined as follows:

 - By given elliptic curve over finite field **𝔽<sub>p</sub>** and generator point **_G_** on the curve and point **_P_**  on the curve, find the integer **_k_** (if it exists), such that **_P_** = **_k_** \* **_G_**
 
The **multiplication** of elliptic curve points in the group **𝔽<sub>p</sub>** is similar to **exponentiation** of integers in the group **ℤ<sub>p</sub>** and this is how the **ECDLP problem** is similar to the [**DLP problem**](../key-exchange/diffie-hellman-key-exchange.md#discrete-logarithm-problem-dlp) (discrete logarithm problem).

In cryptography, many algorithms rely on the **computational difficulty of the ECDLP problem**, for which **no efficient algorithm exists**.

Because the fastest known algorithm to solve the ECDLP for key of size **_p_** (EC field size **_p_** \* **_p_**) needs $$\sqrt{p}$$ steps, this means that to achieve a **_p_**-bit **security strength**, a **_2\*p_**-bit curve is needed. Thus **256-bit EC curves** provide **128-bit security strength**.

For example, the `secp256k1` (**_p_** = 256) curve provides 128-bit security, while the `curve448` (**_p_** = 448) provides 224-bit security.

### Example: Multiply Points Over Elliptic Curves

...

### Elliptic Curves over Fp Multiplication in Python

...

### Public Key Compression in the Elliptic Key Cryptosystems

...

### Compressing a Public Key in Python

...

### ECC Domain Parameters and the "secp256k1" Curve

In cryptography, elliptic curves over **_Fp_** are used, where the modulus **_p_** is very large prime, e.g. 256-bit number. The field of the curve is of size **p** x **p**, which is incredibly large.

...

### Safe ECC Curves

Currently cryptography only supports NIST curves, none of which are considered “**safe**” by the SafeCurves project run by Daniel J. Bernstein and Tanja Lange: [https://safecurves.cr.yp.to](https://safecurves.cr.yp.to).

### Python Examples with the "secp256k1" Curve

...

