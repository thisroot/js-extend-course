#  Итераторы

Итерируемые или, иными словами, «перебираемые» объекты – это те, содержимое которых можно перебрать в цикле.

Например, перебираемым объектом является массив. Но не только он. В браузере существует множество объектов, которые не являются массивами, но содержимое которых можно перебрать (к примеру, список DOM-узлов).

Для перебора таких объектов добавлен новый синтаксис цикла: for..of

В JavaScript итератор - это объект, который предоставляет метод next(), возвращающий следующий элемент последовательности. Этот метод возвращает объект с двумя свойствами: done и value.

```js
    var arr = [1,2,3];
    var it = arr[Symbol.iterator]();
    it.next(); // { value: 1, done: false }
    it.next(); // { value: 2, done: false }
    it.next(); // { value: 3, done: false }
    it.next(); // { value: undefined, done: true }
```

- В JavaScript введена управляющая структура для перебора массивов for..of

```js
    let nicknames = ['di', 'boo', 'punkeye'];
    nicknames.size = 3;
    for (let nickname of nicknames) {
        console.log(nickname);
    }
    // di
    // boo
    // punkeye
```

- В отличие от него если использовать for..in то будут выведены все элементы массива, даже не итерируемые

```js
    let nicknames = ['di', 'boo', 'punkeye'];
    nicknames.size = 3;
    for (let nickname in nicknames) {
        console.log(nickname);
    }
    // 0
    // 1
    // 2
    // size
```

- Кроме того вы можете создавать собственные итераторы для объектов

```js
    let range = {
    from: 1,
    to: 5,
    
    // неитерируемые члены объекта
    someValue:"BlaBla",
    otherValue:"BlaBla2",

    [Symbol.iterator]() {
        return this;
    },

    next() {
        if (this.current === undefined) {
        // инициализация состояния итерации
        this.current = this.from;
        }

        if (this.current <= this.to) {
        return {
            done: false,
            value: this.current++
        };
        } else {
        // очистка текущей итерации
        delete this.current;
        return {
            done: true
        };
        }
    }

    };

    for (let num of range) {
    console.log(num); // 1, затем 2, 3, 4, 5
    }

    // Произойдёт вызов Math.max(1,2,3,4,5);
    console.log( Math.max(...range) ); // 5 (*)
    console.log(range.someValue); //BlaBlaBla
```