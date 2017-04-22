# Stock-Prices

## Installation

### MongoDB and CSV files

1. Follow the instructions at https://docs.mongodb.com/manual/installation/ to install mongodb locally on your machine
2. Download the three csv files from http://www.nasdaq.com/screening/company-list.aspx and place them in the database folder where the importcsv.sh script is located
3. Run mongodb locally with the command ./mongod inside of the mongo/bin folder where it was installed. Leave this terminal window running.
4. Run importcsv.sh from your terminal to add the files to the database (you hay have to run 'chmod +x importcsv.sh' to get it to work)

### Backend Server

1. Change directory to the api directory and install node modules by running `cd api && npm install`
2. Start the backend server by running  `npm start` in the api directory

### Frontend Server

1. Change directory to the web folder and install node modules by running `cd web && npm install`
2. Start the frontend server by running  `npm start` in the web directory