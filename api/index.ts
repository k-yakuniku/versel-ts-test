import express from 'express';
import { Users } from '../db/Users';

const app = express();
app.use(express.json());

app.get('/api', (req, res) => {
    const user = Users.shift();
    if(user) {
        return res.json(user);
    }
    res.json('undefined');
})

//app.listen(3000, () => console.log('server'));

export default app;