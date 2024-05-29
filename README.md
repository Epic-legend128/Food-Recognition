# Food-Recognition
A website that recognises wasted food on your food tray through your camera

## Contents
1. [Prerequisites](#prerequisites)
   - [Setting up Environment Variables](#setting-up-the-environment-variables)
3. [Opening the page](#opening-the-page)

## Prerequisites
To be able to open the page to properly use it, you first need to set up all of the environment variables. Normally you would also need to donwnload all of the node packages using npm but they are already included.

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
All of the variables are there just to connect to the databse apart from the first one. The first can be set to anything you like. The default is 3000. Then the rest are just the environment variables that are needed for the configuration of the database. The last 2 are just 2 different document ids from a collection called "Food" from the database.

## Opening the page
To open the webpage you need to run the server.js file using node and then visit localhost at port 3000. First, open the folder scripts/backend with the terminal by writing `cd scripts/backend`. Then all you need to do is write in the terminal `node server.js`. In the end, you'll have something like this:
```bash
$ cd scripts/backend
$ node server.js
```
