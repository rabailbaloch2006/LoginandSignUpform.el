const express=require("express")
const app=express()
const path=require("path")
const port = 3000;

//const hbs=require("hbs")
const collection=require("./mongodb")

const templatePath=path.join(__dirname,'../tempelates')

app.use(express.json())
app.set("view engine", "hbs")
app.set("views", templatePath)
app.use(express.urlencoded({extended:false}))

app.get("/",(req, res)=>{
    res.render("login")
})
app.get("/signup", (req, res)=>{
    res.render("signup")
})

app.post("/signup",async (req, res)=>{

const data={

    name: req.body.name, 
    password: req.body.password,
}


const checking = await collection.findOne({ name: req.body.name })

   try{
    if (checking.name === req.body.name && checking.password===req.body.password) {
        res.send("user details already exists")
    }
    else{
        await collection.insertMany([data])
    }
   }
   catch{
    res.send("wrong inputs")
   }

    res.status(201).render("home", {
        naming: req.body.name
    })
})




app.post('/login', async (req, res) => {

    

    try {
        const check = await collection.findOne({ name: req.body.name })
        
        if (check.password === req.body.password) {
                    res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
                }
        
        else {
                    res.send("incorrect password")
                }
        
        
            } 
            
    catch (e) {
        
        res.send("wrong details")
                
        
            }
        
        
        
        


})



app.listen(3000,()=>{
    console.log("port connected");
})