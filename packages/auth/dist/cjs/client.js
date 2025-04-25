"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOpenAuthClient = void 0;
var signUp_1 = require("./utils/signUp");
var signUpPass_1 = require("./utils/signUpPass");
var signOut_1 = require("./utils/signOut");
var resendPass_1 = require("./utils/resendPass");
var signIn_1 = require("./utils/signIn");
var signInPass_1 = require("./utils/signInPass");
var CreateOpenAuthClient = /** @class */ (function () {
    function CreateOpenAuthClient(_a) {
        var backendUrl = _a.backendUrl;
        this.backend_Url = backendUrl;
    }
    CreateOpenAuthClient.prototype.signUp = function (_a) {
        var username = _a.username, email = _a.email;
        return (0, signUp_1.signUp)({ username: username, email: email, backend_url: this.backend_Url });
    };
    CreateOpenAuthClient.prototype.signUpPassword = function (_a) {
        var password = _a.password;
        return (0, signUpPass_1.signUpPassword)({ password: password, backend_url: this.backend_Url });
    };
    CreateOpenAuthClient.prototype.resendPass = function () {
        return (0, resendPass_1.resendPass)({ backend_url: this.backend_Url });
    };
    CreateOpenAuthClient.prototype.signOut = function () {
        return (0, signOut_1.signOut)();
    };
    CreateOpenAuthClient.prototype.signIn = function (_a) {
        var email = _a.email;
        return (0, signIn_1.signIn)({ email: email, backend_url: this.backend_Url });
    };
    CreateOpenAuthClient.prototype.signInPassword = function (_a) {
        var password = _a.password;
        return (0, signInPass_1.signInPassword)({ password: password, backend_url: this.backend_Url });
    };
    return CreateOpenAuthClient;
}());
exports.CreateOpenAuthClient = CreateOpenAuthClient;
