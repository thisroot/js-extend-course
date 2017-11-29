# Классы

В современном JavaScript появился новый, «более красивый» синтаксис для классов.

Новая конструкция class – удобный «синтаксический сахар» для задания конструктора вместе с прототипом.

- В нотации ES2015

```js
    class SimpleDate {
        constructor (year, month, day) {
            this.year = year;
            this.month = month;
            this.day = day;
        }

        toString () {
            return `${this.day}/${this.month}/${this.year}`;
        }
    }

    const today = new SimpleDate(2017, 12, 28)
    console.log(today.toString())
```

- При транспиляции

```js
    function SimpleDate(year, month, day) {
        this.year = year;
        this.month = month;
        this.day = day;
    }

    SimpleData.prototype.toString = function() {
        return `${this.day}/${this.month}/${this.year}`;
    }
```
Методы, объявленные внутри class, также имеют ряд особенностей:

- Метод toString является именно методом, то есть имеет доступ к super.
- Все методы класса работают в строгом режиме use strict, даже если он не указан.
- Все методы класса не перечислимы. То есть в цикле for..in по объекту их не будет.

## Инлайн определение классов

```js
    let SimpleDate = class  {
            constructor (year, month, day) {
                this.year = year;
                this.month = month;
                this.day = day;
            }
        }
```


## Extend и Super - наследование классов и конструкторы 

- Extend - указывает на класс родитель
- Super - является наследованным конструктором родителя в дочернем элементе 

```js

class OtherDate extends SimpleDate {
  constructor(year, month, day) {
    //конструктор родительского метода
    super(year, month, day);
    this.PrepenString = "Текущая дата";
  }

   toString () {
            //используем метод родительского класса
            return `${this.PrependString}: ${super.ToString()}`;
        }
}

const tomorrow = new OtherDate(2018, 1, 29)
console.log(tomorrow.toString()) // Текущая дата: 2018/1/29

```

- Отношения потомок - родитель

```js
    console.log(tomorrow instanceof OtherDate); // true
    console.log(tomorrow instanceof SimpleDate); // true
```

## Статические методы

```js
    class Button {
        static getElementType() {
            return 'button';
        }
        constructor(name) {
            this.color = color;
        }
        click() {
            console.log('Button clicked!');
        }
    }

    console.log( Button.getElementType() ); // button
```

## Геттеры и сеттеры
```js
    class User {
        constructor(firstName, lastName) {
            this.firstName = firstName;
            this.lastName = lastName;
        }

        // геттер
        get fullName() {
            return `${this.firstName} ${this.lastName}`;
        }

        // сеттер
        set fullName(newValue) {
            [this.firstName, this.lastName] = newValue.split(' ');
        }
    };

    let user = new User('Вася', 'Пупков');
    console.log( user.fullName ); // Вася Пупков

    user.fullName = 'Иван Петров';
    console.log( user.fullName ); // Иван Петров
```

## Приватные методы
- В настоящее время приватные методы не поддерживаются ES - нотациями, тем не менее Вы можете, согласно принятым соглашениям помечать приватные свойства и методы через нижнее подчерчивание `this._Property = someProperty`