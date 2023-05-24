from random import randint

print("вводите слова. чтобы закончить введите stop")
worlds = []
q = 0
n = 0
while (new_world := str(input())) != "stop":
    worlds.append(new_world)

print("  ".join(worlds))
print("вводите слова. чтобы закончить введите stop")


def p2():
    print("вводите слова. чтобы закончить введите stop")


worlds = []

while (new_world := str(input())) != "stop":
    if "Ф" in new_world or "ф" in new_world:
        print("Это редкое слово!")
    else:
        print("Увы, ваше слово обычное")
p2()

def p3():
    from random import randint


while True:
    a = randint(1, 20)
    b = randint(1, 20)
    print(f"{a} + {b} = ", end="")
    res = input()

    while not res.isdigit() and res != "stop":
        print("попробуйте ввести число :)", end="")
        res = input()
    if res == "stop":
        break
    res = int(res)
    if a + b == res:
        print("Правильный ответ!")
        q = q + 1
    else:
        print("Ответ неправильный!")
        n = n + 1
    if n == 3:
        print(f"Вы проиграли. Количество правильных ответов:{q}")
        break

p2()
p3()
