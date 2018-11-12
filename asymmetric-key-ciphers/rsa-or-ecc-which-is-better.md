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

The **Elliptic-curve cryptography \(ECC\)** has some disadvantages, as well:

* ECC is a **more complicated** and tricky to implement securely than RSA. This is not necessarily a problem is you use proven cryptographic libraries from trusted vendors. 
* Signing with a **broken random number generator** compromises the signer's private key. Some signature schemes avoid randomness and has no such potential problem \(e.g. deterministic ECDSA\).
* **ECC standards** aren't state-of-the-art, particularly ECDSA which is kind of a hack, compared to Schnorr signatures. Not all standardised curves are considered secure. You should use a strong curve.

## Advantages of RSA

* Very fast, very simple encryption and verification.
* Easier to implement than ECC.
* Easier to understand.
* Signing and decryption are similar; encryption and verification are similar.

## Disadvantages of RSA

* Very slow key generation.
* Slow signing and decryption, which are slightly tricky to implement securely.



