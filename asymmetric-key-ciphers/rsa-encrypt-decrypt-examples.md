# RSA Encryption / Decryption - Examples in Python

Now let's demonstrate how the RSA algorithms works by a simple **example in Python**. The below code will generate **random RSA key-pair**, will **encrypt** a short message and will **decrypt** it back to its original form, using the [**RSA-OAEP**](https://en.wikipedia.org/wiki/Optimal_asymmetric_encryption_padding) padding scheme.

First, install the `pycryptodome` package, which is a powerful Python library of low-level cryptographic primitives \(hashes, MAC codes, key-derivation, symmetric and asymmetric ciphers, digital signatures\):

```
pip install pycryptodome
```

## RSA Key Generation

Now, let's write the Python code. First, **generate the RSA keys** \(1024-bit\) and print them on the console \(as hex numbers and in the PKCS\#8 PEM ASN.1 format\):

```py
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_OAEP
import binascii

keyPair = RSA.generate(3072)

pubKey = keyPair.publickey()
print(f"Public key:  (n={hex(pubKey.n)}, e={hex(pubKey.e)})")
pubKeyPEM = pubKey.exportKey()
print(pubKeyPEM.decode('ascii'))

print(f"Private key: (n={hex(pubKey.n)}, d={hex(keyPair.d)})")
privKeyPEM = keyPair.exportKey()
print(privKeyPEM.decode('ascii'))
```

We use short key length to keep the sample input short, but in a real world scenario it is recommended to use 3072-bit or 4096-bit keys.

## RSA Encryption

Next, **encrypt the message** using **RSA-OAEP** encryption scheme \(RSA with PKCS\#1 OAEP padding\) with the RSA **public key**:

```py
msg = b'A message for encryption'
encryptor = PKCS1_OAEP.new(pubKey)
encrypted = encryptor.encrypt(msg)
print("Encrypted:", binascii.hexlify(encrypted))
```

## RSA Decryption

Finally, **decrypt the message** using using **RSA-OAEP** with the RSA **private key**:

```py
decryptor = PKCS1_OAEP.new(keyPair)
decrypted = decryptor.decrypt(encrypted)
print('Decrypted:', decrypted)
```

## Sample Output

A **sample output** of the code execution for the entire example is given below:

```
Public key: (n=0x9a11485bccb9569410a848fb1afdf2a81b17c1fa9f9eb546fd1deb873b49b693a4edf20eb8362c085cd5b28ba109dbad2bd257a013f57f745402e245b0cc2d553c7b2b8dbba57ebda7f84cfb32b7d9c254f03dbd0188e4b8e40c47b64c1bd2572834b936ffc3da9953657ef8bee80c49c2c12933c8a34804a00eb4c81248e01f, e=0x10001)
-----BEGIN PUBLIC KEY-----
MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCaEUhbzLlWlBCoSPsa/fKoGxfB
+p+etUb9HeuHO0m2k6Tt8g64NiwIXNWyi6EJ260r0legE/V/dFQC4kWwzC1VPHsr
jbulfr2n+Ez7MrfZwlTwPb0BiOS45AxHtkwb0lcoNLk2/8PamVNlfvi+6AxJwsEp
M8ijSASgDrTIEkjgHwIDAQAB
-----END PUBLIC KEY-----
Private key: (n=0x9a11485bccb9569410a848fb1afdf2a81b17c1fa9f9eb546fd1deb873b49b693a4edf20eb8362c085cd5b28ba109dbad2bd257a013f57f745402e245b0cc2d553c7b2b8dbba57ebda7f84cfb32b7d9c254f03dbd0188e4b8e40c47b64c1bd2572834b936ffc3da9953657ef8bee80c49c2c12933c8a34804a00eb4c81248e01f, d=0x318ab12be3cf0d4a1b7921cead454fcc42ba070462639483394d6fb9529547827e9c8d23b294a8e01f8a1019da34e350f2307740e06a270bef1fe646e6ad213e31b528fdd5f5d03e633c07c44755ed622a629d79e822c095ebdf9cc80e517b5566dd3d3e5b16ec737987337a0e497fdba4b5ad97af41c1c3cdd87542a4637d81)
-----BEGIN RSA PRIVATE KEY-----
MIICXAIBAAKBgQCaEUhbzLlWlBCoSPsa/fKoGxfB+p+etUb9HeuHO0m2k6Tt8g64
NiwIXNWyi6EJ260r0legE/V/dFQC4kWwzC1VPHsrjbulfr2n+Ez7MrfZwlTwPb0B
iOS45AxHtkwb0lcoNLk2/8PamVNlfvi+6AxJwsEpM8ijSASgDrTIEkjgHwIDAQAB
AoGAMYqxK+PPDUobeSHOrUVPzEK6BwRiY5SDOU1vuVKVR4J+nI0jspSo4B+KEBna
NONQ8jB3QOBqJwvvH+ZG5q0hPjG1KP3V9dA+YzwHxEdV7WIqYp156CLAlevfnMgO
UXtVZt09PlsW7HN5hzN6Dkl/26S1rZevQcHDzdh1QqRjfYECQQDGDUIQXlOiAcGo
d5YqAGpWe0wzJ0UypeqZcqS9MVe9OkjjopCkkYntifdN/1oG7S/1KUMtLoGHqntb
c428zOO/AkEAxyV0cmuJbFdfM0x2XhZ+ge/7putIx76RHDOjBpM6VQXpLEFj54kB
qGLAB7SXr7P4AFrEjfckJOp2YMI5BreboQJAb3EUZHt/WeDdJLutzpKPQ3x7oykM
wfQkbxXYZvD16u96BkT6WO/gCb6hXs05zj32x1/hgfHyRvGCGjKKZdtwpwJBAJ74
y0g7h+wwoxJ0S1k4Y6yeQikxUVwCSBxXLCCnjr0ohsaJPJMrz2L30YtVInFkHOlL
i/Q4AWZmtDDxWkx+bYECQG8e6bGoszuX5xjvhEBslIws9+nMzMuYBR8HvhLo58B5
N8dk3nIsLs3UncKLiiWubMAciU5jUxZoqWpRXXwECKE=
-----END RSA PRIVATE KEY-----
Encrypted: b'99b331c4e1c8f3fa227aacd57c85f38b7b7461574701b427758ee4f94b1e07d791ab70b55d672ff55dbe133ac0bea16fc23ea84636365f605a9b645e0861ee11d68a7550be8eb35e85a4bde6d73b0b956d000866425511c7920cdc8a3786a4f1cb1986a875373975e158d74e11ad751594de593a35de765fe329c0d3dfbbfedc'
Decrypted: b'A message for encryption'
```

**Notes**:

* If you run the above example, your output will be different, because it generates different **random RSA key-pair** at each execution.
* Even if you **encrypt the same message several times** with the same public key, you will get **different output**. This is because the **OAEP** padding algorithm injects some randomness with the padding.
* If you try to **encrypt larger messages**, you will get and exception, because the 1024-bit key limits the maximum message length.

Now **play with the above code**, modify it and run it to learn how RSA works in action.

