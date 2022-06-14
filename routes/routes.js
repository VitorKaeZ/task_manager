const express = require('express')
const router = express.Router()
const pool = require('../db/database')

//Access body content
router.use(express.urlencoded({extended: true,}))
router.use(express.json())


//Get Routes
router.get('/', (req, res) => {
    res.redirect('/home')
})
router.get('/home', (req, res) => {
    res.render('home')
})

router.get('/tasks/insert', (req, res) => {
    res.render('insert')
})

router.get('/tasks', (req, res) => {
    const sql = 'SELECT * FROM tasks'

    pool.query(sql, function (err, data) {
        if(err) {
            console.log(err)
            return
        }

        const tasks = data

        res.render('tasks', { tasks })
    })

   
})



//Post routes
router.post('/tasks/add', (req, res) => {
    const taskname = req.body.taskname
    const description = req.body.description
    const completed = 0

    const query = 'INSERT INTO tasks (??, ??, ??) VALUES (?, ?, ?)'
    const data = ['taskname','description','completed', taskname, description, completed]

    pool.query(query, data, function (err) {
        if(err) {
            console.log(err)
            return
        }
        res.redirect('/tasks')
    })
})

module.exports = router