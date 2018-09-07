# Proof-of-Work Hash Functions: ETHash and Equihash

Blockchain **proof-of-work mining **algorithms use a special class of hash functions which are **computational-intensive **and **memory-intensive**. These hash functions are designed to consume a lot of computational resources and a lot of memory and to be very hard to be implemented in a hardware devices \(such as [FPGA](https://en.wikipedia.org/wiki/Field-programmable_gate_array) integrated circuits or [ASIC](https://en.wikipedia.org/wiki/Application-specific_integrated_circuit) miners\). Such hash functions are known as "**ASIC-resistant**".

Many hash functions are designed for proof-of-work mining algorithms, e.g. **ETHash**, **Equihash**, **CryptoNight** and **Cookoo Cycle**. These hash functions are **slow to calculate**, and usually use **GPU **hardware \([rigs](https://en.bitcoin.it/wiki/Mining_rig) of graphics cards like NVIDIA GTX 1080\) or powerful **CPU** hardware \(like Intel Core i7-8700K\) and a lot of fast **RAM **memory \(like DDR4 chips\). The goal of these mining algorithms is to **minimize the centralization of mining** by stimulating the small miners \(home users and small mining farms\) and limit the power of big players in the mining industry \(who can afford to build giant mining facilities and data centers\). A big number of **small players means better decentralization **than a small number of big players.

The main weapon in the hands of the big mining corporations is considered the [ASIC miners](https://en.bitcoin.it/wiki/Mining_hardware_comparison), so the design of modern cryptocurrencies and usually includes proof-of-work mining using an **ASIC-resistant hashing algorithm **or **proof-of-stake** consensus protocol.

## ETHash

Let's explain in brief the idea behind the **ETHash** proof-of-work mining hash function used in the Ethereum blockchain.

* **ETHash **is the proof-of-work hash function in the Ethereum blockchain. It is **memory-intensive **hash-function \(requires a lot of RAM to be calculated fast\), so it is believed to be **ASIC-resistant**.

How does ETHash work?

* A "**seed**" is computed for each block \(based on the entire chain until the current block\).
* From the seed, a **16 MB pseudorandom cache** is computed.
* From the cache, a **1 GB dataset** is extracted to be used in mining.
* Mining involves hashing together random slices of the dataset.

Learn more about **ETHash** at: [https://github.com/ethereum/wiki/wiki/Ethash](https://github.com/ethereum/wiki/wiki/Ethash), [https://github.com/lukovkin/ethash](https://github.com/lukovkin/ethash).

## Equihash

Let's explain in briefly the idea behind the **Equihash** proof-of-work mining hash function used in Zcash, Bitcoin Gold and a few other blockchains.

* **Equihash **is the proof-of-work hash function in the Zcash and Bitcoin Gold blockchains. It is **memory-intensive **hash-function \(requires a lot of RAM for fast calculation\), so it is believed to be **ASIC-resistant**.

How does **Equihash** work?

* Uses **BLAKE2b **to compute **50 MB hash dataset** from the previous blocks in the blockchain \(until the current block\).
* Solves the "**Generalized Birthday Problem**" over the generated hash dataset \(pick 512 different strings from 2097152, such that the binary XOR of them is zero\). The best known solution \(Wagner's algorithm\) runs in exponential time, so it requires a lot of memory-intensive and computing-intensive calculations.
* **Double SHA256** the solution to compute the final hash.

Learn more about **Equihash** at: [https://www.cryptolux.org/images/b/b9/Equihash.pdf](https://www.cryptolux.org/images/b/b9/Equihash.pdf), [https://github.com/tromp/equihash](https://github.com/tromp/equihash).

## More about ASIC-Resistant Hash Functions

Lear more about the **ASIC-resistant hash functions** at: [https://github.com/ifdefelse/ProgPOW](https://github.com/ifdefelse/ProgPOW).

