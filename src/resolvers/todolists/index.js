const knex = require('../../databases')
const { check, validationResult } = require('express-validator');

module.exports = {
    createTodoList: async (req, res) => {
        const { title, description, user_id } = req.body;
        await check('title').isString().notEmpty().run(req)
        await check('description').isString().notEmpty().run(req)
        const result = validationResult(req)
        if (!result.isEmpty()) return res.status(400).json({errors: result.array()})
        const todolist = await knex('todolists').insert({
            id,
            title,
            description
        })
        if (todolist.length == 0) return res.status(400).json({message: 'Gagal Membuat Todo List'})
        return res.status(200).json({message: 'Sukses Membuat Todo List'})
    },
    getsTodoList: async (req, res) => {
        const todolist = await knex('todolists')
        if (todolist.length == 0) return res.status(404).json({message: 'Todo List Kosong'})
        return res.status(200).json({data: todolist})
    },
    getsTodoListByUser: async (req, res) => {
        const { user_id } = req.params
        const todolist = await knex('todolists').where('user_id', user_id)
        if (todolist.length == 0) return res.status(404).json({message: 'Todo List Kosong'})
        return res.status(200).json({data: todolist})
    },
    getTodoList: async (req, res) => {
        const { id } = req.params
        const todolist = await knex('todolists').where('id', id).first()
        if (!todolist) return res.status(404).json({message: 'Todo List Tidak Ditemukan'})
        return res.status(200).json({data: todolist})
    },
    updateTodoList: async (req, res) => {
        const { id } = req.params
        const { title, description } = req.body
        await check('title').isString().notEmpty().run(req)
        await check('description').isString().notEmpty().run(req)
        const result = validationResult(req)
        if (!result.isEmpty()) return res.status(400).json({errors: result.array()})
        const todolist = await knex('todolists').where('id', id).update({
            title,
            description
        })
        if (todolist.length == 0) return res.status(400).json({message: 'Gagal Update Todo List'})
        return res.status(200).json({message: 'Berhasil Update Todo List'})
    },
    deleteTodoList: async (req, res) => {
        const { id } = req.params
        const todolist = await knex('todolists').where('id', id).del()
        if (todolist.length == 0) return res.status(400).json({message: 'Gagal Menghapus Todo List'})
        return res.status(200).json({message: 'Berhasil Menghapus Todo List'})
    }
}