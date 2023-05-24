def n1(number: int):
    return True if number % 3 == 0 else False


def n2():
    try:
        a = int(input('Введите число: '))
        b = 100 / a
    except ZeroDivisionError:
        print('Введён 0!')
    except ValueError:
        print('Введено не число!')
    else:
        print('Результат деления 100 на введённое число: ', b)


def n3():
    d = input('Введите дату в формате дд.мм.гггг: ')
    d = d.split('.')
    if int(d[0]) * int(d[1]) == int(d[2][2:4]):
        print('Дата магическая!')
    else:
        print('Дата не является магической!')


def n4():
    try:
        ticket = input('Введите номер билета: ')
        x = 0
        y = 0
    except ValueError:
        print("Введен не номер")

    if len(ticket) % 2 == 0:
        for i in ticket[0:int(len(ticket) / 2)]:
            x = x + int(i)
        for i in ticket[int(len(ticket) / 2):int(len(ticket)) + 1]:
            y = y + int(i)
        if x == y:
            print('Билет счастливый!')
        else:
            print('Билет не является счастливым!')
    else:
        print('Количество цифр нечётно!')


if __name__ == "__main__":
    print("Проверка кратности трем")
    print(n1(7))
    print(n1(3))

n2()
n3()
n4()
