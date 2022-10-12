# Middlewares

## Auth Middleware

### validateEmail

```
// Email validation and Regex check

if (email_domain == "lnmiit.ac.in")
    next()
else
    {
        "status": "error",
        "message": "Use the registered email address to access",
        "statusCode": "400",
    }
```

### validateRegister

```
// Password check
if(!password || password.length < 6)
    next()
else
    {
        "status": "error",
        "message": "Password must be equal to atleast 6 characters",
        "statusCode": "400",
    }
```

```
// Password confirmation

if(!passwordConfirm || password != passwordConfirm)
    next()
else
    {
        "status": "error",
        "message": "Both the passwords must match",
        "statusCode": "400",
    }
```

```
// Phone Number check

if(!phoneNumber)
    next()
else
{
    "status": "error",
	"message": "Please enter a valid Mobile Number",
	"statusCode": "400",
}
```

### validateUser

```
// User authentication check

if(req.session && req.session.UserId)
    next()
else
    {
        "status": "error",
		"data": null,
		"message": "User Authentication failed. Please login to continue.",
		"statusCode": "403",
    }
```

### validateAdmin

```
// Admin authentication check

if(req.session && req.session.Admin)
    next()
else
    {
        "status": "error",
		"data": null,
		"message": "User Authentication failed. Please login to continue.",
		"statusCode": "401",
    }
```

# Authentication Routes

## GET /register

### Responses : application/json

### Example Value :

### Successful Operation

```
{
    "status": "success",
    "data": null,
	"message": "Page loaded successfully",
	"statusCode": 200,
}
```

### Error

```
{
    "status": "error",
	"data": null,
	"message": err.message,
	"statusCode": 400,
}
```

## POST /register

### Request body : application/json

### Example Value :

```
{
   "name": "Ketan",
   "email": "19ucc020@lnmiit.ac.in",
   "password": "abc123",
   "passwordConfirm": "abc123",
   "phoneNumber": 9461721651
}
```

### Responses : application/json

### Example Value :

### Successful Operation

```
console:

------------------
Password Hash: $2a$10$W4nb2CwNHvQ5LI4Lu25zOOWQgnCuOzsLsVIx/bsMiVHlSAb71mKDu
------------------
UserId(encrypted): 72e52f3bdd2fb6c5f0c1ad54ca8b6f2a
UserId(decrypted): 17
```

```
logger: POST /register 200 171.105 ms - 192
```

```
response:

{
    "status": "success",
    "data": {
        "fieldCount": 0,
        "affectedRows": 1,
        "insertId": 1,
        "info": "",
        "serverStatus": 2,
        "warningStatus": 0
    },
    "message": "User registered successfully",
    "UserId": "1",
    "statusCode": 200
}
```

### Error

```
logger: POST /register 500 430.597 ms - 102
```

```
response:

{
    "status": "error",
    "data": null,
    "message": "Check constraint 'user_chk_1' is violated.",
    "statusCode": 500
}
```

## POST /login

## GET /login

## GET /logout

### Responses : application/json

### Example Value :

### Successful Operation

```

{
    "status": "success",
    "data": null,
    "message": "Logged out successfully"
}

```

### Error

```
{
    "status": "error",
	"data": null,
	"message": err.message,
	"statusCode": res.statusCode,
}
```
## 