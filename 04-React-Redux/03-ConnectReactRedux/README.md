# Соединяем React и Redux

- Установим необходимые библиотеки `yarn add redux react-redux`

Теперь все наше дерево компонентов в `react` должно иметь доступ к `redux store` и мочь подписываться на него. Для того, чтобы не прокидывать `store` в каждый компонент руками. 
- Рекомендуемым способом пробрасывания `store` является использование компонента `Provider`, который выступает в роли рутового компонента.

### Подключение React-Redux
- Импортируем компонент Provider из react-redux и createStore из redux.

```js
    import { Provider } from 'react-redux'
    import { createStore } from 'redux'
```

- Возьмем фукнцию создания store

```js
    function playlist(state = [], action) {
        if (action.type === 'ADD_TRACK') {
            return [
            ...state,
            action.payload
            ];
        }
        return state;
    }

    const store = createStore(playlist);
```

- **! Функцию playlist, которую передают при создании store - называют reducer**

- Заворачиваем `App` в `Provider` и передать ему `store` в качестве аргумента. Теперь этот `store` будет доступен в каждой компоненте `react`.

```js
    ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
    );
```

- В уроках по `react` мы с вами уже разбирали, что компоненты можно разделить на:
    - `Smart` - это те, которые манипулируют данными и 
    - `Dumb` - это те, которые только что-то отрисовывают.

- Cделаем  `App` компоненту `smart`. Это логично, так как эта главная компонента на нашей странице. Уберем стили и классы. У нас получилось пустая компонента. Для этого импортируем `connect` декоратор из `react-redux.`

```js
    import { connect } from 'react-redux'
```
- применяем этот декоратор к классу `App`.

```JS
    export default connect(
        state => ({}),
        dispatch => ({})
    )(App);
```
Декоратор принимает на вход 2 функции. В первой аргумент будет `state`, а в второй `dispatch`. Он возвращает функцию, в которую мы передаем наш компонент App. Давайте разберем подробнее первую функцию.
- Первая функция обычно называется `mapStateToProps`. Потому что она маппит `state`, то есть состояние нашего `store` в `props react` компонента. Это позволяет очень легко подписываться на `стор` в компоненте и следить за его изменением.

Давайте вернем в этой функции переменную `testStore` в которую запишем `state`.

```js
    export default connect(
    state => ({
        testStore: state
    }),
    dispatch => ({})
    )(App);
```
`State` и является глобальным состоянием нашего `store`. И законсолим переменную `this.props.testStore` в `render` функции

- `console.log(this.props.testStore);`

Если мы посмотрим в браузер, то мы видим, что нам вывелся наш пустой массив треков из `store`. Теперь каждый раз, когда у нас изменится `store`, у нас поменяются `props` и перерендерится компонент.

- Изменим наш store, добавив в него по умолчанию 2 трека.

```js

    const initialState = [
    'Smells like spirit',
    'Enter Sandman'
    ];

    function playlist(state = initialState, action) {
        if (action.type === 'ADD_TRACK') {
            return [
            ...state,
            action.payload
            ];
        }
        return state;
    }
```

- Мы создали массив `initialState` и передали его в `reducer` `playlist`. В консоли браузера мы видим, что нам вывелось 2 трека.

Если мы посмотрим в браузер, то увидим, что в консоли вывелись эти два трека. Давайте скопируем из `index.html` нашу форму с добавлением трека и отрисуем ее в `App` компоненте. Удалим все классы.

```html
    <div>
        <input type="text" />
        <button>Add track</button>
        <ul>
        </ul>
    </div>
```

- Давайте отрисуем треки как обычные данные в `react`.

```js
    {this.props.testStore.map((track, index) =>
    <li key={index}>{track}</li>
    )}
```

Как мы видим мы успешно вывели данные из `store` в наш компонент. И частично перенесли функционал с чистого `javascript` на `react`.