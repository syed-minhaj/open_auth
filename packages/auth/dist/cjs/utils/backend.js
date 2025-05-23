"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.open_auth_backend = open_auth_backend;
var resendPass_1 = require("./backend/resendPass");
var signIn_cred_1 = require("./backend/signIn-cred");
var signUp_cred_1 = require("./backend/signUp-cred");
var signUp_pass_1 = require("./backend/signUp-pass");
var signIn_pass_1 = require("./backend/signIn-pass");
var zod_1 = require("zod");
var signUpCredSchema = zod_1.z.object({
    username: zod_1.z.string(),
    email: zod_1.z.string().email({ message: "invalid email" }),
    prevUrl: zod_1.z.string()
});
var signUpPassSchema = zod_1.z.object({
    password: zod_1.z.number(),
    credJwt: zod_1.z.string().jwt({ message: "invalid jwt" })
});
var signInCredSchema = zod_1.z.object({
    email: zod_1.z.string().email({ message: "invalid email" }),
    prevUrl: zod_1.z.string()
});
var signInPassSchema = zod_1.z.object({
    password: zod_1.z.number(),
    credJwt: zod_1.z.string().jwt({ message: "invalid jwt" })
});
function open_auth_backend(from, data) {
    return __awaiter(this, void 0, void 0, function () {
        var Console, originalLog, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    Console = console.Console;
                    originalLog = new Console({ stdout: process.stdout });
                    console.log = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        process.stdout.write("\x1b[34m" + '[OPEN_AUTH] ' + "\x1b[0m");
                        var message = args.map(function (arg) {
                            return typeof arg === 'object' ? JSON.stringify(arg) : String(arg);
                        }).join(' ');
                        process.stdout.write(message);
                        process.stdout.write("\n");
                    };
                    return [4 /*yield*/, backend(from, data)];
                case 1:
                    res = _a.sent();
                    console.log = originalLog.log;
                    return [2 /*return*/, res];
            }
        });
    });
}
function backend(from, data) {
    return __awaiter(this, void 0, void 0, function () {
        var d, signUpCredZod, signUpPassZod, signInCredZod, signInPassZod;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!from) {
                        return [2 /*return*/, { err: "bad request" }];
                    }
                    if (!(from === 'signUp-credential')) return [3 /*break*/, 4];
                    if (!(data.username && data.email)) return [3 /*break*/, 2];
                    d = {
                        username: data.username,
                        email: data.email,
                        prevUrl: (data.prevUrl == "") ? "/" : data.prevUrl
                    };
                    signUpCredZod = signUpCredSchema.safeParse(d);
                    if (!signUpCredZod.success) {
                        return [2 /*return*/, { err: "invalid input" }];
                    }
                    return [4 /*yield*/, (0, signUp_cred_1.signUpCred)(signUpCredZod.data)];
                case 1: return [2 /*return*/, _a.sent()];
                case 2: return [2 /*return*/, { err: "provide username and email" }];
                case 3: return [3 /*break*/, 21];
                case 4:
                    if (!(from === 'signUp-password')) return [3 /*break*/, 8];
                    if (!(data.password && data.credJwt)) return [3 /*break*/, 6];
                    signUpPassZod = signUpPassSchema.safeParse(data);
                    if (!signUpPassZod.success) {
                        return [2 /*return*/, { err: "invalid input" }];
                    }
                    return [4 /*yield*/, (0, signUp_pass_1.signUpPass)(signUpPassZod.data)];
                case 5: return [2 /*return*/, _a.sent()];
                case 6: return [2 /*return*/, { err: "provide password and credJwt" }];
                case 7: return [3 /*break*/, 21];
                case 8:
                    if (!(from === 'resendPass')) return [3 /*break*/, 12];
                    if (!data.credJwt) return [3 /*break*/, 10];
                    return [4 /*yield*/, (0, resendPass_1.resendPass)(data)];
                case 9: return [2 /*return*/, _a.sent()];
                case 10: return [2 /*return*/, { err: "provide email and credJwt" }];
                case 11: return [3 /*break*/, 21];
                case 12:
                    if (!(from === 'signIn-credential')) return [3 /*break*/, 16];
                    if (!data.email) return [3 /*break*/, 14];
                    signInCredZod = signInCredSchema.safeParse(data);
                    if (!signInCredZod.success) {
                        return [2 /*return*/, { err: "invalid input" }];
                    }
                    return [4 /*yield*/, (0, signIn_cred_1.signInCred)(signInCredZod.data)];
                case 13: return [2 /*return*/, _a.sent()];
                case 14: return [2 /*return*/, { err: "provide email" }];
                case 15: return [3 /*break*/, 21];
                case 16:
                    if (!(from === 'signIn-password')) return [3 /*break*/, 20];
                    if (!(data.password && data.credJwt)) return [3 /*break*/, 18];
                    signInPassZod = signInPassSchema.safeParse(data);
                    if (!signInPassZod.success) {
                        return [2 /*return*/, { err: "invalid input" }];
                    }
                    return [4 /*yield*/, (0, signIn_pass_1.signInPass)(signInPassZod.data)];
                case 17: return [2 /*return*/, _a.sent()];
                case 18: return [2 /*return*/, { err: "provide password and credJwt" }];
                case 19: return [3 /*break*/, 21];
                case 20: return [2 /*return*/, { err: "bad request" }];
                case 21: return [2 /*return*/];
            }
        });
    });
}
