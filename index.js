const bodyParser = require('body-parser')
const express = require('express')
const connectDB = require('./config/db')
const routes = require('./routes/routes')
const productRoutes = require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')
const userRoutes = require('./routes/userRoutes')
const warrantyRoutes = require('./routes/warrantyRoutes')
const cookieParser = require('cookie-parser')
const app = express()

const port = 3000
app.use(bodyParser.json())
app.use(cookieParser())
connectDB()

app.use(routes)
app.use(productRoutes)
app.use(orderRoutes)
app.use(userRoutes)
app.use(warrantyRoutes)
app.listen(port, () => {
    console.log(`server started to serve http request on port ${port}`)
})