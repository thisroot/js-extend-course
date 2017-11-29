# Валидация props с помошью PropTypes

- PropTypes - позволяет указывать какие типы данных и значение может принимать на вход компонент. 
    - Это позволяет делать приложение более стабильным с точки зрения разработки, так как компонент принимает только то с чем умеет работать
    - Кроме того позволяет понять с какими данными должен работать компонент.

## Добавление в компонент Header PropTypes

- Установим пакет `yarn add prop-types`

- Создадим статическое поле
```js
    static propTypes = {
    };
```

- импортируем PropTypes в компонент Header

```js
    import PropTypes from 'prop-types';
```

- Опишем что мы хотим получать
```js
    static propTypes = {
        items: PropTypes.array.isRequired
    };
```

Мы указали, что items должен быть типа array, а isRequired показывает, что эти данные нужно передавать обязательно.

Если мы посмотрим в браузер, то никаких ошибок сейчас в консоли нет. Давайте попробуем убрать items из параметров компонента.

```bash
    warning.js:36 Warning: Failed prop type: Required prop "items" was not specified in "Header".
```

И мы сразу получили warning, что items не были переданы в компонент.

- Давайте попробуем передать items типа string.

```bash
    warning.js:36 Warning: Failed prop type: Invalid prop "items" of type `string` supplied to "Header", expected "array".
```

Этот warning говорит нам, что тип должен быть array а не string. Эти сообщение очень помогают, когда ты пытаешься использовать компоненту в первый раз и не знаешь, что ей передать.

- Давайте рассмотрим самые популярные проверки типов.

`isLoading: PropTypes.bool`

Это означает, что компонента может принимать на вход isLoading булевого типа. Но не обязательно переменная должна быть.

- `submit: PropTypes.func`

Здесь мы описали, что на вход нужно обязательно передать функцию `submit`.

- `title: PropTypes.string.isRequired`

Здесь обязательный тайтл.

Но это еще не все так как это просто типы данные. Еще можно валидировать сами данные. Например

- `type: PropTypes.oneOf(['news', 'photos'])`

То есть здесь мы описали, что хотим получить `type` либо значения `news`, либо `photos`.

И два последних, которые позволяют отлично валидировать массивы и обьекты

```js
    user: PropTypes.shape({
        name: PropTypes.string,
        age: PropTypes.number
    })
```

Здесь мы описали, что хотим получить юзера с полями name и age, которые будут типов `string` и `number` соответственно.

Если же мы хотим провалидировать массив юзеров, то можно записать это так.

```js
    users: PropTypes.arrayOf(
        PropTypes.shape({
            name: PropTypes.string,
            age: PropTypes.number
        })
    )
```

Этим мы ожидаем, что у нас будет массив обьектов с правильными данными.
