import random

print """1. You have to press run code if you want to play.
2. The player should guess the number between 1-10.
3. You only have three tries.
"""

answer = random.randint(1, 10)

# Using loops to repeat some code

tries = 3

# While loop
while tries > 0:
    guess = int(raw_input("What is your guess?\n"))

    if guess == answer:
        print "You were correct, you win money!"
        break
    else:
        if guess > answer:
            print "Wrong, guess was too high"
        else:
            print "Wrong, it was to low"

    tries = tries - 1


if tries == 0:
    print "Sorry you lose"
    print "correct answer was" + str(answer)
