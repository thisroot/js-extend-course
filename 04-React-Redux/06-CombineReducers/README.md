# Метод combineReducers

Позволяет разбивать большие редьюсеры на несколько более мелких.

Функция `playlist`, которую мы с вами писали ранее - это редьюсер.

```js
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

Редьюсер это чистая функция, которая берет предыдущее состояние и `action` и возвращает новое состояние. Она является чистой, так как не модифицирует данные, а возвращает новые данные.

- Теперь представим, что нам в приложении нужно хранить не только треки, но и плейлисты. Мы можем сделать `initialState` обьектом с полями `tracks`, `playlists`.

```js
    const initialState = {
    tracks: [
        'Smells like spirit',
        'Enter Sandman'
    ],
    playlists: [
        'My home playlist',
        'My work playlist'
    ]
    };
```

- Тогда у нас изменится и редьюсер.

```js
    function playlist(state = initialState, action) {
        if (action.type === 'ADD_TRACK') {
            return {
            ...state,
            tracks: [...state.tracks, action.payload]
            };
        }
        return state;
    }
```

Мы возвращаем теперь не массив, а обьект. У обьекта мы обновляем массив треков добавляя в него новый трек. Работа с данными немного усложнилась, так как мы теперь возвращаем обьект, а не массив и у нас уже не плоские данные.

- Теперь нам нужно обновить `connect`.
```js
    export default connect(
        state => ({
            tracks: state.tracks
        }),
        dispatch => ({
            onAddTrack: (trackName) => {
            dispatch({ type: 'ADD_TRACK', payload: trackName });
            }
        })
    )(App);
```

- Теперь мы присваиваем в this.props.tracks данные из `state.tracks`. Также нужно поменять переменную `testStore` на `this.props.tracks`

```js
    {this.props.tracks.map((track, index) =>
    <li key={index}>{track}</li>
    )}
```

Как мы видим, приложение работает так же, как в прошлом уроке. Давайте проверим как у нас выглядит `store`. В `redux-devtools` мы видим `track` и `playlists`.

Как бы выглядел наш редьюсер, когда у нас было мы много екшенов?

```js
    function playlist(state = initialState, action) {
    if (action.type === 'ADD_TRACK') {
        return {
        ...state,
        tracks: [...state.tracks, action.payload]
        };
    } else if (action.type === 'DELETE_TRACK') {
        return state;
    } else if (action.type === 'ADD_PLAYLIST') {
        return state;
    } else if (action.type === 'DELETE_PLAYLIST') {
        return state;
    }
    return state;
    }
```

Я добавил всего 2 екшена и наш редьюсер сразу разросся. Конечно с ним все еще можно работать, но представьте если у вас много типов данных и сотни екшенов. Если этот код не разделять, то его будет нереально поддерживать.

Даже в таком примере уже видно, что его можно разделить на 2 редьюсера. Один редьюсер будет работать с плейлистами, а один с треками. Для этого в `redux` существует функция `combineReducers`.

- Давайте создадим папку `reducers` и файл `index.js`. Внутри импортируем функцию `combineReducers`.

```js
    import { combineReducers } from 'redux'
```
Это специальная функция в которую можно передавать много редьюсеров делая из них дерево. Давайте импортируем редьюсер `tracks`, который мы сейчас создадим и добавим его в обьект редьюсеров.
```js
    import tracks from './tracks';

    export default combineReducers({
        tracks
    })
```

Создадим файл `tracks` и перенесем туда наш редьюсер, изменив его на старый код. Обратите внимание, насколько легче сразу читается код. Так как у нас `state` треков стал опять плоским, а не полем обьекта, то эти с этими данными легче работать. Всегда нужно стараться делать `state` как можно более плоским.

- Тоже самое сделаем с плейлистами
```js
    const initialState = [
        'My home playlist',
        'My work playlist'
    ];

    export default function playlists(state = initialState, action) {
    if (action.type === 'ADD_PLAYLIST') {
        return state;
    } else if (action.type === 'DELETE_PLAYLIST') {
        return state;
    }
    return state;
    }
```

и добавим плейлисты в `combineReducers`.
```js
    import { combineReducers } from 'redux';

    import tracks from './tracks';
    import playlists from './playlists';

    export default combineReducers({
    tracks,
    playlists
})
```
- Теперь в index.js импортируем наш редьюсер и передаем его как первый параметр.

```js
    import reducer from './reducers';
    const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
```
Если мы посмотрим в браузер, то наше приложение работает, а в `redux-devtools` мы по прежнему видим обьект с двумя полями `tracks` и `playlists`.

С помощью `combineReducers` можно разбивать редьюсеры на любом уроке вложенности. Мы могли бы, например, разбить `reducer tracks` на несколько внутри, когда он станет слишком сложным.

Итак, в этом уроке мы с вами научились разбивать редьюсеры на несколько с помощью метода `combineReducers`, что может вам легко строить более сложные приложения.