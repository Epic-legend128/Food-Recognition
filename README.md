# Food-Recognition
A website that recognises wasted food on your food tray through your camera.

## Contents
1. [Purpose](#purpose)
2. [Tools Used](#tools-used)
3. [Prerequisites](#prerequisites)
   - [Setting up Environment Variables](#setting-up-environment-variables)
   - [Downloading Node Packages](#downloading-node-packages)
4. [Opening the page](#opening-the-page)
5. [Problems](#problems)

## Purpose
The purpose of this website is to track the amount of food wasted at the canteen of a place. In our case, it is the school canteen that we want to track the food waste of. The way this works is simple. First, you navigate to the "Food Recognition" page of the site, then click the "open camera" button and then analyze the image shown. The page will refresh and it will show you the foods you wasted from the tray. Meanwhile, this data is sent to a database in Firebase Firestore which stores all of the data in different categories so that they can be analysed better. The dataset for training the model was collected by our team and then trained using Pytorch.

## Tools Used
We used multiple tools and programming languages for the creation of this project.
For the webpage, we made use of:
- Javascript
- Node.js
- EJS
- CSS
- jQuery
- HTML(Started off with HTML and then switched to EJS)

For the training of the model we used Python and more specifically Pytorch. The dataset of images was collected by our team and they were annotated using [labelImg](https://github.com/HumanSignal/labelImg#). <br>
From Node we utilised the following packages:
- express
- ejs
- dotenv
- firebase
- path
- url
- onnxruntime-node


## Prerequisites
To be able to open the page to properly use it, you first need to set up all of the environment variables. You also need to download all of the node packages using npm.

### Setting up Environment Variables
The environment variables are needed to secure certain data. Go to the directory scripts/backend and create a .env file. There you need to save the following variables:
```
PORT=
API_KEY=
AUTH_DOMAIN=
PROJECT_ID=
STORAGE_BUCKET=
MESSAGING_SENDER_ID=
APP_ID=
MEASUREMENT_ID=
TOTAL_WASTE=
CASE_FOOD=
```
All of the variables are there just to connect to the database apart from the first one. The first can be set to anything you like. The default is 3000. Then the rest are just the environment variables that are needed for the configuration of the database. The last 2 are just 2 different document IDs from a collection called "Food" from the database.

### Downloading Node Packages
To download all of the necessary packages run the following command in the terminal while in the scripts/backend directory:
```bash
$ npm install dotenv ejs express firebase onnxruntime-node path url
```

## Opening the page
To open the webpage you need to run the server.js file using node and then visit localhost at port 3000. First, open the folder scripts/backend with the terminal by writing `cd scripts/backend`. Then all you need to do is write in the terminal `node server.js`. In the end, you'll have something like this:
```bash
$ cd scripts/backend
$ node server.js
```
You can also use nodemon to run the page if you are planning on tinkering with the code.

## Problems
The final product is actually pretty nice, apart from the model used. The model which we used was trained on our own data, and it was therefore difficult to collect enough, reliable and good quality data for our purposes so we had to limit ourselves to only green apples, bread and pasta with tomato sauce. The model does not work with anything else, and its accuracy with just these few things is actually not very good. Initially, we were thinking of using a pre-trained model, but we also wanted the quantity of food which a pre-trained model would not provide us with, so we were forced to train our own model on different amounts of bread, pasta with tomato sauce and green apples.
