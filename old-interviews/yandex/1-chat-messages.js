/**
 * Наше приложение-чат должно отображать новые сообщения, которые приходят с сервера, как можно быстрее.
 *
 * Сообщение имеет формат:
 *  interface Message {
 *      id: number
 *      text: string
 * }
 *
 * Id самого первого сообщения = 1, а id каждого следующего сообщения на 1 больше, чем id предыдущего.
 * Нам нужно выводить сообщения в правильно порядке, однако сервер не гарантирует правильный порядок
 * сообщений, отправляемых в наше приложение.
 *
 * Таймлайн:
 * // (приходит) 7 1 2 3 6 5 4       8
 * // (рисуем)   . 1 2 3 . . 4 5 6 7 8
 *
 * Отображать сообщения нужно с помощью функции render:
 *
 * render(message)
 */

function solution(render) {
    // Код пишем здесь
    return function onMessage(message) {
        render(message);
    };
}

// Test

const wait = () => new Promise(resolve => setTimeout(resolve, 500));

const runTest = async () => {
    const renderedMessages = [];
    const expectedMessages = [
        { id: 1, text: "One" },
        { id: 2, text: "Two" },
        { id: 3, text: "Three" },
        { id: 4, text: "Four" },
        { id: 5, text: "Five" },
        { id: 6, text: "Six" },
        { id: 7, text: "Seven" },
        { id: 8, text: "Eight" },
    ];

    function testRender(message) {
        console.log("Rendered message: ", message);
        renderedMessages.push(message);
    }

    const cb = solution(testRender);

    cb({ id: 7, text: "Seven" });
    await wait();
    cb({ id: 1, text: "One" });
    await wait();
    cb({ id: 2, text: "Two" });
    await wait();
    cb({ id: 3, text: "Three" });
    await wait();
    cb({ id: 6, text: "Six" });
    await wait();
    cb({ id: 5, text: "Five" });
    await wait();
    cb({ id: 4, text: "Four" });
    await wait();
    cb({ id: 8, text: "Eight" });

    if (JSON.stringify(renderedMessages) !== JSON.stringify(expectedMessages)) {
        console.error(`Expected: ${JSON.stringify(expectedMessages)}`);
        console.error(`Received: ${JSON.stringify(renderedMessages)}`);
        return;
    }

    console.log("Test passed");
};

console.clear();
runTest();
