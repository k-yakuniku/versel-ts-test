import express from 'express';
import dotenv from 'dotenv';
import { passportInitilize } from '../../../Middleware/middleware'
import passport from 'passport';
import session from 'express-session';

const app = express();
app.use(express.json());

app.use(
    session({
      secret: process.env.SESSION_SECRET_KEY!,
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: false,
        httpOnly: false,
        domain: process.env.SESSION_DOMAIN,
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
      },
    })
  );
app.use(passport.initialize());
app.use(passport.session());

app.post('/api/auth/login', passport.authenticate('local'),
    (req, res) => {
        const user = req.user;
        console.log(user);
        if(user) {
            return res.status(200).json(user);
        } else {
            res.status(400).json('Not_Session');
        }
    })
app.post('/api/auth/logout', passport.authenticate('local'),
(req, res) => {
    req.logout((e) => { console.log(e)});
})
app.get('/api/auth/cheker', (req, res) => {
    res.json(req.user);
})

passportInitilize(passport);

export default app;