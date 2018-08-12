class Dog:
	def __init__(self, color, breed, friendliness, age):
		self.dogColor = color
		self.dogBreed = breed
		self.dogFriendliness = friendliness
		self.dogAge = age

	def bark(self):
		print("Woof Woof")

	def run(self):
		print("I don't want to run")

	def eat(self):
		print("I would love that drumstick")

	def sleep(self):
		print("zzZZZzzZZZZzz good night!")

# Instantiating Dog class objects
pal = Dog("yellow", "golden retriever", 10, 6)
fluff = Dog("brown and yellow", "yorkshire terrier", 10, 6)
choco = Dog("brown", "english mastiff", 10, 6)
snowy = Dog("white", "pomeranian", 8, 13)

# Calling methods in Dog class
snowy.bark()
fluff.sleep()