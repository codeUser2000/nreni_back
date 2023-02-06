import {Blockquote, Cart, CartItem, Categories, Products, Like, Users, Orders} from "../models";
import categoryData from "../services/categoryData";

async function main() {
    for (const Model of [Users, Categories, Products, Cart, CartItem, Blockquote, Like, Orders]) {
        await Model.sync({alter: true});
    }
    // for (const category of categoryData) {
    //     await Categories.create({type: category.type});
    // }

    process.exit();
}

main();




