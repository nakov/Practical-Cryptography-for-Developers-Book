# Password Encryption: Encrypting User Passwords

In software development we constantly use **password-based user authentication**. For example, if we have a Web site, we typically have admin panel, accessible after **login** \(based on **username** + **password**\).

Developers often need to keep **user passwords** in the database. There are many ways to implement password-based authentication.

## Clear-Text Passwords - Never Do Anti-Pattern

The easiest and **most insecure** method for password-based authentication is to use **clear-text passwords** written directly in the database.

* **Never do this!!!** It is anti-pattern for software development. It is **bad for many reasons**.
* Admins will be able to see user's passwords, but some users use the same password for GMail, Facebook, Twitter, etc. **Admins should never know user's passwords**, but should be able to change them in case of emergency.
* Another problem is that is someone hacks the server and gain access to the database, he will **see all user's passwords** in plaintext.
* It is **very bad practice** to keep plaintext passwords in any information system / app in the world!

## Simple Password Hash - Highly Insecure

A relative easy and relatively insecure method for password-based authentication is to use **password hash** like SHA-256\(password\), written directly in the database.

* **Avoid this!** It is highly **insecure** method. Why? Because hashes are vulnerable to **dictionary attacks**.
* Crackers who gain access to the database, can use a **dictionary** holding the hashes of the most commonly used 10 million passwords and most passwords will be decrypted. The dictionary attack process is **extremely fast**, because it compares the hashes from the dictionary with the password hash \(trivial **string compare**\).
* Search in Internet for [free **dictionaries** / wordlists for dictionary attack](https://www.google.com/search?q=password+cracking+dictionary+download). 

## Salted Hashed Passwords - Secure, but Not Enough

More complicated and relatively secure method for password-based authentication is to use **salted hashed passwords**, written in the database as pair { **salt** + **hash\(password + salt\)** }. The hash function can be any cryptographic hash like SHA-256.

* The idea is to keep different random **salt**, along with different **password hash**, changed every time, when the password is written in the database. Thus the same password is encrypted every time as different ciphertext { **salt** + **hash **}.
* This method works well to prevent dictionary attacks, but does not prevent **GPU**-based and **ASIC**-based password cracking attacks. It has also the same **security problems** like using hash\(key + msg\) instead of HMAC\(key, msg\), e.g. [length-extension attack](https://en.wikipedia.org/wiki/Length_extension_attack).
* Basically keeping **salted hashed passwords** is more secure than the previous ones, but still **avoid it**. Just use better password hashing function instead of simple hash.

## Secure KDF-Based Password Hashing - Recommended

* **KDF-based password hashing**: passwords written in the database as pair { **salt** + **KDF\(password, salt\)** }
  * The idea is to keep different random salt for each encrypted password, along with the key derived by a secure KDF-function, such as **Scrypt** of **Argon2**.



