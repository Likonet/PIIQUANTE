const { Model, Schema } = require('mongoose');
const Sauces = require('../models/Sauce');

exports.createSauce = (req, res, next) => {
    console.log(req.body);
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

  exports.feedBackSauce = async (req, res, next) => { 
  try {
  const idSauce =  await Sauces.findOne ({ _id: req.params.id }); // pourquoi await?
  
  switch (req.body.like)
    {
    case 1:
      const filter = { 
        likes: idSauce.likes + 1,
        usersLiked: [...idSauce.usersLiked, req.body.userId]
      }
      const upLike = await idSauce.updateOne(filter);
      console.log(upLike);
      break;

    case -1:
     const filter2 = {
      dislikes: idSauce.dislikes + 1,
      usersDisliked: [...idSauce.usersDisliked, req.body.userId]
     }
     console.log(filter2)
   const downLike = await idSauce.update(filter2);
   break;
   default:
    }   
  }
catch(error){
  return res.status(500).json({error: error.message})
}
return res.status(203).json({message: "sauce à jour"})
  };

  // Clique sur l'un des pouces
  //envoi requête POST qui contient le userId et le like à 1 ou -1
  // Si likes =1 ou -1, mettre à jour la sauce dans la base de donnée 
  // avec like qui passe de 0 à 1
  // Mettre le userId de cette sauce dans le tableau usersLiked / userDisliked.

 
  

  


exports.getAllSauce = (req, res, next) => { // fonction qui est appelé à une requête de l'appli // api/stuff = l'url qui est visé par l'appli front end, un tableau
 
// console.log(Sauces.find());

 Sauces.find() //Lit dans la base les sauces    // methode find mise à dispo par le modèle
    
  .then(sauces => res.status(200).json(sauces)) // récupère le tableau de tous les sauces (then => sauces)??? et renoyer en réponse le tableau reçu depuis la base de donnée
  .catch(error => res.status(400).json({ error }));
};

exports.getOneSauce = (req, res, next) => {
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