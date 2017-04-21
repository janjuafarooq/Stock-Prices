# Stock-Prices

### Installation

1. First install the webpack-dev-server by running `npm install -g webpack webpack-dev-server`
2. Change directory to the api directory and install node modules by running `cd api && npm install`
3. Open a new terminal window/tab and run `cd web && npm install`

### Running the Application

1. Start the backend server by running  `npm start` in the api directory
2. In your second terminal window launch the frontend by running `npm start` in the web directory

### NOTE
May need to modify webpack.config.js and webpack.tests.config.js files if you are not seeing chrome launch automatically:

```javascript
plugins: [
    new OpenBrowserPlugin({ 
        url: 'http://' + host + ':' + port ,
        browser: 'chrome'
    })
],
```

The browser field is optional, delete it to use your default browser