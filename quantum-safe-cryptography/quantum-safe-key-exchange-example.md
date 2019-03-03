# Quantum-Safe Key Exchange - Examples in Python

In this example we shall demonstrate the how to use the [**NewHope key exchange** protocol](https://newhopecrypto.org), which is a quantum-safe **lattice-based** key-exchange algorithm, designed to provide at least **128-bit post-quantum security level**. The underlying math is based on the Ring-Learning-with-Errors \(**Ring-LWE**\) problem and operates in a ring of **integer polynomials** by certain modulo. The key-exchange operates like this:

1. Alice generates a random **private key** and corresponding **public message** \(public key\) and sends the message to Bob. The **public message** consists of 1024 polynomial coefficients \(integers in the range \[0...61443\]\) + random seed \(32 bytes\).
2. Bob takes the **message from Alice** \(polynomial + seed\) and calculates from it the **shared secret key** between Alice and Bob. Bob also generates internally a **private key** and uses it to calculate and sends a **public message** to Alice. This public message consists of **2 polynomials**, each represented by 1024 integer coefficients.
3. Alice takes the **message from Bob** \(the 2 polynomials\) and calculates from it the **shared secret key** between Alice and Bob \(using her private key\). The calculated **shared key** consists of 32 bytes \(256 bits\), perfect for symmetric key encryption.

To illustrate the **NewHope key exchange **algorithm, we shall use the [`PyNewHope`](https://github.com/nakov/PyNewHope) package from the Python's official PyPI repository \(which is designed for educational purposes and is not certified for production use\):

```py
pip install pynewhope
```

The code to demonstrate the quantum-safe key-exchange "NewHope" is simple:

```py
from pynewhope import newhope

# Step 1: Alice generates random keys and her public msg to Bob
alicePrivKey, aliceMsg = newhope.keygen()
print("Alice sends to Bob her public message:", aliceMsg)

# Step 2: Bob receives the msg from Alice and responds to Alice with a msg
bobSharedKey, bobMsg = newhope.sharedB(aliceMsg)
print("\nBob's sends to Alice his public message:", bobMsg)
print("\nBob's shared key:", bobSharedKey)

# Step 3: Alice receives the msg from Bob and generates her shared secret
aliceSharedKey = newhope.sharedA(bobMsg, alicePrivKey)
print("\nAlice's shared key:", aliceSharedKey)

if aliceSharedKey == bobSharedKey:
    print("\nSuccessful key exchange! Keys match.")
else:
    print("\nError! Keys do not match.")
```

Run the above code example: https://repl.it/@nakov/NewHope-key-exchange-in-Python.

Alice generates a **private key** + **public message** and sends her public message to Bob, then Bob calculates his copy of the **shared secret key** from Alice's message and generates a **public message** for Alice, and finally Alice calculates her copy of the **shared secret key** from her private key together with Bob's message.

The **output** from the above code looks like this \(the 1024 polynomial coefficients are given in abbreviated form\):

```
Alice sends to Bob her public message: ([12663, 7323, 8979, 7763, 11139, 5460, 7337, 12182, ..., 8214, 10808, 8987], b'*[\x98t\xae\xe9\xc5H\xfc\xc2\x9b$\xd6\xaa[8k\xc1\x8d\xad\x1d\x01\x87i\xed\x03\x06\xe1k2\xa7N')

Bob's sends to Alice his public message: ([2, 1, 1, 2, 0, 1, 1, 1, 1, 3, 3, 2, 1, 1, 3, 0, ..., 0, 0, 3], [7045, 4326, 6186, 8298, 12738, ..., 7730, 10577, 8046])

Bob's shared key: [228, 159, 146, 8, 56, 146, 50, 7, 59, 87, 113, 57, 151, 137, 240, 139, 215, 33, 71, 188, 108, 239, 231, 252, 230, 77, 181, 178, 176, 7, 219, 217]

Alice's shared key: [228, 159, 146, 8, 56, 146, 50, 7, 59, 87, 113, 57, 151, 137, 240, 139, 215, 33, 71, 188, 108, 239, 231, 252, 230, 77, 181, 178, 176, 7, 219, 217]

Successful key exchange! Keys match.
```

It is visible that the calculated **secret shared key** is the same 32-byte sequence for Alice and Bob and thus the key exchange algorithm works correctly. The above demonstrated **HewHope** key exchange algorithm works quite **fast** and provides a **128 bits of post-quantum security**.

