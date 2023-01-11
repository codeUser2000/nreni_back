import {Blockquote, Cart, CartItem, Categories, InformationText, Menu, Products, Like, Users} from "../models";
import menuData from "../services/menuData";
import categoryData from "../services/categoryData";

async function main() {
    for (const Model of [InformationText, Menu, Users, Categories, Products, Cart, CartItem, Blockquote,Like,]) {
        await Model.sync({alter: true});
    }
    for (const menu of menuData){
        await Menu.create({ title: menu.title, link: menu.link, translationEn: menu.translationEn,translationRu: menu.translationRu, translationArm:menu.translationArm});
    }
    for (const category of categoryData){
        await Categories.create({type: category.type});
    }

    process.exit();
}

main();




