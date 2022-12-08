import {Users, Categories, Products, Cart, CartItem} from "../models";

async function main() {
    for (const Model of [Users, Categories, Products, Cart, CartItem]) {
        await Model.sync({alter: true});
    }

    process.exit();
}

main();
