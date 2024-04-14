import express from 'express';
import dotenv from 'dotenv';
import { Users, UsersType } from '../../db/Users';

const app = express();
app.use(express.json());


app.get('/api/user', (req, res) => {
    if(Users) {
        return res.json(Users);
    }
    res.json('undefined');
})
app.post('/api/user', (req, res) => {
    const { email, password } = req.body;
    const user = Users.find((v) => v.email === email);
    if(user) {
        return res.status(400).json('Exist_User');
    } else {
        const newUser: UsersType = {
            id: String(Math.round(Math.random() * 1000)),
            email, password,
        }
        Users.push(newUser);
        return res.status(200).json(newUser);
    }
});
app.patch('/api/user', (req, res) => {
    const { email, password, name } = req.body;
    const user = Users.find((v) => v.email === email && v.password === password);
    if(user) {
        user.name = name;
        return res.status(200).json(user);
    } else {
        return res.status(400).json('Failed')
    }

});
app.delete('/api/user', (req, res) => {
    const { email, password } = req.body;
    const index = Users.findIndex((v) => v.email === email && v.password === password);
    if(index) {
        const user = Users.splice(index, 1);
        return res.status(200).json(user);
    } else {
        return res.status(400).json('Failed');
    }    
});