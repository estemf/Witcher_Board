"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getId = void 0;
const zod_1 = require("zod");
const getId = (id) => zod_1.z.coerce.number().parse(id);
exports.getId = getId;
