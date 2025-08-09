# @open_auth/react-ui

Prebuilt authentication UI components for React apps, designed to work seamlessly with the core [`@open_auth/auth`](https://www.npmjs.com/package/@open_auth/auth) library.

This package provides ready-to-use pages for signing in, signing up, and deleting accounts, with HTML inline styling so no CSS setup is required.

---

## Features
- Works in **any React app** (Next.js, CRA, Vite, etc.).
- No styling configuration needed.
- Zero props — plug and play.
- Handles sign in, sign up, and account deletion.
- Fully integrated with [`@open_auth/auth`](https://www.npmjs.com/package/@open_auth/auth).

---

## Installation

```bash
# npm
npm install @open_auth/react-ui
# yarn
yarn add @open_auth/react-ui
```

---

## Requirements
Before using this package, you must set up the core authentication backend using @open_auth/auth.
📦 [View README](../auth/README.md)

## Usage
Import the prebuilt pages directly into your routes.

---
## Example

```js
// lib/open_auth.js

import {CreateOpenAuthUI} from "@open_auth/react-ui";
import openAuth from "./open_auth";

const openAuthUI = new CreateOpenAuthUI({
    AppName : "Test App" , // your app name
    openAuth
});

export default openAuthUI;

```
```jsx
import { openAuthUI } from "@open_auth/react-ui";

export default function SignInPage() {
    return (
        <main style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <openAuthUI.SignIn />
        </main>
    );
}
```
```jsx
import { openAuthUI } from "@open_auth/react-ui";

export default function SignUpPage() {
    return (
        <main style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <openAuthUI.SignUp />
        </main>
    );
}
```
```jsx
import { openAuthUI } from "@open_auth/react-ui";

export default function SignInPassPage() {
    return (
        <main style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <openAuthUI.SignInPass />
        </main>
    );
}
```
```jsx
import { openAuthUI } from "@open_auth/react-ui";

export default function SignUpPassPage() {
    return (
        <main style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <openAuthUI.SignUpPass />
        </main>
    );
}
```
```jsx
import { openAuthUI } from "@open_auth/react-ui";

export default function DeleteAccountPage() {
    return (
        <main style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
            <openAuthUI.DeleteAccount />
        </main>
    );
}
```

---

## Pages Provided
|Component	    |Route	            |Description                        |
|---------------|-------------------|-----------------------------------|
|SignIn	        |/signIn	        |Sign in via email link.            |
|SignUp	        |/signUp	        |Sign up via email link.            |
|SignInPass	    |/signInPassword	|Sign in via email & password.      |
|SignUpPass	    |/signUpPassword	|Sign up via email & password.      |
|DeleteAccount	|/deleteAccount	    |Deletes the current logged-in user.|

---

## 📄 License

MIT

