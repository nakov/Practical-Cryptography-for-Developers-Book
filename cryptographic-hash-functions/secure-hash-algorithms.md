# Secure Hash Algorithms

In the past, many **cryptographic hash algorithms** were proposed and used by software developers. Some of them was **broken** \(like **MD5** and **SHA1**\), some are still considered secure \(like **SHA-2**, **SHA-3** and **BLAKE2**\). Let's review the most widely used cryptographic hash functions \(algorithms\).

## Secure Hash Functions

**Modern cryptographic hash algorithms** \(like **SHA-3** and **BLAKE2**\) are considered **secure** enough for most applications.

### SHA-2, SHA-256, SHA-512

[**SHA-2**](https://en.wikipedia.org/wiki/SHA-2) is a family of strong cryptographic hash functions: **SHA-256** \(256 bits hash\), **SHA-384** \(384 bits hash\), **SHA-512** \(512 bits hash\), etc. It is based on the cryptographic concept "[**Merkle–Damgård construction**](https://en.wikipedia.org/wiki/Merkle–Damgård_construction)" and is considered **highly secure**. SHA-2 is published as official crypto standard in the United States.

**SHA-2** is widely used by developers and in cryptography and is considered cryptographically strong enough for modern commercial applications.

**SHA-256** is widely used in the **Bitcoin** blockchain, e.g. for identifying the transaction hashes and for the proof-of-work mining performed by the miners.

Examples of SHA2 hashes:

```text
SHA-256('hello') = 2cf24dba5fb0a30e26e83b2ac5b9e29e1b161e5c1fa7425e73043362938b9824
SHA-384('hello') = 59e1748777448c69de6b800d7a33bbfb9ff1b463e44354c3553bcdb9c666fa90125a3c79f90397bdf5f6a13de828684f
SHA-512('hello') = 9b71d224bd62f3785d96d46ad3ea3d73319bfbc2890caadae2dff72519673ca72323c3d99ba5c11d7c7acc6e14b8c5da0c4663475c2e5c3adef46f73bcdec043
```

### More Hash Bits == Higher Collision Resistance

By design, **more bits at the hash output** are expected to achieve **stronger security** and higher collision resistance \(with some exceptions\). As general rule, 128-bit hash functions are weaker than 256-bit hash functions, which are weaker than 512-bit hash functions.

Thus, SHA-512 is stronger than SHA-256, so we can expect that for SHA-512 it is more unlikely to practically find a collision than for SHA-256.

### SHA-3, SHA3-256, SHA3-512, Keccak-256

[**SHA-3**](https://en.wikipedia.org/wiki/SHA-3) \(and its variants SHA3-224, SHA3-256, SHA3-384, SHA3-512\), is considered **more secure than SHA-2** \(SHA-224, SHA-256, SHA-384, SHA-512\) for the same hash length. For example, SHA3-256 provides **more cryptographic strength than SHA-256** for the same hash length \(256 bits\).

The **SHA-3** family of functions are representatives of the "**Keccak**" hashes family, which are based on the cryptographic concept "[**sponge construction**](https://en.wikipedia.org/wiki/Sponge_function)". Keccak is the winner of the [SHA-3 NIST competition](https://en.wikipedia.org/wiki/NIST_hash_function_competition#Finalists).

Unlike **SHA-2**, the **SHA-3** family of cryptographic hash functions are not vulnerable to the "[**length extension attack**](https://en.wikipedia.org/wiki/Length_extension_attack)".

**SHA-3** is considered **highly secure** and is published as official recommended crypto standard in the United States.

The hash function **Keccak-256**, which is used in the **Ethereum** blockchain, is a variant of SHA3-256 with some constants changed in the code.

The hash functions **SHAKE128\(msg, length\)** and **SHAKE256\(msg, length\)** are variants of the **SHA3-256** and **SHA3-512** algorithms, where the output message length can vary.

Examples of SHA3 hashes:

```text
SHA3-256('hello') = 3338be694f50c5f338814986cdf0686453a888b84f424d792af4b9202398f392
Keccak-256('hello') = 1c8aff950685c2ed4bc3174f3472287b56d9517b9c948127319a09a7a36deac8
SHA3-512('hello') = 75d527c368f2efe848ecf6b073a36767800805e9eef2b1857d5f984f036eb6df891d75f72d9b154518c1cd58835286d1da9a38deba3de98b5a53e5ed78a84976
SHAKE-128('hello', 256) = 4a361de3a0e980a55388df742e9b314bd69d918260d9247768d0221df5262380
SHAKE-256('hello', 160) = 1234075ae4a1e77316cf2d8000974581a343b9eb
```

### BLAKE2 / BLAKE2s / BLAKE2b

[**BLAKE**](https://en.wikipedia.org/wiki/BLAKE_%28hash_function\) / **BLAKE2** / **BLAKE2s** / **BLAKE2b** is a family of fast, highly secure cryptographic hash functions, providing calculation of 160-bit, 224-bit, 256-bit, 384-bit and 512-bit digest sizes, widely used in modern cryptography. BLAKE is one of the finalists at the [SHA-3 NIST competition](https://en.wikipedia.org/wiki/NIST_hash_function_competition#Finalists).

The **BLAKE2** function is an improved version of **BLAKE**.

**BLAKE2s** \(typically **256-bit**\) is BLAKE2 implementation, performance-optimized for 32-bit microprocessors.

**BLAKE2b** \(typically **512-bit**\) is BLAKE2 implementation, performance-optimized for 64-bit microprocessors.

The **BLAKE2** hash function has similar security strength like SHA-3, but is less used by developers than SHA2 and SHA3.

Examples of BLAKE hashes:

```text
BLAKE2s('hello') = 19213bacc58dee6dbde3ceb9a47cbb330b3d86f8cca8997eb00be456f140ca25
BLAKE2b('hello') = e4cfa39a3d37be31c59609e807970799caa68a19bfaa15135f165085e01d41a65ba1e1b146aeb6bd0092b49eac214c103ccfa3a365954bbbe52f74a2b3620c94
```

### RIPEMD-160

[**RIPEMD-160**](https://en.wikipedia.org/wiki/RIPEMD) is a secure hash function, widely used in cryptography, e.g. in PGP and Bitcoin.

The **160-bit** variant of **RIPEMD** is widely used in practice, while the other variations like RIPEMD-128, RIPEMD-256 and RIPEMD-320 are not popular and have disputable security strengths.

As recommendation, **prefer using SHA-2 and SHA-3** instead of RIPEMD, because they are more stronger than RIPEMD, due to higher bit length and less chance for collisions.

Examples of RIPEMD hashes:

```text
RIPEMD-160('hello') = 108f07b8382412612c048d07d13f814118445acd
RIPEMD-320('hello') = eb0cf45114c56a8421fbcb33430fa22e0cd607560a88bbe14ce70bdf59bf55b11a3906987c487992
```

All of the above popular secure hash functions \(SHA-2, SHA-3, BLAKE2, RIPEMD\) are not restricted by commercial patents and are **free for public use**.

## Insecure Hash Functions

**Old hash algorithms** like [**MD5**](https://en.wikipedia.org/wiki/MD5), [**SHA-0**](https://en.wikipedia.org/wiki/SHA-1#SHA-0) and [**SHA-1**](https://en.wikipedia.org/wiki/SHA-1) are considered **insecure** and were withdrawn due to **cryptographic weaknesses** \(collisions found\). **Don't use MD5**, **SHA-0** and **SHA-1**! All these hash functions are proven to be cryptographically **insecure**.

You can find in Internet that **SHA1 collisions** can be practically generated and this results in algorithms for creating **fake digital signatures**, demonstrated by two different signed PDF documents which hold different content, but have the same hash value and the same digital signature. See [https://shattered.io](https://shattered.io).

Avoid using of the following hash algorithms, which are considered **insecure** or have disputable security: [**MD2**](https://en.wikipedia.org/wiki/MD2_%28hash_function), [**MD4**](https://en.wikipedia.org/wiki/MD4), [**MD5**](https://en.wikipedia.org/wiki/MD5), [**SHA-0**](https://en.wikipedia.org/wiki/SHA-1#SHA-0), [**SHA-1**](https://en.wikipedia.org/wiki/SHA-1), [**Panama**](https://en.wikipedia.org/wiki/Panama_%28cryptography), [**HAVAL**](https://en.wikipedia.org/wiki/HAVAL) \(disputable security, collisions found for HAVAL-128\), [**Tiger**](https://en.wikipedia.org/wiki/Tiger_%28hash_function) \(disputable, weaknesses found\), [**SipHash**](https://en.wikipedia.org/wiki/SipHash) \(it is not a cryptographic hash function\).

### Other Secure Hash Functions

The below functions are popular strong cryptographic hash functions, alternatives to SHA-2, SHA-3 and BLAKE2:

* [**Whirlpool**](https://en.wikipedia.org/wiki/Whirlpool_%28hash_function) is secure cryptographic hash function, which produces 512-bit hashes.
* [**SM3**](https://tools.ietf.org/id/draft-oscca-cfrg-sm3-01.html) is the crypto hash function, officialy standartized by the **Chinese government**. It is similar to SHA-256 \(based on the Merkle–Damgård construction\) and produces 256-bit hashes.
* [**GOST**](https://en.wikipedia.org/wiki/GOST_%28hash_function%29) \(GOST R 34.11-94\) is secure cryptographic hash function, the Russian national standard, described in [RFC 4357](https://tools.ietf.org/html/rfc4357). It produces 256-bit hashes.

The below functions are less popular alternatives to SHA-2, SHA-3 and BLAKE, finalists at the [SHA-3 NIST competition](https://en.wikipedia.org/wiki/NIST_hash_function_competition#Finalists):

* [**Skein**](https://en.wikipedia.org/wiki/Skein_%28hash_function) is secure cryptographic hash function, capable to derive 128, 160, 224, 256, 384, 512 and 1024-bit hashes.
* [**Grøstl**](https://en.wikipedia.org/wiki/Grøstl) is secure cryptographic hash function, capable to derive 224, 256, 384 and 512-bit hashes.
* [**JH**](https://en.wikipedia.org/wiki/JH_%28hash_function) is secure cryptographic hash function, capable to derive 224, 256, 384 and 512-bit hashes.

### No Collisions for SHA-256, SHA3-256, BLAKE2s and RIPEMD-160 are Known

As of Oct 2018, **no collisions are known** for: **SHA256**, **SHA3-256**, **Keccak-256**, **BLAKE2s**, **RIPEMD160** and few others.

**Brute forcing** to find hash function collision as general costs: 2128 for SHA256 / SHA3-256 and 280 for RIPEMD160.

Respectively, on a powerful enough **quantum computer**, it will cost less time: 2256/3 and 2160/3 respectively. Still \(as of September 2018\) so powerful quantum computers are not known to exist.

Learn more about cryptographic hash functions, their strength and **attack resistance** at: [https://z.cash/technology/history-of-hash-function-attacks.html](https://z.cash/technology/history-of-hash-function-attacks.html)

