# Exercises: EdDSA Sign and Verify

In this exercise we shall **sign** and **verify** messages using the **EdDSA** digital signature algorithm and the `edwards25519` curve, following the technical specification from [RFC 8032](https://tools.ietf.org/html/rfc8032#page-9). The **Ed25519** digital signature algorithm can be found as library for the most programming languages.

The Ed25519 **private key** is encoded as 64 hex digits \(32 bytes\). The corresponding Ed25519 **public key** is encoded also as 64 hex digits \(32 bytes\). The EdDSA-Ed25519 **signature** {_**R**_, _**s**_} consists of 32 + 32 bytes \(64 bytes, 128 hex digits\).

## EdDSA-Ed25519: Sign Message

Write a program to sign given text **message** with given **private key**. The input consists of 2 text lines. The **first line holds** the input **message** for signing. The **second line** holds the private key as **hex string**. Print the **output** as JSON document, holding the input **message** + the **public key** of the signer \(as hex string, uncompressed\) + the Ed25519 **digital signature** \(as hex string\).

Sample input:

```text
Message for Ed25519 signing
de6d730f36a8607b8bfdaa79b3b1127291f1d50552c2fe05c5254a9719105c4a
```

Sample output:

```text
{
  "msg": "Message for Ed25519 signing",
  "pubKey":"7721a5832cb70cce1a960cf236d50a0e862555ccad400b5fee0bcf777f7ab476",
  "signature":"6c4adbba332b5db520c0ec95433ea136f70fe2d50e8955a7049d216626a3491c0e5cbfefb8d779687cc9811311ccaf7cd07a0e96a570fb3a4b680a4ead60c602"
}
```

## EdDSA-Ed25519: Verify Signature

Write a program to **validate the Ed25519 digital signature**, created by the previous exercise. The **input** comes as JSON document, holding the **message** + the **public key** \(uncompressed, hex string\) + the **signature**. Print as **output** a single word: "**valid**' or "**invalid**".

Sample input \(correctly signed message\):

```text
{
  "msg": "Message for Ed25519 signing",
  "pubKey":"7721a5832cb70cce1a960cf236d50a0e862555ccad400b5fee0bcf777f7ab476",
  "signature":"6c4adbba332b5db520c0ec95433ea136f70fe2d50e8955a7049d216626a3491c0e5cbfefb8d779687cc9811311ccaf7cd07a0e96a570fb3a4b680a4ead60c602"
}
```

Sample output:

```text
valid
```

Sample input \(tampered message\):

```text
{
  "msg": "Tampered msg",
  "pubKey":"7721a5832cb70cce1a960cf236d50a0e862555ccad400b5fee0bcf777f7ab476",
  "signature":"6c4adbba332b5db520c0ec95433ea136f70fe2d50e8955a7049d216626a3491c0e5cbfefb8d779687cc9811311ccaf7cd07a0e96a570fb3a4b680a4ead60c602"
}
```

Sample output:

```text
invalid
```

