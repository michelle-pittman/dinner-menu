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
type GetDatesQuerystring = {
    year: number,
    month: number
}
type AddMealBody = {
    name: string
}
type AddMealToDateBody = {
    date: Date, 
    mealId: number
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

fastify.get<{ Querystring: GetDatesQuerystring, }>('/dates', async (request) => {

    const client = new Client({
        database: "dinner_time",
        host: "localhost",
        user: "postgres",
        password: "password",
        port: 5432,
    })

    const text = `SELECT d.date, m.name 
    FROM dinners AS d
    JOIN meals AS m
        ON d.meal_id = m.id
    WHERE EXTRACT(MONTH FROM d.date) = $1 
    AND EXTRACT(YEAR FROM d.date) = $2;`
    const values = [request.query.month, request.query.year]

    await client.connect()
    const res = await client.query<Date>(text, values)
    return {

        meals: res.rows
    }

})

fastify.post<{ Body: AddMealBody, }>('/meals', async (request, reply) => {

    const client = new Client({
        database: "dinner_time",
        host: "localhost",
        user: "postgres",
        password: "password",
        port: 5432,
    })

    const text = 'INSERT INTO meals (name) VALUES ($1);'

    const values = [request.body.name]

    await client.connect()
    await client.query(text, values)

    reply
    .code(204)

})

fastify.post<{ Body: AddMealToDateBody, }>('/dates', async (request, reply) => {

    const client = new Client({
        database: "dinner_time",
        host: "localhost",
        user: "postgres",
        password: "password",
        port: 5432,
    })

    const text = 'INSERT INTO dinners (date, meal_id) VALUES ($1, $2)'

    const values = [request.body.date, request.body.mealId]

    await client.connect()
    await client.query(text, values)

    reply
    .code(204)

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