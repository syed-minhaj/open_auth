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
import { Pool } from "pg";
export function opt_create(userEmail, password) {
    return __awaiter(this, void 0, void 0, function () {
        var db, nowtime;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!process.env.DATABASE_URL) {
                        throw new Error('Please set the database url in env');
                    }
                    db = new Pool({
                        connectionString: process.env.DATABASE_URL
                    });
                    // removeing all opt for this user 
                    return [4 /*yield*/, db.query("\n        DELETE FROM \"OPT\" WHERE \"userEmail\" = $1;\n    ", [userEmail])];
                case 1:
                    // removeing all opt for this user 
                    _a.sent();
                    nowtime = new Date(Date.now());
                    return [4 /*yield*/, db.query("\n        INSERT INTO \"OPT\" (\"userEmail\", \"password\" , \"createdAt\") VALUES ($1, $2, $3) ;\n    ", [userEmail, password, nowtime])];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
export function opt_varify(userEmail, password) {
    return __awaiter(this, void 0, void 0, function () {
        var db, res;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!process.env.DATABASE_URL) {
                        throw new Error('Please set the database url in env');
                    }
                    db = new Pool({
                        connectionString: process.env.DATABASE_URL
                    });
                    return [4 /*yield*/, db.query("\n        SELECT \"password\" , \"tries\" , \"createdAt\"\n        FROM \"OPT\"\n        WHERE \"userEmail\" = $1  AND \"password\" = $2;\n    ", [userEmail, password])];
                case 1:
                    res = _a.sent();
                    if (!(res.rows[0] && res.rows[0].tries < 10 && res.rows[0].createdAt > new Date(Date.now() - 3 * 60 * 1000))) return [3 /*break*/, 3];
                    return [4 /*yield*/, opt_delete(userEmail)];
                case 2:
                    _a.sent();
                    return [2 /*return*/, true];
                case 3:
                    if (!(res.rows[0] && (res.rows[0].tries > 10 || res.rows[0].createdAt < new Date(Date.now() - 5 * 60 * 1000)))) return [3 /*break*/, 5];
                    return [4 /*yield*/, opt_delete(userEmail)];
                case 4:
                    _a.sent();
                    return [2 /*return*/, { err: 'OTP expired ' }];
                case 5: return [4 /*yield*/, db.query("\n            UPDATE \"OPT\" SET \"tries\" = \"tries\" + 1 WHERE \"userEmail\" = $1 ;\n        ", [userEmail])];
                case 6:
                    _a.sent();
                    return [2 /*return*/, false];
            }
        });
    });
}
export function opt_delete(userEmail) {
    return __awaiter(this, void 0, void 0, function () {
        var db;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!process.env.DATABASE_URL) {
                        throw new Error('Please set the database url in env');
                    }
                    db = new Pool({
                        connectionString: process.env.DATABASE_URL
                    });
                    return [4 /*yield*/, db.query("\n        DELETE FROM \"OPT\" WHERE \"userEmail\" = $1;\n    ", [userEmail])];
                case 1:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
