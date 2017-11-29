# Коллекции
В ES-2015 появились новые типы коллекций в JavaScript: ArrayBuffer, Set, Map, WeakSet и WeakMap

## Типизированные массивы ArrayBuffer
Типизированные массивы можно использовать для обработки двоичных данных из таких источников, как сетевые протоколы, двоичные форматы файлов и буферы необработанной графики. Кроме того, типизированные массивы позволяют управлять двоичными данными в памяти с определенными байтовыми макетами.

Точка входа — `ArrayBuffer`. В принципе, это просто readonly указатель на бинарный буфер в памяти. Читать напрямую из него нельзя. Писать тоже. Зато можно посмотреть размер в байтах и сделать копию.

```js
    var buf1 = new ArrayBuffer(16),
        buf2 = buf1.slice();

    console.log(buf1.byteLength, buf2.byteLength); //16, 16
```
- Для того, чтобы читать и писать в буфер, нужно создать view, который будет знать, данные какого типа лежат в буфере. Под каждый числовой тип есть свой view.

|  Название | Размер (байт)   | Описание   | 
|---|---|---|
| Int8Array   |  1 | 8 разрядное целое со знаком  |
| Uint8Array  | 1  | 8 разрядное целое без знака   |
| Int16Array   |  2 | 16 разрядное целое со знаком   |
| Uint16Array | 2  | 16 разрядное целое без знака  |
| Int32Array |  4| 32 разрядное целое со знаком |
| Uint32Array | 4 | 32 разрядное целое без знака |
| Float32Array | 4 | 32-разрядное с плавающей запятой |
| Float64Array | 8 | 64-разрядное с плавающей запятой |

- Все типизированные массивы могут принимать на вход буфер или какой-то его кусок:

```js
    var buffer = new ArrayBuffer(4),
        u16 = new Uint16Array(buffer);

    u16[0] = 0xFF;
```

### Множественный доступ к буферу

```js
    var buf = new ArrayBuffer( 2 );
    var view8 = new Uint8Array( buf );
    var view16 = new Uint16Array( buf );
    view16[0] = 3085;
    console.log(view8[0]); // 13
    console.log(view8[1]); // 12
    console.log(view8[0].toString( 16 )); // "d"
    console.log(view8[1].toString( 16 )); // "c"
    console.log(view16); // Uint16Array { 0: 3085 }
    console.log(view16[0].toString(16)); // c0d
```

### DataView 
высокоуровневый механизм доступа к чтению / записи буфера;
    - позволяет читать поток последовательно с различными смешанными и типами данных. 

```js
    var buf1 = new ArrayBuffer(16);
    var view = new DataView(buf1);
    //читаем тип файла из первого байта
    var type = view.getUint8(0); //смещение 0
    //читаем контрольную сумму
    var crc = view.getUint32(1); //смещение 1
    //читаем пары широты и долготы в конце файла
    var latitude0 = view.getFloat32(5); //смещение 5
    var longitude0 = view.getFloat32(9); //смещение 9
```

- Что умеет работать с `ArrayBuffer`?
    - XMLHttpRequest 
    -  WebSocket 
    -  fetch()
    -  Canvas 
    -  WebGL
    -  Web Audio API
    -  Web Video API

### Конструкторы типизированных массивов
- Мы можем создавать типизированные массивы следующих типов данных
    - Int8Array (8-битные целые со знаком), Uint8Array (8-битные целые без знака);
    - Uint8ClampedArray (8-битные целые без знака, со значениями в диапазоне 0-255);
    - Int16Array (16-битные целые со знаком), Uint16Array (16-битные целые без знака);
    - Int32Array (32-битные целые со знаком), Uint32Array (32-битные целые без знака);
    - Float32Array (32-битные с плавающей точкой, IEEE-754);
    - Float64Array (64-битные с плавающей точкой, IEEE-754).

```js
    var a = new Int32Array(3);
    a[0] = 10;
    a[1] = 20;
    a[2] = 30;
    a.map((v) => console.log(v)); // 10 20 30
    console.log(a.join( "-" )); // "10-20-30"
```

## [Map](https://learn.javascript.ru/set-map)

- коллекция для хранения записей вида `{ключ:значение}`.

В отличие от объектов, в которых ключами могут быть только строки, в Map ключом может быть произвольное значение, например:

```js
    let map = new Map();

    map.set('1', 'str1');   // ключ-строка
    map.set(1, 'num1');     // число
    map.set(true, 'bool1'); // булевое значение

    // в обычном объекте это было бы одно и то же,
    // map сохраняет тип ключа
    console.log( map.get(1)   ); // 'num1'
    console.log( map.get('1') ); // 'str1'

    console.log( map.size ); // 3
```

- Метод поддерживает чайнинг

```js
    map
    .set('1', 'str1')
    .set(1, 'num1')
    .set(true, 'bool1');
```

- Добавление нескольких элементов
```js
    let map = new Map([
        ['1',  'str1'],
        [1,    'num1'],
        [true, 'bool1']
    ]);
```

- В качестве ключей могут быть использованы обьекты

```js
    let user = { name: "Вася" };
    // для каждого пользователя будем хранить количество посещений
    let visitsCountMap = new Map();
    // объект user является ключом в visitsCountMap
    visitsCountMap.set(user, 123);
    console.log( visitsCountMap.get(user) ); // 123
```

