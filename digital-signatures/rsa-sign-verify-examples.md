# RSA: Sign / Verify - Examples in Python

Let's demonstrate in practice the **RSA sign / verify** algorithm. We shall use the `pycryptodome` package in Python to generate **RSA keys**. After the keys are generated, we shall compute RSA digital signatures and verify signatures by a simple modular exponentiation \(by encrypting and decrypting the message hash\).

```py
pip install pycryptodome
```

Next, generate a 1024-bit **RSA key-pair**:

```py
from Crypto.PublicKey import RSA

keyPair = RSA.generate(bits=1024)
print(f"Public key:  (n={hex(keyPair.n)}, e={hex(keyPair.e)})")
print(f"Private key: (n={hex(keyPair.n)}, d={hex(keyPair.d)})")
```

The **output** from the above code might look like this \(it will be different at each execution due to randomness\):

```
Public key:  (n=0xf51518d30754430e4b89f828fd4f1a8e8f44dd10e0635c0e93b7c01802729a37e1dfc8848d7fbbdf2599830268d544c1ecab4f2b19b6164a4ac29c8b1a4ec6930047397d0bb93aa77ed0c2f5d5c90ff3d458755b2367b46cc5c0d83f8f8673ec85b0575b9d1cea2c35a0b881a6d007d95c1cc94892bec61c2e9ed1599c1e605f, e=0x10001)
Private key: (n=0xf51518d30754430e4b89f828fd4f1a8e8f44dd10e0635c0e93b7c01802729a37e1dfc8848d7fbbdf2599830268d544c1ecab4f2b19b6164a4ac29c8b1a4ec6930047397d0bb93aa77ed0c2f5d5c90ff3d458755b2367b46cc5c0d83f8f8673ec85b0575b9d1cea2c35a0b881a6d007d95c1cc94892bec61c2e9ed1599c1e605f, d=0x165ecc9b4689fc6ceb9c3658977686f8083fc2e5ed75644bb8540766a9a2884d1d82edac9bb5d312353e63e4ee68b913f264589f98833459a7a547e0b2900a33e71023c4dedb42875b2dfdf412881199a990dfb77c097ce71b9c8b8811480f1637b85900137231ab47a7e0cbecc0b011c2c341b6de2b2e9c24d455ccd1fc0c21)
```

Now, let's **sign a message**, using the RSA private key {_**n**_, _**d**_}. Calculate its **hash** and raise the hash to the power _**d**_ modulo _**n **_\(encrypt the hash by the private key\). We shall use **SHA-512 hash**. It will fit in the current RSA key size \(1024\). In Python we have **modular exponentiation** as built in function [`pow(x, y, n)`](https://docs.python.org/3/library/functions.html#pow):

```py
# RSA sign the message
msg = b'A message for signing'
from hashlib import sha512
hash = int.from_bytes(sha512(msg).digest(), byteorder='big')
signature = pow(hash, keyPair.d, keyPair.n)
print("Signature:", hex(signature))
```

The obtained digital signature is an integer in the range of the RSA key length \[0..._**n**_\). For the above **private key** and the above **message**, the obtained **signature** looks like this:

```
Signature: 0x650c9f2e6701e3fe73d3054904a9a4bbdb96733f1c4c743ef573ad6ac14c5a3bf8a4731f6e6276faea5247303677fb8dbdf24ff78e53c25052cdca87eecfee85476bcb8a05cb9a1efef7cb87dd68223e117ce800ac46177172544757a487be32f5ab8fe0879fa8add78be465ea8f8d5acf977e9f1ae36d4d47816ea6ed41372b
```

The **signature** is **1024-bit integer** \(128 bytes, 256 hex digits\). This signature size corresponds to the RSA key size.

Now, let's **verify the signature**, by decrypting the signature using the public key \(raise the _**signature**_ to power _**e**_ modulo _**n**_\) and comparing the obtained **hash from the signature** to the **hash** of the originally signed message:

