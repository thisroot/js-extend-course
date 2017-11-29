# React Router

### **!** Прежде чем изучать данную тему, надо пройти 8 уроков по React Redux

Самой популярной библиотекой для того, чтобы сделать роутинг в react приложении - react-router

- Установим библиотеку `yarn add react-router react-router-dom history`
    - Установим еще библиотеки, изучать которые будем в следующих главах `yarn add  react-redux redux redux-devtools-extension redux-thunk`
- Импортируем небходимые компоненты из данной библиотеки в файл index.js
```js
    import { Router, Route, hashHistory } from 'react-router';
    import { createHashHistory } from 'history';

    const hashHistory = createHashHistory();
```

- Заменим render нашим
```js
    ReactDOM.render(
    <Provider store={store}>
        <Router history={hashHistory}>
        <div>
            <Route Route exact path='/' component={App} />
            <Route path="/app" component={App}/>
            <Route path="/about" component={About}/>
        </div>
        </Router>
    </Provider>,
    document.getElementById('root')
    );
```

- Здесь компонентом верхнего уровня является провайдер, для хранения данных
- Передали компоненту router обьект history для того чтобы роутинг работал без бекенда
- И дальше передали роут с путем и компонентом App
- Добавим еще один роут `<Route path="/about" component={About}/>`
- Создадим компонент About
```js
    import React, { Component } from 'react';

    class About extends Component {
        render() {
            return <div>This is our cool music app</div>;
        }
    }

    export default About;
```
- Импортируем в `index.js` => `import About from './About';`

Теперь если мы в браузере перейдем на урл /#/about, то мы видим, что у нас отрендерился компонент about.

Как же рендерить ссылки для перехода между разными урлами? Для этого у react-router есть замечательная компонента Link.

- Давайте добавим компонент меню в наше приложение.

```jsx
    import React, { Component } from 'react';
    import { Link } from 'react-router-dom';

    class Menu extends Component {
        render() {
            return (
            <div>
                <Link to="/">Tracks</Link>
                <Link to="/about">About</Link>
            </div>
            );
        }
    }

    export default Menu;
```

Мы использовали компонент Link из react-router, в котором указали параметр to. Он указывает куда должна переходить ссылка. Теперь зарендерим этот компонент в App и About компонентах.

```jsx
import Menu from './Menu';
<Menu />
```
Как мы видим, у нас работают переходы между страницами tracks и about.