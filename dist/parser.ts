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
                // Т.к. данные после парсинга идут [uid]: {data}, то имеет смысл итерироваться по массиву пар ключ/значение
                for (const [uid, event] of Object.entries(data)) {

                    // Отбрасываем объявления, оставляем только данные по расписанию
                    // @ts-ignore
                    if (event.type !== 'VEVENT') continue;
                    // console.log(uid)

                    // @ts-ignore
                    if (!idata.hasOwnProperty(event.uid)) {
                        // @ts-ignore
                        idata[uid] = event;
                    }
                }

                // Для перебора всех свойств из объекта (старый вариант)
                /*for (let k in data) {
                    if (!Object.prototype.hasOwnProperty.call(data, k)) continue;

                    const event = data[k];
                    // отбрасываем другого типа записи (BEGIN:VCALENDAR)
                    if (event.type !== 'VEVENT') continue;

                    if (!idata.hasOwnProperty(event.uid)) {
                        // @ts-ignore
                        idata[event.uid] = event;
                    }
                }*/

                // 2. Выводим список uid в консоль по условиям задания
                console.log(`Object UIDs # ${new Date()}`)
                console.dir(Object.keys(idata))
            });
        }, interval * 1000); // интервал задается в секундах
    },
}


export default Parser;