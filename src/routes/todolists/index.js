const express = require('express')
const {createTodoList, getsTodoList, getsTodoListByUser, getTodoList, updateTodoList, deleteTodoList} = require('../../resolvers/todolists')

const router = express.Router()

router.post('/', createTodoList)
router.get('/', getsTodoList)
router.get('/user/:user_id', getsTodoListByUser)
router.get('/:id', getTodoList)
router.put('/:id', updateTodoList)
router.delete('/:id', deleteTodoList)

module.exports = router