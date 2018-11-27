# Block Ciphers, Stream Ciphers, Block Modes and Padding

In cryptography [**block ciphers**](https://en.wikipedia.org/wiki/Block_cipher) \(like AES\) are designed to **encrypt a block** of data of **fixed size** \(e.g. 128 bits\). The size of the input block is usually the same as the size of the encrypted output block, while the key length may be different.

[**Stream ciphers**](https://en.wikipedia.org/wiki/Stream_cipher) are more flexible: they are designed to encrypt **data of arbitrary size** \(e.g. a PDF document\), that may sometimes come as a **stream** \(sequence of bytes or frames, e.g. video streaming\).

Most of the popular symmetric key encryption algorithms are **block ciphers**, but cryptographers have proposed several schemes to **transform a block cipher into a stream cipher** and encrypt data of arbitrary size. These schemes are known as "[**block cipher modes of operation**](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation)" and are applicable for most block ciphers like **AES**, **RC6**, **Camellia**, **Serpent** and many others.

When a **symmetric cipher** is combined with **block mode of operation**, the obtained cipher construction is denoted by the names of the cipher and the block mode and the key size. Examples:

* **AES-256-GCM** - the AES cipher with a 256-bit encryption key and GCM block mode
* **AES-128-CTR** - the AES cipher with a 128-bit encryption key and CTR block mode
* Serpent-128-CBC - the Serpent cipher with 128-bit encryption key and CBC block mode

## Block Cipher Modes \(CBC, CTR, GCM, ...\)

The main idea behind the [**block cipher modes**](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation) \(like CBC, CFB, OFB, CTR, EAX, CCM and GCM\) is to repeatedly apply a cipher's single-block encryption / decryption to securely encrypt / decrypt amounts of data larger than a block.

Some block modes \(like CBC\) require the input to be **split into blocks** and the final block to be **padded** to the block size using a **padding algorithm** \(e.g. add a special padding character\). Other block modes \(like CTR, CFB, OFB, CCM, EAX and GCM\) **do not require padding** at all, because they perform XOR between portions of the plaintext and the internal cipher's state at each step.

Basically, **encrypting a large input data** works like this: the encryption algorithm **state** is initialized, then the first portion of data \(e.g. a block or part of block\) is **encrypted**, then **the encryption state is transformed** \(using the **encryption key** and other parameters\), then the next portion is **encrypted**, then the encryption state is **transformed** again and the next portion is then **encrypted** and so on, until all the input data is processed. The **decryption** works in a very similar way.

This is what developers should know about the "[**block cipher modes of operation**](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation)" in order to use them correctly.

* Commonly used **secure block modes** are **CBC** \(Cipher Block Chaining\), **CTR** \(Counter\) and **GCM** \(Galois/Counter Mode\), which require a random initialization vector \(**IV**\) at the start.

* The "[**Counter \(CTR\)**](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Counter_%28CTR%29)" block mode is **good choice** in the most cases because of strong security, arbitrary input data length \(without padding\) and parallel processing capabilities. It does not provide authentication and integrity, just encryption.

* The [**GCM**](https://en.wikipedia.org/wiki/Galois/Counter_Mode) \(Galois/Counter Mode\) block mode takes all the advantages of the **CTR** mode and adds message **authentication** \(produces a cryptographical message authentication tag\). **GCM** is fast and efficient way to implement **authenticated encryption** in symmetric ciphers and it is **highly recommended** in the general case.

* The CBC mode works in block of fixed size. Thus a [**padding algorithm**](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Padding) should be used to make the last block the same length after splitting the input data into blocks. Most applications use the [**PKCS7 padding scheme**](https://en.wikipedia.org/wiki/Padding_%28cryptography%29#PKCS#5_and_PKCS#7) or [**ANSI X.923**](https://en.wikipedia.org/wiki/Padding_%28cryptography%29#ANSI_X.923).

* Well-known **insecure block mode** is [**ECB**](https://en.wikipedia.org/wiki/Block_cipher_mode_of_operation#Electronic_Codebook_%28ECB%29) \(Electronic Codebook\), which encrypts equal input blocks as equal output blocks \(does not provide [cryptographic diffusion](https://en.wikipedia.org/wiki/Confusion_and_diffusion)\). **Don't use it! **It may compromise the entire encryption.

### CTR \(Counter\) Block Mode

The diagram below illustrates how portions \(blocks\) of the plaintext are encrypted one after another in the **CTR block mode** of operation using a block cipher:

![](/assets/CTR-block-mode.png)

For each block in CTR mode a new unpredictable **keystream block** is generated based on the **initial vector** \(IV, sometimes called "nonce"\) + the **current counter** \(01, 02, 03, ...\) + the secret **encryption key** and the **input block** is merged by **XOR** with the current keystream block to produce the **output block**. In the CTR mode the final portion of the input data can be shorter then the cipher block size, so padding is not needed. The input data \(before encryption\) and the output data \(after encryption\) have the **same length**.

### GCM \(Galois/Counter\) Block Mode

The following diagram explains visually how the **GCM block mode** \(Galois/Counter Mode\) works:![](/assets/GCM-Galois_Counter_Mode.png)...

TODO

TODO

TODO

...

### Choosing a Cipher Block Mode

It is recommended to use either **CTR** \(Counter\) or **GCM** \(Galois/Counter\) block modes with symmetric ciphers like **AES**, **RC6**, **Camellia** and **Serpent**. The others might be helpful in certain situations, but some of them are less secure, so use them only if you know well what are you doing.

The **CTR** and **GCM **encryption modes have many advantages: they are **secure** \(no significant flaws are currently known\), can encrypt data of **arbitrary length** without padding, can encrypt and decrypt the blocks **in parallel** \(in multi-core CPUs\) and provide **random \(unordered\) access** to the encrypted blocks, so they are suitable for encrypting crypto-wallets, documents and streaming video \(where users can seek by time\). **GCM** provides also message authentication and is **the recommended choice** for cipher block mode in the general case.

Note that the **GCM**, **CTR** and other block modes **reveal the length of the original message**. The length of the plaintext message is the same as the ciphertext length. If you want to avoid revealing the original plaintext length, you can add some random bytes to the plaintext before the encryption and remove them after decryption \(this will be some kind of padding\).

### The Initialization Vector \(IV\)

Always use **random and unpredictable IV** for each encrypted message. It is a common mistake to encrypt multiple messages with the same symmetric key and using the same IV. This opens a space for various crypto attacks for the most block modes. 

For the **GCM** mode the IV may not be secret and unpredictable, but should be different for each message.

### Authenticated Encryption

In cryptography the concept of "[**authenticated encryption**](https://en.wikipedia.org/wiki/Authenticated_encryption)" \(**AE**\) refers to a scheme to **encrypt data** and simultaneously calculate an **authentication code** \(authentication tag / MAC\), used to provide message **authenticity** and **integrity**. If authenticated encryption scheme is used, at the moment of decryption it will be known if the **decryption is successful** \(i.e. whether the decryption key / password was correct and whether the encrypted data was not tampered\). Authenticated encryption \(AE\) is related to the similar concept [**authenticated encryption with associated data**](https://en.wikipedia.org/wiki/Authenticated_encryption#Authenticated_encryption_with_associated_data_%28AEAD%29)** \(AEAD\)**, which a more secure variant of AE. **AEAD** binds associated data \(AD\) to the ciphertext and to the **context** where it's supposed to appear, so that attempts to "cut-and-paste" a valid ciphertext into a different context can be detected and rejected.

Some encryption schemes \(like **ChaCha20-Poly1305** and **AES-GCM**\) provide **integrated authenticated encryption** \(AEAD\), while others \(like **AES-CBC** and **AES-CTR**\) need authentication to be added additionally.

