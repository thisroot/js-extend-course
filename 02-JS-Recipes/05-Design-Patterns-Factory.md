# [Паттерны проектирования: Factory](https://monsterlessons.com/project/lessons/factory-pattern-v-javascript)
- **Задача:**  Основная идея в том, что мы создаем фабрику, которая может создавать нам обьекты. И сразу же возникает вопрос, а почему мы не можем просто использовать оператор new, чтобы создавать обьекты? Есть ситуации, когда мы хотим скрыть снаружи реализацию создания обьекта и в этом случае нам поможет паттерн Factory.
- 
- **Описание:**
```js
    const factory = new Employee()
    fulltime = factory.create('fulltime')
    parttime = factory.create('parttime')
    temporary = factory.create('temporary')
    contractor = factory.create('contractor')

    fulltime.say()
    parttime.say()
    temporary.say()
    contractor.say()
```
- **Реализация:**
```js
    class Fulltime {
        constructor () {
            this.rate = '$12'
        }
    }

    class PartTime {
        constructor () {
            this.rate = '$11'
        }
    }

    class Temporary {
        constructor () {
            this.rate = '$10'
        }
    }

    class Contractor {
        constructor () {
            this.rate = '$15'
        }
    }

    class Employee {
        create (type) {
            let employee
            if (type === 'fulltime') {
                employee = new FullTime()
            } else if (type === 'parttime') {
                employee = new PartTime()
            } else if (type === 'temporary') {
                employee = new Temporary()
            } else if (type === 'contractor') {
                employee = new Contractor()
            }
            employee.type = type
            employee.say = function () {
                console.log(`${this.type}: rate ${this.rate}/hour`)
            }
            return employee;
        }
    }
```