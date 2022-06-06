const express = require('express'); // express pour la création d'un routeur
const router = express.Router();
const userCtrl = require ('../controllers/user'); // assoscié les fonctions aux différentes routes

router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);

module.exports = router; // expor
