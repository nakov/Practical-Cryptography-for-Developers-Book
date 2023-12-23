# ECDH Key Exchange

The [**ECDH**](https://en.wikipedia.org/wiki/Elliptic-curve\_Diffie%E2%80%93Hellman) (Elliptic Curve Diffie–Hellman Key Exchange) is **anonymous key agreement scheme**, which allows two parties, each having an elliptic-curve public–private key pair, to establish a **shared secret** over an insecure channel. **ECDH** is very similar to the classical **DHKE** (Diffie–Hellman Key Exchange) algorithm, but it uses **ECC point multiplication** instead of **modular exponentiations**. ECDH is based on the following property of EC points:

* (_**a**_ \* **G**) \* _**b**_ = (_**b**_ \* **G**) \* _**a**_

If we have two **secret numbers** _**a**_ and _**b**_ (two **private keys**, belonging to Alice and Bob) and an ECC elliptic curve with generator point **G**, we can exchange over an insecure channel the values (_**a**_ \* **G**) and (_**b**_ \* **G**) (the **public keys** of Alice and Bob) and then we can derive a shared secret: _**secret**_ = (_**a**_ \* **G**) \* _**b**_ = (_**b**_ \* **G**) \* _**a**_. Pretty simple. The above equation takes the following form:

* alicePubKey \* bobPrivKey = bobPubKey \* alicePrivKey = _**secret**_

The **ECDH** algorithm (Elliptic Curve Diffie–Hellman Key Exchange) is trivial:

1. **Alice** generates a **random** ECC key pair: {**alicePrivKey**, **alicePubKey** = alicePrivKey \* G}
2. **Bob** generates a **random** ECC key pair: {**bobPrivKey**, **bobPubKey** = bobPrivKey \* G}
3. Alice and Bob **exchange their public keys** through the insecure channel (e.g. over Internet)
4. **Alice** calculates **sharedKey** = bobPubKey \* alicePrivKey
5. **Bob** calculates **sharedKey** = alicePubKey \* bobPrivKey
6. Now both **Alice** and **Bob** have the same **sharedKey** == bobPubKey \* alicePrivKey == alicePubKey \* bobPrivKey

In the next section, we shall implement the ECDH algorithm and demonstrate it with code example.
