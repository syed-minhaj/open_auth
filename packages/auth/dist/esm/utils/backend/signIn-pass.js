var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { User_table_checkdb, OPT_table_checkdb } from "./checkdb";
import { opt_delete, opt_varify } from "./optdb";
import { getUser } from "./userdb";
import { sign, verify } from "jsonwebtoken";
import { z } from "zod";
var credSchema = z.object({
    email: z.string(),
    prevUrl: z.string()
});
var userSchema = z.object({
    userId: z.number(),
    userName: z.string(),
    userEmail: z.string().email({ message: "invalid email form database , check database" })
});
export function signInPass(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var cred_from_jwt, safeCred, cred, varifyOPT, user, verified_user, jwt_tocken;
        var password = _b.password, credJwt = _b.credJwt;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!process.env.AUTH_SECRET) {
                        console.log('Auth secret not set');
                        return [2 /*return*/, { err: 'Auth secret not set' }];
                    }
                    return [4 /*yield*/, User_table_checkdb().catch(function (err) {
                            console.log(err);
                            return { err: 'Database error check logs for more details' };
                        })];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, OPT_table_checkdb().catch(function (err) {
                            console.log(err);
                            return { err: 'Database error check logs for more details' };
                        })];
                case 2:
                    _c.sent();
                    try {
                        cred_from_jwt = verify(credJwt, process.env.AUTH_SECRET);
                    }
                    catch (err) {
                        console.log(err, 'Invalid cred jwt');
                        return [2 /*return*/, { err: 'Invalid cred jwt' }];
                    }
                    safeCred = credSchema.safeParse(cred_from_jwt);
                    if (!safeCred.success) {
                        return [2 /*return*/, { err: 'invalid input(cred jwt)' }];
                    }
                    cred = safeCred.data;
                    return [4 /*yield*/, opt_varify(cred.email, password)];
                case 3:
                    varifyOPT = _c.sent();
                    if (!varifyOPT) {
                        return [2 /*return*/, { err: 'wrong password' }];
                    }
                    else if (varifyOPT != true && varifyOPT.err) {
                        console.log(varifyOPT.err);
                        return [2 /*return*/, { err: varifyOPT.err }];
                    }
                    return [4 /*yield*/, opt_delete(cred.email).catch(function (err) {
                            console.log(err);
                            return { err: 'Database error check logs for more details' };
                        })];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, getUser({ userEmail: cred.email }).catch(function (err) {
                            console.log(err);
                            return { err: 'Database error check logs for more details' };
                        })];
                case 5:
                    user = _c.sent();
                    verified_user = userSchema.safeParse(user);
                    if (!verified_user.success) {
                        console.log(verified_user.error, 'Database error : user table');
                        return [2 /*return*/, { err: 'data base error: check logs for more details' }];
                    }
                    jwt_tocken = sign(verified_user, process.env.AUTH_SECRET);
                    return [2 /*return*/, { message: "Signed In", jwt: jwt_tocken, returnUrl: cred.prevUrl }];
            }
        });
    });
}
