const {Superhero, Superpower, Image} = require('../models/index');
const NotFoundError = require('../errors/NotFoundError');

module.exports.createSuperhero = async (req, res, next) => {
    try {
        const {names, body} = req;
        const createHero = await Superhero.create(body, {
            attributes: {
                exclude: ['name']
            }
        });
        if (req.names) {
            for (i = 0; i < name.length; i++) {
                const createSuperPower = await createHero.addPowers(names[i]);
            }
        }
        if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
                const image = await createHero.createImage({imagePath: req.files[i].filename});
            }
        }
        res.status(201).send(createHero);
    } catch (error) {
        next(error);
    }
}

// module.exports.getOneSuperhero = async (req, res, next) => {
//     try {
//         const {params: {heroId}} = req;
//         const hero = await Superhero.findByPk(heroId)
//         if (!hero) {
//            throw new Error('Superhero not found!');
//         }
//         res.status(200).send(hero);
//     } catch (error) {
//         next(error);
//     }
// }

module.exports.getSuperheroWithSuperPowers = async (req, res, next) => {
    try {
        const {params: {heroId}} = req;
        const hero = await Superhero.findByPk(heroId)
        if (!hero) {
           throw new NotFoundError('Superhero not found');
        }
        const allPowers = await hero.getPower();
        res.status(200).send({hero: hero, powers: allPowers});
    } catch (error) {
        next(error);
    }
}

module.exports.getAllSuperheroes = async (req, res, next) => {
    try {
        const allHeroes = await Superhero.findAll({
            ...pagination
        });
        if (allHeroes.length === 0) {
            throw new Error('Superheroes not found!');
        }
        res.status(200).send(allHeroes);
    } catch (error) {
        next(error);
    }
}

module.exports.updateSuperhero = async (req, res, next) => {
    try {
        const {body, params: {heroId}} = req;
        const [rowCount, [updateHero]] = await Superhero.update(body, {
            where: {
                id: heroId
            },
            returning: true
        });
        if (req.names) {
            for (i = 0; i < req.name.length; i++) {
                const addSuperPowers = await updateHero.addPowers(req.names[i]);
            }
        } 
        if (req.files) {
            for (let i = 0; i < req.files.length; i++) {
                const image = await updateHero.createImage({imagePath: req.files[i].filename});
            }
        }
        res.status(200).send(updateHero);
    } catch (error) {
        next(error)
    }
}

module.exports.deleteSuperhero = async (req, res, next) => {
    try {
        const {params: {heroId}} = req;
        const deleteHero = await Superhero.destroy({
            where: {
                id: heroId,
            }
        });
        if (deleteHero) {
            res.status(200).send(deleteHero)
        } else {
            res.status(404).send('Superhero not found')
        }
    } catch (error) {
        next(error)
    }
}
