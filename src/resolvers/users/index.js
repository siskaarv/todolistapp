const knex = require('../../databases')
const { check, validationResult } = require('express-validator');

module.exports = {
    createUser: async (req, res) => {
        const { nrp, username } = req.body;
        await check('nrp').isString().notEmpty().isLength({ min: 10, max: 10 }).run(req)
        await check('username').isString().notEmpty().run(req)
        const result = validationResult(req)
        if (!result.isEmpty()) return res.status(400).json({errors: result.array()})
        if (await knex('user').where('nrp', nrp).then(data => data.length) !== 0) return res.status(400).json({message: 'NRP Sudah Ada'})
        const user = await knex('user').insert({
            nrp,
            username
        })
        if (user.length == 0) return res.status(400).json({message: 'Gagal Buat Pengguna'})
        return res.status(200).json({message: 'Berhasil Buat Pengguna'})
    },
    getsUser: async (req, res) => {
        const user = await knex('user')
        if (user.length == 0) return res.status(404).json({message: 'Pengguna Kosong'})
        return res.status(200).json({data: user})
    },
    getUser: async (req, res) => {
        const { id } = req.params
        const user = await knex('user').where('id', id).first()
        if (!user) return res.status(404).json({message: 'Pengguna Tidak Ditemukan'})
        return res.status(200).json({data: user})
    },
    updateUser: async (req, res) => {
        const { id } = req.params
        const { nrp, username } = req.body
        await check('nrp').isString().notEmpty().isLength({ min: 10, max: 10 }).run(req)
        await check('username').isString().notEmpty().run(req)
        const result = validationResult(req)
        if (!result.isEmpty()) return res.status(400).json({errors: result.array()})
        if (await knex('user').where('nrp', nrp).then(data => data.length) > 1) return res.status(400).json({message: 'NRP Sudah Ada'})
        const user = await knex('user').where('id', id).update({
            nrp,
            username
        })
        if (user.length == 0) return res.status(400).json({message: 'Gagal Perbarui Pengguna'})
        return res.status(200).json({message: 'Berhasil Perbarui Pengguna'})
    },
    deleteUser: async (req, res) => {
        const { id } = req.params
        const user = await knex('user').where('id', id).first()
        if (!user) return res.status(404).json({message: 'Pengguna Tidak Ditemukan'})
        const todolist_user = await knex('todolist').where('user_id', user.id).del()
        if (todolist_user.length == 0) return res.status(400).json({message: 'Gagal Hapus Pengguna'})
        const user_delete = await knex('user').where('id', id).del()
        if (user_delete.length == 0) return res.status(400).json({message: 'Gagal Hapus Pengguna'})
        return res.status(200).json({message: 'Berhasil Hapus Pengguna'})
    }
}