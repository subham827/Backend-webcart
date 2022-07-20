const express = require('express');
const app = express();
const jwt = require('jsonwebtoken');
const cors = require('cors');
const mongoose = require('mongoose');
const UserCarts = require('./models/userdb');



app.use(cors());
app.use(express.json())
mongoose.connect('mongodb://localhost:27017/Cartofusers');

app.post('/api/register', async (req, res) => {
    
    console.log(req.body);
    try{
          await UserCarts.create(req.body);
          res.json({ status : "ok"})

        
    
        
       
    }
    catch(err){
        console.log(err);
        res.json({ status:'error', error:"Duplicate email"})
    }
})

app.post('/api/login', async (req, res) => {
    try{
        const user = await UserCarts.findOne({email: req.body.email,
            password: req.body.password});
       if(user){
           console.log("ok");
            const token = jwt.sign({email: user.email}, 'secret')
        return res.json({status: 'ok', user: token})
       }
       else{
            console.log("not ok");

        return res.json({status: 'error', user: false})
       }
    }
    catch(err){
        res.send(err);

    }
})

// write a code to copy one array into another
 const arr1 = [1,2,3];
 const arr2 = arr1;
    console.log(arr2);
 


app.get('/api/cart', async (req,res)=>{
    const token = req.headers['x-access-token'];
    try {
        const decoded = jwt.verify(token, 'secret');
        const email = decoded.email;
       const user =   await UserCarts.findOne({email: email});
        return res.json({status: 'ok', cart: user.cart, name: user.name});
    } catch (error) {
        console.log(error);
        return res.json({status: 'error', error:"Invalid token"});
        
    }
})
app.post('/api/acart', async (req,res)=>{
    const token = req.headers['x-access-token'];
    try {
        const decoded = jwt.verify(token, 'secret');
        const email = decoded.email;
        const user = await UserCarts.findOne({email: email});
        user.cart.push(req.body);
        await user.save();
        return res.json({status: 'ok', cart: user.cart});
    } catch (error) {
        console.log(error);
        return res.json({status: 'error', error:"Invalid token"});
        
    }
})
app.delete('/api/dcart', async (req,res)=>{
    const token = req.headers['x-access-token'];
    try {
        const decoded = jwt.verify(token, 'secret');
        const email = decoded.email;
        const user = await UserCarts.findOne({email: email});
        user.cart.splice(user.cart.indexOf(req.body),1);
        
        await user.save();
        return res.json({status: 'ok', cart: user.cart});
    } catch (error) {
        console.log(error);
        return res.json({status: 'error', error:"Invalid token"});
        
    }
}
)



app.listen(8000, () => console.log(`Server running on port 8000`)) 
