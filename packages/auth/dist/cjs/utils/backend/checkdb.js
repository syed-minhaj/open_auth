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
exports.User_table_checkdb = User_table_checkdb;
exports.OPT_table_checkdb = OPT_table_checkdb;
var pg_1 = require("pg");
function User_table_checkdb() {
    return __awaiter(this, void 0, void 0, function () {
        var db, exists, columnCheckQuery, columnCheckResult, existingColumns, requiredColumns, missingColumns, _i, missingColumns_1, column, alterQuery, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!process.env.DATABASE_URL) {
                        throw new Error('Please set the database url in env');
                    }
                    db = new pg_1.Pool({
                        connectionString: process.env.DATABASE_URL
                    });
                    return [4 /*yield*/, db.query("\n        SELECT EXISTS (\n          SELECT FROM information_schema.tables\n          WHERE table_name = 'User'\n        );\n    ")];
                case 1:
                    exists = _a.sent();
                    if (!!exists.rows[0].exists) return [3 /*break*/, 3];
                    return [4 /*yield*/, db.query("\n            CREATE TABLE \"User\" (\n                \"userId\" SERIAL PRIMARY KEY,\n                \"userName\" TEXT UNIQUE NOT NULL,\n                \"userEmail\" TEXT UNIQUE NOT NULL\n            );\n        ")];
                case 2:
                    _a.sent();
                    console.log("User table created");
                    return [2 /*return*/];
                case 3:
                    columnCheckQuery = "\n        SELECT column_name FROM information_schema.columns \n        WHERE table_name = 'User' AND column_name IN ('userId', 'userEmail', 'userName');\n    ";
                    return [4 /*yield*/, db.query(columnCheckQuery)];
                case 4:
                    columnCheckResult = _a.sent();
                    existingColumns = columnCheckResult.rows.map(function (row) { return row.column_name; });
                    requiredColumns = ['userEmail', 'userName', 'userId'];
                    missingColumns = requiredColumns.filter(function (col) { return !existingColumns.includes(col); });
                    if (!(missingColumns.length === 0)) return [3 /*break*/, 5];
                    console.log("User table has all required columns.");
                    return [3 /*break*/, 11];
                case 5:
                    console.log("Existing columns:", existingColumns);
                    console.log("Missing columns:", missingColumns);
                    _i = 0, missingColumns_1 = missingColumns;
                    _a.label = 6;
                case 6:
                    if (!(_i < missingColumns_1.length)) return [3 /*break*/, 11];
                    column = missingColumns_1[_i];
                    alterQuery = void 0;
                    if (column === 'userId') {
                        alterQuery = 'ALTER TABLE "User" ADD COLUMN "userId" SERIAL ;';
                        console.error("userId is not a serial column, please change it to serial");
                    }
                    else if (column === 'userEmail') {
                        alterQuery = 'ALTER TABLE "User" ADD COLUMN "userEmail" TEXT NOT NULL UNIQUE;';
                    }
                    else if (column === 'userName') {
                        alterQuery = 'ALTER TABLE "User" ADD COLUMN "userName" TEXT NOT NULL;';
                    }
                    else {
                        throw new Error("Unknown column: ".concat(column));
                    }
                    _a.label = 7;
                case 7:
                    _a.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, db.query(alterQuery)];
                case 8:
                    _a.sent();
                    console.log("Added missing column: ".concat(column));
                    return [3 /*break*/, 10];
                case 9:
                    error_1 = _a.sent();
                    throw new Error("Cannot add missing column: ".concat(column));
                case 10:
                    _i++;
                    return [3 /*break*/, 6];
                case 11: return [2 /*return*/];
            }
        });
    });
}
function OPT_table_checkdb() {
    return __awaiter(this, void 0, void 0, function () {
        var db, exists, columnCheckQuery, columnCheckResult, existingColumns, requiredColumns, missingColumns, _i, missingColumns_2, column, alterQuery, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!process.env.DATABASE_URL) {
                        throw new Error('Please set the database url in env');
                    }
                    db = new pg_1.Pool({
                        connectionString: process.env.DATABASE_URL
                    });
                    return [4 /*yield*/, db.query("\n      SELECT EXISTS (\n        SELECT FROM information_schema.tables\n        WHERE table_name = 'OPT'\n      );\n  ")];
                case 1:
                    exists = _a.sent();
                    if (!!exists.rows[0].exists) return [3 /*break*/, 3];
                    return [4 /*yield*/, db.query("\n          CREATE TABLE \"OPT\" (\n              \"userEmail\" TEXT  PRIMARY KEY,\n              \"password\" SERIAL NOT NULL,\n              \"tries\" INTEGER NOT NULL DEFAULT 0,\n              \"createdAt\" TIMESTAMP NOT NULL \n          );\n      ")];
                case 2:
                    _a.sent();
                    console.log("OPT (one time password) table created");
                    return [2 /*return*/];
                case 3:
                    columnCheckQuery = "\n      SELECT column_name FROM information_schema.columns \n      WHERE table_name = 'OPT' AND column_name IN ( 'userEmail', 'password' , 'tries' , 'createdAt');\n  ";
                    return [4 /*yield*/, db.query(columnCheckQuery)];
                case 4:
                    columnCheckResult = _a.sent();
                    existingColumns = columnCheckResult.rows.map(function (row) { return row.column_name; });
                    requiredColumns = ['userEmail', 'password', 'tries', 'createdAt'];
                    missingColumns = requiredColumns.filter(function (col) { return !existingColumns.includes(col); });
                    if (!(missingColumns.length === 0)) return [3 /*break*/, 5];
                    console.log("OPT table has all required columns.");
                    return [3 /*break*/, 11];
                case 5:
                    console.log("Existing columns:", existingColumns);
                    console.log("Missing columns:", missingColumns);
                    _i = 0, missingColumns_2 = missingColumns;
                    _a.label = 6;
                case 6:
                    if (!(_i < missingColumns_2.length)) return [3 /*break*/, 11];
                    column = missingColumns_2[_i];
                    alterQuery = void 0;
                    if (column === 'userEmail') {
                        alterQuery = 'ALTER TABLE "OPT" ADD COLUMN "userEmail" TEXT NOT NULL ;';
                        console.error("userEmail is not a unique column, please change it to unique");
                    }
                    else if (column === 'password') {
                        alterQuery = 'ALTER TABLE "OPT" ADD COLUMN "password" SERIAL NOT NULL ;';
                    }
                    else if (column === 'tries') {
                        alterQuery = 'ALTER TABLE "OPT" ADD COLUMN "tries" INTEGER NOT NULL DEFAULT 0;';
                    }
                    else if (column === 'createdAt') {
                        alterQuery = 'ALTER TABLE "OPT" ADD COLUMN "createdAt" TIMESTAMP NOT NULL ;';
                    }
                    else {
                        throw new Error("Unknown column: ".concat(column));
                    }
                    _a.label = 7;
                case 7:
                    _a.trys.push([7, 9, , 10]);
                    return [4 /*yield*/, db.query(alterQuery)];
                case 8:
                    _a.sent();
                    console.log("Added missing column: ".concat(column));
                    return [3 /*break*/, 10];
                case 9:
                    error_2 = _a.sent();
                    throw new Error("Cannot add missing column: ".concat(column));
                case 10:
                    _i++;
                    return [3 /*break*/, 6];
                case 11: return [2 /*return*/];
            }
        });
    });
}
