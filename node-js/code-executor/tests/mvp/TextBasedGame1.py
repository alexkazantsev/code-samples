# New library: System allows you to exit the code manually (This is only really useful once we incorporate functions) 

# Step 0: Import all modules
import random
from sys import exit

# Step 1: Welcome message
print "Welcome to Kroz!"

# Step 2: Tell the user where they are
print "There are 2 doors in front of you."
print "Do you want to enter door 1 or 2?"

# Step 3: Take the user's choice
door = raw_input("> ")


# Step 4: Logic for first choice
# If door 1: you are in a ghost house
# If they choose door 2: you are in a house that has everything
if door == "1":
        print "You are in a house with Emperor Palpatine"
        print "Which direction would you like to escape"
        print "The options are East, West, North and South"
        
        direction = raw_input("> ")
        
        if direction.lower() == "west":
            print "YOU ESCAPED!"
            exit(0)
        else:
            print "Palpatine won but you lost!"
            exit(0)
    
        
        
elif door == "2":
    print "You are in a house with Big bear"
    print "The big bear is attacking you!"
 
    print "Bear has %s health points left" %bear_hp
    attack = raw_input("Do you want to attack the Big bear?\n>")

    if attack.lower() == "yes":
        dice = random.randint(1,8)
        if dice > 4:
            print "You defeated the Big bear, you win!"
        else:
            print "You die"
            exit(0)
    else:
        print "You die"
        exit(0)
