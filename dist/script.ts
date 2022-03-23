import { PrismaClient } from '@prisma/client'
import Parser from "./parser";

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function main() {

    // Читаем конфиг в JSON-формате
    const fs = require('fs');
    let rawdata = fs.readFileSync('./conf/config.json');
    let conf = JSON.parse(rawdata);

    // Запускаем обход с интервалом
    await Parser.run(conf.url, conf.interval);
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

// npx prisma migrate dev --name init