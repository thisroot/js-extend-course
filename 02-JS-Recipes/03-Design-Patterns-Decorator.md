# [Паттерны проектирования: Decorator](https://monsterlessons.com/project/lessons/decorator-pattern-v-javascript)
- **Задача:** С помощью декоратора, мы можем динамически добавлять обьектам новые свойства и методы. То есть мы как бы заворачиваем наш обьект в декоратор, как в superclass.
- 
- **Описание:**
```js
    class Coffee {
        cost () {
            return 5
        }
    }

    const coffee = new Coffee()
    console.log(coffee.cost())

    const coffee = new Coffee()
    sugar(coffee)
    console.log(coffee)

```
- **Реализация:**
```js
    const sugar = coffee => {
        //получили стоимость кофе
        const cost = coffee.cost()
        //увеличиваем стоимость кофе с поправокой на сахар
        coffee.cost = () => cost + 1
    }
    const coffee = new Coffee()
    sugar(coffee)
    console.log(coffee.cost())
```

- **Пример:**

```js
    const sugar = coffee => {
        const cost = coffee.cost()
        coffee.cost = () => cost + 1
    }

    const small = coffee => {
        const cost = coffee.cost()
        coffee.cost = () => cost - 1
    }

    const large = coffee => {
        const cost = coffee.cost()
        coffee.cost = () => cost + 1
    }

    const withMilk = coffee => {
        const cost = coffee.cost()
        coffee.cost = () => cost + 2
    }

    const largeWithMilk = coffee => {
        large(coffee)
        withMilk(coffee)
        const cost = coffee.cost()
        coffee.cost = () => cost
    }

    const coffee = new Coffee()
    largeWithMilk(coffee)
    console.log(coffee.cost())
```