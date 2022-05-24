import { Client } from 'pg'; // SAME AS: const { Client } = require('pg');
// also the same as 
// import pg from 'pg'
// const Client = pg.Client
// destructuring

type Meal = {
    id: number,
    name: string,
}

type Date = {
    date: Date,
    name: string
}

// Require the framework and instantiate it

// ESM
import Fastify from 'fastify'
const fastify = Fastify({
    logger: true
})

fastify.get('/meals', async (request, reply) => {

    const client = new Client({
        database: "dinner_time",
        host: "localhost",
        user: "postgres",
        password: "password",
        port: 5432,
    })
    await client.connect()
    const res = await client.query<Meal>('SELECT * FROM meals')
    await client.end()

    return {
        meals: res.rows
    }
    
})

fastify.get('/dates', async (request, reply) => {

    const client = new Client({
        database: "dinner_time",
        host: "localhost",
        user: "postgres",
        password: "password",
        port: 5432,
    })
    await client.connect()
    const res = await client.query<Date>(`SELECT d.date, m.name 
    FROM dinners AS d
    JOIN meals AS m
        ON d.meal_id = m.id
    WHERE EXTRACT(MONTH FROM d.date) = 5 
    AND EXTRACT(YEAR FROM d.date) = 2022;`)
    return {
        meals: res.rows
    }
    
})

const start = async () => {
    try {
        await fastify.listen(3000)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}

start()