```py
# RSA verify signature
msg = b'A message for signing'
hash = int.from_bytes(sha512(msg).digest(), byteorder='big')
hashFromSignature = pow(signature, keyPair.e, keyPair.n)
print("Signature valid:", hash == hashFromSignature)
```

The output will show `True`, because the signature will be valid:

```
Signature valid: True
```

Now, let's try to **tamper the message** and verify the signature again:

```py
# RSA verify signature (tampered msg)
msg = b'A message for signing (tampered)'
hash = int.from_bytes(sha512(msg).digest(), byteorder='big')
hashFromSignature = pow(signature, keyPair.e, keyPair.n)
print("Signature valid (tampered):", hash == hashFromSignature)
```

Now, the signature will be **invalid** and the output from the above code will be:

```
Signature valid (tampered): False
```

Enjoy **playing with the above RSA sign / verify examples**. Try to modify the code, e.g. use 4096-bit keys, try to tamper the public key at the signature verification step or the signature.

## The RSA Signature Standard PKCS\#1

The simple use of **RSA signatures** is demonstrated above, but the industry usually follows the **crypto standards**. For the RSA signatures, the most adopted standard is "**PKCS\#1**", which has several versions \(1.5, 2.0, 2.1, 2.2\), the latest described in [**RFC 8017**](https://tools.ietf.org/html/rfc8017#page-15). The PKCS\#1 standard defines the RSA signing algorithm \(**RSASP1**\) and the RSA signature verification algorithm \(**RSAVP1**\), which are almost the same like the implemented in the previous section.

To demonstrate the **PKCS\#1 RSA digital signatures**, we shall use the following code, based on the `pycryptodome` Python library, which implements RSA sign / verify, following the **PKCS\#1 v1.5** specification:

```py
from Crypto.PublicKey import RSA
from Crypto.Signature.pkcs1_15 import PKCS115_SigScheme
from Crypto.Hash import SHA256
import binascii

# Generate 1024-bit RSA key pair (private + public key)
keyPair = RSA.generate(bits=1024)

# Sign the message using the PKCS#1 v1.5 signature scheme (RSASP1)
msg = b'A message for signing'
hash = SHA256.new(msg)
signer = PKCS115_SigScheme(keyPair)
signature = signer.sign(hash)
print("Signature:", binascii.hexlify(signature))

# Verify valid PKCS#1 v1.5 signature (RSAVP1)
msg = b'A message for signing'
hash = SHA256.new(msg)
signer = PKCS115_SigScheme(keyPair)
try:
    signer.verify(hash, signature)
    print("Signature is valid.")
except:
    print("Signature is invalid.")

# Verify invalid PKCS#1 v1.5 signature (RSAVP1)
msg = b'A tampered message'
hash = SHA256.new(msg)
signer = PKCS115_SigScheme(keyPair)
try:
    signer.verify(hash, signature)
    print("Signature is valid.")
except:
    print("Signature is invalid.")
```

The output from the above code demonstrates that the **PKCS\#1 RSA signing** with 1024-bit RSA private key produces **1024-bit digital signature** and that it is successfully validated afterwards with the corresponding public key. If the message or the signature or the public key is tampered, the signature fails to validate. The output from the above example looks like this:

```
Signature: b'243b9ed6561ab3bddead98508af0ac34b4567b1358011ace24db71ce2bc7f1a2e942b6231aa84cb07bae85b668d7c7cd0bc40cdda6f8162de57f0ee842e589c58f94aa4f96d51355f8aa395d7db950ebb9d375fca3124b6222699a645e93287bc6f5eb5b750fc0b470588f949a887dff75ed42cf01d9642a5d497f609b8cd043'
Signature is valid.
Signature is invalid.
```

Note that in real-world applications the RSA key length should be **at least 3072 bits** to provide secure enough signatures.

