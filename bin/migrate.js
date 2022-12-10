import {Users, Categories, Products, Cart, CartItem, Blockquote} from "../models";

async function main() {
    for (const Model of [Users, Categories, Products, Cart, CartItem, Blockquote]) {
        await Model.sync({alter: true});
    }

    process.exit();
}

main();
