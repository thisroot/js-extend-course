# Асинхронное программирование

JavaScipt выполняется в одном потоке, однако вместо того, чтобы блокировать поток выполнения задачи, асинхронный код выстраивает события в очередь, которая выполняется после завершения других частей программы

- Никогда не блокируется

Очень интересное свойство цикла событий в JavaScript, что в отличие от множества других языков, поток выполнения никогда не блокируется. Обработка I/O (операций чтения записи) обычно осуществляется с помощью событий и функций обратного вызова, поэтому даже когда приложение ожидает запрос от IndexedDB или ответ от XHR, оно может обрабатывать другие процессы, например пользовательский ввод.

Асинхронное программирование, каким мы его знаем в JavaScript, может быть реализовано только функциями, являющимися первоочередными членами языка: они могут быть переданы как любая другая переменная другим функциям. 

## Коллбэк функции (функции обратного вызова)

```js
    console.log( "a" ); //1
   
    setTimeout(function() { //4
        console.log( "d" )
    }, 200 );

    setTimeout(function() { //3
        console.log( "c" )
    }, 100 );

    console.log( "b" ); //2
```

Проблемы с коллбэками:

- легко написать “callback hell” или спагетти-код, если не использовать их должным образом;
    ```js
        getData(function(x){
            getMoreData(x, function(y){
                getMoreData(y, function(z){ 
                    ...
                });
            });
        });
    ```
- легко упустить обработку ошибок;
- нельзя возвращать значения с выражением return, как и нельзя использовать ключевое слово throw.

## Promises (промисы)
Предоставляют удобный способ организации асинхронного кода.

**Promise** – это специальный объект, который содержит своё состояние. Вначале pending («ожидание»), затем – одно из: fulfilled («выполнено успешно») или rejected («выполнено с ошибкой»).

- На promise можно навешивать коллбэки двух типов:

    - onFulfilled – срабатывают, когда promise в состоянии «выполнен успешно».
    - onRejected – срабатывают, когда promise в состоянии «выполнен с ошибкой».
- создание промиса
```js
var promise = new Promise(function(resolve, reject) {
  // Эта функция будет вызвана автоматически

  // В ней можно делать любые асинхронные операции,
  // А когда они завершатся — нужно вызвать одно из:
  // resolve(результат) при успешном выполнении
  // reject(ошибка) при ошибке
})

//Установка обработчиков
promise.then(onFulfilled, onRejected)

```
- Пример промиса

```js

    // Создаётся объект promise
    let promise = new Promise((resolve, reject) => {

    setTimeout(() => {
        // переведёт промис в состояние fulfilled с результатом "result"
        resolve("result");
    }, 1000);

    });

    // promise.then навешивает обработчики на успешный результат или ошибку
    promise
    .then(
        result => {
        // первая функция-обработчик - запустится при вызове resolve
        alert("Fulfilled: " + result); // result - аргумент resolve
        },
        error => {
        // вторая функция - запустится при вызове reject
        alert("Rejected: " + error); // error - аргумент reject
        }
    );
```

### [Цепочки промисов](https://learn.javascript.ru/promise)

```js
    // сделать запрос
    httpGet('/article/promise/user.json')
    // 1. Получить данные о пользователе в JSON и передать дальше
    .then(response => {
        console.log(response);
        let user = JSON.parse(response);
        return user;
    })
    // 2. Получить информацию с github
    .then(user => {
        console.log(user);
        return httpGet(`https://api.github.com/users/${user.name}`);
    })
    // 3. Вывести аватар на 3 секунды (можно с анимацией)
    .then(githubUser => {
        console.log(githubUser);
        githubUser = JSON.parse(githubUser);

        let img = new Image();
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.appendChild(img);

        setTimeout(() => img.remove(), 3000); // (*)
    });
```
### Промисификация
Написание функций, возвращающих в качестве результата промис

```js

function GetNameFromTimeout(name, timeout) {

    return new Promise((resolve, reject) => {

    setTimeout(() => {
        // переведёт промис в состояние fulfilled с результатом "result"
        resolve(name);
    }, timeout);

    });
}

GetNameFromTimeout("Vasya",1000).then((data) => {
    console.log(data);
});

```

### Перехват ошибок в промисах

```js

 //обработка ошибок
    function GetNameFromTimeout(name, timeout) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                //вызовем принудительно ошибку
                reject(new Error("Произошла ошибка"))
            }, timeout);
        });
    }
        
    GetNameFromTimeout("Vasya",5000)
    .then((data) => {
        console.log(data);
    })
    //обработаем через стандартный перехватчик ошибок
    .catch((error) => {
        console.log(error);
    });

```

### Параллельное выполнение промисов
В классе Promise существует несколько статических методов, которые позволяют осуществлять параллельную обработку нескольких асинхронных функций.

- `Promise.all` - дожидается выполнения всех асинхронных функций и затем возвращает все результаты

```js

    //создадим функцию с искусственными задержками
    const  fetchProducts = (data,tm) => { 
        return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(data);
        }, tm)
        })
    }
    
    Promise.all([
            fetchProducts({data:[1,2,3]},500),
            fetchProducts({data:[3,4,5]},0)
    ]).then(results => {
    console.log(results); //[ { data: [ 1, 2, 3 ] }, { data: [ 3, 4, 5 ] } ]
    });
```

- `Promise.race` - возвращает результат первой выполненной функции
```js
    Promise.race([
            fetchProducts({data:[1,2,3]},500),
            fetchProducts({data:[3,4,5]},0)
    ]).then(results => {
        console.log(results); //{ data: [ 3, 4, 5 ] }
    });
```
## Async / Await - простой способ работы с асинхронными функциями

```js
   async function fetchProducts() {
        if(true) return [1,2,3]
        else throw new Error("Ошибка");
    }
            
    const getProducts = async() => {
        try {
            var result = await fetchProducts()
            //можем в синхронном стиле использовать здесь
            console.log(result); //[ 1, 2, 3 ]
            return result;
        } 
        catch(err) {
            return err
        }
    }
    
    getProducts()
        .then((data)=> 
            // а можем передать сюда через промис
            console.log("Сумма =  " + data.reduce((a, b) =>  a + b))
        )
        .catch((err)=> console.log(err));
        
        getProducts();

```
