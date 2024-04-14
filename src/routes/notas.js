const express = require('express');
const NotasController = require('../controllers/NotasController');
const LoginController = require('../controllers/LoginController')
const router = express.Router();

router.get('/notas', NotasController.indexnotas);
router.get('/crear', NotasController.crear);
router.post('/crear', NotasController.store);
router.post('/notas/delete', NotasController.destroy);
router.get('/notas/edit/:id', NotasController.edit);
router.post('/notas/edit/:id', NotasController.update);

module.exports = router;