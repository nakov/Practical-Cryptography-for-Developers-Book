# Sign / Verify Messages using EdDSA - Examples in Python

After we explained in the previous section how the **EdDSA signatures** work, now it is time to demonstrate them with code examples. First, we shall demonstrated how to use Ed25519 signatures.

## Ed25519 - Example

We shall use the Python library [`ed25519`](https://github.com/warner/python-ed25519), which is based on the Bernstein's original optimized highly optimized C implementation of the **Ed25519** signature algorithm \(EdDSA over the Curve25519\):

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

The **private key** is encoded as 64 hex digits \(32 bytes\). The **public key** is encoded also as 64 hex digits \(32 bytes\). The EdDSA **signature** {_**R**_, _**s**_} is 32 + 32 bytes \(64 bytes, 128 hex digits\).

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

## Ed448 - Example

Now, let's demonstrate how to use the **Ed448 signature** \(EdDSA over the Curve448-Goldilocks curve\).

We shall use the Python elliptic curve library [`ECPy`](https://github.com/cslashm/ECPy), which implements ECC with Weierstrass curves \(like `secp256k1` and `NIST P-256`\), Montgomery curves \(like `Curve25519` and `Curve448`\) and twisted Edwards curves \(like `Ed25519` and `Ed448`\):

```py
pip install ecpy
```

Next, generate a **private + public key pair** for the Ed25519 cryptosystem, **sign** a sample message, and **verify** the signature:

```py
...
```

The output from the above sample code looks like this:

```
...
```



