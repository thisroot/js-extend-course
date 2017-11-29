# [Паттерны проектирования PubSub - Publish / Subscribe](https://monsterlessons.com/project/lessons/publishsubscribe-v-javascript)

- **Задача:** Реализация подписки событий одного класса на изменения в другом классе
- **Описание:**

```js
    EventBus.subscribe('foo', () => console.log('foo fired'))
    EventBus.publish('foo', 'Hello world')
```

- Осуществляем подписку на событие с именем `foo`, и регистрируем коллбек функцию.
- Затем при вызове метода `publish` с именем события `foo` и передали в параметрах наши аргументы.

- **Реализация:**
```js
    const EventBus = {
        //хранилище каналов
        channels: {},
        
        subscribe (channelName, listener) {
            //проверяем на наличие зарегистрированного собыьтия
            if (!this.channels[channelName]) {
                this.channels[channelName] = []
            }
            //добавляем коллбек функцию
            this.channels[channelName].push(listener)
        },

        publish (channelName, data) {
            const channel = this.channels[channelName]
            if (!channel || !channel.length) {
                return
            }
            //вызываем событие и передаем в коллбек информацию
            channel.forEach(listener => listener(data))
        }
    }
```    
- **Пример:**

```js
    class Order {
        constructor (params) {
            this.params = params
        }

        save () {
            console.log('Order saved')
            EventBus.publish('order/new', {
                userEmail: this.params.userEmail
            })
        }
    }

    class Mailer {
        constructor () {
            EventBus.subscribe('order/new', this.sendPurchaseEmail)
        }

        sendPurchaseEmail (params) {
            console.log(`Email send to ${params.userEmail}`)
        }
    }

    const mailer = new Mailer()
    const order = new Order({userEmail: 'john@gmail.com'})
    order.save()
```

## [Observer](https://monsterlessons.com/project/lessons/observer-pattern-v-javascript)
- **Задача:** Позволяет делать связи один ко многим в приложении. К примеру при возникновении события в элементе, уведомить другие компоненты.
- **Описание:**
```js
    const observer = new EventObserver()

    observer.subscribe(data => {
        console.log('subscribe was fired', data)
    })

    observer.broadcast({someData: 'hello'})
```
- **Реализация:**
```js

    class EventObserver {
        constructor () {
            this.observers = []
        }

        subscribe (fn) {
            this.observers.push(fn)
        }

        unsubscribe (fn) {
            this.observers = this.observers.filter(subscriber => subscriber !== fn)
        }

        broadcast (data) {
            this.observers.forEach(subscriber => subscriber(data))
        }
    }

```

- **Пример:**

```js
    const observer = new EventObserver()
    
    class Man {
        constructor(name){
            this.name = name;
            
            observer.subscribe(data => {
                if(data.listen) {
                    this.listen(data.listen);
                }
            })
        }
        
        listen(data) {
            console.log(`The man ${this.name} heard: "${data}"`);
        }
    }
    
    var man1 = new Man("Pavel");
    var man2 = new Man("Petya");

    observer.broadcast({listen: 'hello'});
    
```


- **Задача:** Реализация подписки событий одного класса на изменения в другом классе
- **Описание:**
- **Реализация:**
- **Пример:**
