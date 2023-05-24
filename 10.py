import json
a = input("Введите название товара: ")
b = input("Введите цену товара: ")
c = input("товар есть в наличии?(напишите:True or False): ")
d = input("Введите массу товара: ")
new_data = {'name': a, 'price': b,'available': c, 'weight': d }
with open('Products.json',encoding='utf-8') as f:
    data = json.load(f)
    data['products'].append(new_data)
    with open('Products.json', 'w',  encoding='utf-8') as outfile:
        json.dump(data, outfile, ensure_ascii=False, indent=2)


    with open("Products.json", "r", encoding='utf-8') as file:
        data = json.load(file)

    for prod in data["products"]:
        if prod['available']:
            available = 'В наличии'
        else:
            available = 'Нет в наличии'
        print('\nНазвание: ', prod['name'], '\nЦена: ', prod['price'], '\nНаличие:' + available, '\nВес: ', prod['weight'])



# the file to be converted to
# json format
filename = 'sl.txt'

# dictionary where the lines from
# text will be stored
dict1 = {}

# creating dictionary
with open('sl.txt') as fh:
    for line in fh:
        # reads each line and trims of extra the spaces
        # and gives only the valid words
        command, description = line.strip().split(" - ")

        dict1[command] = description.strip()

# creating json file
# the JSON file is named as test1
out_file = open("test1.json", "w")
json.dump(dict1, out_file, ensure_ascii=False, indent=4, sort_keys=False)
out_file.close()

with open('test1.json', encoding='utf-8') as f:
    data = json.load(f)

new_dict = dict([(value, key) for key, value in data.items()])
print(new_dict)
new_d = list(new_dict.keys())
new_d.sort()
for i in new_d:
    f = (i, '-', new_dict[i])
    e = (' '.join(f))
    with open ('sl2.txt','a',encoding='utf-8') as file:
        file.write(e + '\n')





