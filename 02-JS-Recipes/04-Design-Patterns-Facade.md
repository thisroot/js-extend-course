# [Паттерны проектирования: Facade](https://monsterlessons.com/project/lessons/decorator-pattern-v-javascript)
- **Задача:** Он заключается в том, чтобы создать простой интерфейс к большой и сложной части кода, чтобы спрятать его сложность. То есть вместо того, чтобы знать все о сложной части, мы знаем только пару методов, которые будут делать, что нам нужно, с сложной частью и мы не будем знать, что там происходит внутри вообще. Это и есть фасад.
- **Описание:**
```js
    class Bank {
        verify (amount) {
            return amount < 999
        }
    }

    class CreditHistory {
        check (name) {
            return true
        }
    }

    class Balance {
        check (name) {
            return true
        }
    }

    //чтобы не работать с несколькими предыдущими классами при проверках и оформлении кредита, просто создаем новый класс
    const credit = new Credit('John')
    const creditSmall = credit.applyFor(99)
    const creditMedium = credit.applyFor(199)
    const creditLarge = credit.applyFor(99999)
    console.log('creditSmall', creditSmall)
    console.log('creditMedium', creditMedium)
    console.log('creditLarge', creditLarge)
```
- **Реализация:**
```js
    class Credit {
        constructor (name) {
        this.name = name
        }

        applyFor (amount) {
            const isApproved = new Bank().verify(amount)
            const bankResult = isApproved ? 'approved' : 'denied'
            const isPositiveBalance = new Balance().check(this.name)
            const balance = isPositiveBalance ? 'positive balance' : 'negative balance'
            const isGoodCreditHistory = new CreditHistory().check(this.name)
            const creditHistory = isGoodCreditHistory ? 'good' : 'poor'

            return `${this.name} has been ${bankResult} for the ${amount} credit. With a ${creditHistory} credit standing and having a ${balance}`
        }
    }
```