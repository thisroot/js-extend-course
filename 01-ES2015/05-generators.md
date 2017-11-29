# Генераторы

Генераторы - это специальный тип функции, который работает как фабрика итераторов. Функция становится генератором, если содержит один или более yield операторов и использует function* синтаксис.

```js
function* generateSequence() {
  yield 1;
  yield 2;
  yield 3;
  return 4;
}

{

    let generator = generateSequence();
    console.log(generator.next());
    console.log(generator.next());
    console.log(generator.next());
    console.log(generator.next());
}

```
- Как вы, наверно, уже догадались по наличию метода next(), генератор связан с итераторами. В частности, он является итерируемым объектом.
    - Его можно перебирать и через for..of:

```js
// при вызове генератора он не выполняется. Он ожидает выполнения 
// итерациооного метода next()
let generator = generateSequence();

// при использовании через for..of значение в return возвращено не будет
for(let value of generator) {
  console.log(value); // 1, затем 2
}
```

- На каждом вызове метода `next()` получить случайное число

```js
function *foo() {
    while (true) {
        yield Math.random();
    }
}

 let randomNum = foo();
    for(let i = 0; i<5;++i) {
        console.log(randomNum.next().value)
    }
```

## Композиция генераторов
- Один генератор может в себя включать несколько, это называется композицией

```js
    function* generateSequence(start, end) {
        for (let i = start; i <= end; i++) yield i;
    }

    function* generateAlphaNum() {

        // 0..9
        //Здесь использована специальная форма yield*. Она применима //только к другому генератору и делегирует ему выполнение.
        // все yield внутреннего генератора устанавливаются на выполнение
        yield* generateSequence(48, 57);

        // A..Z
        yield* generateSequence(65, 90);

        // a..z
        yield* generateSequence(97, 122);
    }

    let str = '';

    for(let code of generateAlphaNum()) {
        str += String.fromCharCode(code);
    }

    console.log(str); // 0..9A..Za..z
```

### Получение / передача значений в итерациях

Выражение yield .. позволяет не только передать значение (клю-
чевое слово yield, не сопровождающееся ничем, означает yield
undefined), но и получить — то есть заместить — конечное значение
при возобновлении работы генератора.

```js
    function *foo() {
        var x = yield 10;
        console.log(x);
        yield x*4;
    }

    var gen = foo();

    console.log(gen.next()); //{ value: 10, done: false }
    
    //переданное значение заменяет результат первого yield
    console.log(gen.next(120)); // 120 { value: 480, done: false }
```