# Асинхронные экшены

Раньше мы с вами разбирали как работают екшены в `redux`. Мы разбирали только синхронные екшены, которые выполняются моментально. Что делать с екшенами, который выполняются асинхронно? Например получение данные от `API`. В этом случае нам необходима специальная `middleware`, которая позволит нам писать асинхронные екшены в `redux`.

- Самая простая и часто используемая библиотека для этого - это `redux-thunk`. Давайте установим ее командой
  - `yarn add redux-thunk`

В `redux` мы создавали новый `store` командой `createStore` и передавали в нее первым аргументом рут `reducer`. Вторым аргументом в нее можно передавать дополнительные вещи, которые будут улучшать работу с `redux`. Например `redux-devtools` или `миддлвары`.

- У нас вторым параметром идет `redux-devtools` и нам нужно применить как `devtools`, так и нашу `middleware`. Для этого установим пакет 
  - `yarn add redux-devtools-extension`

- Импортируем `composeWithDevTools` из `redux-devtools-extension`, `applyMiddleware` из `redux` и `thunk` из `redux-thunk`.

```js
  import { composeWithDevTools } from 'redux-devtools-extension';
  import { createStore, applyMiddleware } from 'redux';
  import thunk from 'redux-thunk';
```
- И зменим второй аргумент.

```js
  const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));
```

- Что мы тут сделали? 
  - Метод `composeWithDevTools` это улучшеный метод `compose`, который автоматически добавляет `devtools` к всему, что мы передали ему внутрь
  - Внутри мы вызываем `applyMiddleware`, которая принимает в качесте аргументов `middleware` и применяет их. То есть теперь если мы захотим добавить еще какую-то `middleware`, мы просто добавим ее через запятую. 
  - Пока же мы применили только `middleware thunk` для асинхронных екшенов.

Такой код обычно дублируется из проекта в проект и особо не отличается.

Теперь давайте напишем с вами кнопку, нажав которую, мы будем получать асинхронно список треков, как будто от `API` и рендерить их вместо наших треков на странице.

- Добавим кнопку `Get tracks`.

```html
  <div>
    <button onClick={this.props.onGetTracks}>Get tracks</button>
  </div>
```

- Как вы видите, я напрямую вызываю екшен из props так как это вполне возможно и дополнительных функций в классе для этого нам не требуется.

- Давайте опишем этот метод в `mapStateToDispatch`.

```js
  onGetTracks: () => {
    const asyncGetTracks = () => {
      return dispatch => {
        setTimeout(() => {
          console.log('I got tracks');
          dispatch({ type: 'FETCH_TRACKS_SUCCESS', payload: [] });
        }, 2000)
      }
    }
    dispatch(asyncGetTracks());
  }
```

- Что мы сделали? 
  - Как обычно мы вызываем `dispatch`. Но теперь мы передаем в него не обьект, а функцию, которая возвращает функцию. 
  - В возвращаемой функции есть аргумент `dispatch`. Теперь мы можем в этой функции делать любые асинхронные операции и вызывать `dispatch` тогда, когда нам нужно. 
  - У нас есть `setTimeout` с таймаутом 2 секунды и внутри него задиспатчим новый евент.
  - У нас выводится `console.log` и в `redux-devtools` мы видим с вами `action`.


- Cоздадим папку `actions`, где мы будем хранить все наши екшены и создадим там файл `tracks`.
- Вынесем нашу асинк функцию и заекспрортим ее.
```js
  export const getTracks = () => {
    return dispatch => {
      setTimeout(() => {
        console.log('I got tracks');
        dispatch({ type: 'FETCH_TRACKS_SUCCESS', payload: [] });
      }, 2000)
    }
  };
```

- Теперь в `App.js` импортируем этот екшен и вызовем его в `onGetTracks`.

```js
  import { getTracks } from './actions/tracks';

  onGetTracks: () => {
    dispatch(getTracks());
  }
```

Код в нашей компоненте стал понятнее в `onGetTracks` мы просто диспатчим екшен `getTracks` и нас не интересует, что внутри него происходит.

Давайте проверим, что все по прежнему работает.

Теперь мы можем избавиться от 1 уровня вложености в нашем екшене, чтобы было читабельнее.

```js
  export const getTracks = () => dispatch => {
    setTimeout(() => {
      console.log('I got tracks');
      dispatch({ type: 'FETCH_TRACKS_SUCCESS', payload: [] });
    }, 2000)
  };
```

Мы просто использовали короткую запись, чтобы описать, что метод `getTracks` возвращает функцию с аргументом `dispatch`.

Теперь наш екшен выглядит достаточно лаконично. У нас происходит `setTimeout` и в `коллбеке` мы диспатчим екшен, что мы успешно получили треки.

Давайте теперь их добавим, чтобы было что отрендерить.

```js
  var mockApiData = [
    {
      id: 1,
      name: 'Enter Sandman'
    },
    {
      id: 2,
      name: 'Welcome Home'
    },
    {
      id: 3,
      name: 'Master of Puppets'
    },
    {
      id: 4,
      name: 'Fade to Black'
    },
    {
      id: 5,
      name: 'Nothing Else Matters'
    }
  ];

  export const getTracks = () => dispatch => {
    setTimeout(() => {
      console.log('I got tracks');
      dispatch({ type: 'FETCH_TRACKS_SUCCESS', payload: mockApiData });
    }, 2000)
  };
```

Но наш редьюсер все еще не слушает `екшен` `FETCH_TRACKS_SUCCESS`. Для этого просто добавим это условие в `редьюсер` и перезапишем наш `стейт`.

```js
  const initialState = [];

  export default function tracks(state = initialState, action) {
    if (action.type === 'ADD_TRACK') {
      return [
        ...state,
        action.payload
      ];
    } else if (action.type === 'FETCH_TRACKS_SUCCESS') {
      return action.payload;
    }
    return state;
  }
```

- Давайте помотрим. 
  - Теперь при нажатии на кнопку `Get tracks` у нас происходит асинхронный екшен и когда он успешно завершился, мы рендерим треки.

Итак, в этом уроке мы с вами научились писать асинхронные екшены с помощью мидлвары `redux-thunk`, а также узнали как настроить `redux` так, чтобы он работал одновременно с `devtools` и `middlewares`.