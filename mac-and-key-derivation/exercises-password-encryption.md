# Exercises: Password Encryption

In this exercise you will design a **user authentication system** for modern a Web or mobile app, following the industry's best practices. Implement user **register** / **login** / **change password** functionality, using the **Argon2** secure password hashing with **random salt**. Keep the **usernames** and their corresponding Argon2 hashed **passwords** \(along with the Argon2 algorithm parameters and the random salt\) as key-value pairs in the form **username:argon2hash**, in a simple JSON document. In the real world you may use a **database** instead of **JSON** document, but let's keep the exercise simple.

## Implementation :

Let **data.json** be the **json** file where we store username and argon2hash of password of all users.

Format of **data.json** file ( initially **data.json** contains only "{}" ):

```json
{
  "username1": "argon2hash-of-user1's-password",
  "username2": "argon2hash-of-user2's-password"
}
```


## Implementing "Register User"

**Input:** username + password + JSON holding all current accounts.

**Output:** modified JSON file or "user exists" exception.


```python
import json, argon2, getpass


class UserExistsError(Exception):
    def __init__(self, value):
        self.value = value

    def __str__(self):
        return (repr(self.value))


# read the content of data.json file and convert it into a dictionary object
filename = "data.json"
file_content = ""

with open(filename, "r") as infile:
    file_content = infile.read()

data_dict = json.loads(file_content)

while True:
    new_username = input("\nEnter new username : ")

    try:
        if new_username in data_dict.keys():
            raise UserExistsError("user exists")
        else:
            break  # break while loop and input password

    except UserExistsError as e:
        print(e)

try:
    password = getpass.getpass("Password : ")
except Exception as e:
    print(e)


# create argon2 hash of password
argon2Hasher = argon2.PasswordHasher(
    time_cost=16, memory_cost=2**15, parallelism=2, hash_len=32, salt_len=16)
hash = argon2Hasher.hash(password)


# store in the data_dict and then to the json file
data_dict[new_username] = hash

# storing in data.json file
with open(filename, "w") as outfile:
    json.dump(data_dict, outfile)
print("Saved user info in data.json file!")

updated_data_dict = json.dumps(data_dict, indent=4)
print("\nUpdated data.json file content : \n", updated_data_dict)
```

_**Sample output** for "Register User"_

```

Enter new username : user3
Password :
Saved user info in data.json file!

Updated data.json file content :
 {
    "user1": "$argon2id$v=19$m=32768,t=16,p=2$KADeCZaGEaOK3LGiWPDCwQ$cwO4XjQ7UUaLqyxxUcPm66NmjyfQfB2TrWwzMy1PSO8",
    "user2": "$argon2id$v=19$m=32768,t=16,p=2$cFsgqTmJElN3KNojriCWqQ$PgQnq6RE5gG2mA9MXkUP77c9uCMGbtbIyZEd7RmHedI",
    "user3": "$argon2id$v=19$m=32768,t=16,p=2$MtIAEv+kF6ynQSfdlEyj1w$9FHG+hdBBO+IUwuTDuKLxo0ttZl2py3AbwCjF6YJ30Y"
}
```

## Implementing "User Login"

**Input:** username + password + JSON holding all current accounts.

**Output:** correct / incorrect login.

```python
import json, argon2, getpass

# read the content of data.json file and convert it into a dictionary object
filename = "data.json"
file_content = ""

with open(filename, "r") as infile:
    file_content = infile.read()

data_dict = json.loads(file_content)


username = input("Username : ")

if username in data_dict.keys():
    try:
        password = getpass.getpass("Password : ")
    except Exception as e:
        print(e)

    argon2Hasher = argon2.PasswordHasher(
        time_cost=16, memory_cost=2**15, parallelism=2, hash_len=32, salt_len=16)

    hash = data_dict[username]
    try:
        verifyValid = argon2Hasher.verify(hash, password)
        print("correct login")
    except Exception as e:
        print(e)
        print("incorrect login")

else:
    print("incorrect login")  # or print("No user with given username")
```

_**Sample output** for "User Login"_

```
Username : user1
Password :
correct login


Username : user2
Password :
The password does not match the supplied hash
incorrect login
```

## Implementing "Change Password"

**Input:** username + old password + new password + JSON holding all current accounts.

**Output:** modified JSON file or "user does not exist" exception.

```python
import json, argon2, getpass


class UserDoesNotExistError(Exception):
    def __init__(self, value):
        self.value = value

    def __str__(self):
        return (repr(self.value))


# read the content of data.json file and convert it into a dictionary object
filename = "data.json"
file_content = ""

with open(filename, "r") as infile:
    file_content = infile.read()

data_dict = json.loads(file_content)


username = input("Username : ")

try:
    if username in data_dict.keys():
        try:
            old_password = getpass.getpass("Old Password : ")
        except Exception as e:
            print(e)

        argon2Hasher = argon2.PasswordHasher(
            time_cost=16, memory_cost=2**15, parallelism=2, hash_len=32, salt_len=16)

        hash = data_dict[username]
        try:
            verifyValid = argon2Hasher.verify(hash, old_password)
            print("correct old password!")

            try:
                new_password = getpass.getpass("New Password : ")
            except Exception as e:
                print(e)

            argon2Hasher = argon2.PasswordHasher(
                time_cost=16, memory_cost=2**15, parallelism=2, hash_len=32, salt_len=16)

            hash = argon2Hasher.hash(new_password)
            data_dict[username] = hash  # updating password

            with open(filename, "w") as outfile:
                json.dump(data_dict, outfile)

            print("Successfully changed password!")

        except Exception as e:
            print(e)
            print("incorrect old username/old_password")

    else:
        raise UserDoesNotExistError("No user with given username")

except Exception as e:
    print(e)
```

_**Sample output** for "Change Password"_

```
Username : user1
Old Password :
correct old password!
New Password :
Successfully changed password!
```

## Implementing "Reset Password"

**Input:** username + new password + JSON holding all current accounts.

**Output:** modified JSON file or "user exists" exception.

```python
import json, argon2, getpass


class UserDoesNotExistError(Exception):
    def __init__(self, value):
        self.value = value

    def __str__(self):
        return (repr(self.value))


# read the content of data.json file and convert it into a dictionary object
filename = "data.json"
file_content = ""

with open(filename, "r") as infile:
    file_content = infile.read()

data_dict = json.loads(file_content)


username = input("Username : ")

try:
    if username in data_dict.keys():

        try:
            new_password = getpass.getpass("New Password : ")
        except Exception as e:
            print(e)

        argon2Hasher = argon2.PasswordHasher(
            time_cost=16, memory_cost=2**15, parallelism=2, hash_len=32, salt_len=16)

        hash = argon2Hasher.hash(new_password)
        data_dict[username] = hash  # updating password

        with open(filename, "w") as outfile:
            json.dump(data_dict, outfile)

        print("Password reset successful!")

    else:
        raise UserDoesNotExistError("No user with given username")

except Exception as e:
    print(e)

```

_**Sample output** for "Reset Password"_

```
Username : user2
New Password :
Password reset successful!
```
