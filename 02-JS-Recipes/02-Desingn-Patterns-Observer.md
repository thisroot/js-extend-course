# [Паттерны проектирования: Observer](https://monsterlessons.com/project/lessons/observer-pattern-v-javascript)
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