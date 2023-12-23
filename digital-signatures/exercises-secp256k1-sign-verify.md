# Exercises: ECDSA Sign and Verify

In this exercise we shall **sign** and **verify** messages using the **ECDSA** digital signature algorithm and the NIST **P-521** curve. The NIST P-521 elliptic curve, known also as `secp521r1` is 521-bit ECC curve, suitable for ECDSA digital signatures and ECDH key agreement. It uses **521-bit private keys** (encoded as 65-66 bytes, 130-132 hex digits) and **1042-bit public keys** (uncompressed, encoded as 130-131 bytes, 260-261 hex digits). The produced **signature** is 132 bytes (264 hex digits).

## Sign a Message with ECDSA / P-521

Write a program to **sign a message** by given **private key**. The **input** consists of 2 text lines: message and private key. The message is given as **text** and the private key is given as **hex** string (130-132 hex digits). Use the **ECDSA deterministic signing** (following [RFC 6979](https://tools.ietf.org/html/rfc6979)) and the curve NIST **P-521**, which also known as **secp521r1**. Print the **output** as JSON document, holding the input **message** + the **public key** of the signer (as hex string, uncompressed) + the ECDSA **digital signature** (as hex string).

Sample input:

```
Message for ECDSA-NIST-521p signing
00135799f9d1f033af26168780bf2503313acff854c44031321d7a29bba96edb3c1b93b9deea55229b1de058196ad69a79c01463e3281d9fcc82afd73aac7fdfa4af
```

Sample output:

```
{
  "msg": "Message for ECDSA-NIST-521p signing",
  "pubKey":"0078a6bb6732cb3134d2ca3912b2876fe005b20027037512cf972605f58ce5908471a1f9817c8d24290fcc943951f3113a7ee3716bd95f0b9c7326843a833ac6a0750021f08f88a6bd397525068300801521d2d97fea32f2c8b0c74dc8e231a4dd73252c4a7398e25ab20dba0a9df3df0c256617e004a9623676b9f3f9a3aa21f57c90ce",
  "signature":"00202029ab1a3326fe7d1e9ec36d7fab048e833c6c3cad37e1d5294695d28e9fd5583c23edaeecb596782a4c85bac27780623c1a9216202f3828991cbeebbeb049d9008270ea623d8d26c5ab89b621bac12c7fa8e9193e4057e16617f80cfc4279537f45169fb949deb3f9936400a130f6859aaa9c929e47c66610e59cc71a9f7ea79e81"
}
```

## Verify Message Signature with ECDSA / P-521

Write a program to **validate the ECDSA digital signature**, created by the previous exercise. The **input** comes as JSON document, holding the **message** + the **public key** (uncompressed, hex string) + the **signature**. Use the P-521 elliptic curve (`secp521r1`). Print as **output** a single word: "**valid**' or "**invalid**".

Sample input (correctly signed message):

```
{
  "msg": "Message for ECDSA-NIST-521p signing",
  "pubKey":"0078a6bb6732cb3134d2ca3912b2876fe005b20027037512cf972605f58ce5908471a1f9817c8d24290fcc943951f3113a7ee3716bd95f0b9c7326843a833ac6a0750021f08f88a6bd397525068300801521d2d97fea32f2c8b0c74dc8e231a4dd73252c4a7398e25ab20dba0a9df3df0c256617e004a9623676b9f3f9a3aa21f57c90ce",
  "signature":"00202029ab1a3326fe7d1e9ec36d7fab048e833c6c3cad37e1d5294695d28e9fd5583c23edaeecb596782a4c85bac27780623c1a9216202f3828991cbeebbeb049d9008270ea623d8d26c5ab89b621bac12c7fa8e9193e4057e16617f80cfc4279537f45169fb949deb3f9936400a130f6859aaa9c929e47c66610e59cc71a9f7ea79e81"
}
```

Sample output:

```
valid
```

Sample input (tampered message):

```
{
  "msg": "Tampered message",
  "pubKey":"0078a6bb6732cb3134d2ca3912b2876fe005b20027037512cf972605f58ce5908471a1f9817c8d24290fcc943951f3113a7ee3716bd95f0b9c7326843a833ac6a0750021f08f88a6bd397525068300801521d2d97fea32f2c8b0c74dc8e231a4dd73252c4a7398e25ab20dba0a9df3df0c256617e004a9623676b9f3f9a3aa21f57c90ce",
  "signature":"00202029ab1a3326fe7d1e9ec36d7fab048e833c6c3cad37e1d5294695d28e9fd5583c23edaeecb596782a4c85bac27780623c1a9216202f3828991cbeebbeb049d9008270ea623d8d26c5ab89b621bac12c7fa8e9193e4057e16617f80cfc4279537f45169fb949deb3f9936400a130f6859aaa9c929e47c66610e59cc71a9f7ea79e81"
}
```

Sample output:

```
invalid
```
