# Preface

You are a **software developer**? And sometimes you need to use **cryptography** in your daily job, like hashes, encryption or digital signatures? And you think cryptography is complex and full of math and it is for nerds only? No, this is not true, every developer can learn **how to use cryptographic algorithms**. This book will show you how, with code examples and hands-on coding experience, with less math and more practice.

It is not required to be а strong mathematician or even not strong mathematician to **understand the cryptographic concepts from the developer perspective**. This book will teach you the basics of **applied cryptography** in almost free of math style, following a step-by-step approach with lots of **code examples** and **practical exercises** \(hands-on experience\), just like when you learn Web development, databases or mobile apps. Yes, if you can learn Web development or RESTful services, you can learn the practical aspect of cryptography as well. It is just like learning a new API or a new Web development framework: you learn a combination of **concepts** + **APIs** \(crypto algorithms implemented in crypto libraries\) + **tools** + **best practices** how to use these APIs and tools.

From this book you will learn **how to use cryptographic algorithms and cryptosystems** like hashes, MAC codes and key derivation functions \(KFD\), random generators, key exchange protocols, symmetric ciphers, encryption schemes, asymmetric cryptosystems, public-key cryptography, elliptic curves, digital signatures and quantum-safe crypto algorithms, together with modern cryptographic tools and libraries.

I am happy to publish this free **developer-friendly practical cryptography book**.** **It holds just **what developers need to know** in order to **use cryptography in their every day work**. It does not cover the internals of the algorithms and how to design symmetric ciphers, public-key cryptosystems or authentication schemes. It covers the basic understanding of the **core cryptographic concepts** and how to use them from developer's perspective: **libraries**, **tools**, **code examples**. This is what most developers need to know about cryptography. This is what this book gives to you for free.

## This Book is for Developers!

This book is designed** for developers** who write code every day, for **software engineers** who create software systems, Web applications, mobile apps and other software. It may be useful also for **DevOps engineers** who deal with crypto algorithms and write code to automate the IT infrastructure, for **system administrators**, who want to learn practical cryptography better, for **information security engineers**, who need to deal with cryptography every day and to know which ciphers and crypto algorithms are safe and which are broken, along with the possible attacks, for experienced **QA engineers** who perform security testing and code reviews about security and cryptography, and for many other **IT professionals**.

This book is about **using crypto algorithms** and cryptographic packages, not about designing ciphers, signature schemes and cryptosystems. You will learn how cryptosystems work \(without too much math\) and how to use them in your daily job. This book is not 100% free of math, but the complexity level is reduced to match the average developer's level, and complex concepts are explained in simplified and understandable style. This book is created **by developers for developers**, not by university professors or mathematicians. It is about coding in a smart way, with understanding the concepts and **using the crypto algorithms and crypto libraries the right way**. It is about the modern crypto algorithms and cryptographic techniques, used today in the software industry \(as of Nov 2018\).

