# Java Crypto Libraries

## Java Crypto Libraries

...

## Cryptography in Java

* JCA, Bouncy Castle and Web3j:Hashes, ECC and ECDSA

## JCA, Bouncy Castle and Web3j

* Cryptography in Java is based on the Java Cryptography Architecture \(JCA\)
  * Typical Java style: lot of boilerplate code
* **Bouncy Castle** is the leading Java cryptography library
  * Docs: [https://www.bouncycastle.org/documentation.html](https://www.bouncycastle.org/documentation.html)
* **Web3j** – a simplified library for Ethereum and secp256k1
  * Web3j – [https://github.com/web3j](https://github.com/web3j)
  * The cryptographic functionality is in web3j/crypto

## ECDSA in Java: Install the Crypto Libraries

* This **Maven** dependency will install the following libraries:
  * **org.web3j.crypto**– Ethereum style secp256k1 EC cryptography
  * **org.bouncycastle**– BouncyCastle crypto provider for Java

```markup
<dependency>
  <groupId>org.web3j</groupId>
  <artifactId>crypto</artifactId>
  <version>3.3.1</version>
</dependency>
```

## ECDSA in Java: Initialize the Application

```java
import org.bouncycastle.util.encoders.Hex;
import org.web3j.crypto.*;
import java.math.BigInteger;
```

## ECDSA in Java: Generate / Load Keys

```java
// Generate random private key
// BigInteger privKey = Keys.createEcKeyPair().getPrivateKey(); 

BigInteger privKey = new BigInteger(
 "97ddae0f3a25b92268175400149d65d6887b9cefaf28ea2c078e05cdc15a3c0a", 16);
BigInteger pubKey = Sign.publicKeyFromPrivate(privKey);
ECKeyPair keyPair = new ECKeyPair(privKey, pubKey);

System.out.println("Private key: " + privKey.toString(16));
System.out.println("Public key: " + pubKey.toString(16));
System.out.println("Public key (compressed): " +
  compressPubKey(pubKey));
```

## ECDSA in Java: Sign Message

```java
String msg = "Message for signing";
byte[] msgHash = Hash.sha3(msg.getBytes());
Sign.SignatureData signature =
  Sign.signMessage(msgHash, keyPair, false);

System.out.println("Msg: " + msg);
System.out.println("Msg hash: " + Hex.toHexString(msgHash));
System.out.printf(
  "Signature: [v = %d, r = %s, s = %s]\n",
  signature.getV() - 27,
  Hex.toHexString(signature.getR()),
  Hex.toHexString(signature.getS()));
```

## ECDSA in Java: Verify Signature

```java
BigInteger pubKeyRecovered =
  Sign.signedMessageToKey(msg.getBytes(), signature);
System.out.println("Recovered public key: " +
  pubKeyRecovered.toString(16));

boolean validSig = pubKey.equals(pubKeyRecovered);
System.out.println("Signature valid? " + validSig);
```

