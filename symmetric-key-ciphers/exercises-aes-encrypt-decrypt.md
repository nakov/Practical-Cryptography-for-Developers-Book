# Exercises: AES Encrypt / Decrypt

In this exercise we shall **encrypt** and **decrypt** a text message using a symmetric cipher **AES-CBC-256**, combined with **Scrypt** password-to-key derivation and **HMAC** message authentication code. In fact we shall implement a **password-based symmetric authenticated encryption scheme**.

## Symmetric Encryption (AES + Scrypt + HMAC)

Write a program to **encrypt** a text **message** using given **password**. Use the following steps:

* Derive a **512-bit key** from the **password** using **Scrypt** (n=16384, r=16, p=1) with random **salt** (128 bits).
  * Split the derived key into two **256-bit** sub-keys: **encryption key** and **HMAC key**.
* **Pad** the input message using the **PKCS7** algorithm to length, which is multiple of **16 bytes** (128 bits).
* **Encrypt** the padded message using **AES-256-CBC** using the **encryption key**. The obtained result is the **ciphertext**. Its length should be a multiple of 16 bytes (128 bits), which is the block size in the AES cipher.
  * Use a randomly generated 128-bit initial vector (**IV**).
* Calculate message authentication code (**MAC**) using **HMAC-SHA256**(**hmac\_key**, **ciphertext**).

**Input**: **message** + **password** (space separated).

**Output**: **JSON** document (see the example below), holding the following assets:

* The Scrypt randomly-generated **salt** (in hex format).
* The randomly-generated **iv** (in hex format), used for the AES cipher.
* The encrypted message **ciphertext** (in hex format) from the **AES** cipher.
* The message authentication code - **mac** (in hex format).

Write your code in programming language of choice.

|                                               |                                                                                                                                                                                                                                                                     |
| --------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Input**                                     | **Output**                                                                                                                                                                                                                                                          |
| **p@sSw0rd\~123** SecretMsg                   | {"**salt**": "9757a3a22a9937ca0e0f2b5f2a4a11b4", "**iv**": "2ce8c035d50f7a6ee6509c14fe11725a", "**ciphertext**": "bb435d8ad048c240b50f0e4a191605d9", "**mac**": "02cf870ad1f7453c339dac06edbd648c455f5e8abbf6f2716cbc2d164b644200"}                                 |
| **stupid!pass** longer-message-for-encryption | {"**salt**": "b243f0ac10ef358ff0d37f1e30ef19c2", "**iv**": "fdeff97e89705289d99751f079e2a308", "**ciphertext**": "ea76bc60799c5824627a8c1276b48ab70e24011b6654f8ffb019a4f6876485af", "**mac**": "34085e1a47ae53e154b7466336efee386c2f1ed61a0105183ef016af794da58f"} |

Note that the above input will be different in your case, bеcause of the randomly generated **salt** and **iv**.

## Symmetric Decryption (AES + Scrypt + HMAC)

Write a program to **decrypt** an **encrypted message** (coming as input) using given **password**.

* Derive a **512-bit key** from the **password** using **Scrypt** (n=16384, r=16, p=1) with the **salt** (from the JSON).
  * Split the derived key into two 256-bit sub-keys: **encryption key** and **HMAC key**.
* Calculate message authentication code (**MAC**) using **HMAC-SHA256**(**hmac\_key**, **ciphertext**).
  * **Compare** the MAC with the MAC in the JSON document.
  * Same MAC means "correct password / successful decryption".
  * Different MAC means "wrong password / incorrect input data".
* **Decrypt** the **ciphertext** from the input using **AES-256-CBC** using the **encryption key** and the **IV** from the JSON.
* **Unpad** the decrypted message using the **PKCS7** algorithm from length, which is multiple of **16 bytes** (128 bits) to its original length (usually smaller).

**Input**: password + JSON (space separated). The JSON is in exactly the same format, like in the output from the previous exercise (it holds **salt**, **iv**, **ciphertext** and **mac**, all as **hex** numbers)

**Output**: `Decrypted:` + the original **decrypted message** or the text `Decryption failed!` in case or wrong password or other problem.

Write your code in programming language of choice.

|                                                                                                                                                                                                                                                       |                      |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------- |
| **Input**                                                                                                                                                                                                                                             | **Output**           |
| **p@sSw0rd\~123** {"**salt**": "9757a3a22a9937ca0e0f2b5f2a4a11b4", "**iv**": "2ce8c035d50f7a6ee6509c14fe11725a", "**ciphertext**": "bb435d8ad048c240b50f0e4a191605d9", "**mac**": "02cf870ad1f7453c339dac06edbd648c455f5e8abbf6f2716cbc2d164b644200"} | Decrypted: SecretMsg |
| **wrong!pass** {"**salt**": "9757a3a22a9937ca0e0f2b5f2a4a11b4", "**iv**": "2ce8c035d50f7a6ee6509c14fe11725a", "**ciphertext**": "bb435d8ad048c240b50f0e4a191605d9", "**mac**": "02cf870ad1f7453c339dac06edbd648c455f5e8abbf6f2716cbc2d164b644200"}    | Decryption failed!   |
