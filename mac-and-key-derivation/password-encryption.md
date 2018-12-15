# Secure Password Storage and Password-Based Authentication 

In software development we constantly use **password-based user authentication** and we need to **store user passwords securely** in a way that users can sign-up, authenticate and change their password, but in the same time attackers cannot decrypt the stored passwords back to clear text values, even if they manage to get access to the database holding the user accounts.

If we develop a Web site or Web app, we typically have admin panel, accessible after **login**, based on **username** + **password**. It is similar for mobile apps, web services and other password-protected systems: all they need **secure password storage** \(secure password management / strongly encrypted password storage\).

Developers often store the **user passwords** for their sites, apps or other systems in a **database**, just like any other user data, but most systems apply some kind of **hashing**, **encryption** or **password authentication scheme**. There are many ways to implement the **password storage** for password-based authentication. The most popular of them are given in the table below:

| **Approach** | **Security** | **Comments** |
| :--- | :--- | :--- |
| Clear-text passwords | Extremely low | Never do this: compromised server will render all passwords leaked |
| Simple password hash | Low | Vulnerable to dictionary attacks |
| Salted hashed passwords | Average | Vulnerable to GPU-based and ASIC-based password cracking |
| Secure KDF function \(like Argon2\) | High | Recommended, use strong KDF parameters |

Let's review these **password storage methods** and discuss their **level of security**, their strong and weak sides.

## Clear-Text Passwords - Never Do Anti-Pattern

The easiest and **most highly insecure** method for password-based authentication is to use **clear-text passwords** written directly in the database.

* **Never do this!!!** It is anti-pattern for software development. It is **bad for many reasons**.
* To **check the password**, just compare the password for checking with password from the database.
* Admins will be able to see user's passwords, but some users use the same password for GMail, Facebook, Twitter, etc. **Admins should never know user's passwords**, but should be able to change them in case of emergency.
* Another problem is that is someone hacks the server and gain access to the database, he will **see all user's passwords** in plaintext.
* It is **very bad practice** to keep plaintext passwords in any information system / app in the world!

## Simple Password Hash - Highly Insecure

A relative easy and **relatively insecure** method for password-based authentication is to use **password hash** like SHA-256\(password\), written directly in the database.

* **Avoid this!** It is highly **insecure** method. Why? Because hashes are vulnerable to **dictionary attacks**.
* To **check the password**, just compare the hash\(password for checking\) with the password hash from the database.
* Crackers who gain access to the database, can use a **dictionary** holding the hashes of the most commonly used 10-20 million passwords and most of the passwords will be decrypted. The dictionary attack process is **extremely fast**, because it compares the hashes from the dictionary with the password hash \(trivial **string compare**\).
* Search in Internet for [free **dictionaries** / wordlists for dictionary attack](https://www.google.com/search?q=password+cracking+dictionary+download). 

## Salted Hashed Passwords - Secure, but Not Enough

More complicated and **relatively secure** method for password-based authentication is to use **salted hashed passwords**, written in the database as pair { **salt** + **hash\(password + salt\)** }. The hash function can be any cryptographic hash like SHA-256.

* The idea is to keep different random **salt**, along with different **password hash**, changed every time, when the password is written in the database. Thus the same password is encrypted every time as different ciphertext { **salt** + **hash **}.
* To **check the password**, **calculate the hash** from the password for checking with the **salt** from the database. Compare the **calculated hash** with the **hash from the database**.
* This method works well to prevent dictionary attacks, but does not prevent **GPU**-based and **ASIC**-based password cracking attacks. It has also the same **security problems** like using hash\(key + msg\) instead of HMAC\(key, msg\), e.g. [length-extension attack](https://en.wikipedia.org/wiki/Length_extension_attack).
* Basically keeping **salted hashed passwords** is more secure than the previous ones, but still **avoid it**. Just use better password hashing function instead of simple hash.

## Secure KDF-Based Password Hashing - Recommended

The most complicated and **most secure** method for password-based authentication is to use **KDF-based password hash**, written in the database as pair { **salt** + **KDF\(password, salt\)** }. The **key-derivation function** \(KDF\) should be strong and secure, e.g. **Scrypt** or **Argon2** with carefully selected parameters.

* The idea is to keep different random **salt** for each encrypted password, along with the **key** derived by a secure KDF-function, such as **Scrypt** or **Argon2** \(with reasonable number of iterations and RAM consumption settings\).
* To **check the password**, take the **salt** from the database and **derive a key** from the password for checking, using the same KDF function and KDF parameters like when the password was stored in the database. Compare the **derived key** with the **key from the database**.
* This method is **resistant to most attacks** and is considered as standard in the software industry. It is as **secure** as the KDF function with the selected KDF parameters.

**Conclusion**: use secure KDF functions like **Argon2** and **Scrypt** to keep encrypted passwords in the database. Never use plain-text passwords!



