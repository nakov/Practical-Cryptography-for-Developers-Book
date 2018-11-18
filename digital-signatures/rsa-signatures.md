# RSA Signatures: Sign and Verify

The **RSA** public-key cryptosystem provides a **digital signature scheme** \(sign + verify\), based on the math of the **modular exponentiations** and discrete logarithms and the computational difficulty of [**the RSA problem**](https://en.wikipedia.org/wiki/RSA_problem) \(and its related integer factorization problem\). The [**RSA sign / verify**](https://en.wikipedia.org/wiki/RSA_%28cryptosystem%29#Signing_messages) algorithm works as follows:

Suppose we have a **RSA key-pair**:

* public key {_**n**_, _**e**_}
* private key {_**n**_, _**d**_}

By definition we have $$(m^e)^d \equiv (m^d)^e \equiv m \pmod n$$ for all _**m**_ in the range \[0..._**n**_\)

## RSA Sign

**Signing** a message _**msg**_ with the private key exponent _**d**_:

1. Calculate the message hash: _**h**_ = hash\(_**msg**_\)
2. Encrypt _**h**_ to calculate the signature: $$s = h^d \pmod n$$

The hash _**h**_ should be in the range \[0..._**n**_\). The obtained **signature** _**s**_ is an integer in the range \[0..._**n**_\).

## RSA Verify Signature

**Verifying** a signature _**s**_ for the message _**msg**_ with the public key exponent _**e**_:

1. Calculate the message hash: _**h**_ = hash\(_**msg**_\)
2. Decrypt the signature: $$h' = s^e \pmod n$$
3. Compare _**h**_ with _**h'**_ to find whether the signature is valid or not

If the signature is correct, then the following will be true:
$$
h' = s^e \pmod n = (h^d)^e \pmod n = h
$$
The **RSA sign / verify algorithm** is pretty simple. Let's implement it with some code.

