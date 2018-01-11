'use strict'
var pg = require("pg");

/*
let pool = new pg.Pool({
    host: 'dev-mrtrdb.tac.co.th',
    port: 5432,
    database: 'chkindb_test',
    user: 'chkin_app',
    password: 'dxBhLSTD'
});
*/

let pool = new pg.Pool({
    host: 'localhost',
    port: 10000,
    database: 'postgres',
    user: 'postgres',
    password: '123'
});

var callbackQuery = function(err, result){
    if(err){
        throw err;
    }

    /*
    Calling pool.end will drain the pool of all active clients, disconnect them, and shut down any internal timers in the pool. It is common to call this at the end of a script using the pool or when your process is attempting to shut down cleanly.
    */
    pool.end(() => {
        console.log('pool has ended.')
    })

}

var do_connect = function(err, client, done) {
    try{
        if (err) {
            //likely a connection error that will print to console.
            throw err;
        }
        

        const strSQL = "insert into public.item(name,description) values($1, $2) RETURNING id";
        var query = client.query(strSQL,['item-new-item','Cat and Dog'], callbackQuery);
    }catch(err){
        console.log(err);
    }

    done();
}



try{
    pool.connect(do_connect);

}catch(err){
    console.log(err)
}

