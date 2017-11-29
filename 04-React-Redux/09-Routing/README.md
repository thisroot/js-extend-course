# Роутинг с помошью Redux

В прошлых уроках мы научились с вами использовать `Redux` для работы с состоянием приложения и `React-router` для роутинга. Это все хорошо, но они не работают вместе. Мы же хотим,чтобы роутер был частью `redux store` и мы могли пользоваться его данными и экшенами в обычном для `redux way`. В этом нам поможет библиотека `react-router-redux`. На сегодняшний день - это самая популярная библиотека для роутинга в `redux`.

- Для начала нам нужно установить библиотеку
```bash
yarn react-router-redux
```

- Теперь мы хотим добавить `reducer` из этой библиотеки в наши редьюсеры. В файл `index.js` в редьюсерах импортируем `routerReducer`

```js
    import { routerReducer } from 'react-router-redux';

    export default combineReducers({
        routing: routerReducer,
        tracks,
        playlists,
        filterTracks
    });
```

- и добавляем этот редьюсер с названием `routing`.

- Теперь нам нужно заврапить `history` в функцию `syncHistoryWithStore`, которая будет синхронизировать евенты навигации с `store`.

Для этого в `index.js` импортируем функцию `syncHistoryWithStore`, создадим новую переменную `history`. и в роутер передадим `history` как параметр.

```js
    import { syncHistoryWithStore } from 'react-router-redux';
    const history = syncHistoryWithStore(hashHistory, store);

    ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
        <Route path="/" component={App}/>
        <Router path="/about" component={About}/>
        </Router>
    </Provider>,
    document.getElementById('root')
    );
```

- Теперь если мы посмотрим в `devtools`, то мы видим, что у нас появился новый обьект `routing`, который содержит в себе информацию текущего роута и при переходе между страницами у нас выстреливает евент `LOCATION_CHANGE`, который мы можем использовать в роутере.

- Как же теперь нам в нашей компоненте `App` подписаться, чтобы иметь доступ к данным роута? Очень просто. У нас есть в методе `mapStateToProps` второй параметр `ownProps`. Давайте на него посмотрим.

```js
    (state, ownProps) => ({
    tracks: state.tracks.filter(track => track.name.includes(state.filterTracks)),
    ownProps
    }),
```

Как мы видим, `ownProps` содержит много информации о `route`. Давайте пройдемся по самым часто используемым полям. Самые часто используемые - это `params` и `location`. Чтобы понять что оно дает, давайте создадим страницу отдельного трека. Мы делаем это, чтобы попробовать применить `params` из `ownProps`.

- Добавим в роутер новый роут, в котором будет динамический параметр `id`.

```js
<Route path="/tracks/:id" component={Track}/>
```
- и компонент Track

```js
    import React from 'react';

    const Track = () => <div>Track</div>;

    export default Track;
```
- Теперь давайте добавим 1 трек, который будет у нас в редьюсере всегда, так как наши треки постоянно пустые при перезагрузке.
```js
    const initialState = [
        {
            id: 2334,
            name: 'Super track'
        }
    ];
```

- Зайдя на нее мы хотим видеть название трека. Для этого давайте добавим `connect` в компонента `Track`.

```js
    import React from 'react';
    import { connect } from 'react-redux';

    const Track = ({ track }) => <div>{track.name}</div>;

    const mapStateToProps = (state, ownProps) => ({
        track: state.tracks.find(track => track.id === Number(ownProps.params.id))
    })

    export default connect(mapStateToProps)(Track);
```

Мы добавили `connect` и в `mapStateToProps` находим из списка треков в `store`. Единственный нюанс тут - это что из `ownProps` мы получаем параметры строкой, а `id` у нас у треков `Number`. Поэтому мы должны при поиске приводить `id` в `Number`.

Если мы посмотрим в браузер, то у нас вывелось название трека. Мы можем добавить в `App` ссылку на эту страницу для каждого трека, но нужно помнить, что при перезагрузке страницы оно будет выдавать ошибку, так как `store` очищается.

- Импортируем `Link` из `react-router` и обернем имя трека в `Link`.

```js
    import { Link } from 'react-router';

    <li key={index}>
    <Link to={`/tracks/${track.id}`}>{track.name}</Link>
    </li>
```

Если мы нажмем `getTracks` и перейдем на любой из треков, то в новом компоненте выведется его имя.

В этом уроке мы рассмотрели как подключать` react-router-redux` и использовать роутер с `redux`. Мы реализовали получение трека используя параметры урла из `react-router`. Теперь вы можете строить приложения отслеживая всю информацию из роутера прямо в вашем `redux store`.
