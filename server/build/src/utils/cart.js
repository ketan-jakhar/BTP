"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCartTotal = void 0;
const calculateCartTotal = (cart) => {
    const total = cart.reduce((acc, item) => {
        return acc + item.price;
    }, 0);
    return total;
};
exports.calculateCartTotal = calculateCartTotal;
