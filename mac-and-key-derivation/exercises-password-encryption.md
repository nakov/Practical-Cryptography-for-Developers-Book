# Exercises: Password Encryption

In this exercise you will design a **user authentication system** for modern a Web or mobile app, following the industry's best practices. Implement user **register** / **login** / **change password** functionality, using the **Argon2** secure password hashing with **random salt**. Keep the **usernames** and their corresponding Argon2 hashed **passwords** (along with the Argon2 algorithm parameters and the random salt) as key-value pairs in the form **username:argon2hash**, in a simple JSON document. In the real world you may use a **database** instead of **JSON** document, but let's keep the exercise simple.

...

**TODO**

...

## Implement "Register User"

Input: username + password + JSON holding all current accounts.

Output: modified JSON file or "user exists" exception.

...

**TODO**

...

## Implement "User Login"

Input: username + password + JSON holding all current accounts.

Output: correct / incorrect login.

...

**TODO**

...

## Implement "Change Password"

Input: username + old password + new password + JSON holding all current accounts.

Output: modified JSON file or "user exists" exception.

...

**TODO**

...

## Implement "Reset Password"

Input: username + new password + JSON holding all current accounts.

Output: modified JSON file or "user exists" exception.

...

**TODO**

...
