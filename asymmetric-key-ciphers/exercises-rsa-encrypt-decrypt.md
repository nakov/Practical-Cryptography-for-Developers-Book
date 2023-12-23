# Exercises: RSA Encrypt / Decrypt

In this exercise you shall **encrypt** and **decrypt** messages using the **RSA** public-key cryptosystem.

## Encrypt Message with RSA-OAEP

You are given a **text message** and a **RSA public key** (in PEM format). Write a program to **encrypt the message**, using the [**RSA-OAEP**](https://en.wikipedia.org/wiki/Optimal\_asymmetric\_encryption\_padding) encryption scheme (RSA + PKCS#1 OAEP padding).

**Input**:

* First line: the input **message**
* Next few lines: the **RSA public key** (in the [PKCS#8](https://en.wikipedia.org/wiki/PKCS\_8) [PEM](https://en.wikipedia.org/wiki/Privacy-Enhanced\_Mail) [ASN.1](https://en.wikipedia.org/wiki/Abstract\_Syntax\_Notation\_One) format)
* The public key length can be 512 bits, 1024 bits, 2048 bits, 3072 bits or 4096 bits.

**Output**:

* The **encrypted message**, printed as **hex** string.

Write your code in programming language of choice.

**Sample input**:

```
Secret message
-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMYhCcGpfoebriBbFaUMMwH3B5t7udir
ODJehnQTPlWLf9SVfQdx0v9ATJ2Rs5kQjdJ/wZYunMBVq6/FhgPZexsCAwEAAQ==
-----END PUBLIC KEY-----
```

The above input uses a **512-bit RSA public key** and a small plain text message, that can fit inside the key length (after the OAEP padding).

**Sample output** (for the above input):

```
218dd78c5e14b4d58efd10575b521db46c0caa5c699134abf18bbeeac170cfe446e25d0d82257082539e4ccd3e0aa8bffc1b07d2bde9e635a7b9b7fc6cf4c266
```

Note: the above output should be **different at each execution** due to the randomness injected by the OAEP padding algorithm.

## Decrypt a Message with RSA-OAEP

You are given a RSA-OAEP-encrypted ciphertext (as hex string) and a **RSA private key** (in PEM format). Write a program to **decrypt the message**, using the [**RSA-OAEP**](https://en.wikipedia.org/wiki/Optimal\_asymmetric\_encryption\_padding) encryption scheme (RSA + PKCS#1 OAEP padding).

**Input**:

* First line: the **ciphertext** (the encrypted message), given as **hex** string
* Next few lines: the **RSA private key** (in the [PKCS#8](https://en.wikipedia.org/wiki/PKCS\_8) [PEM](https://en.wikipedia.org/wiki/Privacy-Enhanced\_Mail) [ASN.1](https://en.wikipedia.org/wiki/Abstract\_Syntax\_Notation\_One) format)

**Output**:

* Print the **decrypted message** as plain text
* Print `Decryption failed!` in case of problem

Write your code in programming language of choice.

**Sample input**:

```
218dd78c5e14b4d58efd10575b521db46c0caa5c699134abf18bbeeac170cfe446e25d0d82257082539e4ccd3e0aa8bffc1b07d2bde9e635a7b9b7fc6cf4c266
-----BEGIN RSA PRIVATE KEY-----
MIIBOgIBAAJBAMYhCcGpfoebriBbFaUMMwH3B5t7udirODJehnQTPlWLf9SVfQdx
0v9ATJ2Rs5kQjdJ/wZYunMBVq6/FhgPZexsCAwEAAQJAbNSzBkTzMswqHq3Juupz
jk3CSP7ye/i5Grnfgx0a7WOGpVrEDQNo0iihEf5pRAfaazEdfJX2Tj+auuv06392
kQIhAOeJahRwOt8cYroLZzHHf7LWQglRaTbtKShqmbLdBZMzAiEA2xADyA3xGXcl
txN0DOfSycwFyqkdlfsuyAwKibPteHkCIQDJ1P6UzHR1UwA434HYYejOU3mDN+V4
zOoI4kwTIBohAwIgLrqv09EFiUUdSnxf2RDqqhlXcu+4W/IE/K904AL9uSECICeT
tkAnJHB7k6fvox6ErJV53w06bUF1jGw8yHuaCcHX
-----END RSA PRIVATE KEY-----
```

The above input uses a **512-bit RSA private key** and an encrypted **ciphertext** of the same length.

**Sample output** (for the above input):

```
Secret message
```

Another **sample input** (wrong 512-bit private key):

```
218dd78c5e14b4d58efd10575b521db46c0caa5c699134abf18bbeeac170cfe446e25d0d82257082539e4ccd3e0aa8bffc1b07d2bde9e635a7b9b7fc6cf4c266
-----BEGIN RSA PRIVATE KEY-----
MIIBOQIBAAJBAJd0kbrC4AxpcqBgWVPpb8IoI/kdQkF1twrfQtoMkHgB71vpY6Sg
68CUA7Ejq/dbAHlvFdXqwEK9vXH3kFpc8pcCAwEAAQJAaFrlXm2Pun2dgWthoTOi
0YCe6LKESF43dMJIab1mfYiltrSpGaoTXLvHR+NaAgqcr9KAH24Mi05ttUBcWRsI
QQIhAOLTSyeDZnq5rqdwBlU8p6USpeImRhWRNcCHA/QLxcaPAiEAqu+O1p1YB3Mp
GKgB9PvZE3TZqmlgtEFmSMYinF3g13kCIF9FjpCXMYkkysZLWG2e32+HaKOXneJb
Lq+iRjfQZg7jAiBcm6D1YRV6I8gWFZ/JzFBVHC95BdJgljYGI2JI+QuBcQIgLJjH
IPctSCUtukz+7fdeOdw/0FINcUGvnQyuEK34UxE=
-----END RSA PRIVATE KEY-----
```

The corresponding **output** should be:

```
Decryption failed!
```

Note that the **RSA-OAEP** padding algorithm has built-in checksum, which allows to detect incorrect decryption attempts, but it is not an authenticated encryption scheme.

## \* Implement Hybrid Encryption / Decryption with RSA-KEM

Write a program to **encrypt** a large message (bigger than the RSA key length, e.g. a PDF document) using the **RSA-KEM** hybrid encryption scheme with **AES** symmetric encryption (use block mode of choice, e.g. **GCM** or **CTR**).

**Hint**:

* Check this example first: [https://github.com/digitalbazaar/forge#rsakem](https://github.com/digitalbazaar/forge#rsakem).
* Note that in some languages it is hard to find and **RSA-KEM** implementation, so you can skip this exercise or use another **hybrid encryption scheme** (e.g. RSA + AES + HMAC).

**Input**:

* The **message** for encryption
* RSA **public key** (in PEM format)

**Output**:

* The encrypted **ciphertext** (hex string)
* The random **IV** salt for the AES cipher (hex string)
* The authentication **tag** / **MAC** for the encrypted message (hex string)
* The **encapsulated secret key** for the AES algorithm (hex string)

Write a program to **decrypt** given encrypted message, produced by the previous exercise, using the **RSA-KEM** hybrid encryption scheme with **AES** symmetric encryption (use block mode of choice, e.g. **GCM** or **CTR**).

**Input**:

* The encrypted **ciphertext** (hex string)
* The random **IV** salt for the AES cipher (hex string)
* The authentication **tag** / **MAC** for the encrypted message (hex string)
* The **encapsulated secret key** for the AES algorithm (hex string)

**Output**:

* The decrypted original plaintext **message**
* Print `Decryption failed!` if the message decryption is not successful (e.g. wrong password)
