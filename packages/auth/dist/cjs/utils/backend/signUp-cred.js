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
exports.signUpCred = signUpCred;
var checkdb_1 = require("./checkdb");
var varifyCred_1 = require("./varifyCred");
var optdb_1 = require("./optdb");
var sendEmail_1 = require("./sendEmail");
var jsonwebtoken_1 = require("jsonwebtoken");
function signUpCred(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var _c, UserNameError, EmailError, credErr, opt, cred, credJwt;
        var username = _b.username, email = _b.email, prevUrl = _b.prevUrl;
        return __generator(this, function (_d) {
            switch (_d.label) {
                case 0: return [4 /*yield*/, (0, checkdb_1.User_table_checkdb)().catch(function (err) {
                        console.log(err);
                        return { err: 'Database error check logs for more details' };
                    })];
                case 1:
                    _d.sent();
                    return [4 /*yield*/, Promise.all([(0, varifyCred_1.uniqueUserName)(username), (0, varifyCred_1.uniqueEmail)(email)])];
                case 2:
                    _c = _d.sent(), UserNameError = _c[0], EmailError = _c[1];
                    credErr = { UserNameError: UserNameError, EmailError: EmailError };
                    if (UserNameError || EmailError) {
                        return [2 /*return*/, { err: credErr }];
                    }
                    return [4 /*yield*/, (0, checkdb_1.OPT_table_checkdb)().catch(function (err) {
                            console.log(err);
                            return { err: 'Database error check logs for more details' };
                        })
                        // generate a 8 digit OTP
                    ];
                case 3:
                    _d.sent();
                    opt = Math.floor(100000 + Math.random() * 900000);
                    return [4 /*yield*/, (0, optdb_1.opt_create)(email, opt).catch(function (err) {
                            console.log(err);
                            return { err: 'Database error check logs for more details' };
                        })
                        // send email to user
                    ];
                case 4:
                    _d.sent();
                    // send email to user
                    return [4 /*yield*/, (0, sendEmail_1.sendEmail)(email, "Your OTP is ".concat(opt)).catch(function (err) {
                            console.log(err);
                            return { err: 'Database error check logs for more details' };
                        })];
                case 5:
                    // send email to user
                    _d.sent();
                    cred = {
                        username: username,
                        email: email,
                        prevUrl: prevUrl
                    };
                    credJwt = (0, jsonwebtoken_1.sign)(cred, process.env.AUTH_SECRET);
                    return [2 /*return*/, { message: "OTP sent to via email", credJwt: credJwt }];
            }
        });
    });
}
