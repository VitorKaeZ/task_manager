const express = require('express')
const router = express.Router()
const pool = require('../db/database')

//Access body content
router.use(express.urlencoded({extended: true,}))
router.use(express.json())


//GET ROUTES

router.get('/', (req, res) => {
    res.redirect('/home')
})
router.get('/home', (req, res) => {
    res.render('home')
})

router.get('/tasks/insert', (req, res) => {
    res.render('insert')
})

//Select data
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

//Edit data
router.get('/tasks/:id&:taskname', (req, res) => {
    

    const id = req.params.id


    const sql = `SELECT * FROM tasks WHERE id = ${id}`

    pool.query(sql, function (err, data) {
        if(err) {
            console.log(err)
            return
        }

        const task = data[0];
        

        console.log(task)
        
        res.render("edittask", { task } )
        
        
    })
})



//POST ROUTES

//Insert data
router.post('/tasks/add', (req, res) => {

    const taskname = req.body.taskname
    const description = req.body.description
    const completed = 0

    const sql = 'INSERT INTO tasks (??, ??, ??) VALUES (?, ?, ?)'
    const data = ['taskname','description','completed', taskname, description, completed]

    pool.query(sql, data, function (err, data) {
        if(err) {
            console.log(err)
            return
        }
        res.redirect('/tasks')
    })
})

//Update data
router.post('/tasks/update', (req, res) => {
    const id = req.body.id
    const taskname = req.body.taskname
    const description = req.body.description
    const checkcompleted = req.body.checkcompleted
    let completed = false

    console.log(req.body.id)

    if(checkcompleted) {
        completed = true

    } else {
       completed = false

    }

    const sql = 'UPDATE tasks SET ?? = ?, ?? = ?, ?? = ? WHERE ?? = ?'
    const data = ['taskname', taskname,'completed', completed,'description', description, 'id', id ]
    console.log('aqi')

    pool.query(sql, data, function (err, data) {
        if(err) {
            console.log(err)
            return
        }
        console.log('aqi')
        res.redirect('/tasks')
    })

})

//Delete data
router.post('/tasks/delete/:id', (req, res) => {
    const id = req.params.id

    const sql = `DELETE FROM tasks WHERE id = ${id}`

    pool.query(sql, function (err, data) {
        if(err) {
            console.log(err)
            return
        }

        res.redirect('/tasks')

    })

})


module.exports = router

