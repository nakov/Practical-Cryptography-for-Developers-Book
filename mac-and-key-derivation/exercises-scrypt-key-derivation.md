# Exercises: Scrypt Key Derivation and Password Hashing

In this exercise, we shall use **Scrypt** to derive keys by password.

## Derive a Key by Password using Scrypt

Write a program to **calculate 128-bit key** by given string **password** and **salt** \(in hex\), using the **Scrypt** algorithm. Use the following Scrypt settings: **16384** iterations, block size **16**, parallel factor **1**. The output from your algorithm is the **derived-key** \(in hex\). Write your code in programming language of choice.

| **Input** | **Output** |
| :--- | :--- |
| **Password:** p@ss~123**<br>Salt:** 546865207175696a | ce6e7b86490db184499f82639298dee3 |
| **Password:** p@ss~123**<br>Salt:** 8ac8ccf364f234fa | baa1de36036d8a69b7340d314fcd7895 |

**Notes**: if you use **Python** and **`pip install scrypt`**, you might need to install first [**OpenSSL**](https://www.openssl.org/).

**Hint**: modify the Python code from the Scrypt example.

## Scrypt: Encrypt a Password

Write a program to encrypt given string password using the **Scrypt** algorithm (**16384** iterations, block size **16**, parallel factor **1**, using **random 64-bit salt**, derived key length = **256 bits**). Print the output in the following format:
```
$scrypt$16384$16$1$salt$hash
```

Sample input and output are given below. Note that due to the **randomness in the salt**, your code will produce similar, but different result:

| **Input** | **Output** |
| :--- | :--- |
| p@ss~123 | $scrypt$16384$16$1$546865207175696a$ce6e7b86490db184499f82639298dee38087470c11e01236f10740545ea54bd2 |
| p@ss~123 | $scrypt$16384$16$1$8ac8ccf364f234fa$baa1de36036d8a69b7340d314fcd78954dc4e8fb271b0733396047a71651bb0e |
| hello^123 | $scrypt$16384$16$1$1122334455667788$b1d1c1340ff958f09cfa37d35f4fb6edb65ca40b9abfbc19e0dad509236b38fe |

**Hint**: modify the Python code from the Scrypt example and format the code as shown in the sample output.

## Scrypt: Verify a Password

Write a program to **verify a password** against given encrypted **Scrypt** password in the following format:
```
$scrypt$16384$16$1$salt$hash
```

Take as input the **Scrypt encrypted password string** + the **password** for verification. Print as output either `true` or `false`. Use this program to verify the encrypted passwords from your previous program.

Sample input and output:

| **Input** | **Output** |
| :--- | :--- |
|p@ss~123<br>$scrypt$16384$16$1$546865207175696a$ce6e7b86490db184499f82639298dee38087470c11e01236f10740545ea54bd2 |true|
|wrong!pass<br>$scrypt$16384$16$1$546865207175696a$ce6e7b86490db184499f82639298dee38087470c11e01236f10740545ea54bd2|false|
|hello^123<br>$scrypt$16384$16$1$1122334455667788$b1d1c1340ff958f09cfa37d35f4fb6edb65ca40b9abfbc19e0dad509236b38fe |true|

**Hints**:
  * Read the **Scrypt** algorithm settings from the input encrypted string.
  * Using the algorithm settings and the **salt** from the input, derive a **256-bit key** from the **input password**.
  * Compare the **derived key** with the **hash** from the input.
