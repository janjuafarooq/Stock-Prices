# Stock-Prices

## Installation

### Node
1. Install node from https://nodejs.org/en/

### MongoDB and CSV files

1. Follow the instructions at https://docs.mongodb.com/manual/installation/ to install mongodb locally on your machine
2. Download the three csv files from http://www.nasdaq.com/screening/company-list.aspx and place them in the database folder where the importcsv.sh script is located
3. Run mongodb locally with the command `./mongod` inside of the mongo/bin folder where it was installed. Leave this terminal window running.
4. Run importcsv.sh from your terminal with the command `./importcsv.sh` to add the files to the database (you hay have to run `chmod +x importcsv.sh` to get it to work)

Optional:
I prefer to keep mongodb installed at database/mongo and a separate folder for the data in database/mongo-data.  Then I simply run `./mongo/bin/mongod --dbpath ./mongo-data` from the database folder and all table information is routed into the mongo-data folder. Robomongo is a nice GUI for viewing the information https://robomongo.org/ 

### Backend Server

1. Change directory to the api directory and install node modules by running `cd api && npm install`
2. Start the backend server by running  `npm start` in the api directory. Leave this terminal window running.

### Frontend Server

1. Change directory to the web folder and install node modules by running `cd web && npm install`
2. Start the frontend server by running  `npm start` in the web directory. Leave this terminal window running.
