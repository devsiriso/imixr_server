const { Pool } = require('pg');

const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    // password: '!21TooMuch',
    port: 5432,
});

const getAllObjects = async (request, response) => {
    const query = `SELECT * FROM objects;`
    
    pool.query(query, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        response.status(200).json(res.rows);
    });
}

const createObject = async (request, response) => {
    const {name, data} = request.body;

    const query = `INSERT INTO objects (name, data) VALUES ('${name}', '${data}');`

    pool.query(query, (err, res) => {
        if(err) {
            console.log(err);
            return;
        }
        response.status(201).send(`Object added`);
    });
}

const deleteAllObjects = async (request, response) => {
    const query = `DELETE FROM objects`;

    pool.query(query, (err, res) => {
        if(err) {
            console.log(err);
            return;
        }
        response.status(201).send(`All objects deleted`);
    })
}

const getAllVideos = async (request, response) => {
    const query = `SELECT * FROM videos;`
    
    pool.query(query, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }

        response.status(200).json({videoLocations: res.rows});
    });
}

const getAllImages = async (response) => {
    const query = `SELECT * FROM images;`
    
    pool.query(query, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
    
        response.status(200).json({imageLocations: res.rows});
    });
}

const getAllDocuments = async (request, response) => {
    const query = `SELECT * FROM documents;`
    
    pool.query(query, (err, res) => {
        if (err) {
            console.log(err);
            return;
        }
        response.status(200).json({documentLocations: res.rows});
    });
}

module.exports = {
    getAllObjects,
    createObject,
    deleteAllObjects,
    getAllVideos,
    getAllImages,
    getAllDocuments,
}
