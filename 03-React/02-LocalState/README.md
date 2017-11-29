# Локальное состояние компонента
В `React` компоненте существует 2 типа данных
    - `props` - свойства
    - `state` - состояния
- Если нам нужно чтобы изменения происходили в только в конкретном компоненте то мы можем использовать локальное состояние.

## Создание выпадающего меню

- Создадим Dropdown.js
```js
    import React, { Component } from 'react';

    class Dropdown extends Component {
        render() {
            return <div>Its dropdown baby</div>;
        }
    }

    export default Dropdown;
```
- Импортируем этот компонент в App.js и выведем на экран
```js
    import React, { Component } from 'react';
    import Dropdown from './Dropdown.js';

    class App extends Component {
        render() {
            return (
            <div>
                <Dropdown />
            </div>
            );
        }
    }

    export default App;

```

- Необходимо помнить:
    - Если мы хотим чтобы `return` в компоненте был многостроным, то его содержимое надо оборачивать в круглые скобки
    - Возвращать можно только один элемент, если элементов больше, то их надо заворачивать в отдельный `div`
## Добавление состояния компоненту
- В конструкторе компонента добавляем необходимые состояния
```js
    import React, { Component } from 'react';

    class Dropdown extends Component {
        constructor(props) {
            super(props);
            this.state = { isOpened: false };
        }

        render() {
            return <div>Its dropdown baby</div>;
        }
    }

    export default Dropdown;
```

- Нельзя забывать о добавлении в контруктор метода `super`, так как компонент наследуется от класса `Component`
- Далее здесь при инициализации компонента создается переменная состояния `isOpened`

## Добавим поведение элементу
- Добавим обработчик события который будет тогглить `isOperned` переменную
```js
    import React, { Component } from 'react';

    class Dropdown extends Component {
        constructor(props) {
            super(props);
            this.state = { isOpened: false };
        }

        toggleState() {
            this.setState({ isOpened: !this.state.isOpened });
        }

        render() {
            console.log('isOpened', this.state.isOpened);
            return <div onClick={this.toggleState}>Its dropdown baby</div>;
        }
    }

    export default Dropdown;
```

Обратите внимание, что в `onClick` метод передается без вызова, т.е. без круглых скобок иначе он вызовется сразу.

В `toggleState` мы вызываем метод `setState`, который позволяет нам менять стейт.

В консоли мы видим, что по умолчанию `isOpened = false`. Если же мы кликнем на текст, то мы видим ошибку
```js
    Dropdown.js:37 Uncaught TypeError: Cannot read property 'setState' of null
```
Это случается потому что функция `this.toggleState`вызывается не в контексте класса и поэтому `this` является `undefined`

Чтобы заставить наш код работать давайте прибиндим его к `this`

```js
    render() {
    console.log('isOpened', this.state.isOpened);
    return <div onClick={this.toggleState.bind(this)}>Its dropdown baby</div>;
    }
```
Как мы видим в консоли теперь значение меняется при клике на блок.

Давайте немного изменим разметку, чтобы у нас действительно появлялся блок на клик.

```js
    render() {
        console.log('isOpened', this.state.isOpened);
        let dropdownText;
        if (this.state.isOpened) {
            dropdownText = <div>Here is what is shown in dropdown</div>;
        }
        return (
            <div onClick={this.toggleState.bind(this)}>
            Its dropdown baby
            {dropdownText}
            </div>
        );
    }
```

Здесь мы устанавливаем в переменную `dropdownText` значение, когда у нас `isOpened = true.` И выводим переменую в фигурных скобках.

Как мы видим в браузере у нас появляется и скрывается блок по клику.