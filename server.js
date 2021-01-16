//File: index.js
//Date: Jan 15, 2020
//Author: joelcs
//Desc: a simple http web server written in node.js
//ToDo: implement logger, implement config file, implement http response html maker
//can this become https://docs.google.com/document/d/1ZKRywXQLZWOqVOHC4JkF3LqdpO3Llpfk_CkZPR8bjak/edit

const http = require('http');
const path = require('path');
const fs = require('fs');

//for database access
const mongoClient = require('mongodb');

const Logger = require('./logger');

var configObj = require('./config.json');

// //instantiate the logger obj
   const logger = new Logger(configObj.logPath);

    //console logging is okay for now
   logger.on('message', (data) => console.log('Called logger',data));
   //logger.on('message', (data) => fs.appendFile(path.join(__dirname, 'loglog.log')), data);

   logger.log('log log log')

//declare our server
const server = http.createServer((quest, ponse) => {
    
    let filePath = path.join(
        __dirname,
        'public', 
        quest.url == '/' ? 'default.html' : quest.url
    );

    

    //figure out extension for file
    let extname = path.extname(filePath);

    //initial content type
    let contentType = 'text/html';

    switch(extname)
    {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
        case '.json':
            contentType = 'application/json';
            break;
            
            //image types
        case '.png':
            contentType = 'image/png';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.jpeg':
            contentType = 'image/jpg';
            break;
        case '.gif':
            contentType = 'image/gif';
            break;
    }

    //read the file to be served
    //read file
    fs.readFile(filePath, (err, contents) => {
        if (err) {
            //error will have property code
            if (err.code = 'ENOENT') {
                //page not found
                fs.readFile(path.join(__dirname, '/public', '404.html') , (err, contents) =>
                {
                    ponse.writeHead(200, {'Content-Type': 'text/html'});
                    ponse.end(contents, 'utf8');
                })
            } else {
            //some server error
            ponse.writeHead(500);
            ponse.end(`Server Error: ${err.code}`);
        }
    } else {
    //success
    ponse.writeHead(200, {'Content-Type': contentType});
    ponse.end(contents, 'utf8');
    }
    });

});


//checks for sets to either config setting or finds auto
const PORT = configObj.port || process.env.PORT;

server.listen(PORT, () => console.log(`server running on port ${PORT}`));