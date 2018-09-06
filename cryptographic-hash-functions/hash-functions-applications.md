# Cryptographic Hash Functions: Applications

Cryptographic hash functions \(like SHA-256 and SHA3-256\) are used in many scenarios. Let's review their most common applications.

## Document Integrity

Verifying the **integrity** of files / documents / messages. E.g. a **SHA256 checksum **may confirm that certain file is original \(not modified after its checksum was calculated\).

## Storing Passwords

Storing **passwords **and verification of passwords. Instead of keeping a plain-text password in the database, developers usually keep **password hashes** or more complex values derived from the password \(e.g. Scrypt-derived value\).

## Generate Unique ID

Generate an **almost unique ID **of certain document / message. The document ID \(hash value\) can be used later to prove the existence of the message, or to retrieve the message from a storage system.

## Pseudorandom Number Generation

**Pseudorandom generation **and key derivation. Hash values can serve as random numbers. A simple way to generate a random sequence is like this: start from a **random seed **\(entropy collected from random events, such like keyboard clicks or mouse moves\). Append "**1**" and calculate the hash to obtain the first random number, then append "**2**" and calculate the hash to obtain the second random number, etc.

## Proof-of-Work Algorithms

**Proof-of-work **\(PoW\) algorithms. Most proof-of-work algorithms calculate a hash value which is bigger than certain value \(known as mining difficulty\). To find this hash value, miners calculate billions of different hashes and take the biggest of them, because hash numbers are unpredictable. For example, the proof of work problem might be defined as follows: find a number `p`, such that `hash(x + p)` holds 10 zero bits at its beginning.

## Cryptographic Hashes are Part of Modern Programming

Cryptographic hash functions are so widely used, that they are often implemented as **build-in functions **in the standard libraries for the modern programming languages and platforms.

