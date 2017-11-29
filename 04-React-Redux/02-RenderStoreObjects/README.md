# Отрисовываем элементы из store

## Добавим в html разметку базовую форму добавления треков в список: 
- Добавим `input` для ввода треков, 
- кнопку добавление трека и 
- контейнер для списка треков.

```html
    <div>
    <input type="text" class="trackInput"/>
    <button class="addTrack">Add track</button>
    <ul class="list"></ul>
    </div>
```

- Добавим listener на кнопку "Add track"

```js
    const addTrackBtn = document.querySelectorAll('.addTrack')[0];

    addTrackBtn.addEventListener('click', () => {
    const trackName = document.querySelectorAll('.trackInput')[0].value;
    console.log('track name', trackName);
    });
```

- Добавим `dispatch` именни трека
```js
    store.dispatch({ type: 'ADD_TRACK', payload: trackName });
```
Теперь в консоли у нас выводится измененный стор с новым треком. 

## Рендер списка треков из `store`. 
- Добавим в функции `subscribe` вывод массива. 
- Найдем сначала элемент `list`. Потом пройдемся циклом по `store.getState()`. 
- Создаем новый елемент `li`. 
- Пишем текст в `li` и добавляем `li` к нашему листу.

```js
    store.subscribe(() => {
        console.log('subscribe', store.getState());
        const list = document.querySelectorAll('.list')[0];
        store.getState().forEach(track => {
            const li = document.createElement('li');
            li.textContent = track;
            list.appendChild(li);
        })
    })
```

Если мы посмотрим в браузер, то код работает не совсем правильно, так как контент не удаляется и у нас дублируются записи, так как мы не очищаем список.

- Добавим очистку контейнера

```js
    list.innerHTML = '';
```
- Теперь единственно, что работает неправильно - это то, что наш input не очищается.

```js
    document.querySelectorAll('.trackInput')[0].value = '';
```

## Рефакторинг кода
- Закешируем селекторы
```js
    const addTrackBtn = document.querySelectorAll('.addTrack')[0];
    const list = document.querySelectorAll('.list')[0];
    const trackInput = document.querySelectorAll('.trackInput')[0];
```

- Уберем консоли и изменим оставшийся код

```js
    store.subscribe(() => {
        list.innerHTML = '';
        trackInput.value = '';
        store.getState().forEach(track => {
            const li = document.createElement('li');
            li.textContent = track;
            list.appendChild(li);
        })
    })

    addTrackBtn.addEventListener('click', () => {
        const trackName = trackInput.value;
        store.dispatch({ type: 'ADD_TRACK', payload: trackName });
    });
```

