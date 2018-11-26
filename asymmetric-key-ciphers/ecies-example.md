# ECIES \(Elliptic Curve Integrated Encryption Scheme\) - Example

Now, let's demonstrate how the **ECIES encryption scheme** works in practice in **Python**. We shall use a Python library [`eciespy`](https://kigawas.me/eciespy/):

```py
pip install eciespy
```

A sample Python code to generate public / private **key pair** and **encrypt** and **decrypt** a message using ECIES is:

```py
from ecies.utils import generate_eth_key
from ecies import encrypt, decrypt
import binascii

privKey = generate_eth_key()
privKeyHex = privKey.to_hex()
pubKeyHex = privKey.public_key.to_hex()
print("Encryption public key:", pubKeyHex)
print("Decryption private key:", privKeyHex)

plaintext = b'Some plaintext for encryption'
print("Plaintext:", plaintext)

encrypted = encrypt(pubKeyHex, plaintext)
print("Encrypted:", binascii.hexlify(encrypted))

decrypted = decrypt(privKeyHex, encrypted)
print("Decrypted:", decrypted)
```

The above code is pretty simple: just generate ECC **public + private key pair** using `ecies.utils.generate_eth_key()` and call the `ecies.encrypt(pubKey, msg)` and `decrypt(privKey, encryptedMsg)` functions from the `eciespy` library.

The **output** form the above code looks like this:

```
Encryption public key: 0x0dc8e06c055b45ecf110258ed5c0261ce2019b1bd0f8f226dcd010dade448b8f304a0915c68cdf7ddded8e4021d28fb92e27d08df695f48a0d2c41ddee750fc7
Decryption private key: 0x487fd8b53c471e3c38484a0fbe4751ace67a9ed28e60ea6b0b44c445b881f99d
Plaintext: b'Some plaintext for encryption'
Encrypted: b'045699078bbd101e270572d0d68e87a8f7b6cc377ebeeffb60d2fcac5dc7bdd86a26d7f79d13b92e923a0e2cdbe418a7856b27157ef150d5c72f4f8f312467d13221ebe7049b7ed2f0ed253bce13117129a7b01bb881b8dfbf004ff11f3ebed4c732744bc49ea03230c2d1b2ec80774e79c075431d2019464d3de97ceb96'
Decrypted: b'Some plaintext for encryption'
```

The Python `eciespy` library internally uses **ECC** cryptography over the **secp256k1** curve + **AES-256-GCM** authenticated encryption. Note that the above encrypted message holds together 4 values: `{cipherPubKey, AES-nonce, authTag, AES-ciphertext}`, packed in binary form and not directly visible from the above output.

