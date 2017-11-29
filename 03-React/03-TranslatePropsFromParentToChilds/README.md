# Транслируем данные из Родительского компонента потомкам.

- Когда нам надо перебрость данные от родителя потомкам, мы используем данные типа `props`

## Создадим файл `Header.js` и импортируем его в `App.js`

```js
    import React, { Component } from 'react';

    class Header extends Component {
        render() {
            return (
            <div>
                Header
            </div>
            );
        }
    }

    export default Header;
```
- Импортируем в `App.js` и удалим `Dropdown.js`. Вставим `Header` вместо `Dropdown`
```js
    import React, { Component } from 'react';

    import Header from './Header';

    class App extends Component {
        render() {
            return (
            <div>
                <Header />
            </div>
            );
        }
    }

    export default App;
```
- Давайте представим, что получаем ссылки для меню от бекенд стороны. Хорошая практика это делать один умный компонент на страницу и вкладывать в него тупые компоненты. При условии что уровень вложенности не очень глубокий.
    - Умный компонент может получать данные от  бекенда 
    - Тупые просто получают данные от родителя, которые им проброшены и отображают.

## Сделаем App умным, а Header и его потомков тупыми

- Создадим в App массив тестовых данных, так как-будто мы получили их с бекенда.
- Создадим меню которое будет брать массив обьектов
```js
    const menu = [
        {
            link: '/articles',
            label: 'Articles'
        },
        {
            link: '/contacts',
            label: 'Contacts'
        },
        {
            link: '/posts',
            label: 'Posts'
        }
    ];
```
- Пробросим обьект как параметр в Header, указав атрибут items значением menu
```js
<Header items={menu} />
```

- Теперь, чтобы работать с массивом объектов нужно использовать `this.props`. Добавим `console.log` в рендер методе

```js
    console.log('items', this.props.items);
```

- В консоли вывелся наш массив. Теперь можем рендерить элементы обычным map

```js
    {this.props.items.map((item, index) =>
    <a href={item.link}>{item.label}</a>
    )}
```
- Массив отрендерится, но у нас появится `Warning`
``` warning.js:36 Warning: Each child in an array or iterator should have a unique "key" prop. Check the render method of "Header".```

- Он говорит, что каждый елемент внутри массива должен иметь уникальный ключ. Поэтому давайте добавим атрибут key.

```js
    {this.props.items.map((item, index) =>
    <a href={item.link} key={index}>{item.label}</a>
    )}
```