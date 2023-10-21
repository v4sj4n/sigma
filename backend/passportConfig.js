const bcrypt = require("bcrypt")
const prisma = require("./db/prisma")
const localStrategy = require("passport-local").Strategy

module.exports = function (passport) {
  passport.use(
    new localStrategy(async (email, password, done) => {
      const user = await prisma.user.findUnique({ where: { email: email } })

      if (!user) {
        return done(null, false, { message: "Incorrect username" })
      }

      const passwordMatch = await bcrypt.compare(password, user.password)

      if (passwordMatch) {
        return done(null, user)
      } else {
        return done(null, false, { message: "Incorrect password" })
      }
    })
  )

  passport.serializeUser((user, cb) => {
    cb(null, user.id)
  })

  passport.deserializeUser(async (id, cb) => {
    const user = await prisma.user.findUnique({ where: { id: id } })
    const userInfo = {
      email: user.email,
    }
    cb(null, userInfo)
  })
}
