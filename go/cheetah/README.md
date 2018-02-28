# Golang REST API

> The (Acinonyx jubatus) is a big cat in the subfamily Felinae that inhabits most of Africa and parts of Iran.
> The cheetah can run as fast as 109.4 to 120.7 km/h (68.0 to 75.0 mph), faster than any other land animal.

### This is my 3 years old code. I'll refactor it soon.


### Install dependencies:

    $ brew install gpm
    $ gpm install

### Run server:

    $ go install cheetah
    $ $GOPATH/bin/cheetah

## Usage.

### Login (use auth token from response in your header requests):

    $ http -f --json POST http://localhost:8080/login email=foo@bar.com password=qwerty123

### Response must be something like this:

    {
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE0NTM5ODI5NzcsImlhdCI6MTQ1Mzg5NjU3NywidXNlcklkIjoxfQ.DBkJ6OyQ0u-SxazJGek2jjG1V6-WwQmtC94vH8MjJZY",
        "user": { /* User profile info */ }
    }
    
### Getting user:

    $ http GET http://localhost:8080/user 'Authorization: [YOUR AUTH TOKEN]'
