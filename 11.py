def n1():
    class Restaraunt:
        def __init__(self, restaurant_name, cuisine_type):
            self.restaurant_name = restaurant_name
            self.cuisine_type = cuisine_type

        def describe_restaurant(self):
            print(f"Название ресторана - {self.restaurant_name}, Кухня: {self.cuisine_type}")

        def open_restaurant(self):
            print(f"Ресторан *{self.restaurant_name}* открыт")

    new_Restaurant = Restaraunt("Осьминожки", "Греческая")

    new_Restaurant.describe_restaurant()  # Описание ресторана
    new_Restaurant.open_restaurant()  # Открыто/Закрыто


def n2():
    class Restaraunt:
        def __init__(self, restaurant_name, cuisine_type):
            self.restaurant_name = restaurant_name
            self.cuisine_type = cuisine_type

        def describe_restaurant(self):
            print(f"Название ресторана - {self.restaurant_name}, Кухня: {self.cuisine_type}")

        def open_restaurant(self):
            print(f"Ресторан *{self.restaurant_name}* открыт")

    new_Restaurant1 = Restaraunt("Роллики", "Японская")

    new_Restaurant2 = Restaraunt("курасан", "Французская")

    new_Restaurant3 = Restaraunt("тай", "Тайская")\

    new_Restaurant4 = Restaraunt("Макапаста", "Итальянская")

    o = input("Введите интересующую вас кухню: ")

    if o == str(new_Restaurant1.cuisine_type):
        new_Restaurant1.describe_restaurant()
        new_Restaurant1.open_restaurant()
    elif o == str(new_Restaurant2.cuisine_type):
        new_Restaurant2.describe_restaurant()
        new_Restaurant2.open_restaurant()
    elif o == str(new_Restaurant3.cuisine_type):
        new_Restaurant3.describe_restaurant()
        new_Restaurant3.open_restaurant()
    elif o == str(new_Restaurant4.cuisine_type):
        new_Restaurant4.describe_restaurant()
        new_Restaurant4.open_restaurant()
    else:
        print("Такой кухни нет!")


def n3():
    class Restaraunt:
        def __init__(self, restaurant_name, cuisine_type, rating):
            self.restaurant_name = restaurant_name
            self.cuisine_type = cuisine_type
            self.rating = rating

        def describe_restaurant(self):
            print(f"Название ресторана - {self.restaurant_name}, Кухня: {self.cuisine_type}, Рейтинг: {self.rating}")

        def open_restaurant(self):
            print(f"Ресторан *{self.restaurant_name}* открыт")

        def update_rating(self, new_rating):
            self.rating = new_rating
            print(f"Рейтинг ресторана {self.restaurant_name} был обновлен до  {self.rating}.")

    new_Restaurant = Restaraunt("Круказябра", "Французская", 5)

    new_Restaurant.describe_restaurant()  # Описание ресторана
    new_Restaurant.open_restaurant()  # Открыто/Закрыто

    new_Restaurant.new_rating = int(input("Введите вашу оценку: "))
    new_Restaurant.update_rating(new_Restaurant.new_rating)


n1()
n2()
n3()
