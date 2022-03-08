import { Client } from 'pg'; // SAME AS: const { Client } = require('pg');
// also the same as 
// import pg from 'pg'
// const Client = pg.Client
// destructuring

type Meal = {
    id: number,
    name: string,
}

const start = async () => {

    const client = new Client({
        database:"dinner_time",
        host:"localhost",
        user:"postgres",
        password:"password",
        port:5432,
    })
    await client.connect()
    const res = await client.query<Meal>('SELECT * FROM meals')
    res.rows.forEach(meal => console.log(meal.id))
    await client.end()

}


start();

