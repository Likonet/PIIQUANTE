const { Model, Schema } = require('mongoose');
const Sauces = require('../models/Sauce');

exports.createSauce = (req, res, next) => {
    console.log(req.body.sauce);
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauces({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      .catch(error => res.status(400).json({ error }));
  };

  exports.feedBackSauce = (req, res, next) => { 
  console.log(req.body);
  console.log(req.body.userId);
    const userId = req.body.userId; 

  };


exports.getAllSauce = (req, res, next) => { // fonction qui est appelé à une requête de l'appli // api/stuff = l'url qui est visé par l'appli front end, un tableau
 console.log(Sauces.find());
  Sauces.find() //Lit dans la base les sauces    // methode find mise à dispo par le modèle
    
  .then(sauces => res.status(200).json(sauces)) // récupère le tableau de tous les sauces (then => sauces)??? et renoyer en réponse le tableau reçu depuis la base de donnée
  .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
    console.log('-----------')
    Sauces.findOne ({ _id: req.params.id })  // req.params.id  pour obtenir l'id grâce à l'objet params.id car c'est un paramètre de route dynamique
    .then(sauces => res.status(200).json(sauces))
    .catch(error => res.status(404).json({ error }));
  };

  exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
    {
      ...JSON.parse(req.body.sauce),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body };
  Sauces.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
};


  exports.deleteSauce = (req, res, next) => {
    Sauces.findOne({ _id: req.params.id })
    .then((sauce) => {
        if (!sauce) {
          res.status(404).json({
            error: new Error('No such Sauce!')
          });
        }
        if (sauce.userId !== req.auth.userId) {
          res.status(400).json({
            error: new Error('Unauthorized request!')
          });
        }
        Sauces.deleteOne({ _id: req.params.id }).then(
          () => {
            res.status(200).json({
              message: 'Deleted!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      }
    )
  };