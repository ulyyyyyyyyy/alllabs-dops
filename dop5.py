import tkinter as tk
from tkinter import ttk


class Galuzy:
    def __init__(self):

        # Создаем главное окно
        self.root = tk.Tk()
        self.root.geometry("300x200")
        self.root.title("Жалюзи")

        # Создаем элементы интерфейса
        self.length_label = tk.Label(self.root, text="Длина жалюзи в метрах:")
        self.length_entry = tk.Entry(self.root, width=10)
        self.width_label = tk.Label(self.root, text="Ширина жалюзи в метрах:")
        self.width_entry = tk.Entry(self.root, width=10)
        self.material_label = tk.Label(self.root, text="Материал:")
        self.material_combo = ttk.Combobox(self.root, values=["Пластик", "Алюминий", "Соломка", "Текстиль"])
        self.material_combo.current(0)  # ставим на пластик
        self.calculate_btn = tk.Button(self.root, text="Рассчитать стоимость", command=self.calculate)

        # Размещаем элементы на окне
        self.length_label.pack()
        self.length_entry.pack()
        self.width_label.pack()
        self.width_entry.pack()
        self.material_label.pack()
        self.material_combo.pack()
        self.calculate_btn.pack()

    def calculate(self):
        length = float(self.length_entry.get())  # float преобразует число, хранящееся в строке
        width = float(self.width_entry.get())
        material = self.material_combo.get()
        cost = 0

        if material == "Пластик":
            cost = length * width * 100
        elif material == "Алюминий":
            cost = length * width * 200
        elif material == "Соломка":
            cost = length * width * 300
        elif material == "Текстиль":
            cost = length * width * 400

        # Выводим стоимость на экран
        cost_label = tk.Label(self.root, text=f' Стоимость: {cost} рублей')
        cost_label.pack()


app = Galuzy()  # Создаем объект приложения
app.root.mainloop()  # Запускаем главный цикл обработки событий
