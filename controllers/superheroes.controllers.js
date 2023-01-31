const {Superhero, Superpower, Image} = require('../models/index')

module.exports.createSuperhero = async (req, res, next) => {
    try {
        const {name, body} = req;
        const createHero = await Superhero.create(body, {
            attributes: {
                exclude: ['name']
            }
        });
        
        res.status(201).send(result);
    } catch (error) {
        next(error);
    }
}

module.exports.getOneSuperhero = async (req, res, next) => {
    try {
        const {params: {heroId}} = req;
        const hero = await Superhero.findByPk(heroId)
        if (!hero) {
           throw new Error('Superhero not found!');
        }
        res.status(404).send(hero);
    } catch (error) {
        next(error);
    }
}

module.exports.getAllSuperheroes = async (req, res, next) => {
    try {
        const allHeroes = await Superhero.findAll();
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
        const [rowCount, [updated]] = await Superhero.update(body, {
            where: {
                id: userId
            },
            returning: true
        });
        res.status(200).send(updated);
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
            res.status(404)
        }
    } catch (error) {
        next(error)
    }
}

module.exports.addImageHero = async (req, res, next) => {
    try {
        const {params: {heroId}, file: {filename}} = req;
        const [rowCount, [updateHero]] = await Superhero.update({imagePath: filename}, {
            where: {
                id: heroId
            },
            returning: true
        });
        res.status(200).send(updateHero);
    } catch (error) {
        next(error);
    }
}