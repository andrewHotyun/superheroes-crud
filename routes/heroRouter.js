const {Router} = require('express');
const multer = require('multer');
const path = require('path');
const heroRouter = Router();
const HeroController = require('../controllers/hero.controller');
const {superPower} = require('../middlewares/Superpower');
const {pagination} = require('../middlewares/pagination');


const imagePath = path.resolve(__dirname, '../public/images');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, imagePath)
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}.${file.originalname}`)
    },
})


const upload = multer({storage});


heroRouter.post('/', upload.array('images', 5), superPower, HeroController.createSuperhero);
heroRouter.get('/:heroId', HeroController.getSuperheroWithSuperPowers);
heroRouter.get('/', pagination, HeroController.getAllSuperheroes);
heroRouter.patch('/:heroId',  upload.array('images', 5), superPower, HeroController.updateSuperhero);
heroRouter.delete('/:heroId', HeroController.deleteSuperhero);



module.exports = heroRouter;