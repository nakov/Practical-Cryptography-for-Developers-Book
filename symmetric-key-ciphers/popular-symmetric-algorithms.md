# Popular Symmetric Algorithms

Symmetric key encryption algorithms \(like **AES**\) are designed by mathematicians and cryptographers with the idea, that it should be **infeasible to decrypt the ciphertext** without having the encryption key. This is true for the modern **secure symmetric encryption algorithms** \(like AES and ChaCha20\) and may be disputable or false for others, which are considered **insecure symmetric encryption algorithms** \(like DES and RC4\).

Some popular symmetric encryption algorithms are: **AES**, **ChaCha20**, **CAST**, **Twofish**, **IDEA**, **Serpent**, **RC5**, **RC6**, **Camellia** and **ARIA**. All these algorithms are considered **secure** \(when configured and used correctly\).

## AES \(**Rijndael\)**

[**AES**](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard) \(**A**dvanced **E**ncryption **S**tandard, also known as **Rijndael**\) is the most popular and widely used **symmetric encryption algorithm** in the modern IT industry. This is because AES is proven to be **highly secure**, fast and well standardised and very well supported on virtually all platforms. AES is 128-bit **block cipher** and uses 128, 192 or 256-bit secret keys. It is usually used in a **block mode** like **AES-CTR** or **AES-GCM** to process streaming data. In the most block modes AES require also a random 128-bit initial vector \(IV, nonce\).

