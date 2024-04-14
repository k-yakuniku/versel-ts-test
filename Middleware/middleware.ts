import LocalStrategy from 'passport-local';
import { PassportStatic } from 'passport';
import { Users, UsersType } from '../db/Users';

const Strategy = LocalStrategy.Strategy;
export const passportInitilize = (passport: PassportStatic) => {
    passport.use(
        'local',
        new Strategy({
            usernameField: 'email',
            passwordField: 'password',
        }, async(email, password, done) => {
            const user = Users.find((v) => v.email === email && v.password === password);
            if(!user) {
                done(null, false, {message: 'Failed'});
            } else {
                done(null, user);
            }
        })
    )
    passport.serializeUser(
        (
            user: any,
            done: (e: Error|null, email: string) => void,
        ) => {
            done(null, user.email);
        })
    passport.deserializeUser(
        (
            email: string,
            done: (e: Error|null, user: UsersType|null) => void,
        ) => {
            const user = Users.find((v) => v.email === email);
            if(user) {
                done(null, user);
            } else {
                done(null, null);
            }
        }
    )
}