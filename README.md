# nodesigninLogin-fileUplod
This is a  node application for simple user registration and login and file Uploading
steps to work on...

download project...

command npm init in root directory....

run following  in terminal in root directory.are as...
npm install express ejs express-session 

npm install express-ejs-layouts mongoose multer

npm install dotenv
npm install connect-flash
npm install -D nodemon

and then make changes in package.json file as add in "scripts" tag ad that is as....


"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js",
    "dev": "nodemon app.js"
  },
  
  ake sure that you have created .env file and setup your localhost adress and your database url
  
  are as....
  
  PORT = 3000
DB_URI = "mongodb://localhost:27017/your_database_name"
  
  and then run 
  
  npm start
  and check on localhost:3000

