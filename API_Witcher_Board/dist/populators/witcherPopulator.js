"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.populate = void 0;
const witcherRepository_1 = require("../repositories/witcherRepository");
const populate = () => {
    [
        {
            name: "Geralt",
            avatar: "geralt",
        },
        {
            name: "Ciri",
            avatar: "ciri",
        },
        {
            name: "Lambert",
            avatar: "lambert",
        },
        {
            name: "Eskell",
            avatar: "eskell",
        },
        {
            name: "Vesemir",
            avatar: "vesemir",
        },
        {
            name: "Letho",
            avatar: "letho",
        },
    ].forEach((witcher) => (0, witcherRepository_1.addWitcher)(witcher));
};
exports.populate = populate;
