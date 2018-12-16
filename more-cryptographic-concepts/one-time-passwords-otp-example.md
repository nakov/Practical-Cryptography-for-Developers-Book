# One-Time Passwords \(OTP\) - Examples in Python

In this section, we shall provide an **example** of how to generate and validate One-Time Passwords \(**OTP**\) in Python. The Python library of our choice is [**PyOTP**](https://github.com/pyauth/pyotp), which implement the [RFC 4226](https://tools.ietf.org/html/rfc4226) and [RFC 6238](https://tools.ietf.org/html/rfc6238) standards. If you want to use this library you should **follow the requirements** in those standards. Installation:

```py
pip install pyotp
```

## Server-Side Setup

We need to **create a base32 secret** which has to be shared between the authentication server and the client. We will use [Google Authenticator OpenSource](https://github.com/google/google-authenticator) OTP model which produce a **URI for an exchange**, the secret and additional client-server details. It includes the shared secret, the client's username, and the issuer's name.

```py
import pyotp

base32secret = pyotp.random_base32()
print('Secret:', base32secret)

totp_uri = pyotp.totp.TOTP(base32secret).provisioning_uri(
    "alice@google.com",
    issuer_name="Secure App")
print(totp_uri)
```

Run the above code example: https://repl.it/@nakov/OTP-Server-Side.

Sample output:

```py
Secret: S3K3TPI5MYA2M67V
otpauth://totp/Secure%20App:alice%40google.com?secret=S3K3TPI5MYA2M67V&issuer=Secure%20App
```

## Client-Side Setup

Once the client stores the secret in a secure way, in a **time-interval** of a 30 seconds \(by default\) a new code will be generated.

```py
import pyotp
import time

base32secret = 'S3K3TPI5MYA2M67V'
print('Secret:', base32secret)

totp = pyotp.TOTP(base32secret)
print('OTP code:', totp.now())
time.sleep(30)
print('OTP code:', totp.now())
```

Run the above code example: https://repl.it/@nakov/OTP-Client-Side.

Sample output:

```
Secret: S3K3TPI5MYA2M67V
OTP code: 339838
OTP code: 284911
```

## Working Example

You can install Google Authenticator from [Google Play](https://play.google.com) or [App Store](http://appstore.com) and scan the QR code below:

![OTP Auth](/assets/one-time-passwords-otp-example-qr-code.png)

Example validation check:

```py
import pyotp

base32secret = 'S3K3TPI5MYA2M67V'
print('Secret:', base32secret)

totp = pyotp.TOTP(base32secret)
your_code = '123456'
print(totp.verify('Code Valid:', your_code))
```

Run the above code example: https://repl.it/@nakov/QR-code-scanner.

Output:

```
Secret: S3K3TPI5MYA2M67V
Code Valid: True
```



