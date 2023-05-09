const { doRegister, doLogin } = require('../controllers/apiControllers');

const apiRouter = require('express').Router();

apiRouter.post('/registration', doRegister); // localhost:3000/api/registration
apiRouter.post('/login', doLogin);

module.exports = apiRouter;