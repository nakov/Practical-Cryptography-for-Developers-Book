# JavaScript Crypto Libraries

...

# Cryptography in JavaScript

* ECDSA with elliptic.js and js-sha3

## ECDSA in JavaScript: Generate / Load Keys

```js
npm install elliptic
npm install js-sha3
```

...

```js
let elliptic = require('elliptic');
let sha3 = require('js-sha3');
let ec = new elliptic.ec('secp256k1');

// let keyPair = ec.genKeyPair(); // Generate random keys
let keyPair = ec.keyFromPrivate(
 "97ddae0f3a25b92268175400149d65d6887b9cefaf28ea2c078e05cdc15a3c0a");
let privKey = keyPair.getPrivate("hex");
let pubKey = keyPair.getPublic();
console.log(`Private key: ${privKey}`);
console.log("Public key :", pubKey.encode("hex").substr(2));
console.log("Public key (compressed):",
    pubKey.encodeCompressed("hex"));
```

Run the above code example: [https://repl.it/@nakov/ECDSA-in-JS.](https://repl.it/@nakov/secp256k1-curve-in-JS)

ECDSA in JavaScript: Sign Message

```js
let msg = 'Message for signing';
let msgHash = sha3.keccak256(msg);
let signature = 
  ec.sign(msgHash, privKey, "hex", {canonical: true});

console.log(`Msg: ${msg}`);
console.log(`Msg hash: ${msgHash}`);
console.log("Signature:", signature);
```

Run the above code example: [https://repl.it/@nakov/ECDSA-sign-verify-in-JS.](https://repl.it/@nakov/ECDSA-sign-verify-in-JS[.]%28https://repl.it/@nakov/secp256k1-curve-in-JS)

Complete example: [https://gist.github.com/nakov/1dcbe26988e18f7a4d013b65d8803ffc](https://gist.github.com/nakov/1dcbe26988e18f7a4d013b65d8803ffc).

## ECDSA in JavaScript: Verify Signature

```js
let hexToDecimal = (x) => ec.keyFromPrivate(x, "hex")
  .getPrivate().toString(10);
let pubKeyRecovered = ec.recoverPubKey(
  hexToDecimal(msgHash), signature,
  signature.recoveryParam, "hex");
console.log("Recovered pubKey:",
  pubKeyRecovered.encodeCompressed("hex"));
let validSig = ec.verify(
  msgHash, signature, pubKeyRecovered);
console.log("Signature valid?", validSig);
```

Run the above code example: [https://repl.it/@nakov/ECDSA-sign-verify-in-JS.](https://repl.it/@nakov/ECDSA-sign-verify-in-JS[.]%28https://repl.it/@nakov/secp256k1-curve-in-JS)

Complete example: [https://gist.github.com/nakov/1dcbe26988e18f7a4d013b65d8803ffc](https://gist.github.com/nakov/1dcbe26988e18f7a4d013b65d8803ffc)

