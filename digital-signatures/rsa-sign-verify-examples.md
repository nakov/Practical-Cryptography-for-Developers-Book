# RSA: Sign / Verify - Examples

Let's demonstrate in practice the **RSA sign / verify** algorithm. We shall use the `pycryptodome` package in Python to generate **RSA keys**. After the keys are generated, we shall compute RSA digital signatures and verify signatures by a simple modular exponentiation.

```py
pip install pycryptodome
```

Next, generate a 1024-bit **RSA key-pair**:

```py
from Crypto.PublicKey import RSA

keyPair = RSA.generate(1024)
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

Now, let's **verify the signature**, by decrypting the signature using the public key \(raise the _**signature**_ to power _**e**_ modulo _**n**_\) and comparing the obtained **hash from the signature** to the **hash** of the signed message:

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

```
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

Enjoy **playing with the above RSA sign / verify examples**. Try to modify the code, e.g. use 4096-bit keys, try to tamper the public key at the signature verification step or

