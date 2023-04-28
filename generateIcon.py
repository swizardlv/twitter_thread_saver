from PIL import Image

logo = Image.open("icon_org_0.jpg")
width, height = logo.size

icon_16 = logo.resize((16, 16)) 
icon_48 = logo.resize((48, 48))
icon_128 = logo.resize((128, 128))
icon_16.save("icon16.png")
icon_48.save("icon48.png") 
icon_128.save("icon128.png")
