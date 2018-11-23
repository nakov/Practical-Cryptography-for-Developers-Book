## Exercises: RSA Sign / Verify

In this exercise we shall **sign** messages and verify signatures using the **PKCS\#1 v.1.5 RSA** signature algorithm with 4096-bit keys, following the technical specification from [RFC 8017](https://tools.ietf.org/html/rfc8017#page-15). The RSA-PKCS1 v1.5 digital signature algorithm can be found as library for the most programming languages.

\[TODO\]

The RSA **private key** is encoded as ??? hex digits \(??? bytes\) in PEM format. The corresponding RSA **public key** is encoded also as ??? hex digits \(??? bytes\) in PEM format. The RSA **signature** ??? consists of ??? bytes \(??? hex digits\).

\[TODO\]

## Sign a Message with RSA

\[TODO\]

Write a program to sign given text **message** with given 4096-bit **private key**. The input consists of 2 text lines. The **first line holds** the input **message** for signing. The **second line** holds the private key as **hex string**. Print the **output** as JSON document, holding the input **message** + the **public key** of the signer \(as hex string\) + the RSA **digital signature** \(as hex string\).

Sample input:

```
Message for RSA signing
???
```

Sample output:

```
{
  "msg": "Message for RSA signing",
  "pubKey":"???",
  "signature":"???"
}
```

## Verify Message Signature with RSA

Write a program to **validate the RSA digital signature**, created by the previous exercise. The **input** comes as JSON document, holding the **message** + the **public key** \(4096-bit, hex string\) + the **signature**. Print as **output** a single word: "**valid**' or "**invalid**".

Sample input \(correctly signed message\):

```
{
  "msg": "Message for RSA signing",
  "pubKey":"???",
  "signature":"???"
}
```

Sample output:

```
valid
```

Sample input \(tampered message\):

```
{
  "msg": "Tampered msg",
  "pubKey":"???",
  "signature":"???"
}
```

Sample output:

```
invalid
```



