const app = require("express")();
const db = require("./db.json");
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send(200, "Welcome to Docker and Heroku App")
})


app.get("/users", (req, res) => {
    console.log("Request");
    res.send(200, db)
});

app.get("/users/:id", (req, res) => {
    console.log("ID li request.:", req.params.id);
    if (isNaN(req.params.id)) {
        res.send(400, {
            message: "Hatali data"
        })
    } else {

        const user = db.find(item => item.id == req.params.id)
        if (user) {
            res.send(200, user)
        } else {
            res.send(404, {
                message: "Kullanici bulunamadi"
            })
        }

    }
});

app.post("/users", (req, res) => {
    const data = {
        id: new Date().getTime(),
        fullName: req.body.fullName,
        country: req.body.fullName,
        email: req.body.email,
        created_at: new Date()
    }

    db.push(data);
    res.send(data);
});

app.patch("/users/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.send(400, {
            message: "Hatali data"
        })
    } else {

        const user = db.find(item => item.id == req.params.id)
        if (user) {
            Object.keys(req.body).forEach(item => {
                user[key] = req.body[key];
            });
            res.send(201, user);
        } else {
            res.send(404, {
                message: "Kullanici bulunamadi"
            })
        }

    }
});


app.delete("/users/:id", (req, res) => {
    if (isNaN(req.params.id)) {
        res.send(400, {
            message: "Hatali data"
        })
    } else {

        const userIndex = db.findIndex(item => item.id == req.params.id)
        if (userIndex > -1) {
            db.splice(userIndex, 1);
            res.send(201, {
                message: "Kullanici silindi"
            });
        } else {
            res.send(404, {
                message: "Kullanici bulunamadi"
            })
        }

    }
});


app.listen(process.env.PORT || 3000, () => {
    console.log("sunucu ayaga kalkti.");
})
