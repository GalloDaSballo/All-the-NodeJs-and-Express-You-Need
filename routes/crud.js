const express = require('express')
const router = express.Router()

module.exports = router

/**
 * Utility function used to generate new list item
 * @param {String} title 
 */
const createItem = (title) => ({
    id: idCounter++,
    title
})

let idCounter = 1

const items = [
    createItem("Initial Item just for Debug")
]
//We will continue with just the JSON stuff, 
//Because JSON is how you build APIs in a microservice oriented fashio

//MIcroservice means that you build a routerlication (a service) that does one thin

router.get('/', (req, res) => {
  res.send(items)
})

router.post('/', (req, res) => {
    const {text} = req.body
    if(!text){
        res.status(400).send("Please add send a body with text")
    }
    const newItem = createItem(req.body.text)
    items.push(newItem)

    res.send(newItem)
})

router.get('/:id', (req, res) => {
  const {id} = req.params
  const found = items.find((el) => el.id === id)
  if(found){
    res.send(found)
  } else {
    res.status(404).send("No item with such id")
  }
})

router.delete('/:id', (req, res) => {
  const {id} = req.params
  const index = items.findIndex((el) => el.id === id)
  if(index > -1){
    const copy = {...items[index]}
    //delete 
    items.splice(index, 1)
    res.send(copy)
  } else {
    res.status(404).send("No item with such id")
  }
})

router.put('/:id', (req, res) => {
  const {id} = req.params
  const {text} = req.body

  if(!text){
    res.status(400).send("Please add send a body with text")
  }
  const index = items.findIndex((el) => el.id === id)
  if(index > -1){
    const newItem = createItem(text)
    items.splice(index, 1, newItem)
    res.send(items[index])
  } else {
    res.status(404).send("No item with such id")
  }
})