# Работаем с формами
## Создадим компонент с формой регистрации

- `RegistrationForm.js`
```js
    import React, { Component } from 'react';

    class RegistrationForm extends Component {
        render() {
            return (
            <div>Form</div>
            );
        }
    }

    export default RegistrationForm;
```

- Импортируем в App.js
```js
    import RegistrationForm from './RegistrationForm';
```

- Добавим форму и метод `Submit`
```jsx
    <form onSubmit={this.handleSubmit}>
    </form>
```

Представим, что у нас в форме будет `email`, который нужно заполнить. Для этого нам нужно в `state`, как мы делали в одном из первых уроков указать дефолтное значение.

```js
    constructor(props) {
        super(props);
        this.state = {
            email: ''
        };
    }
```

Создадим конструктор, вызываем `super` и задаем дефолтное значение для `email`.

Добавим `input` в нашу форму.

```jsx
    <form onSubmit={this.handleSubmit}>
    <input
        type="text"
        placeholder="E-mail"
        value={this.state.email}
        onChange={this.handleEmailChange}
    />
    </form>
```
Как значение зададим `this.state.email`. Также нам нужно задать `onChange` функцию. Она будет стрелять каждый раз, когда мы изменяем `email`.

И добавим метод `handleSubmit` и `handleEmailChange`

```js
    handleSubmit() {
        console.log('form is submitted');
    }

    handleEmailChange() {
        console.log('handleEmailChange', this);
    }
```

Если мы законсолим `this` в функции `handleEmailChange`, то увидим в браузере, что он undefined, так же, как у нас было в уроке про локальный стейт. В тот раз мы писали `bind` прямо в методе `.bind(this)`. Другой вариант это написать `bind` в конструкторе.

```js
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
```
Это просто переприсваивает функции с правильным `this`.

Теперь в браузере мы видим правильный `this`.

Давайте теперь когда стреляет функция `handleEmailChange` сетить значение в стейт.
```js
    handleEmailChange(event) {
        console.log('handleEmailChange', this);
        this.setState({email: event.target.value});
    }
```

Теперь каждый раз при изменении инпута у нас будет менятся значение в локальном стейте.

Теперь если мы попробуем печатать в форме, мы видим, что у нас меняется значение как в инпуте так и в стейте.

Как вы видите, у нас сразу же в инпуте отображаются данные. Если мы уберем строчку `setState`, то мы будем что-то печатать и у нас ничего не отображается, поскольку значение `this.state.email` не изменилось. Как только мы вызываем `setState`, у нас отображается значение с локального стейта.

Давайте изменим немного сообщение в `handleSubmit`.

```js
    console.log('form submitted and email value is', this.state.email);
```

Как мы видим в браузере, если мы напишем что-то в `input` и нажмем `enter`, `console.log` у нас выводится, но страница перегружается так как это обычная форма. Для того, чтобы это пофиксить давайте добавим `event.preventDefault()`.
```js
    handleSubmit(event) {
        event.preventDefault();
        console.log('form submitted and email value is', this.state.email);
    }
```

- добавим кнопку для сабмита формы
`<button>Save</button>`

Так как у `button`, по умолчанию тип `submit`, и наша форма отправляется и мы попадаем в функцию `handleSubmit`.
