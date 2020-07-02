"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const sqlite3 = require('sqlite3').verbose();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const SECRET_KEY = "secretkey23456";

const app = express();
const router = express.Router();
app.use(cors())

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
const database = new sqlite3.Database("./my.db");

const faculties = [
    "Engineering in Computer Science",
    "Ingegneria dell'Informazione",
    "Giurisprudenza",
    "Economia",
    "Economia aziendale",
    "Ingegneria Meccanica",
    "Ingegneria Civile ed Industrale",
    "Ingegneria Ambientale",
    "Psicologia",
    "Lettere",
    "Medicina",
    "Chimica",
    "Fisica",
    "Matematica",
    "Scienze della Formazione",
    "Scienze Statistiche",
    "Scienze Politiche",
    "Lingua Letteratura e Culture Straniere",
    "Graphics Design",
    "Storia dell'arte",
    "Scienze delle Comunicazioni",
    "Biologia"
];

const places = [
    {
        id: 0,
        name: "Student's Secretariat",
        building: "S.P.V. (San Pietro In Vincoli)",
        street: "Via Eudossiana 18",
        type: "secretariat",
        news: [
            {
                description: "The slot scheduled for today has been delayed to tomorrow.",
                ts: new Date().toTimeString().split(" ")[0].split(":")[0] + ":" + new Date().toTimeString().split(" ")[0].split(":")[1]
            },
            
            {
                description: "The slot scheduled for today has been delayed for one hour.",
                ts: new Date(new Date().setHours(12)).toTimeString().split(" ")[0].split(":")[0] + ":" + new Date().toTimeString().split(" ")[0].split(":")[1]
            }
        ],
        status: 0
    },
    {
        id: 1,
        name: "De Lollis ",
        building: "D.I.A.G. (Dipartimento Ingegneria Automatica e Gestionale)",
        street: "Via Ariosto 18",
        status: 1,
        people: "10 - 20",
        time: "30 - 60",
        type: "office hours",
        news: [],
        hour: "16:00-18:00"
    },
    {
        id: 2,
        name: "De Lollis",
        status: 1,
        people: "< 10",
        time: "10 - 30",
        street: "Via Cesare De Lollis 24",
        building: "Ex-Poste",
        type: "canteen",
        news: [],
        hour: "11:30-15:00"
    },
    {
        id: 3,
        name: "Rossi Correction",
        building: "Ex Poste (Room A 31)",
        street: "Via dello Scalo San Lorenzo",
        type: "office hours",
        news: [
            {
                description: "The correction has been delayed to next week.",
                ts: new Date().toTimeString().split(" ")[0].split(":")[0] + ":" + new Date().toTimeString().split(" ")[0].split(":")[1]
            }
        ],
        status: 0
    },
];

var universities = {
    "Sapienza": {
        faculties: faculties,
        places: places
    },
    "RomaTre": {
        faculties: faculties,
        places: places
    },

    "Tor Vergata": {
        faculties: faculties,
        places: places
    },
    "Politecnico di Milano": {
        faculties: faculties,
        places: places
    },

    "Politecnico di Torino": {
        faculties: faculties,
        places: places
    },
    "Università degli studi dell'Aquila": {
        faculties: faculties,
        places: places
    },
    "Università degli studi di Siena": {
        faculties: faculties,
        places: places
    },
    "Università degli studi di Perugia": {
        faculties: faculties,
        places: places
    },
    "Università degli studi Milano Bicocca": {
        faculties: faculties,
        places: places
    },
    "University of Fine Arts": {
        faculties: faculties,
        places: places
    },
    "UniMi": {
        faculties: faculties,
        places: places
    },
    "UniBas": {
        faculties: faculties,
        places: places
    }
}

const createUsersTable = () => {
    const sqlQuery = `
        CREATE TABLE IF NOT EXISTS users (
        id integer PRIMARY KEY,
        name text,
        surname text,
        birthdate text,
        university text,
        faculty text,
        email text UNIQUE,
        password text)`;

    return database.run(sqlQuery);
}

const findUserByEmail = (email, cb) => {
    return database.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
        cb(err, row)
    });
}

const createUser = (user, cb) => {
    return database.run('INSERT INTO users (name, surname, email, birthdate, university, faculty, password) VALUES (?,?,?,?,?,?,?)', user, (err) => {
        cb(err)
    });
}

const createGoogleUser = (user, cb) => {
    return database.run('INSERT INTO users (name, surname, email) VALUES (?,?,?)', user, (err) => {
        cb(err)
    });
}

const updateGoogleUser = (user, cb) => {
    return database.run('UPDATE users SET university = ?, faculty = ? WHERE email = ?', user, (err) => {
        cb(err)
    });
}

createUsersTable();

router.get('/', (req, res) => {
    res.status(200).send('This is an authentication server');
});

router.get('/universities', (req, res) => {
    res.status(200).send(universities);
});

