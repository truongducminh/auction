var pg = require('pg');
var config = {
    host: 'localhost', // Server hosting the postgres database
    database: 'DauGia', //env var: PGDATABASE
    user: 'postgres', //env var: PGUSER
    password: '1', //env var: PGPASSWORD
    port: 5432, //env var: PGPORT
    max: 10, // max number of clients in the pool
    idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
pg.types.setTypeParser(1184, str => str);
var pool = new pg.Pool(config);

function query(sql,params) {
    console.log(sql);
    return new Promise(function(resolve, reject) {
        pool.connect((err, client, done) => {
            if (err)
                return reject(err);
            client.query(sql,params, (err, result) => {
                console.log(result.rows);
                if (err)
                    return reject(err);
                return resolve({ rowCount: result.rowCount, rows: result.rows });
            });
        })
    });
}

module.exports = {query};

// query('SELECT username,email FROM "User" WHERE "username"=$1',['minhtd0107'])
// query('INSERT INTO "User"(username,email,registeddate) VALUES($1,$2,$3)',['minhtd','minhtd@gmail.com',moment().format()])
// query('UPDATE "User" SET username=$1 WHERE id=$2',['minh',2])
// query('DELETE FROM "User" WHERE id=$1',[1])
// .then(result => {
//     console.log({ rowCount: result.rowCount, rows: result.rows });
// })
// .catch(err => {
//     console.log(err);
// });
