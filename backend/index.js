import express from 'express'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import path from 'path'


import connectDB from './config/db.js'
import userRoutes from './routes/userRoutes.js'

dotenv.config()
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cookieParser())

// Routes
app.use('/api/v1/users', userRoutes)

const PORT = process.env.PORT || 5555

app.listen(PORT, () => {
    console.log(`server is run http://localhost:${PORT}`)
})