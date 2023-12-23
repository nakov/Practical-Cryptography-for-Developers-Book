# C# Crypto Libraries

## C# Crypto Libraries

...

## Cryptography in C# and .NET

* Bouncy Castle .NET and Nethereum:Hashes, ECC and ECDSA

## .NET Cryptography and Bouncy Castle .NET

* Cryptography in C# and .NET is based on:
  * The build-in libraries: **System.Security.Cryptography**
  * The **Bouncy Castle .NET**– a powerful C# cryptography library
    * [http://www.bouncycastle.org/csharp](http://www.bouncycastle.org/csharp)
* **Nethereum** – a simplified library for Ethereum and secp256k1
  * Nethereum – [https://github.com/Nethereum](https://github.com/Nethereum)
  * The cryptographic functionality is in Nethereum.Signer
  * Nethereum also includes the Bouncy Castle .NET library

## ECDSA in C#: Initialize the Application

Install the "**Nethereum.Signer**" package from **NuGet**

```csharp
dotnet add package Nethereum.Signer
```

Import the **Nethereum Signer** namespaces:

```csharp
using Nethereum.Signer;
using Nethereum.Signer.Crypto;
using Nethereum.Util;
using Nethereum.Hex.HexConvertors.Extensions;
```

The **Bouncy Castle** namespaces will also be available, e.g.

```csharp
Org.BouncyCastle.Math.EC.ECPoint p = …;
```

### ECDSA in C#: Generate / Load Keys

```csharp
// var privKey = EthECKey.GenerateKey(); // Random private key
var privKey = new EthECKey( "97ddae0f3a25b92268175400149d65d6887b9cefaf28ea2c078e05cdc15a3c0a");
byte[] pubKeyCompressed = new ECKey(
  privKey.GetPrivateKeyAsBytes(), true).GetPubKey(true);
Console.WriteLine("Private key: {0}",
  privKey.GetPrivateKey().Substring(4));
Console.WriteLine("Public key: {0}",
  privKey.GetPubKey().ToHex().Substring(2));
Console.WriteLine("Public key (compressed): {0}",
  pubKeyCompressed.ToHex());
```

Complete example:[https://gist.github.com/nakov/f2a579eb9893b29338b11e063d6f80c2](https://gist.github.com/nakov/f2a579eb9893b29338b11e063d6f80c2)

### ECDSA in C#: Sign Message

```csharp
string msg = "Message for signing";
byte[] msgBytes = Encoding.UTF8.GetBytes(msg);
byte[] msgHash = new Sha3Keccack().CalculateHash(msgBytes);
var signature = privKey.SignAndCalculateV(msgHash);

Console.WriteLine("Msg: {0}", msg);
Console.WriteLine("Msg hash: {0}", msgHash.ToHex());
Console.WriteLine("Signature: [v = {0}, r = {1}, s = {2}]",
  signature.V[0] - 27,
  signature.R.ToHex(),
  signature.S.ToHex());
```

Complete example:[https://gist.github.com/nakov/f2a579eb9893b29338b11e063d6f80c2](https://gist.github.com/nakov/f2a579eb9893b29338b11e063d6f80c2)

### ECDSA in C#: Verify Message

```csharp
var pubKeyRecovered =
  EthECKey.RecoverFromSignature(signature, msgHash);
Console.WriteLine("Recovered pubKey: {0}",
  pubKeyRecovered.GetPubKey().ToHex().Substring(2));

bool validSig = pubKeyRecovered.Verify(msgHash, signature);
Console.WriteLine("Signature valid? {0}", validSig);
```

Complete example:[https://gist.github.com/nakov/f2a579eb9893b29338b11e063d6f80c2](https://gist.github.com/nakov/f2a579eb9893b29338b11e063d6f80c2)
