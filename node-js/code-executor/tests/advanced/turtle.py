import turtle
import sys

sally = turtle.Turtle()

def star(length, color):
    #draw me a star
    sally = turtle.Turtle()
    sally.fillcolor(color)
    sally.begin_fill()

    x = 0
    while x < 5:
        sally.forward(50)
        sally.right(144)
        x = x+1
    sally.end_fill()

def triangle(color):
    sally.fillcolor(color)
    sally.begin_fill()
    x = 0
    while x < 3:
        sally.forward(50)
        sally.right(120)
        x = x+1

    sally.end_fill()

def circle():
    sally.circle(100)
    

input_shape = raw_input("What shape do you want to draw?")
input_length = raw_input("Choose how big your shape should be:")
input_color = raw_input("What color?")
if input_shape == 'triangle':
    triangle(input_color)
elif input_shape == "circle":
    circle()
elif input_shape == "star":
    star(input_length, input_color)



#####if want the students to practice using lists
# inputList = [input_shape, input_length, input_color]
# if inputList[0] == "star":
#   star(inputList[1], inputList[2])
# elif inputList[0] == "triangle":
#   triangle(inputList[2])
# elif inputList[0] == "circle":
#   circle()

turtle.done()