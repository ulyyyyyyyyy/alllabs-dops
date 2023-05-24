
def n1():
    password = input("Введите пароль")

    is_numeric = False
    is_upper = False
    is_lower = False
    is_spec = False

    for char in password:
        if char.isnumeric():
            is_numeric = True
        elif char.islower():
            is_lower = True
        elif char.isupper():
            is_upper = True
        elif char in "@#$%^&*!":
            is_spec = True


    if len(password) > 5 and is_numeric and is_upper and is_lower and is_spec:
        print("Пароль: ОК")
    else:
        print("Пароль ненадежный")
        password = input("введите пароль")

    password2 = input("Повторите пароль")

    if password == password2:
        print("Пароли совпадают")
    else:
        print("Пароли не совпадают")
        password2 = input("Повторите пароль")

    if password == password2:
        print("Пароли совпадают")

def n2():
    a = int(input("Введите ваше место"))

    if (a >= 36) and (a <= 54):
        if a % 2 == 0:
            print("у вас верхнее боковое место")
        else:
            print("у вас нижнее боковое место")
    elif a % 2 == 0:
        print("у вас верхнее место")
    elif a % 2 != 0:
        print("у вас нижнее место")

def n3():
    y = int(input("введите год"))

    if (y % 4 == 0) and (y % 100 != 0):
        print("Это високосный год")
    else:
        print("Это обычный год")

def n4():
    color1 = input("enter the first color")
    color2 = input("enter the second color")

    if (color1 != "red") or (color1 != "yellow") or (color1 != "blue") or (color2 != "red") or (color2 != "yellow") or (
            color2 != "blue"):
        print("not found")
    elif (color1 == "red") and (color2 == "blue"):
        print("purple")
    elif (color1 == "blue") and (color2 == "red"):
        print("purple")
    elif (color1 == "red") and (color2 == "yellow"):
        print("orange")
    elif (color1 == "yellow") and (color2 == "red"):
        print("orange")
    elif (color1 == "blue") and (color2 == "yellow"):
        print("green")
    elif (color1 == "yellow") and (color2 == "blue"):
        print("green")

def n5():
    number = int(input("enter the quality of words"))
    a = str("")
    w = str("")
    for i in range(number):
        w = input("words")
        a = a + " " + w
        print(a)


n1()
n2()
n3()
n4()
n5()