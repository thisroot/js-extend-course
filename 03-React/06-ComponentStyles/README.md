# Компонентный подход

- Вы заметили что мы импортировали в `index.js` файл стилей `index.css`. Это делается при помощи `webpack`, который особым образом обрабатывает все файлы с расширением `.css`

- Если добавить в файле `index.css` свойство для `body`: `background: green` , то фон сразу же поменяется на зеленый - это происходит благодаря модулю `hot-reloader`

## Структурирование стилей проекта
- `index.css` - глобальные стили проекта
- Под каждый компонент пишем свои стили
```js
    import './App.css';
```

- Для того, чтобы задать элементу reat какие нибудь классы, слудует использовать специальный атрибут `className`.

```jsx
    <div className="container">
    <RegistationForm />
    </div>
```

- Добавим класс в стили `App.css`
```css
    .container {
    width: 700px;
    border: 1px solid red;
    margin: 0 auto;
    }
```
- Создадим стили для дочернего компонента `RegistationForm`
```jsx
  <input
    type="text"
    placeholder="E-mail"
    value={this.state.email}
    onChange={this.handleEmailChange}
    className="emailField"
  />
  <button className="submitBtn">Save</button>
```
- Импортируем файл `import './RegistationForm.css';`
- Добавим стилей
```css
    .emailField {
        width: 300px;
        height: 40px;
        display: block;
        border-radius: 4px;
        margin-bottom: 10px;
    }

    .submitBtn {
        width: 300px;
        background: green;
        height: 50px;
        border: 0;
    }
```

- Если нам надо минифицировать множество наших отдельных css файлов и сделать один- для продакшн версии сайта, следует выполнить команду
```bash
    npm run build
```
То у вас в папке build/static будет лежать 2 файла css и js. Оба файла минифицированы. У нас также есть файл index.html, в который подключены эти файлы. Все что вам остается после билда - это засунуть эти файлы в проект на сервере.cd ./