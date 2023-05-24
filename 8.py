from PIL import Image, ImageDraw, ImageFont

name = "pei.jpg"
with Image.open(name) as img:
    img.load()


width, heigth = img.size
print(img.size)

img = img.crop((0, 0, width, heigth-1250))
img2 = img.save("peiobr.jpg")
img.crop=img.show()

a = {"1": "city.jpg", "2": "peiz.jpg", "3": "run.jpg" }


b = input("выберите праздник:1,2,3? ")
with Image.open(a[b]) as img:
    img.show()


a = {"1": "city.jpg", "2": "peiz.jpg", "3": "run.jpg" }


b = input("выберите праздник:1,2,3? ")
c = input("Напишите Имя того, кого хотите поздравить: ")
with Image.open(a[b]) as img:
    draw = ImageDraw.Draw(img)

    # loading the font and providing the size
    font = ImageFont.truetype("Valisca.ttf",200 )

    # specifying coordinates and colour of text
    draw.text((200, 90), f"{c},Поздравляю!", (255, 255, 255), font=font)

    # saving the image
    img.save('sample.png')
    img.show()