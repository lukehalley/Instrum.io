
![Logo](https://raw.githubusercontent.com/lukehalley/Instrum.io/master/data/logo.png?token=AFW2_5TtEMDS6r_bnqH62XKp6cokYksUks5aPnbQwA%3D%3D)

### Created by Luke Halley
### Student Number: 20071820
### [Github Respository](https://github.com/lukehalley/Instrum.io)


## Description Of Application
Instrum.io is a modern, material design web application. The use of this web app is allow users to buy and sell musical instrumentals, siumular to websites such as [Beatstars](http://beatstars.com/) and [Airbit](https://airbit.com). 

The landing page can be seen below:

![](https://raw.githubusercontent.com/lukehalley/Instrum.io/master/data/Instrum.png?token=AFW2_yNckI2nc912nZofIVDU7RdYTJblks5aPovTwA%3D%3D)

## Description Of Functionality
### Instrumental Models: 

1. Instrumental - an audio file which has the following fields **(title, owner, uploadDate, genre, tags, price, bpm, plays, purchases, likes)**

2. User - a user of the application which has the following fields **(name, username, password, email, admin (boolean), location, age)**

### Instrumental Routes: 
* **GET** / - instrumental - returns all current instrumentals stored in the database with their associated metadata 

* **GET** / - instrumental/newest - returns all current instrumentals stored in the database with their associated metadata ordered by their upload date

* **GET** / - instrumental/mostliked - returns all current instrumentals stored in the database with their associated metadata ordered by the number of likes they have in decending order

* **GET** / - instrumental/mostpurchased - returns all current instrumentals stored in the database with their associated metadata ordered by the number of purchased they have in decending order

* **GET** / - instruments/:id - return an individual instrumental with associated metadata
 
* **POST** / - instruments - create a new instrumental with provided metadata 

* **PUT** / - instruments/:id/purchases - updates an individual instrumental with provided metadata 

* **PUT** / - instruments/:id/purchases - purchases an instrument, incrementing the "purchases" field 

* **PUT** / - instruments/:id/likes - likes an instrument, incrementing the "likes" field 

* **DELETE** / - instruments/ - deletes all current instrumentals stored in the database 

* **DELETE** / - instruments/:id - delete an individual instrumental by ID

### User Routes: 
 
* **GET** / user - returns all current users stored in the database with their associated metadata 

* **GET** / users/:id - return an individual user with associated metadata 

* **POST** / users - create a new user with provided metadata* PUT / users/:id - updates an individual user with provided metadata 

* **DELETE** / users/ - deletes all current users stored in the database 

* **DELETE** / users/:id - delete an individual user by ID

## Persistence
![](https://upload.wikimedia.org/wikipedia/en/thumb/4/4a/MLab_company_logo.svg/1280px-MLab_company_logo.svg.png)
**MongoDB** & **Mongoose** was used for persistance. **MongoDB** is a free and open-source cross-platform document-oriented database program. **Mongoose** is a **MongoDB** object modeling tool designed to work in an asynchronous environment. All information about all Instruments and Users were stored in the database.

**mLab** was used to store data in the cloud. mLab is a fully managed cloud database service that hosts MongoDB databases. mLab runs on cloud providers Amazon, Google, and Microsoft Azure, and has partnered with platform-as-a-service providers.

## Deployment
![](https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/AmazonWebservices_Logo.svg/2000px-AmazonWebservices_Logo.svg.png)

Instrum.io was deployed using **Amazon Web Services**. Amazon Web Services is a subsidiary of Amazon.com that provides on-demand cloud computing platforms to individuals, companies and governments, on a paid subscription basis with a free-tier option available for 12 months.

Unfortunatly due to this being a paid service the web application isnt currently availble to the access.

## Version Control
![](https://sunlightmedia.org/wp-content/uploads/2017/02/github-bb449e0ffbacbcb7f9c703db85b1cf0b.png)
For version control, Github was used. I broke the development of the application into **stories** and commited to my repository each time a story was completed.

## Developer Experience
I ensured a high standard of developer experience by adding comments into my project's files which explains the functions of the code and its use. I also ensured all commits to GitHub were informitive and easy to understand.

## References
Skeleton code was created by following David Drohans ["Web App Development 2"](https://ddrohan.github.io/wit-wad/) tutorials).

Design of the website was created using [AdminBSBMaterialDesign](https://github.com/gurayyarar/AdminBSBMaterialDesign), a fully responsive and free admin template. It is developed with Bootstrap 3.x Framework and Google Material Design of powers. Note: A small amount off custom CSS was added and edited in order to suit the application.

NPM packages used: [MongoDB](https://www.npmjs.com/package/mongodb), [Mongoose](https://www.npmjs.com/package/mongoose) and [Node](https://www.npmjs.com/package/node)