### Методы Map
- `map.delete(key)` -  удаляет запись с ключом `key`, возвращает true, если такая запись была, иначе `false`.
- `map.clear()` – удаляет все записи, очищает `map`.
- `map.has(key)` – возвращает true, если ключ есть, иначе `false`.
- `map.keys()` – возвращает итерируемый объект для ключей
- `map.values()` – возвращает итерируемый объект для значений
- `map.entries()` – возвращает итерируемый объект для записей `[ключ, значение]`, он используется по умолчанию в `for..of`.
- `map.forEach(callback(value, key, map))` - перебор карты

```js
    let recipeMap = new Map([
        ['огурцов',   '500 гр'],
        ['помидоров', '350 гр'],
        ['сметаны',   '50 гр']
    ]);

    // цикл по ключам
    for(let fruit of recipeMap.keys()) {
        console.log(fruit); // огурцов, помидоров, сметаны
    }

    // цикл по значениям [ключ,значение]
    for(let amount of recipeMap.values()) {
        console.log(amount); // 500 гр, 350 гр, 50 гр
    }

    // цикл по записям
    for(let entry of recipeMap) { // то же что и recipeMap.entries()
        console.log(entry); // огурцов,500 гр , и т.д., массивы по 2 значения
    }

    recipeMap.forEach( (value, key, map) => {
        console.log(`${key}: ${value}`); // огурцов: 500 гр, и т.д.
    });
```

### Трансформация Map (карту) в Array (массив)

```js
    //получение 2-мерного массива
    console.log([ ...recipeMap.entries() ]);
    //или
    console.log(Array.from(recipeMap))
    //[ [ 'огурцов', '500 гр' ],
    //  [ 'помидоров', '350 гр' ],
    //  [ 'сметаны', '50 гр' ] ]

    //получение массива значений
    console.log([ ...recipeMap.values() ]);
    //[ '500 гр', '350 гр', '50 гр' ]

    //получение ключей
    console.log([ ...recipeMap.keys() ]);
    //[ 'огурцов', 'помидоров', 'сметаны' ]
```
# [Set](https://learn.javascript.ru/set-map)
Set – коллекция для хранения множества значений, причём каждое значение может встречаться лишь один раз.

Например, к нам приходят посетители, и мы хотели бы сохранять всех кто пришёл. При этом повторные визиты не должны приводить к дубликатам, то есть каждого посетителя нужно «посчитать» ровно один раз.

```js
    let set = new Set();

    let vasya = {name: "Вася"};
    let petya = {name: "Петя"};
    let dasha = {name: "Даша"};

    // посещения, некоторые пользователи заходят много раз
    set.add(vasya);
    set.add(petya);
    set.add(dasha);
    set.add(vasya);
    set.add(petya);

    // set сохраняет только уникальные значения
    alert( set.size ); // 3

    set.forEach( user => alert(user.name ) ); // Вася, Петя, Даша
```

### Методы Set

- `set.add(item)` – добавляет в коллекцию item, возвращает set (чейнится).
- `set.delete(item)` – удаляет item из коллекции, возвращает true, если он там был, иначе false.
- `set.has(item)` – возвращает true, если item есть в коллекции, иначе false.
- `set.clear()` – очищает set.

Перебор осуществляется тем же способом что и Map 

```js
    set.forEach((value, valueAgain, set) => {
        console.log(value); 
        // апельсины, затем яблоки, затем бананы
    });
```

## [WeakSet и WeakMap](https://learn.javascript.ru/set-map)

`WeakSet` – особый вид `Set` не препятствующий сборщику мусора удалять свои элементы. То же самое – `WeakMap` для `Map`.

- То есть, если некий объект присутствует только в WeakSet/WeakMap он удаляется из памяти.
- Только объекты могут являться ключами
- Нет свойства `size`
- Нет итератора `forEach()`
- Нет метода `clear()`

WeakMap и WeakSet – «урезанные» по функционалу варианты Map/Set, которые позволяют только «точечно» обращаться элементам (по конкретному ключу или значению). Они не препятствуют сборке мусора, то есть если ссылка на объект осталась только в WeakSet/WeakMap – он будет удалён.

```js
    // вспомогательная информация о них,
    // которая напрямую не входит в объект юзера,
    // и потому хранится отдельно
    let activeUsers = [
    {name: "Вася"},
    {name: "Петя"},
    {name: "Маша"}
    ];

    // вспомогательная информация о них,
    // которая напрямую не входит в объект юзера,
    // и потому хранится отдельно
    let weakMap = new WeakMap();

    weakMap.set(activeUsers[0], 1);
    weakMap.set(activeUsers[1], 2);
    weakMap.set(activeUsers[2], 3);
    try {
        weakMap.set('Katya', 4); //Будет ошибка TypeError: "Katya" is not a non-null object
    } 

    catch(err) {
        console.log(err);
    }

    console.log( weakMap.get(activeUsers[0]) ); // 1

    activeUsers.splice(0, 1); // Вася более не активный пользователь
    // weakMap теперь содержит только 2 элемента
    activeUsers.splice(0, 1); // Петя более не активный пользователь
```
