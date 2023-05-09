const isAdmin = require('../middlewares/isAdmin');
const isLogged = require('../middlewares/isLogged');
const adminRouter = require('./adminRouter');
const apiRouter = require('./apiRouter');
const viewRouter = require('./viewRouters');
const router = require('express').Router();

router.use('', isLogged, viewRouter); // localhost:3000/
router.use('/api', isLogged, apiRouter); // localhost:3000/api
router.use('/admin_panel', isAdmin, adminRouter); // localhost:3000/admin_panel


router.get('/logout', isLogged, (req, res) => {
  res.clearCookie('usr_token');
  res.clearCookie('admin_token');
  res.redirect('/');
});

module.exports = router;  