# Exercises: ECC-Based Asymmetric Encrypt / Decrypt \(ECIES\)

Encrypt / Decrypt a Message using ECIES \(Elliptic Curve Integrated Encryption Scheme\) and secp256k1.



...
**TODO**: https://pypi.org/project/eciespy/
...




Write a program to **encrypt** / **decrypt** a **message** using **ECC** with the **secp256k1** curve using the encryption scheme [**ECIES**](https://en.wikipedia.org/wiki/Integrated_Encryption_Scheme) \(Elliptic Curve Integrated Encryption Scheme\). Encryption will use EC **public key** and decryption will use EC **private key**. Internally, use AES-256-CTR.

* Generate a EC **public** / **private** **key** pair using secp256k1.

* Encrypt the **message** using the **public key**. Internally encrypt the message with AES-256-CTR, using as AES key the shared secret number S. Store as output the ECC point R + ciphertext + iv + hmac.

* Decrypt the **message** using the **private key**. Internally use AES-256-CTR. From the ECC point R, using the private key, decode the shared secret number S, then using the AES parameters, decrypt the ciphertext.

* As reference, you may follow this example:  
  [https://github.com/planetbeing/bitcoin-encrypt/blob/master/bitcoin-encrypt.py](https://github.com/planetbeing/bitcoin-encrypt/blob/master/bitcoin-encrypt.py).

_**Note**_: some developers might find this problem very complicated, so enjoy learning about ECC and AES from it. If you fail, just skip it, or explore the sample implementation from the above link.

