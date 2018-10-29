# ECC-Based Encryption / Decryption

Assume we have a ECC **private-public key pair**. Asymmetric encryption says, that if we **encrypt data by ECC private key**, we will be able to **decrypt** the ciphertext later by the corresponding **public key**:

![](/assets/asymmetric-encryption-diagram.png)

The above process can be directly applied for the **RSA** cryptosystem, but not for **ECC**. The elliptic curve cryptography \(ECC\) **does not directly provide encryption** method. Instead, we can use the **ECDH** \(Elliptic Curve Diffie–Hellman\) key exchange scheme to derive a **shared secret key** for symmetric data encryption and decryption. Let's get into details how to do this.

Assume we have a **cryptographic elliptic curve** over finite field, along with its generator point **G**. We can use the following two functions to calculate a **shared a secret key** for **encryption** and **decryption**:

* **calculateEncryptionKey**\(pubKey\) --&gt; \(sharedECCKey, ciphertextPubKey\)
  1. Generate **ciphertextPrivKey** = _new random private key_.
  2. Calculate **ciphertextPubKey** = ciphertextPrivKey \* G.
  3. Calculate the ECDH shared secret: **sharedECCKey** = pubKey \* ciphertextPrivKey.
  4. Return both the **sharedECCKey** + **ciphertextPubKey**. Use the **sharedECCKey** for symmetric encryption. Use the randomly generated **ciphertextPubKey** to calculate the decryption key.
* **calculateDecryptionKey**\(privKey, ciphertextPubKey\) --&gt; sharedECCKey
  1. Calculate the the ECDH shared secret: **sharedECCKey** = ciphertextPubKey \* privKey.
  2. Return the **sharedECCKey** and use it for the decryption.

The above calculations use the same math, like the **ECDH** algorithm. EC points have the following property:

* \(_**a**_ \* **G**\) \* _**b**_ = \(_**b**_ \* **G**\) \* _**a**_

Now, assume that _**a**_ = privKey, _**a**_ \* **G **= pubKey, _**b**_ = ciphertextPrivKey, _**b**_ \* **G** = ciphertextPubKey.

The above equation takes the following form:

* pubKey \* ciphertextPrivKey = ciphertextPubKey \* privKey = **sharedECCKey**

This is what exactly the above two functions calculate.



