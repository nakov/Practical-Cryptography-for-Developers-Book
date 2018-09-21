# Key Exchange / Key Establishment Schemes

In cryptography [**key establishment**](http://cacr.uwaterloo.ca/hac/about/chap12.pdf) \(**key exchange**, **key negotiation**\) is a process or protocol, whereby a **shared secret** becomes available to two parties, for subsequent cryptographic use, typically for encrypted communication. Establishment techniques can be **key agreement** or **key transport** schemes.

* In a** key agreement **scheme both parties contribute to the negotiation of the shared secret. Examples of key agreement schemes are Diffie-Hellman \(**DHKE**\) and Elliptic-Curve Diffie-Hellman \(**ECDH**\).

* In a** key transport **scheme only one of the parties contributes to the shared secret and the other party obtains the secret from it. Key transport schemes are typically implemented through **public-key cryptography**, e.g. in the **RSA key exchange** the client encrypts a random session key by its private key and sends it to the server, where it is decrypted using the client's public key.

By design [**key exchange**](https://en.wikipedia.org/wiki/Key_exchange) schemes securely exchange cryptographic keys between two parties, in a way that noone else can obtain a copy of the keys. Typically, at the start of an **encrypted conversation** \(e.g. during the **TLS handshake** phase\), the parties first negotiate about the encryption keys \(the shared secret\) to be used during the conversation. **Key exchange schemes** are really important topic in the modern cryptography, because keys are exchanged hundreds of times by million devices and servers in Internet.

A **key negotiation** \(**key establishment**\) scheme is executed every time when a laptop connects to the Wi-Fi network or a Web browser opens a Web site through the `https://` protocol. The key negotiation can be based on a annonymous key-exchange protocol \(like DHKE\), a password or pre-shared key \(PSK\), a digital certificate or a combination of many elements together. Some communication protocols establish a shared secret key once only, while others constantly change the secret key over the time.

**Authenticated Key Exchange** \(AKE\) is the exchange of session key in a key exchange protocol which also **authenticates the identities** of the involved parties \(e.g. through a password, public key or digital certificate\). For example, if you connect to a password-protected WiFi network, an authenticated key agreement protocol is used, in most cases **password-authenticated key agreement** \(PAKE\). If you connect to a public WiFi network, **anonymous key agreement** is conducted.

## Key Exchange / Key Agreement Algorithms

Many **cryptographic algorithms** exist for key exchange and key establishment. Some use public-key cryptosystems, others use simple key-exchange schemes \(like the Diffie–Hellman Key Exchange\), some involve server authentication, some involve client authentication, some use passwords, some use digital certificates or other authentication mechanisms.

Examples of key exchange schemes are: [**Diffie–Hellman key exchange** \(**DHКЕ**\)](https://en.wikipedia.org/wiki/Diffie–Hellman_key_exchange) and [**Elliptic-curve Diffie–Hellman **\(**ECDH**\)](https://en.wikipedia.org/wiki/Elliptic-curve_Diffie–Hellman), [**RSA-OAEP**](https://en.wikipedia.org/wiki/Optimal_asymmetric_encryption_padding) and [**RSA-KEM**](https://tools.ietf.org/html/rfc5990) \(RSA key transport\), [**PSK** \(pre-shared key\)](https://en.wikipedia.org/wiki/Pre-shared_key), [**SRP** \(Secure Remote Password protocol\)](https://en.wikipedia.org/wiki/Secure_Remote_Password_protocol), [**FHMQV**](https://www.cryptopp.com/wiki/Fully_Hashed_Menezes-Qu-Vanstone) \(Fully Hashed Menezes-Qu-Vanstone\) and [**ECMQV**](https://www.cryptopp.com/wiki/Elliptic_Curve_Menezes-Qu-Vanstone) \(Ellictic-Curve Menezes-Qu-Vanstone\).

Let's start from the classical **Diffie–Hellman Key Exchange** \(DHКЕ\) scheme, which was one of the first public key protocols.

