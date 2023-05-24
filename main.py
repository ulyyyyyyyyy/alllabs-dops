import random

synonyms = {}

# считываем синонимы из файла и сохраняем в словарь
with open('synonyms.txt', 'r') as f:
    for line in f:
        word, syns = line.strip().split(' - ')
        synonyms[word] = syns.split('; ')

# запрашиваем у пользователя слово для замены и находим его синонимы
    word = input('Введите слово для замены: ')
    if word in synonyms:
        syns = synonyms[word]
    else:
        print('Для данного слова не найдены синонимы в базе. Вы можете предложить свой вариант.')
        new_syn = input('Введите свой синоним для данного слова: ')
        synonyms[word] = [new_syn]
        syns = [new_syn]

# выбираем случайный синоним из списка и предлагаем его пользователю
    syn = random.choice(syns)
    print('Найден синоним "{}". Устраивает ли вас синонимы: "{}" и "{}"?'.format(syn, word, syn))
    answer = input('Введите "да" или "нет": ')

    # если пользователь не устраивает замена, предлагаем внести свой вариант и сохраняем его в базу
    if answer.lower() == 'нет':
        new_syn = input('Введите свой синоним: ')
        if new_syn in syns:
            print('Введенный вами синоним уже имеется в базе.')
        else:
            old_syn_index = syns.index(syn)
            synonyms[word][old_syn_index] = new_syn
            with open('synonyms.txt', 'r+') as file:
                try:
                    text = file.read()
                    pos = text.find('{} - {};'.format(word, syn))
                    file.seek(pos)
                    file.write(f"{word} - {new_syn}\n")
                except ValueError:
                    pass

            print('Синоним "{}" заменен на "{}" в базе.'.format(syn, new_syn))
            syn = new_syn
    else:
        syn = syn

    # заменяем слово на выбранный синоним в тексте и сохраняем изменения в файле
    with open('synonyms.txt', 'r') as file:
        text = file.read()
        new_text = text.replace(word, syn)

    with open('synonyms.txt', 'w') as file:
        file.write(new_text)
    print('Замена выполнена.')