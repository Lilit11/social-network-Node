require('dotenv').config()
const bodyParser = require('body-parser')
const express = require('express')
const { registerRouter, loginRouter, profileRouter, userRouter } = require('./routes/user')

const app = express()
const PORT = process.env.PORT

app.use(express.json())

app.use('/register', registerRouter)
app.use('/login', loginRouter)
app.use('/profile', profileRouter)
app.use('/users', userRouter)

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
})
