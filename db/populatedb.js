require("dotenv").config();
const prisma = require("./prisma");

async function name(params) {
  
}


async function main() {
  console.log("seeding...");
  const client = new PrismaClient({
    connectionString: process.env.DATABASE_URL,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();