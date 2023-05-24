from PIL import Image
from PIL import ImageFilter

name = "bibi.jpg"
with Image.open(name) as img:
    img.load()

img.show()
width, height = img.size

format = img.format

mode = img.mode

print("Width: ", width)
print("Height: ", height)
print("Format: ", format)
print("Mode: ", mode)

fm = "ol.jpg"
with Image.open(fm) as img:
    img.load()

new = img.resize((img.width // 3, img.height // 3))

new.save("ol3x.jpg")

icon = "icon.png"
with Image.open(icon) as img_i:
    img_i.load()

img_i = Image.open(icon)
img_i = img_i.resize((img_i.width // 1, img_i.height // 1))

file = "ol.jpg"
with Image.open(file) as img:
    img.load()

img.paste(img_i, (42, 40), img_i)
img.save("icol.jpg")


fin = ["cand.jpg", "enot.jpg", "kro.jpg", "son.jpg", "bibi.jpg"]
for file in fin:
    with Image.open(file) as i:
        i.load()
        a = i.filter(ImageFilter.CONTOUR)
        a.show()
        a.save("C:\Program Files" + "new" + file )






