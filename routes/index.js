const express = require('express')
const router = express.Router()

const basic = require('./basic')
const crud = require('./crud')
const products = require('./products')
const payments = require('./payments')

const auth = require('./auth')

router.use("/", basic)
router.use("/crud", crud)
router.use("/products", products)
router.use("/pay", payments)

router.use("/auth", auth)

module.exports = router