# Quantum-Safe Cryptography

Hashes \(like SHA256 / SHA3\), HMAC, bcrypt, Scrypt, Argon2 are basically quantum-safe \(only slightly affected by quantum computing\)

* Use 384-bits or more to be quantum-safe \(256-bits should be enough for long time\)

Symmetric ciphers \(like AES-256, Twofish-256\) are quantum-safe

* Use 256-bits or more as key length \(don't use 128-bit AES\)

RSA, DSA, ECDSA, EdDSA, DHKE, ECDH are quantum-broken!

* Use quantum-safe signatures \(e.g. lattice-based or hash-based\)

See https://en.wikipedia.org/wiki/Post-quantum\_cryptography



Quantum-Resistant Crypto Algorithms

...

## ECC Cryptography and Most Digital Signatures are Quantum Unsafe!

...

A **k**-bit number can be factored in time of order **O\(k^3\)** using a quantum computer of **5k+1 qubits** \(using Shor's algorithm\).

* See [http://www.theory.caltech.edu/~preskill/pubs/preskill-1996-networks.pdf](http://www.theory.caltech.edu/~preskill/pubs/preskill-1996-networks.pdf)

256-bit number \(e.g. Bitcoin public key\) can be factorized using 1281 qubits in 72\*256^3 quantum operations.

* ~ 1.2 billion operations == ~ less than 1 second using good machine

ECDSA, DSA, RSA, ElGamal cryptosystems are all quantum-broken

Conclusion: publishing the signed transactions \(like Ethereum does\) is not quantum safe -&gt; avoid revealing the ECC public key

## Hashes are Quantum Safe

Cryptographic hashes \(like SHA2 and SHA3\) are quantum-safe:

* On traditional computer, finding a collision takes √𝑁 steps \(due to the birthday paradox\) -&gt; SHA256 has 2^128 crypto-strength
* Quantum computers might find hash collisions in ∛𝑁 operations \(see [the BHT algorithm](https://arxiv.org/pdf/quant-ph/9705002.pdf)\), but this is disputed \(see \[Bernstein 2009\] - http://cr.yp.to/hash/collisioncost-20090823.pdf\)
* On theory it might take 2^85 quantum operations to find SHA256 / SHA3-256 collision, but in practice it will cost significantly more

Conclusion: SHA256 / SHA3-256 are most probably quantum-safe

* SHA384, SHA512 and SHA3-384, SHA3-512 are quantum-safe

...

## Symmetric Ciphers are Quantum Safe

...

Most symmetric ciphers \(like AES and ChaCha20\) are quantum-safe:

* [Grover's algorithm](https://en.wikipedia.org/wiki/Grover's_algorithm) finds AES secret key using √𝑁 quantum operations

* Quantum era will **double the key size** of the symmetric ciphers \(see http://cr.yp.to/codes/grovercode-20100303.pdf\)

AES-256 in the post-quantum era is like AES-128 before

* 128-bits or less symmetric ciphers are quantum-attackable

Conclusion: 256-bit symmetric ciphers are quantum safe

* AES-256, ChaCha20-256, Twofish-256, Camellia-256 are considered quantum-safe



## Post-Quantum Cryptography

...

Quantum-Safe key agreement: [https://en.wikipedia.org/wiki/CECPQ1](https://en.wikipedia.org/wiki/CECPQ1)

Post-quantum signatures and key agreements \(XMSS, McEliece, NewHope\):  
[https://github.com/randombit/botan](https://github.com/randombit/botan)

[https://tools.ietf.org/html/rfc8391](https://tools.ietf.org/html/rfc8391)

