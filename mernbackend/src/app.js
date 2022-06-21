const express = require("express");
const path = require("path");
const app = express();
require("./db/conn");
const Register = require("./models/data");

const port = process.env.port || 8080;

const static_path = path.join(__dirname, "../public");
const template_path = path.join(__dirname, "../templates/views");

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use(express.static(static_path));
app.set("view engine", "hbs");
app.set("views", template_path);

app.get("/", (req, res) => {
    res.render("index");
});
app.get("/index", (req, res) => {
    res.render("index");
});
app.get("/register", (req, res) => {
    res.render("register");
});
app.get("/About", (req, res) => {
    res.render("About");
});
app.get("/Templates", (req, res) => {
    res.render("Templates");
});
app.get("/Feedback", (req, res) => {
    res.render("Feedback");
});
app.get("/editor", (req, res) => {
    res.render("editor");
});
app.get("/EditorTemplate", (req, res) => {
    res.render("EditorTemplate");
});
app.get("/login", (req, res) => {
    res.render("login");
});

app.post("/register", async (req, res) => {
    try {
        const Password = req.body.Password;
        const cPassword = req.body.ConfirmPassword;

        if(Password === cPassword){
            const userRegister = new Register({
                FullName:req.body.FullName,
                Username:req.body.Username,
                Email:req.body.Email,
                PhoneNumber:req.body.PhoneNumber,
                Password:req.body.Password,
                ConfirmPassword:req.body.ConfirmPassword,
                Gender:req.body.Gender
            })

            const registered = await userRegister.save();
            res.status(201).render("index");

        }else{
            res.send("Passwords Not Maching!");
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

app.post("/login", async (req, res) => {
    try {
        const Email = req.body.Email;
        const Password = req.body.Password;
        
        const UserEmail = await Register.findOne({Email:Email});
        if(UserEmail.Password === Password){
            res.status(201).render("index");
        }else{
            res.send("Incoreect Email or password");
        }
       
    } catch (error) {
        console.log("Invalid Email")
    }
});

app.listen(port, () => {
    console.log(`server is running at port no ${port}`);
})