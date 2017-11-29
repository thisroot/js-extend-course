# [Паттерны проектирования: Strategy](https://monsterlessons.com/project/lessons/strategy-pattern-v-javascript)
- **Задача:**  Он заключается в том, что у нас есть какая-то базовая сущность и мы хотим организовать код так, чтобы мы могли добавлять реализацию каких-то внутренних методов с помощью дополнительных сущностей.
    - Один из примеров - это авторизация, которая обладает базовым функционалом и, которую мы можем с помощью дополнительный модулей расширять, делая, например, авторизацию по логину и паролю, либо по токену, либо через oath и так далее. Но главная идея в том, чтобы мы могли добавлять неограниченое количество модулей без изменения кода базовой сущности. Именно так работает passport.js в node.
- 
- **Описание:**
```js
    //обьект обертка
    logger(
        //обьект в который будем писать
        logToConsoleStrategy,
        //уровень лога
        'log',
        //сообщение
        'log first message to console'
    )
```
- **Реализация:**
```js

    //обработчик
    const logger = (strategy, level, message, ...args) => {
        return strategy(level, message, ...args)
    }

```

- **Пример:**

```js
//стратегии
    const logToConsole = (level, message) => {
        console.log(`${level}:${message}`);
    }

    const logToConsoleWithDataStamp = (level, message) => {
        var date = new Date();
        console.log(`${date}:${level}:${message}`);
    }

      const logToDOMStrategy = (level, message, node) => {
        node.innerHTML = `<div class='${level}'>${message}</div>`
    }

      //обработчик
    const logger = (strategy, level, message, ...args) => {
        return strategy(level, message, ...args)
    }

    logger(
        logToConsole,
        'warn',
        'log first message to console'
    )

    logger(
        logToConsoleWithDataStamp,
        'warn',
        'log second message to console with date'
    )

    logger(
        logToDOMStrategy,
        'warn',
        'log third message to dom',
        document.querySelector('#log')
    )
```