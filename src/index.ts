import { PrismaClient } from '@prisma/client'
import Parser from "./parser";

const prisma = new PrismaClient()

// A `main` function so that you can use async/await
async function main() {

    // Читаем конфиг в JSON-формате
    const fs = require('fs');
    let raw_data = fs.readFileSync('./config.json');
    let conf = JSON.parse(raw_data);

    // Запускаем обход с интервалом
    let parser = new Parser(conf.url, conf.interval)
    await parser.run()
}

main()
    .catch(e => {
        throw e
    })
    .finally(async () => {
        await prisma.$disconnect()
    })

// npx prisma migrate dev --name init