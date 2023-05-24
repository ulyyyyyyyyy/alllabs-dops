from PIL import Image
from PIL import ImageFilter
import os
import csv

# Путь к папке с исходными изображениями
input_folder = 'картиночки'

# Создаем новую папку для обработанных изображений
output_folder = 'filter_images'
os.makedirs(output_folder, exist_ok=True)

# Проходимся по всем файлам в директории
for filename in os.listdir(input_folder):
    # Проверяем тип файла
    if not filename.endswith('.jpg'):
        continue

    # Открываем изображение
    with Image.open(os.path.join(input_folder, filename)) as img:
        img_filter = img.filter(ImageFilter.CONTOUR)
        img_filter.save(os.path.join(output_folder, "new" + filename))

filename = "data.csv"

total_cost = 0

with open("data.csv") as file:
    reader = csv.reader(file, delimiter=",")

    print("Нужно купить:")
    # Считывание данных из CSV файла
    for row in reader:
        name = row[0]
        quantity = int(row[1])
        price = int(row[2])
        cost = quantity * price
        print(f"{name} - {quantity} шт. за {cost} руб.")
        total_cost += cost

print(f"Итоговая сумма: {total_cost} руб.")
