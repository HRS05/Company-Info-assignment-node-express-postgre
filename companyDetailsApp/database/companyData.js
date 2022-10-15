const {Client} = require("pg");

const client = new Client({
    host : "localhost",
    user : "postgres",
    port : 5432,
    password : "HRS05",
    database : "companydetails"
});

try
{
    client.connect();
}catch(e)
{
    console.log(e.message);
}

module.exports = client;


