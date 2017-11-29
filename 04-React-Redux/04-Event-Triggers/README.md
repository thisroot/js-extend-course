# Триггеры событий

В прошлых уроках отрисовали список наших треков из store. Теперь нужно реализовать добавление новых треков

- Давайте добавим евент onClick нашей кнопке addTrack и прибайндим его сразу же
```js
    <button onClick={this.addTrack.bind(this)}>Add track</button>
```
- Опишем функцию
```js
    addTrack() {
        console.log('addTrack');
    }
```

- Если мы в браузере кликнем по кнопке, то в консоли увидим `addTrack`.

- Теперь мы хотим получить введенное в `input` значение. 
    - Так как мы не хотим хранить локальный стейт и слушать `change event`, как мы делали в уроке про локальный стейт, а просто хотим получить введенное значение в `input` мы можем использовать для этого `ref`, как мы делали в уроке по React.

```js
    <input type="text" ref={(input) => { this.trackInput = input; }} />
```

- Добавим инпуту `ref` и запишем в `this.trackInput` ссылку на input.

- Теперь в методе `addTrack` мы можем вывести значение `input`.

```js
    addTrack() {
        console.log('addTrack', this.trackInput.value);
    }
```
Теперь мы хотим диспатчить наш евент `ADD_TRACK`, как мы с вами писали на чистом `javascript`. Для этого в функции `connect` существует второй аргумент. Это функция, которая на вход получает `dispatch` и возвращает обьект с методами.

```js
    export default connect(
    state => ({
        testStore: state
    }),
    dispatch => ({
        onAddTrack: (trackName) => {
        dispatch({ type: 'ADD_TRACK', payload: trackName })
        }
    })
    )(App);
```

Мы создали метод `onAddTrack`, который принимает на вход имя трека и диспатчит екшен с типом, как мы делали ранее.

Теперь он нам доступен в `this.props` и мы просто вызываем его в `addTrack`.

`this.props.onAddTrack(this.trackInput.value);`

Если мы посмотрим в браузер, то у задиспатчился екшен и данные добавились в `store` и все работает, правильно отображается список треков, только инпут не очищается. Давайте добавим этот функционал. Для этого просто присвоим в `trackInput` пустое значение.

```js
    addTrack() {
        console.log('addTrack', this.trackInput.value);
        this.props.onAddTrack(this.trackInput.value);
        this.trackInput.value = '';
    }
```