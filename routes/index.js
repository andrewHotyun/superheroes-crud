const {Router} = require('express');
const heroRouter = require('./heroRouter');



const rootRouter = Router();
rootRouter.use('/superheroes', heroRouter);


module.exports = rootRouter;