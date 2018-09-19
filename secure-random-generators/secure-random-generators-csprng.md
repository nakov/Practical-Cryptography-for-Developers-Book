# Secure Random Generators \(CSPRNG\)

Cryptography secure pseudo-random number generators \(**CSPRNG**\) are random generators, which guarantee that the random numbers coming from them are **absolutely unpredictable**. Depending on the level of security required, CSPRNG can be implemented as software components or as hardware devices or as combination of both.

For example, in the credit card printing centers the formal security regulations require certified hardware random generators to be used to generate credit card PIN codes, private keys and other data, designed to remain private.

Modern operating systems \(OS\) **collect entropy** \(initial seed\) from the **environmental noise**: keyboard clicks, mouse moves, network activity, system I/O interruptions, etc. Sources of randomness from the environment in Linux, for example, include inter-keyboard timings, inter-interrupt timings from some interrupts, and other events which are both non-deterministic and hard to measure for an outside observer.

The collected in the OS randomness is usually accessible from `/dev/random` and `/dev/urandom`.

* Reading from the `/dev/random` file \(the limited blocking random generator\) **returns entropy** from the kernel's entropy pool \(collected noise\) and **blocks** when the entropy pool is empty until additional environmental noise is gathered.
* Reading the `/dev/urandom` file \(the unlimited non-blocking random generator\) returns entropy from the kernel's entropy pool or a pseudo-random data, generated from previously collected environmental noise, which is also unpredictable.

Usually a **CSPRNG** should start from a **truly random seed** from the operating system, from a specialized hardware or from external source. Random numbers after the seed initialization are typically produces by a **pseudo-random computation**, but this does not compromise the security.

Typically modern OS APIs combine the constantly collected **entropy** from the environment with the **internal state** of their built-in pseudo-random algorithm to guarantee maximal **unpredictability** of the generated randomness with high **speed** and **non-blocking** behavior in the same time.

## Hardware Random Generators \(TRNG\)

Hardware random generators, known as **true random number generators \(TRNG\)**, typically capture physical processes or phenomenа, such as the visible spectrum of the light, the thermal noise from the environment, the atmosphere noise, etc. The randomness from the physical environment is collected through specialized sensors, then amplified and processed by the device and finally transmitted to the computer through USB, PCI Express or other standard interface.

Modern **microprocessors** \(CPU\)** **provide a built-in hardware random generator, accessible through a special **CPU instruction **[**`RdRand`**](https://en.wikipedia.org/wiki/RdRand), which return a random integer into one of the CPU registers.

Most cryptographic applications today do not require a hardware random generator, because the entropy in the operating system is secure enough for general cryptographic purposes. Using a **TRNG** is needed for systems with higher security requirements, such as banking and finance applications, certification authorities and high volume payment processors.

## How as a Developer to Access the CSPRNG?

Typically developers access the cryptographically strong random number generators \(**CSPRNG**\) for their OS from a **cryptography library** for their language and platform.

* In **Linux** and **macOS**, it is considered that both `/dev/random` and `/dev/urandom` sources of randomness are **secure enough for most cryptographic purposes** and most cryptographic libraries access them internally.

* In **Windows**, random numbers for cryptographic purposes can be securely generated using the `BCryptGenRandom` function from the [Cryptography API: Next Generation \(CNG\)](https://docs.microsoft.com/windows/desktop/SecCNG/cng-portal) or higher level crypto libraries.

* In **C\#** use `System.Security.Cryptography.RandomNumberGenerator.Create()` from .NET Framework or .NET Core.

* In **Python** use `os.urandom()` or the `secrets` library.

* In **Java** use the `java.security.SecureRandom` system class.

* In **JavaScript** use `window.crypto.getRandomValues(Uint8Array)` for client side \(in the Web browser\) or `crypto.randomBytes()` or external module like `node-sodium` for server-side \(in Node.js\).

**Never use `Math.random()`** or similar insecure RNG functions for cryptographic purposes!
