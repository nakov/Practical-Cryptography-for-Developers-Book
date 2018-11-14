# ECDH Key Exchange - Examples in Python

Now let's implement the **ECDH** algorithm \(Elliptic Curve Diffie–Hellman Key Exchange\) in Python.

We shall use the `tinyec` library for ECC in Python:

```py
pip install tinyec
```

Now, let's generate two public-private **key pairs**, exchange the **public keys** and calculate the **shared secret**:

```py
from tinyec import registry
import secrets

def compress(pubKey):
    return hex(pubKey.x) + hex(pubKey.y % 2)[2:]

curve = registry.get_curve('brainpoolP256r1')

alicePrivKey = secrets.randbelow(curve.field.n)
alicePubKey = alicePrivKey * curve.g
print("Alice public key:", compress(alicePubKey))

bobPrivKey = secrets.randbelow(curve.field.n)
bobPubKey = bobPrivKey * curve.g
print("Bob public key:", compress(bobPubKey))

print("Now exchange the public keys (e.g. through Internet)")

aliceSharedKey = alicePrivKey * bobPubKey
print("Alice shared key:", compress(aliceSharedKey))

bobSharedKey = bobPrivKey * alicePubKey
print("Bob shared key:", compress(bobSharedKey))

print("Equal shared keys:", aliceSharedKey == bobSharedKey)
```

The **elliptic curve** used for the ECDH calculations is **256-bit** named curve `brainpoolP256r1`. The **private keys** are **256-bit** \(64 hex digits\) and are generated randomly. The **public keys** will be **257 bits** \(65 hex digits\), due to **key compression**.

The **output** of the above code looks like this:

```
Alice public key: 0x66c808e6b5be6d6620934bc6ffa2b8b47f9786c002bfb06d53a0c27535641a5d1
Bob public key: 0x7d15195432d1ac7f38aeb054d07d9b2e1faa913b78ad04d5efdd4a1ee8d9a3191
Now exchange the public keys (e.g. through Internet)
Alice shared key: 0x90f5a1cf2ed1dbb0322178df6bb0dd72c541884618b2989a3e5e663198667a621
Bob shared key: 0x90f5a1cf2ed1dbb0322178df6bb0dd72c541884618b2989a3e5e663198667a621
Equal shared keys: True
```

Due to randomization, if you run the above code, the **keys will be different**, but the calculated **shared secret** for Alice and Bob at the end will always be **the same**. The generated **shared secret** is a **257-bit** integer \(compressed EC point for 256-bit curve, encoded as 65 hex digits\).

