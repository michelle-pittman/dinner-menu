import { Client } from 'pg'; // SAME AS: const { Client } = require('pg');
// also the same as 
// import pg from 'pg'
// const Client = pg.Client
// destructuring

type Meal = {
    id: number,
    name: string,
}

const starts = async () => {

    const client = new Client({
        database: "dinner_time",
        host: "localhost",
        user: "postgres",
        password: "password",
        port: 5432,
    })
    await client.connect()
    const res = await client.query<Meal>('SELECT * FROM meals')
    res.rows.forEach(meal => console.log(meal.name))
    await client.end()

}


starts();

// Require the framework and instantiate it

// ESM
import Fastify from 'fastify'
const fastify = Fastify({
    logger: true
})

fastify.get('/meals', async (request, reply) => {
    return {
        meals: [{
            name: "corn",
            id: 2
        }]
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