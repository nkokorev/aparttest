import ical from "node-ical";

// Глобальный объект, в котором храним нужные функции и переменные.
const Parser = {
    // Основная функция обслуживающая интервал
    run: (url: string, interval: number): any => {

        // Наш массив с данными, вместо "БД"
        let idata = {}

        // Возвращаем id интервала, чтобы его можно было отменить (ну мало ли)
        return setInterval(() => {

            // Делаем запрос данных по URL
            ical.async.fromURL(url, {}, function (err: any, data: any) {

                // 1. Пересматриваем каждый раз все объекты в календаре. Может не супер решение, я не знаю как он формируется,
                // иначе можно было бы запоминать последний номер записи и начинать с data[k=N]
                for (let k in data) {
                    if (!Object.prototype.hasOwnProperty.call(data, k)) continue;

                    const event = data[k];
                    // отбрасываем другого типа записи (BEGIN:VCALENDAR)
                    if (event.type !== 'VEVENT') continue;

                    if (!idata.hasOwnProperty(event.uid)) {
                        // @ts-ignore
                        idata[event.uid] = event;
                    }
                }

                // 2. Выводим список uid в консоль по условиям задания
                console.log(`Object UIDs # ${new Date()}`)
                console.dir(Object.keys(idata))
            });
        }, interval * 1000); // интервал задается в секундах
    },
}


export default Parser;