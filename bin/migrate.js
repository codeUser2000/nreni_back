import {Users, Products, Categories, Cart,CartItem} from "../models";

async function main() {
    for (const Model of [Users, Products, Categories, Cart, CartItem]) {
        await Model.sync({alter: true});
    }

    process.exit();
}

main();