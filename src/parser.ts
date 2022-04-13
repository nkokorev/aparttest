import ical from "node-ical";

// Глобальный объект, в котором храним нужные функции и переменные.
class Parser {
    // Инициализируются только в конструкторе
    private readonly url: string;
    private readonly interval: number;

    constructor(url: string, interval: number) {
        /// ссылка с ключом доступа в query параметрах; задается в config.json
        this.url = url;
        /// интервал опроса в секундах; задается в config.json
        this.interval = interval;
    }

    /* Запуск парсера с подготовленными данными из конструктора */
    run (): NodeJS.Timer {
        let idata = {}

        return setInterval(() => {

            // Делаем запрос данных по URL
            ical.async.fromURL(this.url, {}, function (err: any, data: any) {

                // 1. Пересматриваем каждый раз все объекты в календаре.
                Object.values(data).forEach( (event: any) => {
                    // Отбрасываем meta-информацию и делаем проверку на дубли по uid-ключу (для повторных обходов)
                    if ( (event.type === 'VEVENT') && !idata.hasOwnProperty(event.uid) ) {
                        // @ts-ignore
                        if (event.hasOwnProperty('uid')) idata[event.uid] = event;
                    }
                })

                // 2. Выводим список uid в консоль по условиям задания
                console.log(`Object UIDs # ${new Date()}`)
                console.dir(Object.keys(idata))
            });
        }, this.interval * 1000); // интервал задается в секундах
    }
}

export default Parser;