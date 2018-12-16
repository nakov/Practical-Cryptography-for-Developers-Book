# Generating Pseudo Random Numbers - Example in Python

To get a better idea **how pseudo-random numbers are generated** in computer programming, let's play with at the following Python code, which generates 5 pseudo-random numbers in the range \[10...20\]:

```py
import hashlib, time

startSeed = str(time.time()) + '|'
min = 10
max = 20
for i in range(5):
    nextSeed = startSeed + str(i)
    hash = hashlib.sha256(nextSeed.encode('ascii')).digest()
    bigRand = int.from_bytes(hash, 'big')
    rand = min + bigRand % (max - min + 1)
    print(nextSeed, bigRand, '-->', rand)
```

The above code produces time-depended \(predictable\) **pseudo-random sequence**:

```
1539884529.7564313|0 80821949188459167822103620715837790870744533466506114260335306835341654043374 --> 20
1539884529.7564313|1 74025479792630401388590516952955656999942018130178317853592496371994668720404 --> 12
1539884529.7564313|2 82017697577161203981429946799250236982499988253633196542465974577893633076425 --> 18
1539884529.7564313|3 107386997066995629290834465394867359239275712194747910247567090891223949362198 --> 13
1539884529.7564313|4 83874630241630198317549470506043001102325518306912594861433838548293113930135 --> 10
```

Run the above code example: https://repl.it/@nakov/pseudo-random-numbers

The **initial pseudo-random seed** is taken from the current time. The first pseudo-random number in the sequence comes from the **SHA-256 hash** of the initial **seed** + the number `0`, the second pseudo-random number comes from the hash of the initial **seed** + the number `1` and so on. To get an output of certain **range \[min...max\]** the 256-bit **hash** is divided to **\(max - min + 1\) **and **min** is added to it. The number `i`, together with the value `startSeed` hold the internal **state** of the random generator, which changes for each next random number.

The above pseudo-random generator is based on the **random statistical distribution** of the **SHA-256** function. It is expected that the chance for each possible number to be generated is equal.

## Creating a Secure Random Generator

The above random generator is **not secure**, because it is not initialized by an unpredictable source of entropy. **Let's fix this**.

We shall** initialize the initial randomness based on the keyboard events**. The user will be asked to enter something 5 times and the exact precise times of the moments of the user input, together with the data entered from the user will be joined as **initial randomness \(seed\)**. The collected text entropy can be shortened through SHA-256 hashing \(this will reduce it to 256 bits\). After the entropy is collected and the start seed is calculated, the same logic like at the previous example will be used to generate 5 random numbers in the range \[10...20\]. This is a sample Python implementation:

```py
import hashlib, time, binascii

entropy = ''
for i in range(5):
    s = input("Enter something [" + str(i+1) + " of 5]: ")
    entropy = entropy + s + '|' + str(time.time()) + '|'
print("Entropy:", entropy)
startSeed = str(binascii.hexlify(hashlib.sha256(entropy.encode('ascii')).digest()))[2:-1]
print("Start seed = SHA-256(entropy) =", startSeed)

min = 10
max = 20
for i in range(5):
    nextSeed = startSeed + '|' + str(i)
    hash = hashlib.sha256(nextSeed.encode('ascii')).digest()
    bigRand = int.from_bytes(hash, 'big')
    rand = min + bigRand % (max - min + 1)
    print(nextSeed, bigRand, '-->', rand)
```

Run the above code example: https://repl.it/@nakov/secure-random-generator.

A **sample outpu**t from the above code may look like this:

```
Enter something [1 of 5]: first
Enter something [2 of 5]: second
Enter something [3 of 5]: random text
Enter something [4 of 5]: dfasfdasfs
Enter something [5 of 5]: last
Entropy: first|1539885709.4494743|second|1539885713.687703|random text|1539885721.5754962|dfasfdasfs|1539885724.40904|last|1539885726.1286101|
Start seed = SHA-256(entropy) = f8a4eaceb16156b1a23f4b6d08e54665ffa4822949b22e01d6de4c5daae965e3
f8a4eaceb16156b1a23f4b6d08e54665ffa4822949b22e01d6de4c5daae965e3|0 84482770259566839097936866229004786554948913905882724148636325987196754263481 --> 19
f8a4eaceb16156b1a23f4b6d08e54665ffa4822949b22e01d6de4c5daae965e3|1 67001454659030164457342421011672033052466168976555224352709830050538321411120 --> 14
f8a4eaceb16156b1a23f4b6d08e54665ffa4822949b22e01d6de4c5daae965e3|2 103739181507291072572315034266940107849472122762876847172454548630886082729227 --> 12
f8a4eaceb16156b1a23f4b6d08e54665ffa4822949b22e01d6de4c5daae965e3|3 3011033199204097839903859902789759740091959530467456042709372597822032778153 --> 16
f8a4eaceb16156b1a23f4b6d08e54665ffa4822949b22e01d6de4c5daae965e3|4 100466094724924763659843669256673300207383922129676800217664465341535622195997 --> 16
```

Note that the **collected entropy is very hard to be predicted**. The cracker should guess all the text entered by the user and also guess the exact time for each of the 5 inputs. If the above is repeated 20 instead of 5 times, it will be even harder to predict \(the collected entropy will be bigger\).

Some cryptographical software use similar techniques like in the above code example when generating keys, password and randomness as general and now you know why: to collect entropy in an unpredictable way.

