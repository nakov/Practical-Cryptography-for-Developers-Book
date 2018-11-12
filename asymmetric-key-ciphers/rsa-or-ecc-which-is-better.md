# RSA or ECC? Which is Better?

It is disputable whether **ECC** or **RSA** is better in the space of the **public-key cryptosystems**, so we shall present their strong and weak sides. Both cryptosystems \(RSA and elliptic-curve cryptography\) work with private and public keys and provide similar capabilities like key generation, digital signatures, key agreement schemes and encryption schemes.

Generally, it is considered that **ECC is the modern and the more preferable public-key cryptosystem** because of smaller keys, shorter signatures and better performance, but some people disagree. Today both cryptosystems are widely used. For example \(as of Nov 2018\) Facebook and Google protect their primary Web sites with 256-bit ECC private keys, while Amazon and Apple protect their primary Web sites with 2048-bit RSA private keys.

## Advantages of ECC

The **Elliptic-curve cryptography \(ECC\)** has the following advantages over RSA:

* **Smaller keys, ciphertexts and signatures**. Typically for 128-bit encryption, a 256-bit EC private key is used. Signatures typically consist of 2 times the private key-length or longer \(depends on the encoding scheme\). By contract, in RSA for 128-bit security, a 3072-bit private key is needed. Ciphertext length has typically the same length as the unencrypted plain-text.
* **Very fast key generation**. In the ECC cryptosystems, key generation consists of random number generation + EC point multiplication and is extremely fast, even for the most heavy curves used in practice. By contrast, in RSA key generation may be slow, especially for long keys \(e.g. 4096-bit and longer keys\), due to prime number generation process.
* **Fast signatures**. Signing messages and verifying ECC signatures is very fast: just few EC point calculations.
* **Fast key agreement**. Key agreement \(ECDH\) is as simple as multiplying an EC point by an integer and is very fast.
* **Fast encryption and decryption**. In fact the encryption is as fast as the underlying symmetric key encryption \(due to the ECIES encryption scheme\) + the little slow-down from the ECDH key agreement.

## Disadvantages of ECC

The **Elliptic-curve cryptography \(ECC\)** has some disadvantages:

* ECC is a **more complicated** and tricky to implement securely than RSA. This is not necessarily a problem is you use proven cryptographic libraries from trusted vendors. 
* Signing with a **broken random number generator** compromises the signer's private key. Signing two times with the same random number directly reveals signer's private key. Some signature schemes avoid randomness and has no such potential problem \(e.g. deterministic ECDSA\).
* Not all **standardised curves** are considered secure. You should know how to select a strong curve for your ECC calculations.

## Advantages of RSA

The RSA cryptosystem has the following advantages:

* RSA is **easier to implement** than ECC.
* RSA is **easier to understand** than ECC.
* Very fast and simple encryption and signature algorithms.
* Signing and decryption are similar; encryption and verification are similar.
* Some cryptographers believe that **RSA with very large keys** \(e.g. 16384 bits\) is generally stronger than ECC.

## Disadvantages of RSA

The RSA cryptosystem has the following disadvantages:

* In the RSA cryptosystem **key generation is very slow** \(especially for large key-length\). It may take a **few minutes** on a modern laptop to generate a 16384-bit RSA key-pair!
* In the RSA cryptosystem **signing** and **decryption** are slow \(for big private keys\), which are slightly tricky to implement securely. Typically, in the RSA cryptosystem the public exponent is small \(e.g. 65537 or 3\), so the calculations to encrypt a message or verify a signature are fast. In the same time, the private exponent is typically large \(e.g. 4096-bit integer\), so the calculations to sign or decrypt a message are slow.
* RSA produces **large signatures** \(of the same length, like the private key\). This is unacceptable for many systems, which keep a lot of signatures, e.g. public blockchains.



