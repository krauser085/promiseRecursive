const express = require('express')
const router = express.Router()
const recursive = require('../module/recursive')

/* GET home page. */
router.get('/', function (req, res, next) {
  let url = 'https://jsonplaceholder.typicode.com/todos/1'
  recursive(url)
    .then(data => {
      console.log(data)
      return data
    })
    .then(result => {
      res.render('index', { title: result })
    })
})
module.exports = router