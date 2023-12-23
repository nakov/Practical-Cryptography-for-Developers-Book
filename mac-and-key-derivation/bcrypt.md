# Bcrypt

[**Bcrypt**](https://en.wikipedia.org/wiki/Bcrypt) is another cryptographic KDF function, **older than Scrypt**, and is **less resistant** to ASIC and GPU attacks. It provides configurable iterations count, but uses constant memory, so it is easier to build hardware-accelerated password crackers.

## Bcrypt - Example

You can play with **Bcrypt** here: [https://www.dailycred.com/article/bcrypt-calculator](https://www.dailycred.com/article/bcrypt-calculator).

![](../.gitbook/assets/bcrypt-online-example.png)

## Storing Algorithm Settings + Salt + Hash Together

In many applications, frameworks and tools (e.g. in the database of WordPress sites), **Bcrypt encrypted passwords are stored together with the algorithm settings and salt**, into a single string (in certain format), consisting of several parts, separated by `$` character. For example, the password `p@ss~123` can be stored in the Bcrypt encrypted format like this (several examples are given, to make the pattern apparent):

```
$2a$07$wHirdrK4OLB0vk9r3fiseeYjQaCZ0bIeKY9qLsNep/I2nZAXbOb7m
$2a$12$UqBxs0PN/u106Fio1.FnDOhSRJztLz364AwpGemp1jt8OnJYNsr.e
$2a$12$8Ov4lfmZZbv8O5YKrXXCu.mdH9Dq9r72C5GnhVZbGNsIzTr8dSUfm
```

## When to Use Bcrypt?

When configured properly **Bcrypt** is considered a **secure KDF function** and is widely used in practice. It is considered that **Scrypt is more secure than Bcrypt,** so modern applications should **prefer Scrypt** (or **Argon2**) instead of **Bcrypt**. Still, this recommendation is disputable, but I personally prefer **Argon2**.
