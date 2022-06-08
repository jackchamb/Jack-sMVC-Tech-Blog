const express = require('express');
const sequelize = require('../config/connection');
const helpers = require('../helpers/helpers');
const routes = require('../controllers/routes');
const path = require('path');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const exphbs = require('express-handlebars');

require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 3000;

const sText = {
    secret: 'secretText',
    cookie: { maxAge: 60000 },
    resave: false,
    saveUninitialized: true, 
    store: new SequelizeStore({
        db: sequelize,
    })
};

const handlebars = exphbs.create({ helpers });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session(sText));
app.use(routes);
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
});