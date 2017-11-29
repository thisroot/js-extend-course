# Функции
## Нововведения в функциях
- Значения по умолчанию
```js
    function square(num = 3) {
        return num * num;
    }

    alert(square(2)); //выведет 4
    alert(square()); //выведет 9
```

- Так же может быть результатом вызова другой функции
```js
    function square(num = Math.round(3.1)) {
        return num * num;
    }

    alert(square());
```

- Деструктуризация в функциях

```js
    let sayHello = function(...people) {
        console.log(`Hello ${people.join(', ')}!`);
    }

    sayHello('Katya', 'Vasya', 'Andrew'); // Hello Katya, Vasya, Andrew
```

- Передача обьекта

```js

let options = {
	color: 'red',
	width: 400,
	height: 500
};

function func({color, width, height}) {
	alert(color); //выведет 'red'
	alert(width); //выведет 400
	alert(height); //выведет 500
}

func(options);

```

- Использование spread при вызове функции
```js
    let numbers = [1, 5, 7, 10, 3, 9, 16];
    //по стандарту Math.max принимает аргументы а не массив поэтому массив деструктурируем в последовательный набор аргументов
    let max = Math.max(...numbers); 

    console.log(max); // 16
```

- Использование параметров по умолчанию и деструктуризация

```js

    let describePerson = function({ 
            name = 'Noname', 
            age = 0, 
            city = 'Nowhere'
        }){
            console.log(`Hello from ${city}! My name is ${name}, I am ${age} years old.`)
        }

    let me = {
        name: 'Vasya',
        age: 26
    }

    // Hello from Nowhere! My name is Vasya, I am 26 years old.
    describePerson(me); 

```

## Стрелочные функции и контекст 

- Если в теле функции одна строка то return писать не обязательно
```js
    //в новой нотации
    let func = x => x+1;
    alert(func(3));
    //в старом формате
    let func = function(x) { return x + 1; };
    alert(func(3));
```
- Если у функции несколко аргументов, то надо брать их в скобки
```js
    let func = (x1, x2) => x1 + x2;
    alert(func(3, 4));
    // В старой нотации
    let func = function(x1, x2) { return x1 + x2; };
    alert(func(3, 4));
```

- Если функция без параметров, то необходимо просто указать скобки

```js
    let func = () => 3 + 4;
    alert(func());

    let func = function() { return 3 + 4; };
    alert(func());
```

- Если несколько строк, то следует вызывать `return`

```js
    let func = () => { let a = 3; let b = 4; return a + b; };
    alert(func());

    let func = function() { let a = 3; let b = 4; return a + b; };
    alert(func());
```

- Стрелочные функции удобно использовать в качестве анонимных

```js
    let arr = [1, 2, 3, 4, 5];

    //Старый стиль:
    arr.forEach(function(value) {
    alert(value);
    });

    //Новый стиль:
    arr.forEach(value => alert(value));
```

## Контекст this и стрелочные функции

- также стрелочные функции сохраняют контекст c ES5 приходилось для использования родительского контекста записывать ссылку на него в переменную

```js

    function Person1() {
        // записываем контекст в переменную, чтобы
        // он был доступен внутри вложенных функций
        let self = this;
        self.age = 0;

        let life = setInterval(function growUp() {
            self.age++;
        }, 100);

        self.die = function() {
            clearInterval(life);
        };
    }

    let person = new Person1();
    console.log('Person1', person.age); // 0

    setTimeout(() => {
        console.log('Person1', person.age); // 9
        person.die();
    }, 1000);

```

-  в ES2015 уже такой необходимости нет

```js
    function Person2() {
        this.age = 0;

        let life = setInterval(() => {
            this.age++;
        }, 100);

        this.die = () => {
            clearInterval(life);
        };
    }

    let person = new Person2();
    console.log('Person2', person.age); // 0

    setTimeout(() => {
        console.log('Person2', person.age); // 9
        person.die();
    }, 1000);
```
