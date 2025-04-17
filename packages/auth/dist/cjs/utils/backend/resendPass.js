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
exports.resendPass = resendPass;
var checkdb_1 = require("./checkdb");
var optdb_1 = require("./optdb");
var sendEmail_1 = require("./sendEmail");
var jsonwebtoken_1 = require("jsonwebtoken");
var zod_1 = require("zod");
var CredSchema = zod_1.z.object({
    username: zod_1.z.string().optional(),
    email: zod_1.z.string().email({ message: "invalid email" }),
    prevUrl: zod_1.z.string()
});
function resendPass(_a) {
    return __awaiter(this, arguments, void 0, function (_b) {
        var cred_from_jwt, safeCred, cred, opt;
        var credJwt = _b.credJwt;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    if (!process.env.AUTH_SECRET) {
                        console.log('Auth secret not set');
                        return [2 /*return*/, { err: 'Auth secret not set' }];
                    }
                    try {
                        cred_from_jwt = (0, jsonwebtoken_1.verify)(credJwt, process.env.AUTH_SECRET);
                    }
                    catch (err) {
                        console.log(err, 'Invalid cred jwt');
                        return [2 /*return*/, { err: 'Invalid cred jwt' }];
                    }
                    safeCred = CredSchema.safeParse(cred_from_jwt);
                    if (!safeCred.success) {
                        return [2 /*return*/, { err: 'invalid input(cred jwt)' }];
                    }
                    cred = safeCred.data;
                    return [4 /*yield*/, (0, checkdb_1.User_table_checkdb)().catch(function (err) {
                            console.log(err);
                            return { err: 'Database error check logs for more details' };
                        })];
                case 1:
                    _c.sent();
                    return [4 /*yield*/, (0, checkdb_1.OPT_table_checkdb)().catch(function (err) {
                            console.log(err);
                            return { err: 'Database error check logs for more details' };
                        })];
                case 2:
                    _c.sent();
                    opt = Math.floor(100000 + Math.random() * 900000);
                    return [4 /*yield*/, (0, optdb_1.opt_create)(cred.email, opt).catch(function (err) {
                            console.log(err);
                            return { err: 'Database error check logs for more details' };
                        })
                        // send email to user
                    ];
                case 3:
                    _c.sent();
                    // send email to user
                    return [4 /*yield*/, (0, sendEmail_1.sendEmail)(cred.email, "Your OTP is ".concat(opt)).catch(function (err) {
                            console.log(err);
                            return { err: 'Database error check logs for more details' };
                        })];
                case 4:
                    // send email to user
                    _c.sent();
                    return [2 /*return*/, { message: "OTP sent to via email" }];
            }
        });
    });
}
