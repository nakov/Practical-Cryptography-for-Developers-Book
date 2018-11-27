# Quantum-Safe Key Exchange - Examples in Python

In this example we shall demonstrate the how to use the [**NewHope key exchange** protocol](https://newhopecrypto.org), which is a quantum-safe **lattice-based** key-exchange algorithm. The underlying math is based on the Ring-Learning-with-Errors \(Ring-LWE\) problem and operates in a ring of **integer polynomials** by certain modulo. The key-exchange operates like this:

1. Alice generates a random **private key** and corresponding **public message** \(public key\) and sends the message to Bob. The **public message** consists of 1024 polynomial coefficients \(integers in the range \[0...61443\]\) + random seed \(32 bytes\).
2. Bob takes the **message from Alice** \(polynomial + seed\) and calculates from it the **shared secret key** between Alice and Bob. Bob also generates and sends a **public message** to Alice. This public message consists of **2 polynomials**, each represented by 1024 integer coefficients.
3. Alice takes the **message from Bob** \(the 2 polynomials\) and calculates from it the **shared secret key** between Alice and Bob \(using her private key\). The calculated **shared key** consists of 32 bytes \(256 bits\), perfect for symmetric key encryption.

To illustrate the **NewHop key exchange **algorithm, we shall use the [`PyNewHope`](https://github.com/nakov/PyNewHope) package from the Python's official PyPI repository:

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

Alice generates **private key** + **public message** and sends her public message to Bob, then Bob calculates his copy of the **shared secret key** from Alice's message and generates a **public message** for Alice, and finally Alice calculates her copy of the **shared secret key** from her private key together with Bob's message.

