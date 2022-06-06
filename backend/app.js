const express = require('express');// importer express pour pour l'utiliser
const mongoose = require('mongoose');
const app = express();// permet de créer une appli express
app.use(express.json());//intercepte toutes les requêtes qui ont un content type JSON et met à disposition le contenu (le corps body )de la requête sur l'objet requête dans req.body

//const stuffRoutes =  require('./routes/stuff');
const userRoutes = require('./routes/user');
mongoose.connect('mongodb+srv://Manup:Manup973@cluster0.jaess.mongodb.net/?retryWrites=true&w=majority',
{ useNewUrlParser: true,
   useUnifiedTopology: true })
 .then(() => console.log('Connexion à MongoDB réussie !'))
 .catch(() => console.log('Connexion à MongoDB échouée !'));


 app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*' );
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});


app.use('/api/auth', userRoutes);// pour enregistrer les routes
module.exports = app; // exporter l'appli pour être utiliser par les autres fichiers
// t