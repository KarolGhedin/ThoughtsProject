import express from 'express';
import exphbs from 'express-handlebars';
import { createRequire } from 'module';
import session from 'express-session';
//import FileStore from 'session-file-store';
import flash from 'express-flash';

const require = createRequire(import.meta.url);
const FileStore = require('session-file-store')(session   )
const app = express()

import conn from './db/conn.js'

//Models
import Thought from './models/thoughts.js';
import User from './models/user.js';

//Import Routes
import thoughtsRoutes from './routes/thoughtsRoutes.js';
import authRoutes from './routes/authRoutes.js';

//Import Controller
import ThoughtsController from './controllers/ThoughtsController.js';
import AuthController from './controllers/AuthController.js';

//template engine
app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

//resposta do body
app.use(
    express.urlencoded({
        extended:true
    })
)

//session middleware
app.use(
  session({
    name:"session",
    secret: "nosso_secret",
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
        lgFn: function() {},
        path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),
    cookie: {
        secure: false,
        maxAge: 360000,
        expires: new Date(Date.now() + 360000),
        httpOnly: true
    }
  })
)

//flash messages
app.use(flash())

//public path
app.use(express.static('public'))

//set session to res
app.use((req, res, next) => {

    if(req.session.userid) {
        res.locals.session = req.session
    }

    next()
})

//Routes
app.use('/thoughts', thoughtsRoutes)
app.use('/', authRoutes)

app.get('/', ThoughtsController.showThoughts)

//.sync({force : true})
conn.sync()
.then(() => {
    app.listen(3000)
})
.catch((err) => console.log(err));