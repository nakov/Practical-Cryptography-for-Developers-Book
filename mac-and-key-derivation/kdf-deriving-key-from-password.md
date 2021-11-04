# KDF: Deriving Key from Password

Now let's explain in details how to **securely derive a key from a password** and the most popular **key derivation functions** \(**KDFs**\) used in practice: [PBKDF2](https://en.wikipedia.org/wiki/PBKDF2), [Bcrypt](https://en.wikipedia.org/wiki/Bcrypt), [Scrypt](https://en.wikipedia.org/wiki/Scrypt) and [Argon2](https://en.wikipedia.org/wiki/Argon2).

**\[TODO: explain the Linux crypt: SHA-512 key derivation\]**    
  
We shall discuss the strong and weak sides of the above mentioned KDFs and when to use them.

## Key Derivation Functions - Concepts

In cryptography we often use **passwords** instead of **binary keys**, because passwords are easier to remember, to write down and can be shorter.

When a certain algorithm needs a **key** \(e.g. for encryption or for digital signing\) a **key derivation function** \(password -&gt; key\) is needed.

We already noted that using `SHA-256(password)` as key-derivation is insecure! It is vulnerable to many attacks: **brute-forcing**, **dictionary attacks**, **rainbow attacks** and others, which may reverse the hash in practice and attacker can obtain the password.

## Cryptographic Key Derivation Functions

[PBKDF2](https://en.wikipedia.org/wiki/PBKDF2), [Bcrypt](https://en.wikipedia.org/wiki/Bcrypt), [Scrypt](https://en.wikipedia.org/wiki/Scrypt) and [Argon2](https://en.wikipedia.org/wiki/Argon2) are significantly stronger key derivation functions and are designed to survive password guessing \(brute force\) attacks.

By design **secure key derivation functions** use **salt** \(random number, which is different for each key derivation\) + **many iterations** \(to speed-down eventual password guessing process\). This is a process, known as [**key stretching**](https://en.wikipedia.org/wiki/Key_stretching).

To calculate a secure KDF it takes some **CPU time** to derive the key \(e.g. 0.2 sec\) + some **memory \(RAM\)**. Thus deriving the key is "computationally expensive", so password cracking will also be computationally expensive.

When a modern KDF function is used with appropriate config parameters, **cracking passwords** will be **slow** \(e.g. 5-10 attempts per second, instead of thousands or millions attempts per second\).

All of the above mentioned key-derivation algorithms \([PBKDF2](https://en.wikipedia.org/wiki/PBKDF2), [Bcrypt](https://en.wikipedia.org/wiki/Bcrypt), [Scrypt](https://en.wikipedia.org/wiki/Scrypt) and [Argon2](https://en.wikipedia.org/wiki/Argon2)\) are not patented and are **royalty-free** for public use.

Let's learn more about these modern KDF.

