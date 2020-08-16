const express = require('express')
const router = express.Router()

const db = require('../db')

module.exports = router

//CRUD WITH A DATABASE

router.get('/', async (req, res) => {
    const result = await db.select().table('products')
    res.send(result)
})

//TO TEST THIS, Insert manually

router.get('/:id', async (req, res) => {
    const {id} = req.params
    console.log("id", id)
    const result = await db('products').where({id})
    res.send(result)
})


router.post('/', async (req, res) => {
    const {name, price} = req.body

    if(!name){
        return res.status(400).send("Please have a product name")
    }

    if(!price){
        return res.status(400).send("Please have a produt price")
    }

    const result = await db('products').insert({name, price}).returning('*')
    //Returning = What we return
    res.send(result)
})

router.put('/:id', async (req, res) => {
    const {id} = req.params
    const {name, price} = req.body
    let toUpdate = {}
    if(!name && !price){
        return res.status(400).send("Please have either a name or price change")
    }

    if(name){
        toUpdate.name = name
    }
    if(price){
        toUpdate.price = price
    }


    const updated = await db('products')
        .where('id', '=', id)
        .update(toUpdate)
        .returning('*')
    
    res.send(updated)
})

router.delete('/:id', async (req, res) => {
    const {id} = req.params
    
    const result = await db('products')
        .where('id', '=', id)
        .del()
        .returning('*')
    res.send(result)
    
})