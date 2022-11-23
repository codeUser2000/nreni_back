import {Users, Products, Categories} from "../models";

async function main() {
    for (const Model of [Users, Products, Categories]) {
        await Model.sync({alter: true});
    }

    process.exit();
}

main();