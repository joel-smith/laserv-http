const uuid = require('uuid');
const path = require('path');


//name: image
//members: uniqueID, extension
class Image {
    
    //construct an image record
    constructor(imgfile, public) {
        this.uniqueID = uuid.v4(); //will be _id field on mongoDB
        this.name = imgfile.filename;
        this.extType = imgfile.extension; 
        
        if (public === true) {
            this.path = (path.join(__dirname, '/public/', this.uniqueID, this.extType));
        }
        else
        {
            //private image handling here
        }
    }

    //record function, adds it to the database 

    //Create
    //instance is to be made with constructor, but this is "floating", it does not exist anywhere
    create(database) {

    }

    //Retrieve
    retrieve(database) {

    }

    //Update
    update(database) {

    }

    //Delete
    delete(database)
    {

    }

}