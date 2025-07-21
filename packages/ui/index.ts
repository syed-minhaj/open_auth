
import React from "react";
import SignInForm from "./form/signIn";
import SignUpForm from "./form/signUp";
import SignInPassForm from "./form/signInPass";
import SignUpPassForm from "./form/signUpPass";
import SignOutButton from "./component/SignOutButton";
import DeleteAccountForm from "./form/deleteAccount";
import { CreateOpenAuthClient } from "@open_auth/auth/client";

class CreateOpenAuthUI  {
    public auth: CreateOpenAuthClient;
    constructor({openAuth}:{openAuth:CreateOpenAuthClient}) {
        this.auth = openAuth;
        this.SignIn         = this.SignIn.bind(this);
        this.SignUp         = this.SignUp.bind(this);
        this.SignInPass     = this.SignInPass.bind(this);
        this.SignUpPass     = this.SignUpPass.bind(this);
        this.SignOut        = this.SignOut.bind(this);
        this.DeleteAccount  = this.DeleteAccount.bind(this);
    }

    SignIn(): React.ReactElement {
        const signInFunction = this.auth.signIn.bind(this.auth);
        return React.createElement(SignInForm, { signInFunction });
    }
    SignUp(): React.ReactElement {
        const signUpFunction = this.auth.signUp.bind(this.auth);
        return React.createElement(SignUpForm, { signUpFunction });
    }
    SignInPass(): React.ReactElement {
        const signInPassFunction = this.auth.signInPassword.bind(this.auth);
        const resendFunction = this.auth.resendPass.bind(this.auth);
        return React.createElement(SignInPassForm, { signInPassFunction , resendFunction });
    }
    SignUpPass(): React.ReactElement {
        const signUpPassFunction = this.auth.signUpPassword.bind(this.auth);
        const resendFunction = this.auth.resendPass.bind(this.auth);
        return React.createElement(SignUpPassForm, { signUpPassFunction , resendFunction });
    }
    SignOut(): React.ReactElement {
        const signOutFunction = this.auth.signOut.bind(this.auth);
        return React.createElement(SignOutButton, { signOutFunction });
    }
    DeleteAccount(): React.ReactElement {
        const deleteAccountFunction = this.auth.deleteAccount.bind(this.auth);
        return React.createElement(DeleteAccountForm, { deleteAccountFunction });
    }
}

export  { CreateOpenAuthUI};