# Модули

Javascript не поддерживает модули на уровне языка, поэтому для ес5 были созданы отдельные реализации для модульности. Два самых популярных, но не совместимых стандарта были CommonJS и AMD.

- СommonJS был реализован как модульная система NodeJS. Из плюсов:
    - Лаконичный синтаксис
    - Модули загружаются синхронно
    - В большинстве случаев используются на сервере
- AMD или Asynchronous Module Definition с самой популярной библиотекой RequireJS был предназначен для
    - Загружаются асинхронно
    - В большинстве случаев используются на клиенте

## Модули в ES2015
- Модулем считается файл с кодом.
- В этом файле ключевым словом export помечаются переменные и функции, которые могут быть использованы снаружи.
- модули могут подключать их через вызов import

    `math.js`
    ```js
    export const addTwo = (a, b) => a + b;
    export const API_URL = 'http://google.com';
    ```
    `main.js`
    ```js
    import { addTwo, API } from './math';
    console.log(addTwo(1, 2), API_URL);
    ```

- Часто бывает что у нас есть конфликт имен, поэтому мы можем задать свое имя для импортированных элементов
    
    `main.js`
    ```js
    import { addTwo, API_URL as URL } from './math';
    console.log(addTwo(1, 2), URL);
    ```
- Иногда нам нужно импортировать только одно значение (к примеру точку входа в модуль, в этом случае можно использовать ключевое слово `default`)

    `math.js`
    ```js
        export default (a, b) => a + b;
    ```
    `main.js`
    ```js
        import addTwo from './math';
        console.log(addTwo(1, 2));
    ```

- Мы можем захотеть импортировать сразу все что есть в модуле

    `math.js`
    ```js
        export const addTwo = (a, b) => a + b;
        export const multiplyTwo = (a,b) => a * b;
    ```
    `main.js`
    ```js
        import * as math from './math';
        console.log(math.addTwo(1, 2), math.multiplyTwo(1, 2));
    ```
