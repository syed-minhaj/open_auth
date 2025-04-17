"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signOut = signOut;
function signOut() {
    document.cookie = "open_auth_jwt=;expires=Tue, 01 Apr 2025 00:00:00 GMT;";
    return { message: "signed out" };
}
