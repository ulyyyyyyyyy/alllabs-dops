import tkinter as tk


def n1():
    class Restaurant:
        def __init__(self, name, cuisine_type):
            self.name = name
            self.cuisine_type = cuisine_type

        def describe_restaurant(self):
            print(f" В ресторане {self.name} подается {self.cuisine_type} кухня.")

    class IceCreamStand(Restaurant):
        def __init__(self, name, cuisine_type, flavors):
            super().__init__(name, cuisine_type)
            self.flavors = flavors

        def describe_flavors(self):
            print("Мы можем предложить вам эти вкусы мороженого:")
            for flavor in self.flavors:
                print("*" + flavor + "*")

    ice_cream_stand = IceCreamStand("Вкусно и..", "десертная", ["Ваниль", "Шоколад", "Клубника"])
    ice_cream_stand.describe_restaurant()
    ice_cream_stand.describe_flavors()


def n2():
    class Restaurant:
        def __init__(self, name, cuisine_type, location, workhours):
            self.name = name
            self.cuisine_type = cuisine_type
            self.location = location
            self.workhours = workhours

        def describe_restaurant(self):
            print(f" В ресторане {self.name} подается {self.cuisine_type} кухня.")

    class IceCreamStand(Restaurant):
        def __init__(self, name, cuisine_type, location, workhours, flavors):
            super().__init__(name, cuisine_type, location, workhours)
            self.flavors = flavors

        def display_flavors(self):
            print("Мы можем предложить вам эти вкусы мороженого:")
            for flavor in self.flavors:
                print("* " + flavor + " *")

        def add_flavor(self, flavor):
            if flavor in self.flavors:
                print("Такой вкус уже есть")
            else:
                self.flavors.append(flavor)
                print(f"Вкус мороженого {flavor} был добавлен в меню")
                print("Обновленный список:")
                for flavor in self.flavors:
                    print("*" + flavor + " *")

        def remove_flavor(self, flavor):
            if flavor not in self.flavors:
                print("Такого вкуса у нас и не было")
            else:
                self.flavors.remove(flavor)
                print(f"Вкус мороженого {flavor} был удален из меню")
                print("Обновленный список:")
                for flavor in self.flavors:
                    print("*" + flavor + " *")

        def check_flavor(self, flavor):
            if flavor in self.flavors:
                print(f" Мороженое со вкусом {flavor} доступно.")
            else:
                print(f" Мороженое со вкусом {flavor} недоступно.")

    class Stick(IceCreamStand):
        def __init__(self, name,cuisine_type, location, workhours, flavors, sttype):
            super().__init__(name, cuisine_type, location, workhours, flavors)
            self.sttype = sttype

        def describe_stick_type(self):
            print("Мы можем предложить вам эти виды мороженого:")
            for sttype in self.sttype:
                print("* " + sttype + " *")

    class Soft(IceCreamStand):
        def __init__(self, name, cuisine_type, location, workhours, flavors, softtype):
            super().__init__(name, cuisine_type, location, workhours, flavors)
            self.softtype = softtype

        def describe_soft_type(self):
            print("Мы можем предложить вам эти формы мороженого:")
            for softtype in self.softtype:
                print("* " + softtype + " *")

        def frame(self):
                root = Tk()
                root['bg'] = '#fafafa'
                root.title('Меню вкусов')
                root.geometry('300x250')
                root.resizable(width=False, height=False)

                canvas = Canvas(root, height=250, width=300)
                canvas.pack()

                frame = Frame(root, bg='#ffb876', bd=5)
                frame.place(relx=0.15, rely=0.15, relheight=0.7, relwidth=0.7)

                title = Label(canvas, text='Вкусы мороженого', bg='#fafafa', font=45)

                for i in self.flavors:
                    item = Label(frame, text=i, bg='#ffb876', font=40)
                    item.pack()
                title.pack()

                root.mainloop()

    ice_cream_stand = IceCreamStand("Вкусно и..", "десертная", "Ул.Красная 53", "Пн-Сб 9:00 - 20:00",
                                    ["Ваниль", "Шоколад", "Клубника"])
    ice_cream_stand.describe_restaurant()
    ice_cream_stand.display_flavors()
    ice_cream_stand.add_flavor(input('Введите вкус, чтобы добавить: '))
    ice_cream_stand.remove_flavor(input('Введите вкус, чтобы удалить: '))
    ice_cream_stand.check_flavor(input('Введите вкус, чтобы проверить: '))

    ice_cream_stick = Stick('улыбка', 'десертная', "Ул.Красная 53", "Пн-Сб 9:00 - 20:00", ["Ваниль", "Шоколад", "Клубника"],
                            ["Рожок", "Эскимо", "Лакомка", "Фруктовый лед"])
    ice_cream_stick.describe_restaurant()
    ice_cream_stick.display_flavors()
    ice_cream_stick.describe_stick_type()

    ice_cream_soft = Soft('ЛА-ЛА', 'десертная', "Ул.Красная 53", "Пн-Сб 9:00 - 20:00", ["Ваниль", "Шоколад", "Клубника"],
                          ["Жареное", "Растопленное", "Экстразамороженное", "Обычное-привычное"])
    ice_cream_soft.describe_restaurant()
    ice_cream_soft.display_flavors()
    ice_cream_soft.describe_soft_type()









n1()
n2()


