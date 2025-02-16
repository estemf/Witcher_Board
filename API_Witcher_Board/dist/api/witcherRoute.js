"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WitcherRoute = void 0;
const express_1 = require("express");
const witcherRepository_1 = require("../repositories/witcherRepository");
const utils_1 = require("./utils");
exports.WitcherRoute = (0, express_1.Router)();
const completeAvatar = (witcher, req) => {
    const host = `${req.protocol}://${req.get("host")}`;
    return Object.assign(Object.assign({}, witcher), { avatar: `${host}/images/${witcher.avatar}.png` });
};
exports.WitcherRoute.get("/", (req, res) => {
    res
        .status(200)
        .json((0, witcherRepository_1.getWitchers)().map((witcher) => completeAvatar(witcher, req)));
});
exports.WitcherRoute.get("/:id", (req, res) => {
    const witcher = (0, witcherRepository_1.getWitcher)((0, utils_1.getId)(req.params.id));
    if (!witcher) {
        res.status(404).json({ message: "Witcher not found." });
        return;
    }
    res.status(200).json(completeAvatar(witcher, req));
});
