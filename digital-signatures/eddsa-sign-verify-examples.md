# Sign / Verify Messages using EdDSA - Examples in Python

After we explained in the previous section how the **EdDSA signatures** work, now it is time to demonstrate them with code examples. First, we shall demonstrated how to use Ed25519 signatures.

## Ed25519 Signatures - Example

We shall use the Python library [`ed25519`](https://github.com/warner/python-ed25519), which is based on the Bernstein's original optimized highly optimized C implementation of the **Ed25519** signature algorithm \(EdDSA over the Curve25519 in Edwards form\):

```py
pip install ed25519
```

Next, generate a **private + public key pair** for the Ed25519 cryptosystem, **sign** a sample message, and **verify** the signature:

```py
import ed25519

privKey, pubKey = ed25519.create_keypair()
print("Private key (32 bytes):", privKey.to_ascii(encoding='hex'))
print("Public key (32 bytes): ", pubKey.to_ascii(encoding='hex'))

msg = b'Message for Ed25519 signing'
signature = privKey.sign(msg, encoding='hex')
print("Signature (64 bytes):", signature)

try:
    pubKey.verify(signature, msg, encoding='hex')
    print("The signature is valid.")
except:
    print("Invalid signature!")
```

The output from the above sample code looks like this:

```
Private key (32 bytes): b'1498b5467a63dffa2dc9d9e069caf075d16fc33fdd4c3b01bfadae6433767d93'
Public key (32 bytes):  b'b7a3c12dc0c8c748ab07525b701122b88bd78f600c76342d27f25e5f92444cde'
Signature (64 bytes): b'6dd355667fae4eb43c6e0ab92e870edb2de0a88cae12dbd8591507f584fe4912babff497f1b8edf9567d2483d54ddc6459bea7855281b7a246a609e3001a4e08'
The signature is valid.
```

The **Ed25519 key pair** is generated randomly: first a 32-byte random seed is generated, then the private key is derived from the seed, then the public key is derived from the private key. The hash function for key generation is SHA-512.

The **private key** is encoded as 64 hex digits \(32 bytes\). The **public key** is encoded also as 64 hex digits \(32 bytes\). The EdDSA-Ed25519 **signature** {_**R**_, _**s**_} is 32 + 32 bytes \(64 bytes, 128 hex digits\).

If we try to verify a tampered message, the verification will fail:

```py
try:
    pubKey.verify(signature, "Tampered msg", encoding='hex')
    print("The signature is valid.")
except:
    print("Invalid signature!")
```

The output from the above sample code is as expected:

```
Invalid signature!
```

## Ed448 Signatures - Example

Now, let's demonstrate how to use the **Ed448 signature** \(EdDSA over the Curve448-Goldilocks curve in Edwards form\).

We shall use the Python elliptic curve library [`ECPy`](https://github.com/cslashm/ECPy), which implements ECC with Weierstrass curves \(like `secp256k1` and `NIST P-256`\), Montgomery curves \(like `Curve25519` and `Curve448`\) and twisted Edwards curves \(like `Ed25519` and `Ed448`\):

```py
pip install ecpy
```

Next, generate a **private + public key pair** for the Ed448 cryptosystem:

```py
from ecpy.curves import Curve
from ecpy.keys import ECPrivateKey
from ecpy.eddsa import EDDSA
import secrets, hashlib, binascii

curve = Curve.get_curve('Ed448')
signer = EDDSA(hashlib.shake_256, hash_len=114)
privKey = ECPrivateKey(secrets.randbits(57*8), curve)
pubKey = signer.get_public_key(privKey, hashlib.shake_256, hash_len=114)
print("Private key (57 bytes):", privKey)
print("Public key (compressed, 57 bytes): ",
      binascii.hexlify(curve.encode_point(pubKey.W)))
print("Public key (point): ", pubKey)
```

The **Ed448 key pair** is generated randomly. According to [RFC 8032](https://tools.ietf.org/html/rfc8032#page-19) the Ed448 **private key** is generated from 57-byte random seed, which is transformed to 57-byte **public key** using the **SHAKE256**\(x, hash\_len=114\) hash function, along with EC point multiplication and the special key encoding rules for Ed448.

The output from the above sample code may look like this:

```
Private key (57 bytes): ECPrivateKey:
  d: 625d3edeb5cd69b20b0b6387c3522a21d356ac40b408e34fb2f8442e2c91eee3f877afe583a2fd11770567df69178019d6fbc6357c35eefa3e
Public key (compressed, 57 bytes):  b'261d23911e194ed0cb7f9233568e906d6abcf4d60f73451ca807636d8fa6e4ea5ca12f51d240299a0b86a61ccb2174ce4ed2a8c4f7a8cced00'
Public key (point):  ECPublicKey:
  x: cb5aec366d6b3293354418f8abf67bd5aaf46b49ff9c2154fbc14d9ca22fe93b680954f27c10fed3327ef51c8bce5d2522f41fd554731d88
  y: edcca8f7c4a8d24ece7421cb1ca6860b9a2940d2512fa15ceae4a68f6d6307a81c45730fd6f4bc6a6d908e5633927fcbd04e191e91231d26
```

The **private key** is encoded as 114 hex digits \(57 bytes\). The **public key** is encoded also as 114 hex digits \(57 bytes\), in compressed form. In the above example the public key EC point is printed also in uncompressed format \(**x** and **y** coordinates\). The EdDSA-Ed448 **signature** {_**R**_, _**s**_} consists of 57 + 57 bytes \(114 bytes, 228 hex digits\).

Next, **sign** a sample message using the private key, and **verify** the signature using the public key after that:

```py
msg = b'Message for Ed448 signing'
signature = signer.sign(msg, privKey)
print("Signature (114 bytes):", binascii.hexlify(signature))

valid = signer.verify(msg, signature, pubKey)
print("Valid signature?", valid)
```

The output from the above code example \(for the above Ed448 key pair\) is:

```
Signature (114 bytes): b'5114674f1ce8a2615f2b15138944e5c58511804d72a96260ce8c587e7220daa90b9e65b450ff49563744d7633b43a78b8dc6ec3e3397b50080a15f06ce8005ad817a1681a4e96ee6b4831679ef448d7c283b188ed64d399d6bac420fadf33964b2f2e0f2d1abd401e8eb09ab29e3ff280600'
Valid signature? True
```

The signature is **deterministic**: the same message with the same private key produces the same signature.

If we try to verify the same signature with a tampered message, the verification will fail:

```py
valid = signer.verify(b'Tampered msg', signature, pubKey)
print("Valid signature?", valid)
```

The output from the above sample code is as expected:

```
Valid signature? False
```



