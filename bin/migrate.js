import {Blockquote, Cart, CartItem, Categories, Products, Like, Users, Orders} from "../models";
import categoryData from "../services/categoryData";

async function main() {
    for (const Model of [Users, Categories, Products, Cart, CartItem, Blockquote, Like, Orders]) {
        await Model.sync({alter: true});
    }
    for (const category of categoryData) {
        await Categories.create({type: category.type});
    }

    const jane = Users.build({ firstName: "Admin", lastName: "Admin", email: "admin@admin.com",phone: '0100011000', birthYear:"2002-12-31", password: 'hello', admin: 'true', status:'active' });
    await jane.save();

    process.exit();
}

main();




