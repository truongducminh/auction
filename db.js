var pg = require('pg');
var config = {
    host: 'ec2-23-21-184-181.compute-1.amazonaws.com', // Server hosting the postgres database
    database: 'dlt9dfftqlhqh', //env var: PGDATABASE
    user: 'cxajsfuqeahvtg', //env var: PGUSER
    password: '5a38993b7a2180f51fd75c36f0f2172398e3dfac7ee86fdb7a4761c9179ea80c', //env var: PGPASSWORD
    port: 5432, //env var: PGPORT
    ssl: true,
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
pg.types.setTypeParser(1184, str => str);
var pool = new pg.Pool(config);

function query(sql,params) {
    return new Promise(function(resolve, reject) {
        pool.connect((err, client, done) => {
            if (err)
                return reject(err);
            client.query(sql,params, (err, result) => {
                if (err) reject(err);
                else resolve({ rowCount: result.rowCount, rows: result.rows });
                done();
            });
        })
    });
}

module.exports = {query};