We assume that most developers use **higher level programming languages** \(such as JavaScript, Python, C\#, Java and PHP\), so most code examples in the book are given in **Python**, which can be translated to other languages with ease.

## This Book is Free!

The main book author **Dr. Svetlin Nakov** donates this book and its entire content and code examples **for free** to the developer and IT community as **open-source project**, under [the MIT license](https://opensource.org/licenses/MIT). Why? Because the main book author and the people behind this project believe that the **knowledge is for everyone** and it should be **shared for free**, because developers should learn to use cryptography the right way, because our world needs more secure software, because **sharing knowledge and skills for free** is the greatest miracle of the modern education.

For the same reasons, which drive the people to build **Wikipedia** and share knowledge for free, to publish open-source projects in **GitHub** and share code for free, to develop open-source software like **GNU/Linux** and **Firefox** and distribute it for free, I write and publish this open-source cryptography book for developers. I want to **share knowledge and skills**, to help the developers to become **better professionals**. I personally as a developer, when I learn a new technology, I search for free resources and code examples in Internet and I am happy that someone creates and shares them for free. Now it is time to return back to the society and to the developer community and this makes me happy.

## About the Author: Dr. Svetlin Nakov

Dr. **Svetlin Nakov** \([http://www.nakov.com](http://www.nakov.com)\) is a passionate **software engineer**, inspirational **technical trainer** and tech **entrepreneur** from Bulgaria, experienced in broad range of languages, software technologies and platforms. He is co-founder of several highly successful **tech startups** and non-profit organizations and is a **technical advisor** in several successful blockchain **ICO projects**. Svetlin is training, innovation and inspiration manager at [**SoftUni**](https://softuni.org) - the largest tech education provider in South-Eastern Europe.

![](/assets/Svetlin-Nakov-photo-face.jpg)

Svetlin Nakov has 20+ years of technical background as software engineer, software project manager, consultant, **trainer** and **entrepreneur **with rich experience with .NET, Java EE, information systems, databases, cryptography and software security, Web development, JavaScript, PHP, Python and software engineering. He is the leading **author of 15 books** on computer programming, software technologies, cryptography, C\#, Java, JavaScript, Python and tens of technical and scientific publications.  He is a big fan of **knowledge sharing** and is proud Wikipedia contributor, free books author and open-source supporter.

Svetlin has been a **speaker** at hundreds of conferences, seminars, meetups, courses and other trainings in the United States, Singapore, Germany, Egypt, Bulgaria and other locations. He holds a **PhD **degree in computer science \(for his research on computational linguistics and machine learning\), several **medals** from the **International Informatics Olympiads** \(IOI\) and the Bulgarian **President’s award “John Atanasoff”**. He has been a part-time assistant professor / trainer in Sofia University, New Bulgarian University, the Technical University of Sofia, Ngee Ann Polytechnic \(Singapore\), Kingsland University \(USA\) and few others.

Currently **Svetlin Nakov** together with his partners drive the global expansion of the largest training center for software engineers in Bulgaria and the region – the [**Software University**](https://softuni.org), where he inspires and **teaches hundred of thousands of young people** in computer science, software development, information technologies and digital skills, and gives them a profession and a job.

## The History behind This Book

Svetlin Nakov together with tens of co-authors has created and published as open-source projects \(in the period 2004-2018\) **tens of technical books** about computer programming and software technologies \(see [http://www.introprogramming.info](http://www.introprogramming.info) and [http://www.nakov.com/books](http://www.nakov.com/books)\), most of which in Bulgarian language. In the last few years Svetlin switches to English and takes **global knowledge sharing initiative** for **better and accessible tech education**, demonstrated with creating and sharing free tech books, free tutorials, free tech webinars and seminars, conference talks and many other activities.

The book author **Svetlin Nakov** is involved with **applied cryptography** from 2005, when he published the book "_Java for Digitally Signing Documents of the Web_" \(in Bulgarian\), following his master thesis on a similar topic. Later Nakov is involved in his practice as software engineer, tech trainer and entrepreneur, with **cryptography**, **software security** and **blockchain** systems, and his technical expertise grows along with his experience. In 2018 he decides to write a **free book** to share his knowledge about cryptography and crypto algorithms from developer's perspective and donate this knowledge to the global dev community. The book takes 3 months to be written and gets published in Nov 2018. You can get a free copy from: [https://cryptobook.nakov.com](https://cryptobook.nakov.com).

## The Software University \(SoftUni\)

The development of this book is supported by the [**Software University \(SoftUni\)**](https://softuni.org): the biggest and most respected training center for software engineering and digital skills in the South-Eastern Europe, which gives high-quality tech education, practical skills, profession and job to tens of thousands of young people.

[![](/assets/SoftUni-banner.jpg)](https://softuni.org)

**SoftUni** teaches software engineers in the [**Software University**](https://softuni.org) program, creative and design in the [**SoftUni Creative**](https://creative.softuni.bg) program, digital marketing in the [**SoftUni Digital**](https://digital.softuni.bg) program, programming and tech skills for kids in the [**SoftUni Kids**](https://kids.softuni.bg) program, runs a high school for digital skills [**SoftUni Svetlina**](https://svetlina.softuni.bg) and shares knowledge and skills through the [**SoftUni Foundation**](http://softuni.foundation) and its [**SoftUni Free**](http://free.softuni.org) tech educational portal.

## Why Yet Another Book on Cryptography?

Most books about cryptography on the market are written either in too **academic style** with a lot of theory and math or are **outdated** and do not describe the cryptography used today or are too small, **weak in content** and unfinished. Others are better, but are **not free** and accessible for everyone. This book tries to compensate all above mentioned weak sides of the existing cryptography books on the market: its is **free**, **developer-friendly**, **comprehensive**, with less math and more **code examples**.

### Academic Cryptography Books

Many high-quality **academic cryptography books** exist on the market and some of them are **free**, but I can't recommend such a book to а developer. He will be bored and will start hating cryptography after the first chapter or two. Some examples:

* One of the strongest **academic book on cryptography concepts** is "[**A Graduate Course in Applied Cryptography**](https://crypto.stanford.edu/~dabo/cryptobook/)" \(by Dan Boneh and Victor Shoup\). It is excellent **free** book about **theoretical cryptography**, but is not for developers. It is full of theory, concepts, math and formulas. It does not provide code examples or recommended libraries for developers. Up to date \(published in 2017\).

* The "[**Crypto 101**](https://www.crypto101.io)" is a **free book on cryptography**, which is more **understandable for developers**. It provides more simple explanation for the core cryptographic concepts, but without code examples and recommended libraries and tools. Up to date \(published in 2017\).

* Тhe "[**Handbook of Applied Cryptography**](http://cacr.uwaterloo.ca/hac)" \(by Alfred J. Menezes, Paul C. van Oorschot and Scott A. Vanstone\) is excellent for higher degree students, but is **too academic for developers**. It is available for **free** and explains the theory and the cryptography concepts very well, with lots of high-level math, but it is definitely not for developers. It does not provide working code examples and does not refers the most used crypto libraries in the software industry. Slightly outdated \(published in 2001\).

* Yes another good **academic cryptography book** is "[**Understanding Cryptography: A Textbook for Students and Practitioners**](https://books.google.bg/books?id=f24wFELSzkoC)" \(by Christof Paar, Bart Preneel, Jan Pelzl\). Excellent book on **cryptography concepts**, well organized, with algorithms in pseudocode, but it is not for developers. It does not provide code examples and recommended libraries for developers. Almost up to date \(published in 2010\), not free.

### Crypto Libraries and Their Documentation

Some **crypto libraries** try to provide **documentation** with crypto concepts and code examples, but they are typically **limited**, sometimes unfinished and not always consistently organized, with a lot of missing points and can serve to help you using certain library, but are not the best source to learn the cryptographic concepts.

Still, these documentations and manuals are **one of the best free learning resources** for developers who want to **use crypto algorithms**, especially experienced engineers with previous knowledge and skills in the area of cryptography. Examples of good documentation about crypto algorithms, coming with some crypto libraries:

* [**Nettle Documentation**](http://www.lysator.liu.se/~nisse/nettle/nettle.html) - contains very good description of the most popular cryptographic concepts and popular algorithms \(hashes, MAC, symmetric ciphers, signatures\) along with reliable and fast **C** implementation.

* [**Libsodium Documentation**](https://download.libsodium.org/doc/) - combines API documentation with elements of cryptographic concepts. It is bound to the **C **language, used for the Libsodium project. Provides sample code examples.

* [**The Crypto++ Wiki**](https://www.cryptopp.com/wiki/) - explains in brief some cryptography concepts along with guidelines how to use the Crypto++ library and the **C++** classes, implementing certain crypto algorithms. Provides sample code examples.

* [**Botan - Developer's Manual**](https://botan.randombit.net/manual/) - a modern **C++** crypto-library, which comes with implementations of many modern crypto algorithms, along with documentation, which includes brief description of the underlying cryptographic concepts.

* [**Libgcrypt Manual**](https://gnupg.org/documentation/manuals/gcrypt/) - a cryptographic library, written in **C **as part of the GnuPG project. Comes with very light introduction to crypto concepts and a boring API documentation with almost no sample code.

### Practical Cryptography: Paid Books

To be honest, I conducted a **comprehensive research of the book market** \(in Nov 2018\) to find the best developer-friendly cryptography books. I was **deeply disappointed**! I almost didn't find any good practical book about **cryptography for programmers**, which I could recommend to a friend-developer \(not scientist or university student\) with confidence that this book is really good and is really what developers need: modern cryptography + simple explained concepts + code examples. I found **very good academic books** and a few **books for developers** \(rich of code examples\) with either not great quality or very focused on certain technology \(like a API reference or library manual\). Some of them were also outdated, but still valuable.

I could list a few developer-friendly** books for practical cryptography** with code examples, which have only paid / commercial versions \(**no free edition**\). Most of them are too deeply bound to certain technology like C, C++, Java or JavaScript and don't explain the concepts well. Others have different focus. Some are outdated, some are quite new. This is the list of what I found from my research about developer-friendly crypto books:

* [**Serious Cryptography: A Practical Introduction to Modern Encryption**](https://books.google.bg/books?id=hLcrDwAAQBAJ) \(by by Jean-Philippe Aumasson\) - a strong book on cryptography, which combines academic approach with more practical approach, with some code examples in Python, but not for all concepts. Recent \(published in 2017\). Explains the modern cryptographic concepts and crypto-suits like AES-GCM, ChaCha20-Poly1305 and quantum-safe cryptography. This is maybe the best book of what I found.

* [**Secure Programming Cookbook for C and C++**](https://books.google.bg/books?id=aL3P3eJdiREC) \(by John Viega, Matt Messier\) - provides secure coding guidelines for **C++** developers, including topics from cryptography \(hashes, MAC codes, symmetric ciphers, RSA and DSA, random numbers\), with code examples \(published in 2009, slightly outdated\).

* [**Beginning Cryptography with Java**](https://books.google.bg/books?id=WLLAD2FKH3IC) \(by David Hook\) - a reference for JCA, JCE, JSSE and the Bouncy Castle crypto library with lots of code examples in Java \(published in 2005, outdated\).

* [**Cryptography for JavaScript Developers: Web Cryptography API, SJCL**](https://books.google.bg/books?id=8oBxDwAAQBAJ) \(by Anish Nath\) - a reference full of code examples in JS, but does not explain the concepts like symmetric ciphers, authenticated encryption, etc. \(published in 2018\).

* [**Hands-On Cryptography with Python**](https://books.google.bg/books?id=LsNiDwAAQBAJ) \(by Samuel Bowne\) - nice mini book \(87 pages, published in 2018\) with lots of code examples in Python, but with very limited scope: hashes, AES and RSA. No signatures, no elliptic curves, no MAC and key derivation functions.

* [**Cryptography in C and C++**](https://books.google.bg/books?id=5cEYAAAAQBAJ) \(by Michael Welschenbach\) - guidelines how to implement crypto algorithms like AES and RSA. No signatures, no elliptic curves, no MAC and key derivation functions. Published in 2005 \(outdated\).

The absence of **good free book about cryptography and crypto algorithms for developers with code examples** motivates me even more to share my knowledge and skills in a developer-friendly cryptography book. I am happy to be one of the first authors to publish a high-quality free book on practical cryptography for software engineers.

## What Does this Book Cover?

This book covers the most important modern cryptographic concepts, crypto algorithms and cryptographic constructions, used in the software industry:

* Cryptographic **hash functions**: concepts, SHA-2, SHA-3, BLAKE2, RIPEMD160, code examples, insecure hash functions, collisions
* **MAC** codes: concepts, HMAC, CMAK, UMAC, applications, code examples
* Key derivation functions \(**KDF**\): concepts, from password to encryption key, PBKDF2, Scrypt, Bcrypt, Linux crypt\(\), Argon2, code examples
* **Password encryption** techniques: from clear text, through hashing to modern secure KDFs like Argon2
* Random numbers and **secure random generators**: ...
* **Key exchange** techniques: Diffie–Hellman Key Exchange \(DHKE\) and Elliptic Curve Diffie–Hellman \(ECDH\)
* **Encryption** concepts: symmetric and asymmetric
* Modern **symmetric key ciphers**: AES, ChaCha20, ...
* Symmetric encryption **constructions**: AES-256-GCM, ChaCha20-Poly1307
* **Asymmetric key ciphers** and public-key cryptosystems: RSA, ECC, ECDH
* **Elliptic curves**: secp256k1, P-521, Curve25519, Curve448-Goldilocks
* **Integrated encryption** schemes: ECIES
* **Digital signature** algorithms: RSA signatures, ECDSA, EdDSA
* **Quantum-safe cryptography**: ...
* Other **cryptographic concepts**: digital certificates, TLS, one-time passwords \(OTP\), external authentication and OAuth
* **Crypto libraries** and packages for developers: for JavaScript, C\#, Java, Python, C and C++
* A lot of **code examples** and exercises, following each major section

...

TODO

TODO

TODO

...

## Why Python is Used for the Examples?

**Python** is one of easiest languages, a language, which is **readable** and **understandable** by all developers \(even devs who has zero experience with it\). The idea of the **code examples** is to illustrate the crypto algorithms, encryption schemes and other cryptography concepts in action, not to promote certain library, API, language or technology.

Use the **code examples** as reference only, as guideline of how your code might look like, and adopt them to your favorite language and framework. Don't directly copy and paste the code examples. Sometimes we use a library, which is more user friendly and easier to install and use, instead of a faster and more reliable library from another vendor. Sometimes we use **hex-encoded** keys, ciphertexts, signatures and other values, in order to display them easier on the console, but in practice most apps will use binary encodings for increased performance and reduced network overhead.

You are free to adopt the code examples to other languages. At the end of the book we have given examples how to use cryptography in the most popular programming languages: **JavaScript**, **C\#**, **Java** and **Python**. We skip giving examples with the lower level languages like **C** and **C++** because they work better for library writers \(to implement efficiently certain algorithm\), not for app developers. **C** and **C++** are more complex to setup and build, need more effort to manage the project dependencies and are more prone to errors.

Most **application developers** \(e.g. Web devs, back-end devs, mobile devs and front-end devs\) **use higher level languages** \(like JS, Python, C\#, Java, PHP and Go\), but all of them will **understand the Python code** from the examples. If the code was given in C, it would be longer, more complex and less readable.

## How to Read This Book?

The recommended way to read this is **topic by topic** \(from the start to the end\). You may skip chapters and sections that you don't like, but please pass through them, because the content has internal dependencies.

Play with the **code examples**: run them, modify them, break them, explore and experiment with the code and **learn by playing**.

Try to solve the **practical exercises** in chapter. Developers **learn best by writing code** and this is what I recommend. You are given well described exercise problems, with clear input and output, covering well the content after each major section.

Now, start your developer **journey into the modern practical cryptography**. Enjoy the book!

