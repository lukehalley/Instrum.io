![Logo](https://raw.githubusercontent.com/lukehalley/Instrum.io/master/data/logo.png)

### Luke Halley - 2001820
• Persistence approach adopted i.e. what’s persisted and
where.
• Git approach adopted and link to git project / access.
• DX approach adopted.
• References

## Description Of Functionality
Instrum.io is a web application which has two **models**:

1. Instrumental - an audio file which has the following fields **(title, owner, genre, tags, price, bpm, plays, purchases)**

2. User - a user of the application which has the following fields **(name, username, password, email, admin, location, age)**

### Instrumental Routes: 
* POST / - instruments - create a new instrumental with provided metadata 
* GET / - instrumental - returns all current instrumentals stored in the database with their associated metadata 
* GET / - instruments/:id - return an individual instrumental with associated metadata 
* PUT / - instruments/:id - updates an individual instrumental with provided metadata 
* PUT / - instruments/:id/purchases - purchases an instrument, incrementing the "purchases" field 
* DELETE / - instruments/ - deletes all current instrumentals stored in the database 
* DELETE / - instruments/:id - delete an individual instrumental by ID

### User Routes: 
* POST / users - create a new user with provided metadata 
* GET / user - returns all current users stored in the database with their associated metadata 
* GET / users/:id - return an individual user with associated metadata 
* PUT / users/:id - updates an individual user with provided metadata DELETE / users/ - deletes all current users stored in the database 
* DELETE / users/:id - delete an individual user by ID

## Persistence
**MongoDB** & **Mongoose** was used for persistance. **MongoDB** is a free and open-source cross-platform document-oriented database program. **Mongoose** is a **MongoDB** object modeling tool designed to work in an asynchronous environment. All information about all Instruments and Users were stored in the database.