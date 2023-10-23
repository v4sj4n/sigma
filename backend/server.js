const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const fs = require("fs")
const path = require("path")


const session = require("express-session")


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
)

app.use(
  session({ secret: "halaMadrid", resave: true, saveUninitialized: true })
)
app.use(cookieParser("halaMadrid"))

app.use("/api/authentication", require("./routes/api/authentication"))
app.use("/api/user", require("./routes/api/user"))


// Files
app.get("/files/*", (req, res) => {
  // Capture the entire path after /files/
  const filePath = path.join(__dirname, "files", req.params[0])
  console.log(req.params)
  console.log(filePath)

  // Check if the file exists
  fs.stat(filePath, (err, stats) => {
    if (err) {
      res.status(404).send("File not found")
    } else {
      res.sendFile(filePath)
    }
  })
})


const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`)
})
