# Modern Key Derivation Functions

**PBKDF2** has a major weakness: it is **not GPU-resistant** and **not ASIC-resistant**, because it uses relatively small amount of RAM and can be efficiently implemented on GPU (graphics cards) or **ASIC** (specialized hardware).

Modern key-derivation functions (KDF) like [**Scrypt**](https://en.wikipedia.org/wiki/Scrypt) and [**Argon2**](https://en.wikipedia.org/wiki/Argon2) are designed to be **resistant** to **dictionary attacks**, **GPU attacks** and **ASIC attacks**. These functions derive a key (of fixed length) from a password (text) and need a lot memory (RAM), which does not allow fast parallel computations on GPU or ASIC hardware.

Algorithms like **Bcrypt**, **Scrypt** and **Argon2** are considered more **secure** KDF functions. They use **salt** + many **iterations** + a lot of **CPU** + a lot of **RAM** memory and this makes very hard to design a custom hardware to significantly speed up password cracking.

It takes a lot of **CPU time** to derive the key (e.g. 0.2 sec) + a lot of **RAM memory** (e.g. 1GB). The calculation process is memory-dependent, so **the memory access is the bottleneck** of the calculations. Faster RAM access will speed-up the calculations.

When a lot of CPU and RAM is used to derive the key from given password, **cracking passwords is slow** and inefficient (e.g. 5-10 attempts / second), even when using very good password cracking hardware and software. The goal of the modern KDF functions is to make practically infeasible to perform a brute-force attack to reverse the password from its hash.

Let's discuss in more details **Scrypt**, **Bcrypt** and **Argon2**.
