# Rocahead - Test

## Introduction

*abstract*: The intent of this test is parse<sup>[1]</sup> and reply using a standard schema as showed below. Each input will lead to
a success or error message. Case the message becomes a `success` reply, it should send the URL along with the body if it
exists, `undefined` otherwise. Case it is an error, it should send an array or error messages instead.

### Response schema:

```ts
type ResponseSchema = {
    status: 'OK' | 'ERROR';
    redirectUrl?: string;
    errors?: string[];
}
```

### Examples:

If successful:

```json
{
  "status": "OK",
  "redirectUrl": "string"
}
```

If erroneous:

```json
{
  "status": "ERROR",
  "errors": [
    "string"
  ]
}
```

## Getting started:

To install its dependencies, please use:

```
$ npm run install
```

The main file is locate in `src/index.ts`. Feel free to add as many files as you wish.

## Tests

All tests are provided. The implementation should pass in all tests without exception. Feel free to add more, but the default ones should remain the same.

To run tests, use:

```
$ npm run test
```

## Possible inputs:

### Type 1

**Success Message:**

`login=USERNAME&member_id=99999999&auto=https%3A%2F%2Fwww.OFFER.com%2F%3Fpage%3Dupgrade%26member_login%3D468535667-769517b679a8e7e2e03fc378bbd03d45`

**Failed Message:**

`ERR02: Duplicate`

---

### Type 2

**Success Message:**

`https://OFFERURL.com/api/autologin/eyJpdiI6IkJGSGlcL3dxNFA4eEIxdVMzOW55Q1BRPT0iLCJ2YWx1ZSI6IjZmcVBnK1ludHVrS0ttdW10MGlUXC8yYlhqRmt5Y2VqZ3l0Y0k2Uis0bHJXMkJlVlVBU015RVJabUtOdDJoVEgyS2pRTlc5VDVvbFwvcXdJZUlsdkg3YVE9PSIsIm1hYyI6IjEwNjAyNTYzNDg3YjJlNWJiYmE4ZjM4NTQ5MGI2Yzc5MWRjNjg5ZjU5MDhhNTQ3YmNlMWVlNjkxZTIyMzdkM2MifQ==`

**Failed Message:**

`{"status":6,"result":"E-mail address already exists or format is invalid","value":"exampleemail@gmail.com"}`

---

### Type 3

**Success Message:**

`{"code":200,"message":"OK","response":{"browser_url":"OFFERURL.com\/join\/autologin?xndal=BvMyAq7tvGqrXbN-DttpVYnF7fWpYGKTLhQDJJ21tAxvWkoKjn_MgL5nlRNM6wNJa40MPN5btCpXuDc9zKCpigQZArHMrr0LBSLjxU59uAKde_pMwZa-FjnWqiSGg5BYb1oIjkyD0YoDbyNScGdHt0VqU8SnR1KjXgMpa-uqGfK4yqy0IMXtpvYNmZcwI7xi&traffic=browser","email_url":"OFFERURL.com\/join\/autologin?xndal=BvMyAq7tvGqrXbN-DttpVYnF7fWpYGKTLhQDJJ21tAxvWkoKjn_MgL5nlRNM6wNJa40MPN5btCpXuDc9zKCpigQZArHMrr0LBSLjxU59uAKde_pMwZa-FjnWqiSGg5BYb1oIjkyD0YoDbyNScGdHt0VqU8SnR1KjXgMpa-uqGfK4yqy0IMXtpvYNmZcwI7xi&traffic=email","xndal":"BvMyAq7tvGqrXbN-DttpVYnF7fWpYGKTLhQDJJ21tAxvWkoKjn_MgL5nlRNM6wNJa40MPN5btCpXuDc9zKCpigQZArHMrr0LBSLjxU59uAKde_pMwZa-FjnWqiSGg5BYb1oIjkyD0YoDbyNScGdHt0VqU8SnR1KjXgMpa-uqGfK4yqy0IMXtpvYNmZcwI7xi"},"env":null}`

**Failed Message:**

`{"code":409,"message":"Conflict","response":{"error":{"code":409,"message":"Email [exampleemail@gmail.com] already exists"}},"env":null}`

---

### Type 4

**Success message:**

`(empty message)`<sup>[2]</sup>

**Failed message:**

`"Failed"`

---

### Type 5

**Success Message:**

`{"status":"ok","errors":[],"redirect_url":"\/\/OFFERURL.com\/x\/activation?uid=9ec36f4651f859ea68f53d190d428fd9"}`

**Failed Message:**

`{"status":"error","errors":{"validation":{"username":["Username is already in use"],"email":["This email address is already in use at our website!"]}}}`

---

### Type 6

**Success message:**

`https://www.OFFERURL.com/main.php?a=user.login&md5=8325d55ec331ae9b1af74035ec17bee8&process=submit&rurl=%2Fmain.php%3Fa%3Duser.register_success%26sduid%3D%26id%3Drocahead%26cmp%3D12345678`

**Failed message:**

`"E-mail address in use, please choose another. Forgot Password? click here"`

---

### Type 7

**Success message:**

`Array ( [Code] => 200 [Status] => 1 [Message] => 85552459 )`

**Failed message:**

`Array ( [Code] => 500 [Status] => [Message] => 50001-Unable to save user )`

---

### Type 8

**Success message:**

`{"link": "https://redirecturl.com/7tg78gh98gh9g98", "bid": "0.23"}`

**Failed message:**

`{"status": "low bid", "bid": "0.20"}`

---

## Notes

Any questions, you can contact me via [jean@rocahead.com](mailto:jean@rocahead.com).

<sup>[1]</sup> The `content-type` is not available;

<sup>[2]</sup> This is an automatic redirect;
