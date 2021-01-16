const fs = require('fs');
const uuid = require('uuid');
const path = require('path');


const { MongoClient } = require('mongodb');

var configObj = require('./config.json');

const credentials = fs.readFileSync(configObj.dbcert);

const client = new MongoClient(configObj.dbconnstr, {
  sslKey: credentials,
  sslCert: credentials
});

// async function run() {
//   try {
//     await client.connect();
//     const database = client.db("testDB");
//     const collection = database.collection("testCol");
//     const docCount = await collection.countDocuments({});
//     console.log(docCount);
//     // perform actions using client
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// run().catch(console.dir);




//name: image
//members: uniqueID, extension
class Img {
    
    //construct an image record
    constructor(imgfile) {
        this.uniqueID = uuid.v4(); //will be _id field on mongoDB
        this.name = imgfile.filename;
        this.extType = imgfile.extension; 
        
        this.path = (path.join(__dirname, '/public/', imgfile));

        // if (publicStatus === true) {
            
        // }
        // else
        // {
        //     //private image handling here
        // }
    }

    //record function, adds it to the database 

    //Create
    //instance is to be made with constructor, but this is "floating", it does not exist anywhere
    async create() {
        try {
            await client.connect();
            const database = client.db("storage");
            const collection = database.collection("images");
            const docCount = await collection.countDocuments({});
            
            collection.insertOne(
                {
                _id: this.uniqueID,
                name: this.name,
                extType: this.extType,
                path: this.path
                },
                function (err, res) {
                    if (err) throw err;
                    //console.log(`image inserted ${this.uniqueID}`);
                    console.log('image inserted');
                });
            //console.log(docCount);
            // perform actions using client
        }
        catch (e) {
            console.error(e);
        }
        finally {
            // Ensures that the client will close when you finish/error
            await client.close();
        }
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

module.exports = Img;