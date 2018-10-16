# RSA or ECC? Which is Better?

It is disputable whether **ECC** or **RSA** is better, so we shall present their strong and weak sides.

## Advantages of ECC

* Smaller keys, ciphertexts and signatures.
* Very fast key generation.
* Fast signatures.
* Moderately fast encryption and decryption.

## Disadvantages of ECC

* Complicated and tricky to implement securely, particularly the standard curves.
* Standards aren't state-of-the-art, particularly ECDSA which is kind of a hack compared to Schnorr signatures.
* Signing with a broken random number generator compromises the key.

## Advantages of RSA

* Very fast, very simple encryption and verification.
* Easier to implement than ECC.
* Easier to understand.
* Signing and decryption are similar; encryption and verification are similar.

## Disadvantages of RSA

* Very slow key generation.
* Slow signing and decryption, which are slightly tricky to implement securely.
