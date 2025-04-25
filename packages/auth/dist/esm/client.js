import { signUp } from "./utils/signUp";
import { signUpPassword } from "./utils/signUpPass";
import { signOut } from "./utils/signOut";
import { resendPass } from "./utils/resendPass";
import { signIn } from "./utils/signIn";
import { signInPassword } from "./utils/signInPass";
var CreateOpenAuthClient = /** @class */ (function () {
    function CreateOpenAuthClient(_a) {
        var backendUrl = _a.backendUrl;
        this.backend_Url = backendUrl;
    }
    CreateOpenAuthClient.prototype.signUp = function (_a) {
        var username = _a.username, email = _a.email;
        return signUp({ username: username, email: email, backend_url: this.backend_Url });
    };
    CreateOpenAuthClient.prototype.signUpPassword = function (_a) {
        var password = _a.password;
        return signUpPassword({ password: password, backend_url: this.backend_Url });
    };
    CreateOpenAuthClient.prototype.resendPass = function () {
        return resendPass({ backend_url: this.backend_Url });
    };
    CreateOpenAuthClient.prototype.signOut = function () {
        return signOut();
    };
    CreateOpenAuthClient.prototype.signIn = function (_a) {
        var email = _a.email;
        return signIn({ email: email, backend_url: this.backend_Url });
    };
    CreateOpenAuthClient.prototype.signInPassword = function (_a) {
        var password = _a.password;
        return signInPassword({ password: password, backend_url: this.backend_Url });
    };
    return CreateOpenAuthClient;
}());
export { CreateOpenAuthClient };
