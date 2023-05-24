import tkinter as tk
from tkinter import ttk


class Photo:
    def __init__(self):

        # Создаем главное окно
        self.root = tk.Tk()
        self.root.geometry("300x200")
        self.root.title("Жалюзи")

        # Создаем элементы интерфейса
        self.format_label = tk.Label(self.root, text="Формат:")
        self.quality_label = tk.Label(self.root, text="Количество фото:")
        self.quality_entry = tk.Entry(self.root, width=10)
        self.format_rb = ttk.Radiobutton(self.root, text="9x12", value=1)
        self.format1_rb = ttk.Radiobutton(self.root, text="10x15", value=2)
        self.format2_rb = ttk.Radiobutton(self.root, text="18x24", value=3)
        self.calculate_btn = tk.Button(self.root, text="ОК", command=self.calculate)

        # Размещаем элементы на окне
        self.quality_label.pack()
        self.quality_entry.pack()
        self.format_label.pack()
        self.format_rb.pack()
        self.format1_rb.pack()
        self.format2_rb.pack()
        self.calculate_btn.pack()

    def calculate(self):
        quality = float(self.quality_entry.get())  # float преобразует число, хранящееся в строке
        format = self.format_rb
        format1 = self.format1_rb
        format2 = self.format2_rb
        cost = 0
        if format:
            cost = quality * 10
        elif format1:
            cost = quality * 20
        elif format2:
            cost = quality * 30

        # Выводим стоимость на экран
        cost_label = tk.Label(self.root, text=f' Стоимость: {cost} рублей')
        cost_label.pack()


app = Photo()  # Создаем объект приложения
app.root.mainloop()  # Запускаем главный цикл обработки событий