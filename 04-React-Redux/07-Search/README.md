# Поиск в приложении

В этом уроке мы с вами напишем фильтр наших треков, чтобы лучше разобраться как это писать в `redux`.

Мы хотим добавить поле для поиска, и когда мы ввели название, даже частично, чтобы нам фильтровались отображенные треки на странице.

- Для начала давайте поменяем редьюсер `tracks` и сделаем его более приближенным к реальности, поскольку обычно, все сущности хранятся в виде обьектов. Очистим `initialState` в нашем редьюсере

```js
const initialState = [];
```

- Дальше поменяем екшен, чтобы он добавлял нам не строки, а обьекты. Для этого поменяем `payload` на обьект

```js
onAddTrack: (name) => {
  const payload = {
    id: Date.now().toString(),
    name
  }
  dispatch({ type: 'ADD_TRACK', payload });
}
```

- Как мы видим, я добавил новый `id`, который генерируется из даты и заменил `trackName` на `name`. Теперь нам осталось только поменять `map`.

```js
    {this.props.tracks.map((track, index) =>
    <li key={index}>{track.name}</li>
    )}
```

- Приложение по прежнему работает и в `redux-devtools` у нас в треках теперь мы видим массив обьектов.

- Теперь давайте добавим поле для поиска.

```html
    <div>
    <input type="text" ref={(input) => { this.searchInput = input }} />
    <button onClick={this.findTrack.bind(this)}>Find track</button>
    </div>
```

- Оно у нас ничем от добавления трека и не отличается, только переменная ref другая. И добавим метод findTrack.

```js
findTrack() {
  console.log('findTrack', this.searchInput.value);
}
```

- В браузере мы видим, что значение search сейчас выводится и мы можем по нему теперь искать треки.

- Теперь добавим метод в `mapStateToProps`, который будет диспатчить евент `FIND_TRACK`.

```js
    onFindTrack: (name) => {
        dispatch({ type: 'FIND_TRACK', payload: name })
    }
```

- и добавим вызов метода в findTrack.

```js
    findTrack() {
        console.log('findTrack', this.searchInput.value);
        this.props.onFindTrack(this.searchInput.value);
    }
```

Если мы посмотрим в `redux-devtools`, то наш екшен отстреливает и мы можем менять данные в `store`.

Теперь у нас есть несколько вариантов как находить фильтрованые треки. Мы сделаем самый простой. Мы будем хранить значение фильтра и применять его на список треков если нужно.

- Для этого добавим новый редьюсер `filterTracks`, который будет слушать екшен `FIND_TRACK` и менять `state`.

```js
    const initialState = '';

    export default function filterTracks(state = initialState, action) {
        if (action.type === 'FIND_TRACK') {
            return action.payload;
        }
        return state;
    }
```

- Здесь нам не нужно делать никакой магии с `spread`, так как это просто строка и мы можем ее просто переопределить.

- И добавим новый редьюсер в рутовый редьюсер.

```js
import { combineReducers } from 'redux';

import tracks from './tracks';
import playlists from './playlists';
import filterTracks from './filterTracks';

export default combineReducers({
  tracks,
  playlists,
  filterTracks
});
```

- В `devtools`, у нас после екшена `FIND_TRACK` в редьюсер записано что мы искали. Теперь осталось только отфильтровать данные в смарт компоненте.

На уровне метода `mapStateToProps` мы можем писать любые функции или фильтры так как нам доступен глобальный стейт.

```js
    state => ({
        tracks: state.tracks.filter(track => track.name.includes(state.filterTracks))
    });
```

- Мы проходим по всем нашим трека и фильтруем их если в имени трека есть вхождение нашего фильтра.

Давайте посмотрим в браузер. Когда мы добавляем треки с самого начала, то все треки у нас рендерятся, так как по умолчанию состояние `filterTracks` - это пустая строка. Когда же мы их фильтруем то `filterTracks` меняется как и `tracks` в компоненте. Данные в `store` не меняются.

В этом уроке мы научились реализовывать поиск на `redux` и разобрались, что в `mapStateToProps` могут возвращатся любые данные, а не только данные из `store` напрямую.