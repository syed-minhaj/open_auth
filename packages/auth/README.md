# @open_auth/auth 🚀

A simple and lightweight authentication library for web apps using **One-Time Passwords (OTP)** and **Password-based login**. 🔒  
Built in **TypeScript**, compiled for both **CommonJS** and **ESModules**.

✅ Supports:
- ✉️ Sign Up (OTP and Password based)
- ✅ Sign In (OTP and Password based)
- 🔁 Resend OTP
- 🚪 Sign Out

---

## 🔐 How It Works

- This auth system uses **JWT (JSON Web Tokens)** for user sessions.
- JWTs are stored securely in **HTTP-only cookies**.
- The backend generates tokens after sign-in, and the client stores them in the browser using cookies.
- This setup is secure and works well across multiple platforms.

---

## 📦 Installation

```bash
npm install @open_auth/auth
```

---

## 🌍 Environment Variables

### Frontend App

| Variable         | Description                            |
|------------------|----------------------------------------|
| `BACKEND_URL`    | URL of your backend server (e.g., `http://localhost:3000`) |

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:3001
```

---

### Backend App

These variables are required in your backend server (`.env` file):

| Variable         | Description                               |
|------------------|-------------------------------------------|
| `DATABASE_URL`   | PostgreSQL connection string              |
| `FROM_EMAIL`     | Your email for sending OTPs               |
| `APP_PASSWORD`   | Google app password for email             |
| `AUTH_SECRET`    | Secret used to sign JWT tokens            |

```env
DATABASE_URL=postgresql://user:pass@localhost:5432/dbname
FROM_EMAIL=your-email@gmail.com
APP_PASSWORD=your-google-app-password
AUTH_SECRET=your-secure-auth-secret
```

> 🐘 **Note:** PostgreSQL is required as the backend database.

---

## 🔧 Project Setup (for JS/TS)

Make sure your project includes this in `tsconfig.json` or `jsconfig.json`:

```json
{
  "compilerOptions": {
    "module": "esnext",
    "moduleResolution": "bundler"
  }
}
```

---

## 🧪 Usage

Import from:

```js
import {
  signUp,
  signUpPassword,
  signIn,
  signInPassword,
  resendPass,
  signOut
} from "@open_auth/auth/client";
```

Each function returns `{ err: string }` or a success response.

---

## 🧬 Examples

### 🟣 signUp

**React**
```js
await signUp({ username: "user", email: "user@example.com" });
```

**Vanilla JS (CommonJS)**
```js
const { signUp } = require("@open_auth/auth/client");
signUp({ username: "user", email: "user@example.com" });
```

---

### 🟣 signUpPassword

**React**
```js
await signUpPassword({ password: "123456" });
```

**Vanilla JS (CommonJS)**
```js
const { signUpPassword } = require("@open_auth/auth/client");
signUpPassword({ password: "123456" });
```

---

### 🟢 signIn

**React**
```js
await signIn({ email: "user@example.com" });
```

**Vanilla JS (CommonJS)**
```js
const { signIn } = require("@open_auth/auth/client");
signIn({ email: "user@example.com" });
```

---

### 🟢 signInPassword

**React**
```js
await signInPassword({ password: "123456" });
```

**Vanilla JS (CommonJS)**
```js
const { signInPassword } = require("@open_auth/auth/client");
signInPassword({ password: "123456" });
```

---

### 🔁 resendPass

**React**
```js
await resendPass();
```

**Vanilla JS (CommonJS)**
```js
const { resendPass } = require("@open_auth/auth/client");
resendPass();
```

---

### 🚪 signOut

**React**
```js
signOut();
```

**Vanilla JS (CommonJS)**
```js
const { signOut } = require("@open_auth/auth/client");
signOut();
```

---

## 🛠️ Backend Server Setup

### 🧩 Express.js Example

```js
const express = require("express");
const cors = require("cors");
const { open_auth_backend } = require("@open_auth/auth");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.post("/api/auth/open_auth", (req, res) => {
  open_auth_backend(req.headers.from, req.body).then(data => {
    res.json(data);
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

---

### 🔵 Next.js Example (app/api route)

```ts
import { NextRequest, NextResponse } from 'next/server';
import { open_auth_backend } from '@open_auth/auth';

export async function POST(req: NextRequest) {
  const data = await req.json();
  const from = req.headers.get('from');
  const res = await open_auth_backend(from, data);
  return NextResponse.json(res);
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ message: 'success' });
}
```

---

## 📚 API Reference

| Function          | Params                            | Returns                                |
|-------------------|-----------------------------------|----------------------------------------|
| `signUp`          | `{ username, email }`             | `Promise<{ err: any } | undefined>`    |
| `signUpPassword`  | `{ password }`                    | `Promise<{ err: any } | undefined>`    |
| `signIn`          | `{ email }`                       | `Promise<{ err: any } | undefined>`    |
| `signInPassword`  | `{ password }`                    | `Promise<{ err: any } | undefined>`    |
| `resendPass`      | `none`                            | `Promise<{ err: any } or { message }>` |
| `signOut`         | `none`                            | `{ message: string }`                  |

---

## 📄 License

MIT