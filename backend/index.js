require("dotenv").config()
const express=require("express");
const {userModel}=require("./models");
const {  Keypair, Transaction, Connection } = require("@solana/web3.js");
const jwt=require("jsonwebtoken");
const bs58=require('bs58')
const cors=require("cors")

const app=express();
app.use(express.json())
app.use(cors())

const jwt_secret=process.env.JWT_SECRET;
const port=process.env.PORT;

const connection=new Connection("https://solana-devnet.g.alchemy.com")

app.post("/api/v1/signup", async(res, req)=>{
    const username=req.body.username;
    const password=req.body.password;

    await userModel.create({
        username, 
        password,
        publicKey: Keypair.publicKey.toString(),
        privateKey: Keypair.fromSecretKey.toString()
    })
    res.json({
        message: publicKey
    })
})

app.post("/api/v1/signin", async(res, req)=>{    
    const username= req.body.username;
    const password=req.body.password;

    const user=await userModel.findOne({
        username: username,
        password: password
    })
    if (user){
        const token=jwt.sign({
            id: user
        }, jwt_secret);
        res.json({
            message: token
        })
    }else{
        res.statusCode(403).json({
            message: "Invalid credentials"
        })
    }
    res.json({
        message: "Sign In"
    })
})

app.post("/api/v1/txn/sign", async(res, req)=>{
    const serializedTransaction=req.body.message;

    // const user=await userModel.findOne({
    //     where:{
    //         _id_:""
    //     }
    // })
    // const privateKey=user.privateKey
    txn.sign(keypair)

    const txn=Transaction.from(Buffer.from(serializedTransaction))
    const keypair=Keypair.fromSecretKey(bs58.default.decode(process.env.PRIVATE_KEY))

    txn.sign(keypair);
    await connection.sendTransaction(txn)
    res.json({
        message: "Sign Up"
    })
})

app.post("/api/v1/txn/", (res, req)=>{
    res.json({
        message: "Sign Up"
    })
})

app.listen(`Server is running on port ${port}`);