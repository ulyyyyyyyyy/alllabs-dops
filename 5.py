from random import random

n = int(input("put in the number"))
x = [1, 8, 9, 0, 3]
if n not in x:
    print(" no such number")
else:
    print("you guessed the number!")

def n2():
    a = [4, 5, 6, 6, 7, 8, 9, 9, 0, 0, 0, 0, 1]
    print("Input list : ", a)
    b = []

    count = 0

    for x in a:
        if x not in b:
            count = count + 1
            b.append(x)


    print("Output list : ", b)
    print("quality of uni items:", count)


    duplicate = {str(x) for x in a if a.count(x) > 1}
    x = lambda: print('nothing')
    y = lambda: print('duplicates:', ' '.join(duplicate))
    x() if len(duplicate) < 1 else y()

n2()

def n3():
    week = ('Mn', 'T', 'W', 'Th', 'Fr', 'Sn', 'St')
    weekends = int(input("put in the number of weekends"))
    print('Weekends:', week[:-weekends - 1:-1])
    print('Work days:', week[:-weekends])
n3()

def n4():
    import random
    g1 = ['avtoreeva', 'aimaletdinova', ' kudriasheva', ' tockaya', 'balabanov', 'litvinova', 'ramazanova', 'merzlyakova', 'pugacheva','kavalsky']
    g2 = ['kim', 'chin', 'kukushkina', 'samoylova', 'panteley', 'burenkova', 'pustotina', 'cheremuchina', 'romashka', 'dostoevsky']
    team = tuple(random.sample(g1, 5) + random.sample(g2, 5))
    print('первая группа:', g1)
    print('вторая группа:', g2)
    print('спортивная команда:', team)
    print('длина кортежа:', len(team))

    team = tuple(sorted(team))

    if 'pugacheva' in team:
        print(team.count('pugacheva'))
    else:
        print('No ')

n4()