const db = require("./db.js")

const tryDb = async () => {
  try {
    const result = await db.query("SELECT * from users")
    console.log(result.rows)
  } catch (error) {
    console.error("Error executing query:", error)
  }
}

tryDb()