# Quantum-Safe Signatures - Examples in Python

In this example, we shall demonstrate the** **[**SPHINCS+** signature library](https://github.com/sphincs/sphincsplus). It implements **hash-based signatures**, which are designed to be **quantum-safe**. Note that the SPHINCS+ signatures are still **experimental** \(as of Nov 2018\) and their security is not still indisputably proven, because they are relatively new and are still not well analysed by cryptographers.

We shall demonstrate the **SPHINCS+** cryptosystem for hash-based digital signatures, more precisely two of its configurations:

* **SPHINCS+-128f** – 64-byte private key, 32-byte public key, ~16.9KB signature, instant key generation, fast signing speed &lt; 1 sec, instant verification, 128-bit security level
* **SPHINCS+-128s** – 64-byte private key, 32-byte public key, ~ 8KB signature, instant key generation, slow signing speed ~ few secs, instant verification, 133-bit security level

To install the **official SPHINCS+ signature** library [**PySPX**](https://github.com/sphincs/pyspx) for Python, use the following command:

```py
pip install pyspx
```

The `pyspx` package may not compile in Windows \(using the Visual C++ compiler\), so **Linux is recommended** \(or a Python virtual machine like [PythonAnywhere](https://www.pythonanywhere.com)\).

Let's demonstrate the **SPHINCS+ signature **with the `shake256_128f` parameter set \(SPHINCS+, using SHAKE256-128 as hash function and in fast mode\), using this Python example:

```py
import pyspx.shake256_128f as sphincs
import os, binascii

# Key generation: private + public key
seed = os.urandom(sphincs.crypto_sign_SEEDBYTES)
public_key, secret_key = sphincs.generate_keypair(seed)
print("Public key:", binascii.hexlify(public_key))
print("Private key:", binascii.hexlify(secret_key))

# Sign message and verify signature
message = b'Message for SPHINCS+ shake256_128f signing'
signature = sphincs.sign(message, secret_key)
valid = sphincs.verify(message, signature, public_key)
print("Message:", message)
print("Signature:", binascii.hexlify(signature))
print("Signature valid?", valid)

# Verify tampered message + signature
message = b'Tampered msg'
valid = sphincs.verify(message, signature, public_key)
print("Tampered message:", message)
print("Tampered signature valid?", valid)
```

The above code is **fast**: it runs for portion of the second. The **output** from it looks like this:

```
Public key: b'73004fe93b401a2ab9e0f3ccebbb9d8fe38b0080033eb80a9ecd8028451bbbcb'
Private key: b'e2e5f5f4574cc2774ee4b30c21f4067321a619d54dd92e539b6adcf6f932c6c573004fe93b401a2ab9e0f3ccebbb9d8fe38b0080033eb80a9ecd8028451bbbcb'
Message: b'Message for SPHINCS+ shake256_128f signing'
Signature: b'fbdb1d37371b7f18fb8b1cb2ae452f2aea3c17b4b5c2cee564ee6617915ba3aa813c1eb418e8b2e191b6d15bbcbf47bea4682d1a842dc8b8f589c8108bdea153506e1ee245530b2ad3cec6a6955bc691c8b4aa777...cc276446ea6'
Signature valid? True
Tampered message: b'Tampered msg'
Tampered signature valid? False
```

It is visible from the above output that for the `shake256_128f` parameter set the SPHINCS+ **public key** is small \(32 bytes\), the **private key** is also small \(64 bytes\), but the **signature is big** \(16976 bytes, ~16.9 KB, partially shown above\). This makes SPHINCS+ signatures not an ideal solution for the post-quantum signatures. Additionally, the signature computation **speed** is sensibly slower than RSA and ECDSA.

Let's tweak the SPHINCS+ algorithm parameters to get shorter signature, using the `shake256_128s` parameter set \(SPHINCS+, using SHAKE256-128 as hash function and in slow mode\). This smaller signature will cost many times **more computing time for signing**. Let's change the algorithm parameters like this \(in fact the important change is at the first line only\):

```py
import pyspx.shake256_128s as sphincs
import os, binascii

# Key generation: private + public key
seed = os.urandom(sphincs.crypto_sign_SEEDBYTES)
public_key, secret_key = sphincs.generate_keypair(seed)
print("Public key:", binascii.hexlify(public_key))
print("Private key:", binascii.hexlify(secret_key))

# Sign message and verify signature
message = b'Message for SPHINCS+ shake256_128s signing'
signature = sphincs.sign(message, secret_key)
valid = sphincs.verify(message, signature, public_key)
print("Message:", message)
print("Signature:", binascii.hexlify(signature))
print("Signature valid?", valid)

# Verify tampered message + signature
message = b'Tampered msg'
valid = sphincs.verify(message, signature, public_key)
print("Tampered message:", message)
print("Tampered signature valid?", valid)
```

The produced **signature size now is smaller** \(~ 8KB, partially shown below\), but the time to generate the signature is drastically increased \(**signing takes a few seconds**, key generation and signature verification are still fast\):

```
Public key: b'd2ac35f1a6124b4a45d196b3fa9292b9bb3245f8c0dbdb586ea5879eb22487f0'
Private key: b'8dc8e4cf3dc6fd28cb14a46fa2350dd41acdfb351c49e8caea86ca95ee2184ddd2ac35f1a6124b4a45d196b3fa9292b9bb3245f8c0dbdb586ea5879eb22487f0'
Message: b'Message for SPHINCS+ shake256_128s signing'
Signature: b'a92bbecfae693e3fdc15fa0f5d9f4a941a7ae98822be6ca0d194db3930e45fe5cb429b29757f4539dcb444652224d3ab0d0fca2c792b7acf597b632880bf9a6feb0dc444491a9e9ef902...0abeb7a42cb262'
Signature valid? True
Tampered message: b'Tampered msg'
Tampered signature valid? False
```

We may conclude that quantum-safe digital signature algorithms like **SPHINCS+ signatures** may replace ECDSA and EdDSA in the post-quantum computing era, but they still  have one big disadvantage: **large signatures**. For some applications the signature size may not be a problem, but for others smaller signatures are critical.

