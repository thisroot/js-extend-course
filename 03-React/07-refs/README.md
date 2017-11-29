# React refs
- В компонентах реакт существует еще один тип данных `refs`, он позволяет обращаться к конкретному DOM элементу компонента
- Полезно использовать в следующих случаях:
    - Когда вы хотите прочитать значение элемента без `React`
    - Навесить `JQuery` на элемент
    - Вызвать нативный метод к примеру `focus()`

### Создадим тестовый проект
- В App.js добавим `input` и `button`
```js
    import React, { Component } from 'react';

    class App extends Component {
        render() {
            return (
            <div>
                <input type="text" placeholder="test" />
                <button>Submit</button>
            </div>
            );
        }
    }

    export default App;
```

Добавим атрибут `onClick` и прибайндим метод `this.submit` в нашему контексту.

- Для этого навешиваем `onClick` евент

```jsx
    <button onClick={this.submit.bind(this)}>Submit</button>
```
- добавляем `submit` метод
```jsx
    submit() {
        console.log('submit');
    }
```
Если мы посмотрим в браузер, то наша функция `submit` вывела консоль лог при клике.

Теперь для того, чтобы получить значение DOM елемента `input` нужно навесить на него вот такую конструкцию.

```jsx
    <input type="text" placeholder="test" ref={(input) => this.testInput = input} />
```
Здесь мы указали атрибут `ref`, который является функцией и присваивает `input` в переменную `this.testInput`. React вызвает `ref callback`, когда наш компонент рендерится. Это обычный паттерн в `React` как получить доступ к `DOM` элементам.

Теперь в нашей функции `submit` мы можем вывести `this.testInput`.

```jsx
    submit() {
        console.log('submit', this.testInput);
    }
```

Как мы видим, в консоль нам вывелся `DOM` елемент. Теперь мы можем делать с ним что угодно. Например, узнать его значение в данный момент.

`console.log('submit', this.testInput.value);`

Если мы введем что-то в `input` и нажмем `submit`, то в консоль выведется значение `input`.

`Ref` отличный способ доступа к DOM элементам, но его нужно применять с осторожностью. Нужно помнить, что это не `React way`, а просто возможность доступа к `DOM` елементам. Всегда лучше использовать `state`, `props` если это возможно вместо `refs`, так как они поддерживают правильный поток данных в приложении, а `refs` нет.