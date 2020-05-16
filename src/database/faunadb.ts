import faunadb from 'faunadb';

export function pingClient () {
    const client = new faunadb.Client({secret: process.env.FAUNADB_SERVER_SECRET});
    client.ping().then(msg => console.log(`Ping Result: ${msg}`));
}