**Rijndael** was the winner in the [AES competition organized by NIST](https://en.wikipedia.org/wiki/Advanced_Encryption_Standard_process) \(1997-2000\) and it was announced officially under the name "**AES**" \(the next official symmetric block cipher after DES\). In 2001 AES was adopted as official recommendation by the **US government** and no significant weakness or attack was found since this moment.

The Rijndael \(AES\) algorithm is **free for any use**: public or private, commercial or non-commercial.

## **Salsa20 / ChaCha20**

[**Salsa20**](https://en.wikipedia.org/wiki/Salsa20), along with its improved variants **ChaCha** \(**ChaCha8**, **ChaCha12**, **ChaCha20**\) and **XSalsa20,** are a family of modern, fast, **symmetric stream ciphers**, designed by the distinguished cryptographer [Daniel Bernstein](https://en.wikipedia.org/wiki/Daniel_J._Bernstein). The **Salsa20** cipher was one of the finalists in the [eSTREAM contest](https://en.wikipedia.org/wiki/ESTREAM) for designing of new symmetric stream ciphers \(2004-2008\) and was widely adopted afterwards, together with the related **BLAKE** hash function. **Salsa20** and its variants are **royalty-free**, not patented.

The **Salsa20** cipher takes as input a **128-bit** or **256-bit symmetric secret key** + randomly generated **64-bit nonce** \(initial vector\) and a stream of data of unlimited length and produces as output an encrypted stream of data with the same length as the input stream. The Salsa20 cipher is typically used as authenticated encryption construction: [**ChaCha20-Poly1305**](https://tools.ietf.org/html/rfc7539).

## Other Popular Symmetric Ciphers

Other **modern secure symmetric ciphers**, used more rarely than EAS and ChaCha20, but still popular in the software developer and information security communities, are the following:

* [**Serpent**](https://en.wikipedia.org/wiki/Serpent_%28cipher%29) - secure symmetric-key block cipher \(key size: 128, 192 or 256 bits\), public domain, not patented
* [**Twofish**](https://en.wikipedia.org/wiki/Twofish) - secure symmetric-key block cipher \(key sizes: 128, 192 or 256 bits\), royalty-free, not patented
* [**Camellia**](https://en.wikipedia.org/wiki/Camellia_%28cipher%29) - secure symmetric key block cipher \(block size: 128 bits; key sizes: 128, 192 and 256 bits\), patented, but free for non-commercial use
* [**RC5**](https://en.wikipedia.org/wiki/RC5) - secure symmetric-key block cipher \(key size: 128 to 2040 bits; block size: 32, 64 or 128 bits; rounds: 1 ... 255\), insecure with short keys \(56-bit key successfully brute-forced\), was patented until 2015, now royalty-free
* [**RC6**](https://en.wikipedia.org/wiki/RC6) - secure symmetric-key block cipher, similar to RC5, but more complicated \(key size: 128 to 2040 bits; block size: 32, 64 or 128 bits; rounds: 1 ... 255\), was patented until 2017, now royalty-free
* [**IDEA**](https://en.wikipedia.org/wiki/International_Data_Encryption_Algorithm) - secure symmetric-key block cipher \(key size: 128 bits\), was patented until 2012, now royalty-free
* [**CAST**](https://en.wikipedia.org/wiki/CAST-256) \([CAST-128 / CAST5](https://en.wikipedia.org/wiki/CAST-128), [CAST-256 / CAST6](https://en.wikipedia.org/wiki/CAST-128)\) - family of secure symmetric-key block ciphers \(key sizes: 40 ... 256 bits\), royalty-free basis for commercial and non-commercial use
* [**ARIA**](https://en.wikipedia.org/wiki/ARIA_%28cipher%29) - secure symmetric-key block cipher, similar to AES \(key size: 128, 192 or 256 bits\), official standard in South Korea, free for public use
* [**SM4**](https://en.wikipedia.org/wiki/SM4_%28cipher%29) - secure symmetric-key block cipher, similar to AES \(key size: 128 bits\), official standard in China, free for public use

## Insecure Symmetric Algorithms

Some other symmetric encryption algorithms were popular in the past, but are now considered **insecure \(broken algorithms\)** or having **disputable security** and are **not recommended** to be used any more:

* [**DES**](https://en.wikipedia.org/wiki/Data_Encryption_Standard) - 56-bit key size, practically broken, can be brute-forced
* [**3DES**](https://en.wikipedia.org/wiki/Triple_DES) \(Triple DES\) - 64-bit cipher, considered broken
* [**RC2**](https://en.wikipedia.org/wiki/RC2) - 64-bit cipher, considered broken
* [**RC4**](https://en.wikipedia.org/wiki/RC4) - stream cipher, broken, practical attacks demonstrated
* [**Blowfish**](https://en.wikipedia.org/wiki/Blowfish_%28cipher%29) - old 64-bit cipher, broken, practical attacks demonstrated
* [**GOST**](https://en.wikipedia.org/wiki/GOST_%28block_cipher%29) - Russian 64-bit block cipher, disputable security, considered risky

## Symmetric Encryption Schemes / Constructions

In addition to the above mentioned symmetric key ciphers, cryptographers have proposed many **symmetric encryption schemes** \(constructions\), like the most popular authenticated encryption \(AEAD\) schemes:

* [**ChaCha20-Poly1305**](https://tools.ietf.org/html/rfc7539)
  * The **ChaCha20** stream cipher with integrated **Poly1305** authenticator \(integrated authenticated AEAD encryption\)
  * Requires a **256-bit key** and random **96-bit nonce**
  * Extremely **high performance**
  * Implemented by the most modern crypto-libraries
* [**AES-256-GCM**](https://tools.ietf.org/html/rfc5288)
  * **AES-GCM** is the AES \(Rijndael\) block cipher in GCM block mode \(integrated authenticated AEAD encryption\), behaves like a stream cipher
  * Required **256-bit key** and random **128-bit nonce** \(initial vector\)
  * Implemented by the most modern crypto libraries

Most applications today should **prefer some of the above encryption schemes** for symmetric encryption, instead of constructing their own encryption scheme. The above schemes are highly-secure, proven, well tested and come out-of-the box from the crypto libraries.

Note that **ChaCha20-Poly1305** is high-performance cipher \([3 times faster](https://www.imperialviolet.org/2014/02/27/tlssymmetriccrypto.html) than AES-128-GCM on mobile devices\), so it is **recommended** to be used instead of AES-GCM.

