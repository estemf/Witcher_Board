"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addWitcher = exports.getWitcher = exports.getWitchers = void 0;
const witchers = [];
const getWitchers = () => witchers;
exports.getWitchers = getWitchers;
const getWitcher = (id) => {
    return witchers.find((witcher) => witcher.id === id);
};
exports.getWitcher = getWitcher;
let index = 1;
const addWitcher = (witcher) => {
    const newWitcher = Object.assign({ id: index }, witcher);
    witchers.push(newWitcher);
    index++;
    return newWitcher;
};
exports.addWitcher = addWitcher;
