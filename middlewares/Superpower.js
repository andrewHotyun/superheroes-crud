const {Superpower} = require('../models/index');


module.exports.superPower = async(req, res, next) => {
    try {
        const {body: {names}} = req;
        req.names = [];  
        if (names) {     
            const array = names.split(',');
            for (let i = 0; i < (array.length); i++) {
                const superpower = await Superpower.findOne({where: {name: array[i]}});

                if (superpower.length !== 0) {
                    req.names.push(power);                   
                } else { 
                    const power = await Superpower.create({name: array[i]});
                    req.names.push(power);
                }
            }
        }
        next();
    } catch (error) {
        next(error)
    }
}