# Exercises: Implement a Pseudo-Random Generator

Write a code to generate **30 pseudo-random integers** in the range **\[1...10\]**, starting from certain **entropy**, taken as input, using **HMAC key derivation**.

From the **entropy** generate a **seed** \(256-bit binary sequence\) using **SHA-256**:

```py
seed = SHA256(entropy)
```

Generate the **n**-th random number by the formula:

```py
1 + HMAC-SHA256(n, seed) % 10
```

Print the numbers at the output, separated by space.

Sample **input** and corresponding **output**:

| **Input** | **Output** |
| :--- | :--- |
| hello | 8 4 10 5 5 3 5 7 10 6 4 9 2 3 2 8 3 3 10 6 8 10 9 10 1 3 6 4 4 10 |
| random text | 10 5 5 9 7 4 2 9 2 1 10 4 8 9 8 1 8 6 5 7 5 4 3 4 6 6 9 8 1 1 |
| fun | 6 5 9 2 2 5 1 6 10 10 10 1 8 10 6 9 2 1 5 10 1 4 8 5 6 3 8 4 2 1 |



