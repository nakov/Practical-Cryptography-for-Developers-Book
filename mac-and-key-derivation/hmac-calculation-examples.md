# HMAC Calculation - Examples

In **Python** we can **calculate HMAC** codes as follows (using the `hashlib` and `hmac` libraries):

```python
import hashlib, hmac, binascii

def hmac_sha256(key, msg):
  return hmac.new(key, msg, hashlib.sha256).digest()

key = b"12345"
msg = b"sample message"
print(binascii.hexlify(hmac_sha256(key, msg)))
```

Run the above code example: \*\*\*\*[https://repl.it/@nakov/HMAC-SHA256-Examples](https://repl.it/@nakov/HMAC-SHA256-Examples-in-Python).

The above code will calculate and print the expected HMAC code (like in our previous example):

```
ee40ca7bc90df844d2f5b5667b27361a2350fad99352d8a6ce061c69e41e5d32
```

Try the code yourself and play with it.
