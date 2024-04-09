import assert from "assert";


/*
 Роботизированное агентство «Двое из ларца» занимается выполнением задач любой сложности за деньги клиентов.
 Работает агентство по принципу «одного окна». С     начала заказчик приносит список работ, которые нужно выполнить, с указанием приоритета каждой из них.
 Затем робот-менеджер вывешивает табличку «Ушёл на базу», уходит контролировать работу роботов-исполнителей, а когда те всё выполнят — возвращается
 и отдаёт клиентам отчёт о выполненных работах с квитанцией на оплату. Оплачивается только время активной работы роботов, без учёта простоя.
 Чтобы клиенты могли заранее посчитать свои будущие расходы, вам нужно реализовать симулятор рабочего процесса в агентстве.
 Формат ввода
 Задачи для исполнения от заказчика имеют следующий формат:
 const task = {
     // строка, уникальный идентификатор задачи
     id: "a1",
     // число, приоритет задачи (от 1 до 1024)
     priority: 10,
     // функция, возвращающая Promise;
     // Promise может быть resolved через длительное время
     job: () => {
         return new Promise((resolve, reject) => {
             if (...) {
                 ...
                 resolve();
             } else reject();
         });
     }
 };
 Приоритет задачи — целое число. Чем больше число, тем больший приоритет у задачи.
 Вам нужно реализовать класс TaskManager со следующими методами:
*/
class TaskManager {
    tasks = [];
    robots = [];
    reportsByRobot = {};

    constructor(
        N // общее число роботов-исполнителей (от 1 до 1024)
    ) {
        this.robots = [...Array(N).keys()];

        this.reportsByRobot = this.robots.reduce((acc, current) => {
            acc[current] = {
                // число — общее количество выполненных успешно задач
                successCount: 0,
                // число — общее количество невыполненных задач
                failedCount: 0,
                // массив строк — идентификаторы взятых задач по очереди
                tasks: [],
                // число — количество проведённых в работе миллисекунд
                timeSpent: 0,
            };
            return acc;
        }, {});
    }

    // Добавление задачи в очередь
    addToQueue(
        task // задача для исполнения, см. формат выше
    ) {
        this.tasks.push(task);
    }

    // Promise, который запускает процесс выполнения задач и выдаёт список отчётов
    run = () => {
        const sortedTasks = this.tasks.sort((a, b) => b.priority - a.priority);

        const runner = robots =>
            Promise.all(
                robots.map(r => {
                    if (sortedTasks.length) {
                        const currentTask = sortedTasks.shift();
                        const report = this.reportsByRobot[r];
                        const start = Date.now();

                        return currentTask
                            .job()
                            .then(
                                () => {
                                    report.successCount += 1;
                                },
                                () => {
                                    report.failedCount += 1;
                                }
                            )
                            .finally(() => {
                                report.tasks.push(currentTask.id);
                                report.timeSpent += Date.now() - start;
                            })
                            .then(() => runner([r]))
                            .then(() => report);
                    }

                    return this.reportsByRobot[r.id];
                })
            );

        return runner(this.robots);
    };
}

(async () => {
    // let i = true;
    const generateJob = id =>
        function () {
            // const timeout = i ? 500 : 1000;
            // i = !i;
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    // resolve();
                    Math.random() > 0.8 ? resolve() : reject();
                    // }, timeout);
                }, Math.random() * 2000);
            });
        };

    const tm = new TaskManager(3);
    // n1 - id2 + id4 (500 + 1000)
    // n2 - id0 + id1 (1000 + 1000)
    // n3 - id3 + id5  (500 + 500)

    // 1000 - n2
    tm.addToQueue({
        id: "id0",
        priority: 10,
        job: generateJob("id0"),
    });
    // 1000 - n3
    tm.addToQueue({
        id: "id1",
        priority: 1,
        job: generateJob("id1"),
    });
    // 500 - n1
    tm.addToQueue({
        id: "id2",
        priority: 10,
        job: generateJob("id2"),
    });
    // 500 - n3
    tm.addToQueue({
        id: "id3",
        priority: 4,
        job: generateJob("id3"),
    });
    // 1000 - n1;
    tm.addToQueue({
        id: "id4",
        priority: 3,
        job: generateJob("id4"),
    });
    // 500 - n2
    tm.addToQueue({
        id: "id5",
        priority: 2,
        job: generateJob("id5"),
    });

    const report = await tm.run();

    // assert.deepEqual(
    //     report.map(({ timeSpent, ...r }) => r),
    //     [
    //         {
    //             failedCount: 0,
    //             successCount: 2,
    //             tasks: ["id2", "id4"],
    //         },
    //         {
    //             failedCount: 0,
    //             successCount: 2,
    //             tasks: ["id0", "id1"],
    //         },
    //         {
    //             failedCount: 0,
    //             successCount: 2,
    //             tasks: ["id3", "id5"],
    //         },
    //     ]
    // );
    console.log(report);
})();

// module.exports = { TaskManager };
// У робота-менеджера две фазы работы:
// Получение задач в очередь. В этот момент синхронно или асинхронно в очередь добавляются задачи при помощи вызова метода addToQueue.
// Количество задач не ограничено.
// Выполнение задач после вызова метода run. Все полученные ранее задачи берутся на выполнение.
// Свободные роботы берут задачи из очереди: самая приоритетная задача берётся первой, далее — по уменьшению приоритета
// и по времени поступления задачи в очередь.
// Каждый робот в процессе формирует отчёт о выполнении работ:
// const report = {
//     // число — общее количество выполненных успешно задач
//     successCount: 2,
//     // число — общее количество невыполненных задач
//     failedCount: 1,
//     // массив строк — идентификаторы взятых задач по очереди
//     tasks: ["a1", "c3", "d4"],
//     // число — количество проведённых в работе миллисекунд
//     timeSpent: 203,
// };
// Задача может выполниться неуспешно (reject). Если успешно, то робот добавляет единицу в статистику к successCount. Если задача выполнилась неуспешно, то добавляет единицу к failedCount. Задача всё равно попадает в итоговый отчёт и учитывается в итоговом времени работы робота.
// Формат вывода
// Метод run менеджера возвращает Promise, который при resolve возвращает отчёт о проделанной роботами работе в виде массива отчётов каждого робота:
// [
//     {
//         successCount: 2,
//         failedCount: 0,
//         tasks: ["a1", "d4"],
//         timeSpent: 203,
//     }, // отчёт робота номер 1
//     ...,
//     {
//         successCount: 1,
//         failedCount: 1,
//         tasks: ["b2", "c3"],
//         timeSpent: 10,
//     }, // отчёт робота номер N
// ]
