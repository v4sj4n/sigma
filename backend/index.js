const express = require("express")
const cors = require("cors")

const app = express()

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use("/api/authentication", require("./routes/api/authentication"))
const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`)
})
