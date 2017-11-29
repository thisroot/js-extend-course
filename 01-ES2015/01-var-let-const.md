# var, let, const блочная видимость

В старом стандарте существовал один оператор обявления переменных, ограничивающий видимость на уровне функции, при этом выходящий за рамки видимости в блоках.


- ES5 - переменная видна во внешней области видимости
```js
    var a = 3;
    if(true) {
        var a = 5; //даже позволит заного обявить переменную
    }
    console.log(a) // выведет 5
```

- ES5 - не видна при использовании в функции

```js
    var a = 2;
    (function Test(){
        var a = 3;
        console.log( a ); // 3
    })();
    console.log( a ); // 2
```

- ES6 - let- видимость на уровне блока
```js
    let a = 3;
    if(true) {
        let a = 5; //видна на уровне блока
    }
    console.log(a) // выведет 3
```

- ES6 - выбрасывает исключение при отсутствии переменной в данной области видимости
```js
    if(true) {
        let a = 5;
    }
    console.log(a) // ReferenceError: a is not defined
```

- Константы - неизменяемые переменные
    - Константы -  примитивные типы
        ```js
            //В const одновременно с объявлением
            //переменной должно быть присвоено значение.
            const test = 5;
            test = 10; //ошибка
        ```
    - Константы объекты
        ```js
            const user = {
                name: 'Иван'
            };

            user.name = 'Коля'; //можно менять
            user.surname = 'Иванов'; //можно
        ```

        - А вот затереть объект и записать туда что-нибудь другое уже не получится - вы увидите ошибку: 
        ```js
            const user = {
                name: 'Иван'
            };

            user = 5; //нельзя менять, будет ошибка
        ```