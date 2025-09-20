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
import assert from "assert";

class TaskManager {
    tasks = [];

    constructor(
        N // общее число роботов-исполнителей (от 1 до 1024)
    ) {
        this.robots = Array.from({ length: N }, () => ({
            successCount: 0,
            failedCount: 0,
            tasks: [],
            timeSpent: 0
        }));
    }

    // Добавление задачи в очередь
    addToQueue(
        task // задача для исполнения, см. формат выше
    ) {
        this.tasks.push(task);
    }

    * taskGenerator(sortedTasks) {
        for (const task of sortedTasks) {
            yield task;
        }
    }

    // Promise, который запускает процесс выполнения задач и выдаёт список отчётов
    run = () => {
        const sortedTasks = this.tasks.slice().sort((a, b) => a.priority - b.priority);

        console.log("-----", "sortedTasks", sortedTasks);
        const generator = this.taskGenerator(sortedTasks);

        async function taskScheduler(robot) {
            for (let next = generator.next(); !next.done; next = generator.next()) {
                const currentTask = next.value;
                const startDate = Date.now();

                try {
                    await currentTask.job();
                    robot.successCount++;
                } catch {
                    robot.failedCount++;
                } finally {
                    robot.timeSpent += Date.now() - startDate;
                    robot.tasks.push(currentTask.id);
                }
            }

            return robot;
        }

        return Promise.all(this.robots.map(taskScheduler));
    };


}

(async () => {
    const generateJob = id =>
        function() {
            return new Promise((resolve, reject) => {
                switch (id) {
                    case "id0":
                        setTimeout(() => {
                            resolve();
                        }, 2500);
                        break;
                    case "id1":
                        setTimeout(() => {
                            resolve();
                        }, 2000);
                        break;
                    case "id2":
                        setTimeout(() => {
                            resolve();
                        }, 3000);
                        break;
                    case "id3":
                        setTimeout(() => {
                            resolve();
                        }, 1500);
                        break;
                    default:
                        setTimeout(() => {
                            // resolve();
                            Math.random() > 0.8 ? resolve() : reject();
                            // }, timeout);
                        }, Math.random() * 2000);
                }
            });
        };

    const tm = new TaskManager(3);

    tm.addToQueue({
        id: "id0",
        priority: 10,
        job: generateJob("id0")
    });
    tm.addToQueue({
        id: "id1",
        priority: 1,
        job: generateJob("id1")
    });
    tm.addToQueue({
        id: "id2",
        priority: 10,
        job: generateJob("id2")
    });
    tm.addToQueue({
        id: "id3",
        priority: 4,
        job: generateJob("id3")
    });

    const report = await tm.run();

    assert.deepEqual(report, [
        {
            successCount: 2,
            failedCount: 0,
            tasks: ["id1"],
            timeSpent: 0
        },
        {
            successCount: 1,
            failedCount: 0,
            tasks: ["id3", "id2"],
            timeSpent: 0
        },
        {
            successCount: 1,
            failedCount: 0,
            tasks: ["id0"],
            timeSpent: 0
        }
    ]);

    console.log("-----", "report", report);
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
