# apart-test

1. Ставим пакет `git clone git@github.com:nkokorev/aparttest.git`
2. Ставим зависимости: `yarn install`
3. Копируем конфиг: `cp /config.example.json /config.json`
4. Прописываем в конфиг нужные URL и интервал (в секундах)
5. Запускаем: `ts-node ./src/index.ts`