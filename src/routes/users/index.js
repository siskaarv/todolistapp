const express = require('express')
const {createUser, getsUser, getUser, updateUser, deleteUser} = require('../../resolvers/users')

const router = express.Router()

router.post('/', createUser)
router.get('/', getsUser)
router.get('/:id', getUser)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)

module.exports = router