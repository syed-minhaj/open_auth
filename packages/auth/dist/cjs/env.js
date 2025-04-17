"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.backend_url = void 0;
var backend_url = process.env.BACKEND_URL
    || process.env.NEXT_PUBLIC_BACKEND_URL
    || process.env.REACT_APP_BACKEND_URL
    || process.env.PUBLIC_BACKEND_URL
    || process.env.NUXT_PUBLIC_BACKEND_URL
    || process.env.VUE_APP_BACKEND_URL;
exports.backend_url = backend_url;
