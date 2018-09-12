# PBKDF2: Derive Key from Password

**PBKDF2** is a simple cryptographic key derivation function, which is resistant to [dictionary attacks](https://en.wikipedia.org/wiki/Dictionary_attack) and [rainbow table attacks](https://en.wikipedia.org/wiki/Rainbow_table). It is based on iteratively deriving **HMAC** many times with some padding. The **PBKDF2** algorithm is described in the Internet standard [RFC 2898 \(PKCS \#5\)](http://ietf.org/rfc/rfc2898.txt).

**PBKDF2** takes several **input parameters** and produces the derived **key** as output:

```
key = pbkdf2(password, salt, iterations-count, hash-function, derived-key-len)
```

Technically, the **input data** for **PBKDF2** consists of:

* `password` – array of bytes / string, e.g. "_p@$Sw0rD~3_" \(8-10 chars minimal length is recommended\)
* `salt` – securely-generated random bytes, e.g. "_df1f2d3f4d77ac66e9c5a6c3d8f921b6_" \(minimum 64 bits, 128 bits is recommended\)
* `iterations-count`, e.g. 1024 iterations
* `hash-function` for calculating **HMAC**, e.g. `SHA256`
* `derived-key-len` for the output, e.g. 32 bytes \(256 bits\)

The **output data** is the **derived key** of requested length \(e.g. 256 bits\).

## PBKDF2 and Number of Iterations

**PBKDF2** allows to configure the number of **iterations** and thus to configure the time required to derive the key.

* **Slower key derivation** means high login time / slower decryption / etc. and **higher resistance** to password cracking attacks.
* **Faster key derivation** means short login time / faster decryption / etc. and **lower resistance** to password cracking attacks.
* **PBKDF2** is **not resistant** to [GPU attacks](https://security.stackexchange.com/questions/118147/how-are-gpus-used-in-brute-force-attacks) \(parallel password cracking using video cards\) and to [ASIC attacks](https://en.wikipedia.org/wiki/Custom_hardware_attack) \(specialized password cracking hardware\). This is the main motivation behind more modern KDF functions.

## PBKDF2 - Example

Try **PBKDF2 key derivation** online here: [https://asecuritysite.com/encryption/PBKDF2z](https://asecuritysite.com/encryption/PBKDF2z).

![](/assets/PBKDF2-calculator.png)

Try to **increase the iterations count** to see how this affects the speed of key derivation.

## PBKDF2 Calculation in Python - Example

Now, we shall write some **code in Python** to derive a key from a password using the **PBKDF2** algorithm.

First, install the Python package `backports.pbkdf2` using the command:

```
pip install backports.pbkdf2
```

Now, write the Python code to calculate PBKDF2:

```python
import os, binascii
from backports.pbkdf2 import pbkdf2_hmac

salt = binascii.unhexlify('aaef2d3f4d77ac66e9c5a6c3d8f921d1')
passwd = "p@$Sw0rD~1".encode("utf8")
key = pbkdf2_hmac("sha256", passwd, salt, 50000, 32)
print("Derived key:", binascii.hexlify(key))
```

The **PBKDF2** calculation function takes several **input parameters**: **hash function** for the HMAC, the **password** \(bytes sequence\), the **salt** \(bytes sequence\), **iterations** count and the output **key length** \(number of bytes for the derived key\).

The **output** from the above code execution is the following:

```
Derived key: b'52c5efa16e7022859051b1dec28bc65d9696a3005d0f97e506c42843bc3bdbc0'
```

Try to change the number of **iterations** and see whether and how the **execution time** changes.

## When to Use PBKDF2?

Today **PBKDF2** is considered old-fashioned and less secure than modern KDF functions, so it is recommended to use **Bcrypt**, **Scrypt** or **Argon2** instead. We shall explain all these KDF functions in details later in this section.

