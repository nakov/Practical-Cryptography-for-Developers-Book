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

The easiest and **most highly insecure** method for password storage and password-based authentication is to use [**clear-text passwords**](https://en.wikipedia.org/wiki/Plaintext) written directly in the database.

* In this scenario to **check the password**, developers just compare the password for checking with the password from the database.
* **Never do this!!!** It is anti-pattern for software development. It is **bad for many reasons**.
  * Admins will be able to see user's passwords and this is really bad, because many users use **the same password for several sites / apps**, e.g. the same password for GMail, Facebook and Twitter.
  * **Admins should never know user's passwords**, but should be able to change them in case of emergency.
  * If someone hacks the server and gains access to the database, he will **see all user's passwords** in plaintext.
* It is **very bad practice** to keep plaintext passwords in any information system / app in the world!
  * Just don't do it!

## Simple Password Hash - Highly Insecure

A relatively easy and **relatively insecure** method for password storage and password-based authentication is to use **simple password hash** like **SHA-256**\(password\), written directly in the database.

* In this scenario to **check the password**, developers just compare the **hash**\(_password for checking_\) with the password hash from the database.
* **Avoid this!** It is highly **insecure** method.
  * Why? Because hashes are vulnerable to [**dictionary attacks**](https://en.wikipedia.org/wiki/Dictionary_attack).
  * Crackers who gain access to the database, can use a **dictionary** holding the hashes of the most commonly used 10-20 million passwords and most of the passwords will be decrypted.
  * The dictionary attack process is **extremely fast**, because it compares the hashes from the dictionary with the password hash \(trivial **string compare**\).
  * Search in Internet for [free **dictionaries** / wordlists for dictionary attack](https://www.google.com/search?q=password+cracking+dictionary+download).
* Cracked passwords, revealed as plaintext are a true disaster, because most users use the **same password for several sites / apps**.

## Salted Hashed Passwords - Secure, but Not Enough

More complicated and **relatively secure** method for password storage and password-based authentication is to use **salted hashed passwords**, written in the database as pair { **salt** + **hash\(password + salt\)** }. The hash function can be any strong cryptographic hash like SHA-256.

* The idea is to keep different random **salt**, along with different **password hash**, changed every time, when the password is written in the database. Thus the same password is encrypted every time as different ciphertext { **salt** + **hash **}.
* To **check the password**, developers **calculate the hash**\(password for checking\) using the **salt** from the database and compare the **calculated hash** with the **hash from the database**.

* This method works well to prevent dictionary attacks, but does not prevent **GPU**-based and **ASIC**-based brute force password cracking attacks.
* It has also the same **security problems** like using hash\(key + msg\) instead of HMAC\(key, msg\), e.g. [length-extension attack](https://en.wikipedia.org/wiki/Length_extension_attack).
* Basically keeping **salted hashed passwords** is more secure than the previous methods, but still **avoid it**.
  * Use more attack-resistant password hashing function \(which is unlikely to be brute-forced\) instead of simple hash.

## Secure KDF-Based Password Hashing - Recommended

The most complicated and **most secure** method for secure password storage and password-based authentication is to use **KDF-based password hash**, written in the database as pair { **salt** + **KDF\(password, salt\)** }. The **key-derivation function** \(KDF\) should be strong and secure, e.g. **Scrypt** or **Argon2** with carefully selected parameters.

* The idea is to keep different random **salt** for each encrypted password, along with the **key** derived by a secure KDF-function, such as **Scrypt** or **Argon2** \(with reasonable number of iterations and RAM consumption settings\).
* To **check the password**, take the **salt** from the database and **derive a key** from the password for checking, using the same KDF function and KDF parameters like when the password was stored in the database. Compare the **derived key** with the **key from the database**.
* This method is **resistant to most attacks** and is considered as standard in the software industry. It is as **secure** as the KDF function with the selected KDF parameters. Crackers cannot perform **brute force attacks**, because the password guessing will be too slow, even on a modern computer with good CPU and GPU or even using a specialized ASIC hardware.

**Conclusion**: use secure KDF functions like **Argon2** and **Scrypt** to keep encrypted passwords in the database. Never use plain-text passwords!

## Password-Based Authentication

Using a **secure password storage** is only one of the components of the process of **secure password-based authentication** for Web apps, mobile apps and Internet services. Systems, that use password-based-authentication are subject of many attacks:

* **Password guessing attack**: attacker tries to guess / brute-force the user's password by attempting many logins in parallel.
  * Solved easily by adding **increasing login delay** \(wait time before the login is available again\) after each wrong login attempt or even temporary account locking. Delays / locking should be done by **IP address + username**, to avoid login problems for the legitimate users.
  * Secure **KDF-based password storage** delays the password guessing process, so it is highly recommended.
  * Using a [**CAPTCHA**](https://en.wikipedia.org/wiki/CAPTCHA) after a 2-3 unsuccessful login attempts provides quite good protection.

* **Denial of service attack**: attacker may attempt to login too many times to overload the system or can try to lock some user account with too many invalid login attempts for the same user.
  * The **protection** from this attack is similar to the previous attack: use a **CAPTCHA** and **delay the login** process for certain IP address after each login attempt.

* **Intercept and replay attack**: attacker may intercept the authentication communication \(to sniff the login / password / auth ticket / other credentials\) and use the intercepted credentials to login later.
  * Most systems solve this problem by using [**TLS**](https://en.wikipedia.org/wiki/Transport_Layer_Security) \(encrypted connection\) to securely send the authentication credentials \(password / authentication ticket\) to the server.
  * Other solutions include [challenge-response](https://en.wikipedia.org/wiki/Challenge%E2%80%93response_authentication) based **cryptographic authentication scheme**, such as the scheme used in the [Kerberos](https://en.wikipedia.org/wiki/Kerberos_%28protocol%29) protocol.

* **Man-in-the-middle attack**: attacker can intercept and modify the intercepted traffic between the server and the client to trick the user to reveal its login credentials.
  * This is solved by using a [**TLS**](https://en.wikipedia.org/wiki/Transport_Layer_Security) secure connection with server certificate, which **authenticates the server**.
  * In some scenarios \(e.g. online banking\) **clients are also authenticated** by a digital certificate or OTP \(one-time password\).

* **Compromised server attack**: if the authentication server and its database is compromised \(hacked\) and all its authentication data is leaked, the attacker should be unable to reveal user's plaintext passwords.
  * First, it should be clear that if the authentication server is compromised, in all cases the **attackers will get unauthorised access**, because they will be able to intercept user's legitimate sessions \(their login and communication after successful login\) and use them to impersonate the user.
  * Using a strongly **secure password storage** mechanism mitigates the risk for users' passwords to be revealed as plaintext. Still, attackers who gain access to the authentication server may inject password interception [backdoor](https://en.wikipedia.org/wiki/Backdoor_%28computing%29) and steal each user's plaintext credentials \(username + password\) during the login.
  * The **backdoored server attack** can be stopped like this: the client generates a random number **r** and sends as authentication **HMAC\(password, r\)**; the server compares the HMAC with its stored password. This process may be combined with **client-side Scrypt or Argon2** computation and securely stored password at the server side \(Scrypt or Argon2 hashed\). In this scenario, unless the client software is not compromised, attackers who gained access to the authentication server will not obtain user's passwords in plaintext.
  * In Web applications, if the server is compromised it can **inject JavaScript code** to compromise the client itself. In desktop and mobiles apps, the client is more safe in case of compromised server.
  * **Conclusion**: keep your authentication server as secure as possible. If it is compromised, the entire system will be compromised.



