# The RSA Cryptosystem - Concepts

The [**RSA cryptosystem**](https://en.wikipedia.org/wiki/RSA_%28cryptosystem%29) is one of the first **public-key cryptosystems**, based on the math of the [**modular exponentiations**](https://en.wikipedia.org/wiki/Modular_exponentiation) and the computational difficulty of the [**RSA problem**](https://en.wikipedia.org/wiki/RSA_problem) and the closely related [**integer factorization problem** \(**IFP**\)](https://en.wikipedia.org/wiki/Integer_factorization). The RSA algorithm is named after the initial letters of its authors \(**R**ivest–**S**hamir–**A**dleman\) and is widely used in the early ages of computer cryptography.

Later, when **ECC** cryptography evolved, the **ECC** slowly became dominant in the asymmetric cryptosystems, because of its higher security and shorter key lengths than **RSA**.

The **RSA** algorithm provides:

* **Key-pair generation**: generate random **private key** \(typically of size 1024-4096 bits\) and corresponding **public key**.
* **Encryption**: **encrypt** a secret message \(integer in the range \[0...key\_length\]\) using the public key and **decrypt** it back using the secret key.
* **Digital signatures**: **sign** messages \(using the private key\) and **verify** message signature \(using the public key\).
* **Key exchange**: securely transport a secret key, used for encrypted communication later.

RSA can work with keys of different **keys of length**: 1024, 2048, 3072, 4096, 8129, 16384 or even more bits. Key length of 3072-bits and above are considered **secure**. Longer keys provide higher security but consume **more computing time**, so there is a tradeoff between security and speed. Very long RSA keys \(e.g. 50000 bits or 65536 bits\) may be **too slow for practical use**, e.g. key generation may take from several minutes to several hours.

## RSA Key Generation

Generating an RSA public + private key pair involves the following:

Using some non-trivial [math computations from the number theory](https://en.wikipedia.org/wiki/RSA_%28cryptosystem%29#Key_generation), find three very large integers _**e**_, _**d**_ and _**n**_, such that:

* \(_**me**_\)_**d**_ ≡ _**m**_ \(mod _**n**_\) for all _**m**_ in the range \[0..._**n**_\)

The integer number _**n**_ is called "**modulus**" and it defines the RSA **key length**. It is typically very large prime number \(e.g. 2048 bits\).

The pair {_**n**_, _**e**_} is the _**public key**_. It is designed to be shared with everyone. The number _**e**_ is called "_**public key exponent**_". It is usually **65537** \(0x010001\).

The pair {_**n**_, _**d**_} is the _**private key**_. It is designed to be kept in secret. It is practically infeasible to calculate the private key from the public key {_**n**_, _**e**_}. The number _**d**_ is called "_**private key exponent**_" \(the secret exponent\).

## RSA Public Key - Example

Example of 2048-bit **RSA public key** \(represented as 2048-bit hexadecimal integer modulus _**n**_ and 24-bit public exponent _**e**_\):

```text
n = 0xa709e2f84ac0e21eb0caa018cf7f697f774e96f8115fc2359e9cf60b1dd8d4048d974cdf8422bef6be3c162b04b916f7ea2133f0e3e4e0eee164859bd9c1e0ef0357c142f4f633b4add4aab86c8f8895cd33fbf4e024d9a3ad6be6267570b4a72d2c34354e0139e74ada665a16a2611490debb8e131a6cffc7ef25e74240803dd71a4fcd953c988111b0aa9bbc4c57024fc5e8c4462ad9049c7f1abed859c63455fa6d58b5cc34a3d3206ff74b9e96c336dbacf0cdd18ed0c66796ce00ab07f36b24cbe3342523fd8215a8e77f89e86a08db911f237459388dee642dae7cb2644a03e71ed5c6fa5077cf4090fafa556048b536b879a88f628698f0c7b420c4b7
e = 0x010001
```

The same RSA public key, encoded in the traditional for RSA format [PKCS\#8](https://en.wikipedia.org/wiki/PKCS_8) [PEM](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) [ASN.1](https://en.wikipedia.org/wiki/Abstract_Syntax_Notation_One) looks like this:

```text
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEApwni+ErA4h6wyqAYz39p
f3dOlvgRX8I1npz2Cx3Y1ASNl0zfhCK+9r48FisEuRb36iEz8OPk4O7hZIWb2cHg
7wNXwUL09jO0rdSquGyPiJXNM/v04CTZo61r5iZ1cLSnLSw0NU4BOedK2mZaFqJh
FJDeu44TGmz/x+8l50JAgD3XGk/NlTyYgRGwqpu8TFcCT8XoxEYq2QScfxq+2FnG
NFX6bVi1zDSj0yBv90uelsM226zwzdGO0MZnls4AqwfzayTL4zQlI/2CFajnf4no
agjbkR8jdFk4je5kLa58smRKA+ce1cb6UHfPQJD6+lVgSLU2uHmoj2KGmPDHtCDE
twIDAQAB
-----END PUBLIC KEY-----
```

The above PEM ASN.1-encoded message, holding the RSA public key, can be decoded here: [https://lapo.it/asn1js](https://lapo.it/asn1js).

## RSA Private Key - Example

Example of 2048-bit **RSA private key**, corresponding to the above given public key \(represented as hexadecimal 2048-bit integer modulus _**n**_ and 2048-bit secret exponent _**d**_\):

```text
n = 0xa709e2f84ac0e21eb0caa018cf7f697f774e96f8115fc2359e9cf60b1dd8d4048d974cdf8422bef6be3c162b04b916f7ea2133f0e3e4e0eee164859bd9c1e0ef0357c142f4f633b4add4aab86c8f8895cd33fbf4e024d9a3ad6be6267570b4a72d2c34354e0139e74ada665a16a2611490debb8e131a6cffc7ef25e74240803dd71a4fcd953c988111b0aa9bbc4c57024fc5e8c4462ad9049c7f1abed859c63455fa6d58b5cc34a3d3206ff74b9e96c336dbacf0cdd18ed0c66796ce00ab07f36b24cbe3342523fd8215a8e77f89e86a08db911f237459388dee642dae7cb2644a03e71ed5c6fa5077cf4090fafa556048b536b879a88f628698f0c7b420c4b7
d = 0x10f22727e552e2c86ba06d7ed6de28326eef76d0128327cd64c5566368fdc1a9f740ad8dd221419a5550fc8c14b33fa9f058b9fa4044775aaf5c66a999a7da4d4fdb8141c25ee5294ea6a54331d045f25c9a5f7f47960acbae20fa27ab5669c80eaf235a1d0b1c22b8d750a191c0f0c9b3561aaa4934847101343920d84f24334d3af05fede0e355911c7db8b8de3bf435907c855c3d7eeede4f148df830b43dd360b43692239ac10e566f138fb4b30fb1af0603cfcf0cd8adf4349a0d0b93bf89804e7c2e24ca7615e51af66dccfdb71a1204e2107abbee4259f2cac917fafe3b029baf13c4dde7923c47ee3fec248390203a384b9eb773c154540c5196bce1
```

The same RSA private key, encoded in the traditional for RSA format [PKCS\#8](https://en.wikipedia.org/wiki/PKCS_8) [PEM](https://en.wikipedia.org/wiki/Privacy-Enhanced_Mail) [ASN.1](https://en.wikipedia.org/wiki/Abstract_Syntax_Notation_One) looks a bit longer:

```text
-----BEGIN RSA PRIVATE KEY-----
MIIEowIBAAKCAQEApwni+ErA4h6wyqAYz39pf3dOlvgRX8I1npz2Cx3Y1ASNl0zf
hCK+9r48FisEuRb36iEz8OPk4O7hZIWb2cHg7wNXwUL09jO0rdSquGyPiJXNM/v0
4CTZo61r5iZ1cLSnLSw0NU4BOedK2mZaFqJhFJDeu44TGmz/x+8l50JAgD3XGk/N
lTyYgRGwqpu8TFcCT8XoxEYq2QScfxq+2FnGNFX6bVi1zDSj0yBv90uelsM226zw
zdGO0MZnls4AqwfzayTL4zQlI/2CFajnf4noagjbkR8jdFk4je5kLa58smRKA+ce
1cb6UHfPQJD6+lVgSLU2uHmoj2KGmPDHtCDEtwIDAQABAoIBABDyJyflUuLIa6Bt
ftbeKDJu73bQEoMnzWTFVmNo/cGp90CtjdIhQZpVUPyMFLM/qfBYufpARHdar1xm
qZmn2k1P24FBwl7lKU6mpUMx0EXyXJpff0eWCsuuIPonq1ZpyA6vI1odCxwiuNdQ
oZHA8MmzVhqqSTSEcQE0OSDYTyQzTTrwX+3g41WRHH24uN479DWQfIVcPX7u3k8U
jfgwtD3TYLQ2kiOawQ5WbxOPtLMPsa8GA8/PDNit9DSaDQuTv4mATnwuJMp2FeUa
9m3M/bcaEgTiEHq77kJZ8srJF/r+OwKbrxPE3eeSPEfuP+wkg5AgOjhLnrdzwVRU
DFGWvOECgYEAyIk7F0S0AGn2aryhw9CihDfimigCxEmtIO5q7mnItCfeQwYPsX72
1fLpJNgfPc9DDfhAZ2hLSsBlAPLUOa0Cuny9PCBWVuxi1WjLVaeZCV2bF11mAgW2
fjLkAXT34IX+HZl60VoetSWq9ibfkJHeCAPnh/yjdB3Vs+2wxNkU8m8CgYEA1Tzm
mjJq7M6f+zMo7DpRwFazGMmrLKFmHiGBY6sEg7EmoeH2CkAQePIGQw/Rk16gWJR6
DtUZ9666sjCH6/79rx2xg+9AB76XTFFzIxOk9cm49cIosDMk4mogSfK0Zg8nVbyW
5nEb//9JCrZ18g4lD3IrT5VJoF4MhfdBUjAS1jkCgYB+RDIpv3+bNx0KLgWpFwgN
Omb667B6SW2ya4x227KdBPFkwD9HYosnQZDdOxvIvmUZObPLqJan1aaDR2Krgi1S
oNJCNpZGmwbMGvTU1Pd+Nys9NfjR0ykKIx7/b9fXzman2ojDovvs0W/pF6bzD3V/
FH5HWKLOrS5u4X3JJGqVDwKBgQCd953FwW/gujld+EpqpdGGMTRAOrXqPC7QR3X5
Beo0PPonlqOUeF07m9/zsjZJfCJBPM0nS8sO54w7ESTAOYhpQBAPcx/2HMUsrnIj
HBxqUOQKe6l0zo6WhJQi8/+cU8GKDEmlsUlS3iWYIA9EICJoTOW08R04BjQ00jS7
1A1AUQKBgHlHrV/6S/4hjvMp+30hX5DpZviUDiwcGOGasmIYXAgwXepJUq0xN6aa
lnT+ykLGSMMY/LABQiNZALZQtwK35KTshnThK6zB4e9p8JUCVrFpssJ2NCrMY3SU
qw87K1W6engeDrmunkJ/PmvSDLYeGiYWmEKQbLQchTxx1IEddXkK
-----END RSA PRIVATE KEY-----
```

It holds **the entire RSA key-pair structure**, along with several additional parameters: 2048-bit modulus _**n**_, 24-bit public exponent _**e**_, 2048-bit secret exponent _**d**_, first factor _**p**_, second factor _**q**_, and 3 other integers from the RSA internal data structure:

The above PEM ASN.1-encoded message, holding the RSA private key data, can be decoded here: [https://lapo.it/asn1js](https://lapo.it/asn1js).

## RSA Cryptography: Encrypt a Message

**Encrypting a message** using certain RSA **public key** {_**n**_, _**e**_} is done by the following transformation:

* _**encryptedMsg**_ = \(_**msg**_\)_**e**_ mod _**n**_

The _**msg**_ here is a number in the range \[0..._**n**_\). Text messages should be **encoded as integers** in the range \[0..._**n**_\) before encryption \(see [EAOP](https://en.wikipedia.org/wiki/Optimal_asymmetric_encryption_padding)\). For larger texts, **hybrid encryption** should be used \(encrypt a secret key and use it to symmetrically encrypt the text, see [RSA-KEM](https://tools.ietf.org/html/rfc5990)\).

The above operation **cannot be reversed**: no efficient algorithm exists to calculate _**msg**_ from _**encryptedMsg**_, _**e**_ and _**n**_ \(see [the RSA problem](https://en.wikipedia.org/wiki/RSA_problem)\), which all are **public** \(non-secret\) by design.

## RSA Cryptography: Decrypt a Message

**Decrypting the encrypted message** using the corresponding RSA **private key** {_**n**_, _**d**_} is done by the following transformation:

* _**decryptedMsg**_ = \(_**encryptedMsg**_\)_**d**_ mod _**n**_

Why this is correct? Recall, that by definition the RSA key-pair has the following property:

* \(_**me**_\)_**d**_ ≡ _**m**_ \(mod _**n**_\) for any _**m**_ in the range \[0..._**n**_\)

From the encryption transformation we have:

* _**encryptedMsg**_ = \(_**msg**_\)_**e**_ mod _**n**_

Hence:

* _**decryptedMsg**_ = \(_**encryptedMsg**_\)_**d**_ mod _**n**_ = \(\(_**msg**_\)_**e**_ mod _**n**_\)_**d**_ = \(\(_**msg**_\)_**e**_\)_**d**_ mod _**n**_ = \(_**msg**_\) mod _**n**_ = _**msg**_

## RSA Encrypt and Decrypt - Example

Let examine one **example of RSA encryption and decryption**, along with the calculations, following the above formulas. Assume we have generated the RSA public-private key pair:

* modulus _**n**_ = 143
* public exponent _**e**_ = 7
* private exponent _**d**_ = 103
* public key = {_**n**_, _**e**_} = {143, 7}
* private key = {_**n**_, _**d**_} = {143, 103}

Let's **encrypt** a secret message _**msg**_ = **83**. Just follow the formula:

* _**encryptedMsg**_ = _**msge**_ mod _**n**_ = 837 mod 143 = 27136050989627 mod 143 = **8**

Now, let's **decrypt** the encrypted message back to its original value:

* _**decryptedMsg**_ = _**encryptedMsgd**_ mod n = 8103 mod 143 = 1042962419883256876169444192465601618458351817556959360325703910069443225478828393565899456512 mod 143 = **83**

The RSA calculations work correctly. This is because the key-pair meets the RSA property:

* \(_**me**_\)_**d**_ ≡ _**m**_ \(mod _**n**_\) for all _**m**_ in the range \[0..._**n**_\)
* \(_**m**_7\)103 ≡ _**m**_ \(mod _**143**_\) for all _**m**_ in the range \[0..._**143**_\)

In the real world, typically the RSA modulus _**n**_ and the private exponent _**d**_ are 3072-bit or 4096-bit integers and the public exponent _**e**_ is 65537.

For further reading, look at this excellent explanation about **how RSA works** in detail with explainations and examples: [http://doctrina.org/How-RSA-Works-With-Examples.html](http://doctrina.org/How-RSA-Works-With-Examples.html).

Because RSA encryption is a **deterministic** \(has no random component\) attackers can successfully launch a [**chosen plaintext attack**](https://en.wikipedia.org/wiki/Chosen-plaintext_attack) against by encrypting likely plaintexts with the public key and test if they are equal to the ciphertext. This may not be a problem, but is a **weakness**, that should be considered when developers choose an encryption scheme.

Hybrid encryption schemes like **RSA-KEM** solve this vulnerability and allow encrypting longer texts.

