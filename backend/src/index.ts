import { Client } from 'pg'; // SAME AS: const { Client } = require('pg');
// also the same as 
// import pg from 'pg'
// const Client = pg.Client
// destructuring

const start = async () => {

    const client = new Client({
        database:"dinner_time",
        host:"localhost",
        user:"postgres",
        password:"password",
        port:5432,
    })
    await client.connect()
    const res = await client.query('SELECT * FROM meals')
    console.log(res.rows[0].name)
    await client.end()

}


start();

