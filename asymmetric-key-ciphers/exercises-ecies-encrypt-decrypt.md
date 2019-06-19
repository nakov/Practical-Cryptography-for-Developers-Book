# Exercises: ECIES Encrypt / Decrypt

Write a program to **encrypt** / **decrypt** a **message** by public / private key using [**ECIES**](https://en.wikipedia.org/wiki/Integrated_Encryption_Scheme) \(Elliptic Curve Integrated Encryption Scheme\). The **encryption** will require an EC **public key** and **decryption** will require the corresponding EC **private key**. Internally, use ECC cryptography based on a **256-bit elliptic curve** by choice \(e.g. `brainpoolP256t1`\) and **symmetric encryption** by choice \(e.g. AES-256-CTR + MAC, AES-128-GCM or ChaCha20-Poly1305\), along with **key-derivation function** by choice \(e.g. PBKDF2\).

You are free to choose between writing your **own ECIES implementation**, following the [SECG-SEC-1](http://www.secg.org/sec1-v2.pdf) standard or use a **standard ECIES library** for your language, e.g.

* Python: [https://pypi.org/project/eciespy](https://pypi.org/project/eciespy/)
* JavaScript: [https://github.com/bitchan/eccrypto](https://github.com/bitchan/eccrypto)
* C\#: [https://github.com/VirgilSecurity/virgil-sdk-crypto-net](https://github.com/VirgilSecurity/virgil-sdk-crypto-net)
* Java: [https://github.com/Arryboom/smartbox-ecies-java](https://github.com/Arryboom/smartbox-ecies-java)
* C, C++, PHP, Perl: [https://github.com/jedisct1/libsodium](https://github.com/jedisct1/libsodium)

## ECIES Encryption

Write a program to **encrypt a message** using the **ECIES** hybrid encryption scheme and a **256-bit ECC public key** \(2 \* 256 bits\).

* The **input** consists of the **public key in hex** \(at the first line, uncompressed, 128 hex digits\) + **plaintext message** for encryption \(at the second line\).
* The **output** is the **hex-encoded encrypted message**. It may hold the ECC ciphertext public key + the ciphertext + MAC code + the symmetric key algorithm parameters, but this depends very much on the underlying algorithms and implementation.

**Sample input:**

```text
552e2b308514b38e4989d71ed263e0af6376f65ba81a94ebb74f6fadc223ee80aa8fb710cfb445e0871cd1c1a0c1f2adb2b6eedc2a0470b04244548c5be518c8
Sample text for ECIES encryption.
```

**Sample output:**

It will be different for each program execution due to the randomness in the encryption scheme:

```text
0442e2fba3fddba1ba9207f3276e141809782dc72529523aa1fcf35b15c4c22a9333ddacd7d64de4abd0a36138d430c50be7a98d5512cb8c2fe36ca45a0bbd7927c150ae3637c45093207531ce75e3841d4808ced85e82305d8da891708c20479388f6d4a7cde213bb36bf860c5df0077358a942eeb9a4c23e89bcc11f11
```

## ECIES Decryption

Write a program to **decrypt an encrypted message** created by the program from the previous example, using the **ECIES** hybrid encryption scheme and a **256-bit ECC private key**.

* The **input** consists of the **private key in hex** \(at the first line, 64 hex digits\) + **encrypted message** for decryption \(at the second line\).
* The **output** is the **decrypted plaintext message**. In case or **decryption problem** \(e.g. incorrect decryption key or broken encrypted message\), display `Error: cannot decrypt the message`.

**Sample input:**

```text
27f07d3251dee39ec2c5ff800641f4d839e6f8065033e9a710ea2e519473bdd7
0442e2fba3fddba1ba9207f3276e141809782dc72529523aa1fcf35b15c4c22a9333ddacd7d64de4abd0a36138d430c50be7a98d5512cb8c2fe36ca45a0bbd7927c150ae3637c45093207531ce75e3841d4808ced85e82305d8da891708c20479388f6d4a7cde213bb36bf860c5df0077358a942eeb9a4c23e89bcc11f11
```

**Sample output:**

```text
Sample text for ECIES encryption.
```

**Sample input:**

This example holds an incorrect decryption private key:

```text
9ab686c269b2c58f0fca699dde09cf24e23353e56bd60095d681b23709cb0dc3
0442e2fba3fddba1ba9207f3276e141809782dc72529523aa1fcf35b15c4c22a9333ddacd7d64de4abd0a36138d430c50be7a98d5512cb8c2fe36ca45a0bbd7927c150ae3637c45093207531ce75e3841d4808ced85e82305d8da891708c20479388f6d4a7cde213bb36bf860c5df0077358a942eeb9a4c23e89bcc11f11
```

**Sample output:**

```text
Error: cannot decrypt the message
```