router.post('/positions', (req, res) => {
    console.log("/positions: received %o", req.body);
    if (req.body.university && req.body.position) {
        let userPosition = req.body.position;
        let places = universities[req.body.university].places;
        places.forEach((place, index) => {
            let lon = userPosition.longitude + (0.0001 *(index % 2 == 0 ? -1 : 1)) + index * 0.0001 * (index % 2 == 0 ? -1 : 1);
            let lat = userPosition.latitude + (0.0001 *(index % 2 == 0 ? -1 : 1)) + index * 0.0001 * (index % 2 == 0 ? -1 : 1);
            place["position"] = { lon: lon, lat: lat };
        });

        res.status(200).send(places);
    }
    else {
        res.status(404).send("no university specified");
    }
});

router.post('/insert', (req, res) => {
    console.log("/insert: received new queue %o", req.body);
    res.status(200).send({ msg: "ok" });
});

router.post('/register', (req, res) => {

    const name = req.body.name;
    const surname = req.body.surname;
    const email = req.body.email;
    const birthDate = req.body.birthDate;
    const university = req.body.university;
    const faculty = req.body.faculty;
    console.log(req.body);
    const password = bcrypt.hashSync(req.body.password);

    createUser([name, surname, email, birthDate, university, faculty, password], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Server error!");
        }
        findUserByEmail(email, (err, user) => {
            if (err) return res.status(500).send('Server error!');
            const expiresIn = 24 * 60 * 60;
            const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
                expiresIn: expiresIn
            });
            res.status(200).send({
                "user": user, "access_token": accessToken, "expires_in": expiresIn
            });
        });
    });
});


router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    findUserByEmail(email, (err, user) => {
        if (err) return res.status(500).send('Server error!');
        if (!user) return res.status(404).send('User not found!');
        const result = bcrypt.compareSync(password, user.password);
        if (!result) return res.status(401).send('Password not valid!');

        const expiresIn = 24 * 60 * 60;
        const accessToken = jwt.sign({ id: user.id }, SECRET_KEY, {
            expiresIn: expiresIn
        });
        res.status(200).send({ "user": user, "access_token": accessToken, "expires_in": expiresIn });
    });
});

router.post('/search', (req, res) => {
    let payload = req.body;

    let university = universities[payload.university];
    let filter = payload.filter;

    let list = [];
    if (university) {
        university.places.forEach(place => {
            if (place.name.toUpperCase().startsWith(payload.queue.toUpperCase())) {
                let pushQueue = true;

                if (filter.type != null) {
                    if (place.type != filter.type) {
                        pushQueue = false;
                    }
                }
                if (filter.status != null) {
                    console.log(filter.status, place.status);
                    if (place.status != filter.status) {
                        console.log("ok")
                        pushQueue = false;
                    }
                }

                pushQueue && list.push(place);
            }
        })

        return res.status(200).send(list);
    }
    else {
        return res.status(404).send({ msg: "University not found" });
    }
})

router.post('/news', (req, res) => {
    let body = req.body;

    let university = universities[body.university];
    let newsList = [];
    university && university.places.forEach(place => {
        place.news.forEach(item => {
            newsList.push({ content: item, place: place });
        })
    })

    return res.status(200).send(newsList);
})

router.post('/favourites', (req, res) => {
    let body = req.body;
    console.log("[Favourites] received %o", body);
    let favourites = body.favourites;
    let university = universities[body.university];

    let placeList = [];
    university && university.places.forEach(place => {
        if (favourites.includes(place.id)) {
            placeList.push(place);
        }
    })

    return res.status(200).send(placeList);
})

router.post('/review', (req, res) => {
    let result = false;
    let body = req.body;
    console.log("[Review] received %o", body);
    let persons = body.request.persons;
    let time = body.request.time;
    let university = universities[body.university];

    university && university.places.forEach(place => {
        if (body.id == place.id) {
            place.people = persons;
            place.time = time;
            universities[body.university] = place;
            result = true;
        }
    })

    return res.status(200).send({msg: result, persons: persons, time: time});
})

router.post('/googlecheck', (req, res) =>{
    console.log("received req %o", req.body);
    findUserByEmail(req.body.mail, (err, user) => {
        if (err) return res.status(500).send('Server error!');
        else{
            console.log(user);
            let found = user != null && user.university!=null;
            if(user==null){
                createGoogleUser([req.body.name, req.body.surname, req.body.mail], (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).send("Server error!");
                    }
                });
            }
            return res.status(200).send({"user": user, "found": found});
        }
    });
})

router.post('/googleupdate', (req, res) => {
    console.log("received %o", req.body);
    updateGoogleUser([req.body.university, req.body.faculty, req.body.mail], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).send("Server error!");
        }
        else{
            
            console.log(`Row(s) updated: ${this.changes}`);
            return res.status(200).send({msg: "ok"});
        }
    });

});

app.use(router);
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log('Server listening at http://localhost:' + port);
}); 