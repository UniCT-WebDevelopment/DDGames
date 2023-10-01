const mysql = require('mysql');
const express = require('express');
const session = require('express-session');
var crypto = require('crypto');
const bodyParser = require('body-parser');
const { log } = require('console');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const encoder = bodyParser.urlencoded();
const fs = require('fs');
const path = require('path');
const { title } = require('process');
const folderPath = path.join(__dirname, 'uploads');

var htmlPage = `

<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <style>
        body {
            margin: 0;
            overflow: hidden;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .loading {
            position: absolute;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            animation: 1s spin linear infinite;
        }

        @keyframes spin {
            0% {
                transform: rotateZ(0deg);
            }
            100% {
                transform: rotateZ(360deg);
            }
        }
        
    </style>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/p5.js/1.7.0/p5.js"
        integrity="sha512-M7uzkKVt12bO/ClDOwaTk0AUwDPmJzjxri/KQKft2cisI6q3zJ4KxX3IfSQXF9Z6WU6NNW67JAljgWrA4WiiOA=="
        crossorigin="anonymous" referrerpolicy="no-referrer"></script>
</head>

<body id="body">
    <div class="loading" id="loading" style="display: flex;">
        <img src="../../img/loading.png" width="30" height="30">
    </div>
    <main id='main' style="display: none; width: 100%; height:100%; justify-content: center; align-items: center; position: relative;"></main>
    <script type="text/javascript" id="game-script"></script>
    <script>
        //serve per associare lo script al suo gioco
        const gameScript = document.getElementById('game-script');
        const string = window.location.href.substr(0, window.location.href.lastIndexOf('/'));
        gameScript.src = string.substr(string.lastIndexOf('/') + 1) + '.js';
        var canvasWidth;
        var canvasHeight;
        window.setTimeout( () => { //non appena viene aperto
            const bodyWidth = parseInt(window.getComputedStyle(document.getElementById('body')).width);
            const bodyHeight = parseInt(window.getComputedStyle(document.getElementById('body')).height);
            const canvas = document.getElementById('defaultCanvas0');
            canvasWidth = parseInt(canvas.style.width);
            canvasHeight = parseInt(canvas.style.height);
            if (canvasHeight > canvasWidth) {
                    let scale = bodyHeight / canvasHeight;
                    if (canvasWidth * scale > bodyWidth) {
                        scale = bodyWidth / canvasWidth;
                    }
                    canvas.style.width = canvasWidth * scale;
                    canvas.style.height = canvasHeight * scale;
                } else {
                    let scale = bodyWidth / canvasWidth;
                    if (canvasHeight * scale > bodyHeight) {
                        scale = bodyHeight / canvasHeight;
                    }
                    canvas.style.width = canvasWidth * scale;
                    canvas.style.height = canvasHeight * scale;
                }
            canvas.style.top = 0;
            canvas.style.left = 0;
            canvas.style.position = 'static';
            document.getElementById('main').style.display = 'flex';
            document.getElementById('loading').style.display = 'none';
        }, 1000)
        let resizeTimer;
        window.addEventListener('resize', () => { //non appena viene fatta la resize
            document.getElementById('main').style.display = 'none';
            document.getElementById('loading').style.display = 'flex';
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(function() {
                const bodyWidth = parseInt(window.getComputedStyle(document.getElementById('body')).width);
                const bodyHeight = parseInt(window.getComputedStyle(document.getElementById('body')).height);
                const canvas = document.getElementById('defaultCanvas0');
                if (canvasHeight > canvasWidth) {
                    let scale = bodyHeight / canvasHeight;
                    if (canvasWidth * scale > bodyWidth) {
                        scale = bodyWidth / canvasWidth;
                    }
                    canvas.style.width = canvasWidth * scale;
                    canvas.style.height = canvasHeight * scale;
                } else {
                    let scale = bodyWidth / canvasWidth;
                    if (canvasHeight * scale > bodyHeight) {
                        scale = bodyHeight / canvasHeight;
                    }
                    canvas.style.width = canvasWidth * scale;
                    canvas.style.height = canvasHeight * scale;
                }
                document.getElementById('main').style.display = 'flex';
                document.getElementById('loading').style.display = 'none';
            }, 200);
        })
    </script>
</body>

</html>

`;

var idAdmin = 1; //sostituire "1" con l'id dell'utente che deve essere l'admin

const app = express();

app.use("/css", express.static("css"))
app.use("/img", express.static("img"))
app.use("/js", express.static("js"))
app.use("/uploads", express.static('uploads'))

app.use('/html/data', express.static('uploads'))

app.use('/uploads/:gameFolder/data', (req, res, next) => {
    const gameFolder = req.params.gameFolder;
    const dataPath = path.join(__dirname, 'uploads', gameFolder, 'data');
    express.static(dataPath)(req, res, next);
})

app.use(session({
    secret: 'r397"4ELz^dR',
    resave: false,
    saveUninitialized: true,
}));

const connection = mysql.createConnection({
    host: "localhost",
    user: "user", //sostituire "user" con il nome utente di phpmyadmin
    password: "password", //sostituire "password" con la password dell'utente di phpmyadmin
    database: "ddgames" //sostituire "ddgames" con il nome del database creato su phpmyadmin
})

connection.connect(function (error) {
    if (error) throw error
    else console.log("connected successfully");
})

app.get('/', function (req, res) {
    res.sendFile(__dirname + "/html/homepage.html");
})

app.get('/login.html', function (req, res) {
    res.sendFile(__dirname + "/html/login.html");
})

app.get('/profile.html', function (req, res) {
    res.sendFile(__dirname + "/html/profile.html");
})

app.get('/category/:id', function (req, res) {
    res.sendFile(__dirname + "/html/category.html");
})

app.get('/html/empty.html', function (req, res) {
    res.sendFile(__dirname + "/html/empty.html")
})

app.get('/game/:gameid', function (req, res) {
    res.sendFile(__dirname + '/html/game.html');
})

app.get('/uploads/:gameid/empty.html', function (req, res) {
    res.sendFile(__dirname + '/uploads/' + req.params.gameid + '/empty.html')
})

app.get('/admin.html', function (req, res) {
    if (req.session.loggedInUser) {
        const query = 'SELECT * FROM user WHERE email=?';
        connection.query(query, [req.session.loggedInUser], (checkErr, checkRes) => {
            if (checkErr) {
                console.log(checkErr);
                res.status(500).send("Error fetching user");
            } else {
                const id = checkRes[0].id;
                if (id == idAdmin) {
                    res.sendFile(__dirname + '/html/admin.html');
                } else {
                    res.redirect('/');
                }
            }
        })
    } else {
        res.redirect('/');
    }
})

app.get('/get/category/list', function(req, res) {
    const query = 'SELECT * FROM category';
    connection.query(query, (checkErr, checkRes) => {
        if (checkErr) {
            console.log(checkErr);
            res.status(500).send("Error fetching categories");
        } else {
            const categoryList = checkRes.map(category => ({
                id: category.id,
                title: category.name,
                bgColor: category.bg_color,
                nameColor: category.name_color,
            }));
            res.json(categoryList);
        }
    })
})

app.get('/get/game/:id', function (req, res) {
    const id = req.params.id;
    const query = 'SELECT * FROM game WHERE id = ?';
    connection.query(query, [id], (checkErr, checkRes) => {
        if (checkRes.length == 0) {
            res.status(404).send("Page not found");
        } else {
            const queryViews = 'UPDATE game SET views = views+1 WHERE id = ?';
            connection.query(queryViews, [id]);
            const queryUsername = 'SELECT username FROM user JOIN game ON user.id = game.userid WHERE game.id = ?';
            connection.query(queryUsername, [id], (checkErr2, checkRes2) => {
                const queryCategory = 'SELECT bg_color FROM category WHERE id=?';
                connection.query(queryCategory, [checkRes[0].category], (checkErr3, checkRes3) => {
                    if (checkErr3) {
                        console.log(checkErr3);
                        res.status(500).send("Error fetching category");
                    } else {
                        const data = {
                            title: checkRes[0].title,
                            category: checkRes[0].category,
                            image: checkRes[0].image_dir,
                            id: checkRes[0].id,
                            views: checkRes[0].views,
                            username: checkRes2[0].username,
                            description: checkRes[0].description,
                            bgColor: checkRes3[0].bg_color,
                        }
                        res.json(data);
                    }
                })
            });
        }
    })
})

app.get('/receive/review/:id', function (req, res) {
    const query = 'SELECT user.username, review.description, review.stars FROM review JOIN user ON review.userid = user.id WHERE gameid = ?';
    connection.query(query, [req.params.id], (checkErr, checkRes) => {
        if (checkErr) {
            console.log(checkErr);
            res.status(500).send("Error fetching reviews");
        } else {
            const reviewList = checkRes.map(review => ({
                username: review.username,
                text: review.description,
                stars: review.stars,
            }));
            res.json(reviewList);
        }
    })
})

app.post('/signup', encoder, (req, response) => { 
    const username = req.body.username;
    const email = req.body.email;
    const password = crypto.createHash('sha1').update(req.body.password).digest('hex');
    if (!email.includes('@')) {
        response.send("Invalid email");
        return;
    }
    if (username.length > 20) {
        response.send("Max 20 characters");
    } else {
        const checkUser = 'SELECT COUNT(*) AS count FROM user WHERE username = ?'; 
        connection.query(checkUser, [username], (checkErr, checkRes) => { 
            if (checkErr) {
                console.error("Error checking existing user: ", checkErr);
                response.status(500).send("Error during registration");
            } else {
                const userCount = checkRes[0].count; 
                if (userCount > 0) {
                    console.log("Username already taken");
                    response.send("Username already taken");
                } else {
                    const checkEmail = 'SELECT COUNT(*) AS count FROM user WHERE email = ?'; 
                    connection.query(checkEmail, [email], (checkErr, checkRes) => { 
                        if (checkErr) {
                            console.error("Error checking existing email: ", checkErr);
                            response.status(500).send("Error during registration");
                        } else {
                            const emailCount = checkRes[0].count;
                            if (emailCount > 0) {
                                console.log("Email already used");
                                response.send("Email already used");
                            } else {
                                const sql = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';
                                connection.query(sql, [username, email, password], (err, res) => {
                                    if (err) {
                                        console.error("Error during user initialization: ", err);
                                        response.status(500).send("Error during registration");
                                    } else {
                                        req.session.loggedInUser = email;
                                        console.log("User successfully registered");
                                        response.status(200).send("User successfully registered")
                                    }
                                })
                            }
                        }
                    })
                }
            }
        })
    }

})

app.post('/login', encoder, (req, response) => {
    const email = req.body.email;
    const password = crypto.createHash('sha1').update(req.body.password).digest('hex');
    const checkLogin = 'SELECT COUNT(*) AS count FROM user WHERE email = ? AND password = ?';
    connection.query(checkLogin, [email, password], (checkErr, checkRes) => {
        const count = checkRes[0].count;
        if (count == 1) {
            req.session.loggedInUser = email;
            response.send("Successful login");
        } else {
            response.send("Wrong credentials");
        }
    })
})

app.get('/session', (req, response) => { 
    if (req.session.loggedInUser) {
        const query = 'SELECT username FROM user WHERE email = ?';
        connection.query(query, [req.session.loggedInUser], (checkErr, checkRes) => {
            if (checkErr) {
                response.status(500);
            } else {
                response.send(checkRes[0].username);
            }
        })
    } else {
        response.send("You are not logged in");
    }
})

app.post('/uploadGame', upload.array('files'), (req, response) => {
    const title = req.body.title;
    const description = req.body.description;
    const category = req.body.category;
    const files = req.files;
    const userQuery = 'SELECT id FROM user WHERE email = ?' 
    connection.query(userQuery, [req.session.loggedInUser], (checkErr, checkRes) => { 
        if (checkErr) {
            response.status(500).send("Error during game upload");
        } else {
            const user = checkRes[0].id;
            const query = 'INSERT INTO game (userid, title, description, category) VALUES (?, ?, ?, ?)'
            connection.query(query, [user, title, description, category], (checkErr, checkRes) => {
                if (checkErr) {
                    response.status(500).send("Error during game upload");
                } else {
                    const id = checkRes.insertId;
                    fs.mkdir((folderPath + '/' + id), (err) => {
                        if (err) {
                            response.status(500).send("Error creating folder");
                        } else {
                            const image = files[0].buffer;
                            const imagePath = folderPath + '/' + id + '/' + id + path.extname(files[0].originalname).toLowerCase(); 
                            const script = files[1].buffer;
                            const scriptPath = folderPath + '/' + id + '/' + id + '.js';
                            fs.writeFile(imagePath, image, 'binary', (err) => {
                                if (err) {
                                    console.error('Error saving image:', err);
                                    connection.query('DELETE * FROM game WHERE id = ?', [id]);
                                } else {
                                    console.log('Image saved successfully:', imagePath);
                                    const queryImg = 'UPDATE game SET image_dir = ? WHERE id = ?'
                                    connection.query(queryImg, [imagePath, id], (checkErr, checkRes) => {
                                        console.log("image_dir saved correctly");
                                    })
                                }
                            })
                            fs.writeFile(scriptPath, script, 'binary', (err) => {
                                if (err) {
                                    console.error('Error saving script:', err);
                                    connection.query('DELETE * FROM game WHERE id = ?', [id]);
                                } else {
                                    console.log('Script saved successfully:', scriptPath);
                                    const queryPath = 'UPDATE game SET script_dir = ? WHERE id = ?'
                                    connection.query(queryPath, [scriptPath, id], (checkErr, checkRes) => {
                                        response.status(200).send("Game saved correctly");
                                        console.log("script_dir saved correctly");
                                    })
                                }
                            })
                            const dataPath = folderPath + '/' + id + '/data/';
                            fs.mkdir(dataPath, (err2) => {
                                if (err2) {
                                    response.status(500).send("Error creating folder");
                                } else {
                                    for (let i = 2; i < files.length; i++) {
                                        const file = files[i].buffer;
                                        const filePath = dataPath + files[i].originalname;
                                        fs.writeFileSync(filePath, file, 'binary');
                                    }
                                }
                            })
                            const indexName = '/' + id + '/empty.html';
                            fs.writeFile(folderPath + indexName, htmlPage, (err3) => {
                                if (err3) {
                                    console.error('Error creating html:', err3);
                                } else {
                                    console.log("Html file successfully created");
                                }
                            });
                        }
                    });

                }
            })
        }
    })
})

app.post('/send/review', encoder, function (req, res) {
    const queryUserId = 'SELECT * FROM user WHERE email = ?';
    connection.query(queryUserId, [req.session.loggedInUser], (checkErr, checkRes) => {
        if (checkErr) {
            console.log(checkErr);
            res.status(500).send("Error fetching userid during review upload");
        } else if (checkRes.length > 0) { 
            const generalQuery = 'SELECT * FROM review WHERE gameid = ? AND userid = ?';
            connection.query(generalQuery, [req.body.gameId, checkRes[0].id], (checkErr3, checkRes3) => {
                if (checkErr3) {
                    console.log(checkErr3);
                    res.status(500);
                } else if (checkRes3.length > 0) {
                    const queryFound = 'UPDATE review SET description = ?, stars = ? WHERE userid = ? AND gameid = ?';
                    connection.query(queryFound, [req.body.textReview, req.body.starValue, checkRes[0].id, req.body.gameId], (checkErr4, checkRes4) => {
                        if (checkErr4) {
                            console.log(checkErr4);
                            res.status(500);
                        } else {
                            res.status(200).send("Review updated correctly");
                        }
                    })
                } else {
                    const query = 'INSERT INTO review (gameid, userid, description, stars) VALUES (?, ?, ?, ?)';
                    connection.query(query, [req.body.gameId, checkRes[0].id, req.body.textReview, req.body.starValue], (checkErr2, checkRes2) => {
                        if (checkErr2) {
                            console.log(checkErr2);
                            res.status(500);
                        } else {
                            res.status(200).send("Review published correctly");
                        }
                    });
                }
            })
        }
    });
})

app.get('/profile/reviews', function (req, res) {
    const query = 'SELECT game.title, review.description, review.stars FROM game JOIN (review JOIN user ON review.userid = user.id) ON review.gameid = game.id WHERE user.email = ?';
    connection.query(query, [req.session.loggedInUser], (checkErr, checkRes) => {
        if (checkErr) {
            console.log(checkErr);
            res.status(500).send("Error fetching reviews");
        } else {
            const reviewList = checkRes.map(review => ({
                title: review.title,
                text: review.description,
                stars: review.stars,
            }));
            res.json(reviewList);
        }
    })
})

app.get('/get/profile/games', function (req, res) {
    const queryUserId = 'SELECT id FROM user WHERE email = ?' 
    connection.query(queryUserId, [req.session.loggedInUser], (checkErr, checkRes) => {
        if (checkErr) {
            res.status(500).send("Couldn't find user");
        } else {
            const user = checkRes[0].id;
            const queryGameData = 'SELECT game.id, game.userid, game.title, game.description, game.category, game.views, game.image_dir, game.script_dir, AVG(review.stars) AS average FROM game LEFT JOIN review ON game.id = review.gameid WHERE game.userid = ? GROUP BY game.id, game.userid, game.title, game.description, game.category, game.views, game.image_dir, game.script_dir;';
            connection.query(queryGameData, [user], (checkErr, checkRes2) => {
                if (checkErr) {
                    console.log(checkErr);
                    res.status(500).send("Error fetching game data");
                } else {
                    const gameList = checkRes2.map(game => ({
                        id: game.id,
                        title: game.title,
                        description: game.description,
                        category: game.category,
                        views: game.views,
                        image: path.extname(game.image_dir),
                        averageStars: game.average,
                    }));
                    res.json(gameList);
                }
            })
        }
    })
})

app.get('/categories/:categoryNumber', (req, res) => {
    const categoryNumber = req.params.categoryNumber;
    const queryGames = 'SELECT game.id, game.title, game.description, game.category, game.views, game.image_dir, user.username, AVG(review.stars) AS avg FROM (game LEFT JOIN review ON game.id = review.gameid) JOIN user ON game.userid = user.id WHERE category = ? GROUP BY game.id, game.title, game.description, game.category, game.views, game.image_dir, user.username';
    connection.query(queryGames, [categoryNumber], (checkErr, checkRes) => {
        if (checkErr) {
            res.status(500).send("Error fetching games");
        } else {
            const gameList = checkRes.map(game => ({
                id: game.id,
                title: game.title,
                description: game.description,
                category: game.category,
                views: game.views,
                image: path.extname(game.image_dir),
                username: game.username, 
                average: game.avg,
            }));
            res.json(gameList);
        }
    })
})

app.get('/highest/rated', (req, res) => {
    const query = `
    SELECT 
    gameid,
    SUM(stars * weight) / SUM(weight) AS weightedAverage,
    SUM(weight) as totalWeight
    FROM 
    (
        SELECT
            gameid,
            stars,
            CASE
                WHEN stars = 5 THEN 5
                WHEN stars = 4 THEN 4
                WHEN stars = 3 THEN 3
                WHEN stars = 2 THEN 2
                WHEN stars = 1 THEN 1
                ELSE 0 
            END AS weight
        FROM
            review
    ) weighted_reviews
    GROUP BY 
    gameid
    ORDER BY 
    weightedAverage DESC,
    totalWeight DESC;
    `
    connection.query(query, (checkErr, checkRes) => {
        if (checkErr) {
            console.log(checkErr);
            res.status(500).send("Error fetching highest-rated game");
        } else {
            const queryGetGame = 'SELECT game.id, game.title, game.description, game.category, game.views, game.image_dir, user.username, category.name FROM (game JOIN user ON game.userid = user.id) JOIN category ON game.category = category.id WHERE game.id=?';
            connection.query(queryGetGame, [checkRes[0].gameid], (checkErr2, checkRes2) => {
                if (checkErr2) {
                    console.log(checkErr2);
                    res.status(500).send("Error fetching highest-rated game");
                } else {
                    const game = {
                        id: checkRes2[0].id,
                        title: checkRes2[0].title,
                        author: checkRes2[0].username,
                        description: checkRes2[0].description,
                        category: checkRes2[0].category,
                        categoryName: checkRes2[0].name,
                        views: checkRes2[0].views,
                        image: path.extname(checkRes2[0].image_dir),
                        stars: checkRes[0].weightedAverage,
                    }
                    res.json(game);
                }
            })
        }
    })
})

app.get('/most/played', (req, res) => {
    const query = `
    SELECT game.id, game.title, game.description, game.category, game.views, game.image_dir, user.username, category.name, AVG(review.stars) AS avg
    FROM ((game JOIN category ON game.category = category.id) JOIN user ON game.userid = user.id) LEFT JOIN review ON game.id = review.gameid
    GROUP BY game.id, game.title, game.description, game.category, game.views, game.image_dir, user.username, category.name
    ORDER BY game.views DESC
    `
    connection.query(query, (checkErr, checkRes) => {
        if (checkErr) {
            console.log(checkErr);
            res.status(500).send("Error fetching most played game");
        } else {
            const game = {
                id: checkRes[0].id,
                title: checkRes[0].title,
                author: checkRes[0].username,
                description: checkRes[0].description,
                category: checkRes[0].category,
                categoryName: checkRes[0].name,
                views: checkRes[0].views,
                image: path.extname(checkRes[0].image_dir),
                stars: checkRes[0].avg,
            }
            res.json(game);
        }
    })
})

app.get('/recommended', (req, res) => {

    fs.readFile('serverData.json', 'utf-8', (err, data) => {
        if (err) {
            console.error("Error reading file", err);
            return;
        }
        const jsonData = JSON.parse(data);
        const idRecommended = jsonData.idRecommended;
        const query = `
    SELECT game.id, game.title, game.description, game.category, game.views, game.image_dir, user.username, category.name, AVG(review.stars) AS avg
    FROM ((game JOIN category ON game.category = category.id) JOIN user ON game.userid = user.id) LEFT JOIN review ON game.id = review.gameid
    WHERE game.id = ?
    GROUP BY game.id, game.title, game.description, game.category, game.views, game.image_dir, category.name, user.username
    `
        connection.query(query, [idRecommended], (checkErr, checkRes) => {
            if (checkErr) {
                console.log(checkErr);
                res.status(500).send("Error fetching recommended game");
            } else {
                const game = {
                    id: checkRes[0].id,
                    title: checkRes[0].title,
                    author: checkRes[0].username,
                    description: checkRes[0].description,
                    category: checkRes[0].category,
                    categoryName: checkRes[0].name,
                    views: checkRes[0].views,
                    image: path.extname(checkRes[0].image_dir),
                    stars: checkRes[0].avg,
                }
                res.json(game);
            }
        })
    })
})

app.post('/new/recommended/:gameid', (req, res) => {
    if (req.session.loggedInUser) {
        const query = 'SELECT * FROM user WHERE id = ? AND email = ?';
        connection.query(query, [idAdmin, req.session.loggedInUser], (checkErr, checkRes) => {
            if (checkErr) {
                console.log(checkErr);
                res.status(500).send("Error fetching admin");
            } else {
                if (checkRes.length == 1) { 
                    const exists = 'SELECT * FROM game WHERE id = ?';
                    connection.query(exists, [req.params.gameid], (checkErr2, checkRes2) => {
                        if (checkErr2) {
                            console.log(checkErr2);
                            res.status(500).send("Error fetching game");
                        } else {
                            if (checkRes2.length == 1) { 
                                fs.readFile('serverData.json', 'utf-8', (err, data) => {
                                    if (err) {
                                        console.error("Error reading file", err);
                                        res.status(500);
                                    } else {
                                        const jsonData = JSON.parse(data);
                                        jsonData.idRecommended = req.params.gameid;
                                        fs.writeFile('serverData.json', JSON.stringify(jsonData, null, 2), (err) => {
                                            if (err) {
                                              console.error('Error writing JSON file:', err);
                                            } else {
                                              res.send('Recommended game updated successfully');
                                            }
                                          });
                                    }
                                })
                            } else {
                                res.send("Game does not exist");
                            }
                        }
                    })
                } else {
                    res.send("You are not an admin");
                }
            }
        })
    } else {
        res.send("You are not logged in");
    }
})

app.get('/total/views', (req, res) => {
    const query = 'SELECT SUM(views) AS totalViews FROM game';
    connection.query(query, (checkErr, checkRes) => {
        if (checkErr) {
            console.log(checkErr);
            res.status(500).send("Error fetching total views");
        } else {
            const views = checkRes[0].totalViews + " ";
            res.status(200).send(views);
        }
    })
})

function deleteDir(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach((file) => { 
            const filePath = path + '/' + file;
            if (fs.lstatSync(filePath).isDirectory()) {
                deleteDir(filePath);
            } else {
                fs.unlinkSync(filePath);
            }
        })
        fs.rmdirSync(path);
    }
}

app.post('/delete/:gameid', (req, res) => {
    if (req.session.loggedInUser) {
    const control = 'SELECT * FROM user WHERE email=?';
    connection.query(control, [req.session.loggedInUser], (checkErr2, checkRes2) => {
        if (checkErr2) {
            console.log(checkErr2);
            res.status(500).send("Error fetching user");
        } else {
            if (checkRes2.length == 1) {
                const userid = checkRes2[0].id;
                const creator = 'SELECT userid FROM game WHERE id=?';
                connection.query(creator, [req.params.gameid], (checkErr3, checkRes3) => {
                    if (checkErr3) {
                        console.log(checkErr3);
                        res.status(500).send("Error fetching user");
                    } else {
                        const creatorid = checkRes3[0].userid;
                        if (userid == idAdmin || userid == creatorid) {
                            fs.readFile('serverData.json', 'utf-8', (err, data) => {
                                const jsonData = JSON.parse(data);
                                const idRecommended = jsonData.idRecommended;
                                if (req.params.gameid != idRecommended) { 
                                    const query = 'DELETE FROM game WHERE id=?';
                                    connection.query(query, [req.params.gameid], (checkErr, checkRes) => {
                                        if (checkErr) {
                                            console.log(checkErr);
                                            res.status(500).send("Error deleting game");
                                        } else {
                                            deleteDir(__dirname + '/uploads/' + req.params.gameid);
                                            res.send("Game deleted successfully");
                                        }
                                    })
                                } else {
                                    const queryNewRec = 'SELECT id FROM game WHERE id != ? ORDER BY RAND() LIMIT 1';
                                    connection.query(queryNewRec, [req.params.gameid], (checkErr4, checkRes4) => {
                                        if (checkErr4) {
                                            console.log(checkErr4);
                                            res.status(500).send("Error fetching game");
                                        } else {
                                            jsonData.idRecommended = checkRes4[0].id + ' ';
                                            fs.writeFile('serverData.json', JSON.stringify(jsonData, null, 2), (err) => {
                                                if (err) {
                                                    console.error('Error writing JSON file:', err);
                                                  } else {
                                                   console.log('Recommended game updated successfully');
                                                  }
                                            })
                                        }
                                    })
                                    const query = 'DELETE FROM game WHERE id=?';
                                    connection.query(query, [req.params.gameid], (checkErr, checkRes) => {
                                        if (checkErr) {
                                            console.log(checkErr);
                                            res.status(500).send("Error deleting game");
                                        } else {
                                            deleteDir(__dirname + '/uploads/' + req.params.gameid);
                                            res.send("Game deleted successfully");
                                        }
                                    })
                                }
                            })
                        }
                    }
                })
            } else {
                res.send("You are not logged in");
            }
        }
    })

    } else {
        res.send("You are not logged in");
    }
})

app.get('/profile/admin/', (req, res) => {
    if (req.session.loggedInUser) {
        const query = 'SELECT * FROM user WHERE email = ?';
        connection.query(query, [req.session.loggedInUser], (checkErr, checkRes) => {
            if (checkErr) {
                console.log(checkErr);
                res.status(500).send("Error fetching username");
            } else {
                const id = checkRes[0].id; 
                if (id == idAdmin) {
                    res.status(200).send("You are an admin");
                } else {
                    res.status(200).send("You are not an admin");
                }
            }
        })
    } else {
        res.status(200).send("You are not logged in");
    }
})

app.get('/get/all/games', (req, res) => {
    if (req.session.loggedInUser) {
    const checkAdmin = 'SELECT * FROM user WHERE id=? AND email=?';
    connection.query(checkAdmin, [idAdmin, req.session.loggedInUser], (checkErr, checkRes) => {
        if (checkErr) {
            console.log(checkErr);
            res.status(500).send("Error fetching admin");
        } else {
            if (checkRes.length == 1) {
                const getGames = `
                SELECT game.id, game.title, game.description, game.category, game.views, user.username, game.userid, category.name, AVG(review.stars) AS avg
                FROM ((game JOIN category ON game.category = category.id) JOIN user ON game.userid = user.id) LEFT JOIN review ON game.id = review.gameid
                GROUP BY game.id, game.title, game.description, game.category, game.views
                `
                connection.query(getGames, (checkErr2, checkRes2) => {
                    if (checkErr2) {
                        console.log(checkErr2);
                        res.status(500).send("Error fetching games");
                    } else {
                        const gameList = checkRes2.map(map => ({
                            username: map.username,
                            userid: map.userid,
                            id: map.id,
                            title: map.title,
                            description: map.description,
                            category: map.category,
                            categoryName: map.name,
                            views: map.views,
                            reviews: map.avg
                        }));
                        res.json(gameList);
                    }
                })
            } else {
                res.send("You are not an admin");
            }
        }
    })
} else {
    res.status(400).send("You are not logged in");
}
})

app.get('/get/all/users', (req, res) => {
    if (req.session.loggedInUser) {
    const checkAdmin = 'SELECT * FROM user WHERE id=? AND email=?';
    connection.query(checkAdmin, [idAdmin, req.session.loggedInUser], (checkErr, checkRes) => {
        if (checkErr) {
            console.log(checkErr);
            res.status(500).send("Error fetching admin");
        } else {
            if (checkRes.length == 1) {
                const getUsers = 'SELECT * FROM user';
                connection.query(getUsers, (checkErr2, checkRes2) => {
                    if (checkErr2) {
                        console.log(checkErr2);
                        res.status(500).send("Error fetching users");
                    } else {
                        const userList = checkRes2.map(map => ({
                            id: map.id,
                            email: map.email,
                            username: map.username,
                            password: map.password
                        }));
                        res.json(userList);
                    }
                })
            } else {
                res.send("You are not an admin");
            }
        }
    })
} else {
    res.status(400).send("You are not logged in");
}
})

app.get('/get/all/reviews', (req, res) => {
    if (req.session.loggedInUser) {
    const checkAdmin = 'SELECT * FROM user WHERE id=? AND email=?';
    connection.query(checkAdmin, [idAdmin, req.session.loggedInUser], (checkErr, checkRes) => {
        if (checkErr) {
            console.log(checkErr);
            res.status(500).send("Error fetching admin");
        } else {
            if (checkRes.length == 1) {
                const getReviews = `
                SELECT review.gameid, review.userid, review.description, review.stars, game.title, user.username
                FROM (review JOIN user ON review.userid = user.id) JOIN game ON review.gameid = game.id
                `
                connection.query(getReviews, (checkErr2, checkRes2) => {
                    if (checkErr2) {
                        console.log(checkErr2);
                        res.status(500).send("Error fetching reviews");
                    } else {
                        const reviewList = checkRes2.map(map => ({
                            gameid: map.gameid,
                            userid: map.userid,
                            description: map.description,
                            stars: map.stars,
                            title: map.title,
                            username: map.username
                        }));
                        res.json(reviewList);
                    }
                })
            } else {
                res.send("You are not an admin");
            }
        }
    })
} else {
    res.status(400).send("You are not logged in");
}
})

app.post('/delete/user/:userid', (req, res) => {
    if (req.params.userid == idAdmin) {
        res.status(400).send("You cannot delete admin");
    } else {
        if (req.session.loggedInUser) {
            const control = 'SELECT * FROM user WHERE email = ?';
            connection.query(control, [req.session.loggedInUser], (checkErr, checkRes) => {
                if (checkErr) {
                    console.log(checkErr);
                    res.status(500).send("Error fetching admin");
                } else {
                    if (idAdmin == checkRes[0].id) {
                        const getUserGames = 'SELECT * FROM game WHERE userid=?';
                        connection.query(getUserGames, [req.params.userid], (checkErr2, checkRes2) => {
                            if (checkErr2) {
                                console.log(checkErr2);
                                res.status(500).send("Error fetching games");
                            } else {
                                fs.readFile('serverData.json', 'utf-8', (err, data) => {
                                    if (err) {
                                        console.error("Error reading file", err);
                                        res.status(500);
                                    } else {
                                        const jsonData = JSON.parse(data);
                                        for (let i=0; i<checkRes2.length; i++) {
                                            deleteDir(__dirname + '/uploads/' + checkRes2[i].id);
                                            if (checkRes2[i].id == jsonData.idRecommended) {
                                                const queryNewRec = 'SELECT id FROM game WHERE id != ? AND userid != ? ORDER BY RAND() LIMIT 1';
                                                connection.query(queryNewRec, [checkRes2[i].id, req.params.userid], (checkErr3, checkRes3) => {
                                                    if (checkErr3) {
                                                        console.log(checkErr3);
                                                        res.status(500).send("Error fetching game");
                                                    } else {
                                                        jsonData.idRecommended = checkRes3[0].id + ' ';
                                                        fs.writeFile('serverData.json', JSON.stringify(jsonData, null, 2), (err) => {
                                                            if (err) {
                                                                console.error('Error writing JSON file:', err);
                                                              } else {
                                                               console.log('Recommended game updated successfully');
                                                              }
                                                        })
                                                    }
                                                })
                                            }
                                        }
                                        const deleteUser = 'DELETE FROM user WHERE id=?';
                                        connection.query(deleteUser, [req.params.userid], (checkErr3, checkRes3) => {
                                            if (checkErr3) {
                                                console.log(checkErr3);
                                                res.status(500).send("Error deleting user");
                                            } else {
                                                res.status(200).send("User deleted successfully");
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    } else {
                        res.send("You are not an admin");
                    }
                }
            })
        }
    }
})

app.post('/delete/review/:gameid/:userid', (req, res) => {
    if (req.session.loggedInUser) {
        const checkAdmin = 'SELECT * FROM user WHERE email=?';
        connection.query(checkAdmin, [req.session.loggedInUser], (checkErr, checkRes) => {
            if (checkErr) {
                console.log(checkErr);
                res.status(500).send("Error fetching admin")
            } else {
                if (checkRes[0].id == idAdmin) {
                    const deleteReview = 'DELETE FROM review WHERE gameid=? AND userid=?';
                    connection.query(deleteReview, [req.params.gameid, req.params.userid], (checkErr2, checkRes2) => {
                        if (checkErr2) {
                            console.log(checkErr2);
                            res.status(500).send("Error deleting review");
                        } else {
                            res.status(200).send("Review deleted successfully");
                        }
                    })
                } else {
                    res.status(400).send("You are not an admin");
                }
            }
        })
    } else {
        res.status(400).send("You are not logged in");
    }
})

app.post('/delete/category/:categoryid', (req, res) => {
    if (req.session.loggedInUser) {
        const checkAdmin = 'SELECT * FROM user WHERE email=?';
        connection.query(checkAdmin, [req.session.loggedInUser], (checkErr, checkRes) => {
            if (checkErr) {
                console.log(checkErr);
                res.status(500).send("Error fetching admin")
            } else {
                if (checkRes[0].id == idAdmin) {
                    const categoryGames = 'SELECT * FROM game WHERE category=?';
                    connection.query(categoryGames, [req.params.categoryid], (checkErr2, checkRes2) => {
                        if (checkErr2) {
                            console.log(checkErr2);
                            res.status(500).send("Error fetching games")
                        } else {
                            fs.readFile('serverData.json', 'utf-8', (err, data) => {
                                if (err) {
                                    console.error("Error reading file", err);
                                    res.status(500);
                                } else {
                                    const jsonData = JSON.parse(data);
                                    for (let i=0; i<checkRes2.length; i++) {
                                        deleteDir(__dirname + '/uploads/' + checkRes2[i].id);
                                        if (checkRes2[i].id == jsonData.idRecommended) {
                                            const queryNewRec = 'SELECT id FROM game WHERE id != ? AND category != ? ORDER BY RAND() LIMIT 1';
                                            connection.query(queryNewRec, [checkRes2[i].id, req.params.categoryid], (checkErr3, checkRes3) => {
                                                if (checkErr3) {
                                                    console.log(checkErr3);
                                                    res.status(500).send("Error fetching game");
                                                } else {
                                                    jsonData.idRecommended = checkRes3[0].id + ' ';
                                                    fs.writeFile('serverData.json', JSON.stringify(jsonData, null, 2), (err) => {
                                                        if (err) {
                                                            console.error('Error writing JSON file:', err);
                                                          } else {
                                                           console.log('Recommended game updated successfully');
                                                          }
                                                    })
                                                }
                                            })
                                        }
                                    }
                                    const filePath = __dirname + '/img/categories/' + req.params.categoryid + '.png';
                                    fs.unlink(filePath, (err) => {
                                        if (err) {
                                            console.error("Error deleting img: " + err);
                                        }
                                    })
                                    const deleteCategory = 'DELETE FROM category WHERE id=?';
                                    connection.query(deleteCategory, [req.params.categoryid], (checkErr4, checkRes4) => {
                                        if (checkErr4) {
                                            console.log(checkErr4);
                                            res.status(500).send("Error deleting category");
                                        } else {
                                            res.status(200).send("Category deleted successfully");
                                        }
                                    })
                                }
                            })

                        }
                    })
                } else {
                    res.status(400).send("You are not an admin");
                }
            }
        })
    } else {
        res.status(400).send("You are not logged in");
    }
})

app.post('/add/category', upload.array('files'), (req, res) => {
    if (req.session.loggedInUser) {
        const checkAdmin = 'SELECT * FROM user WHERE email=?';
        connection.query(checkAdmin, [req.session.loggedInUser], (checkErr, checkRes) => {
            if (checkErr) {
                console.log(checkErr);
                res.status(500).send("Error fetching admin");
            } else {
                if (checkRes[0].id == idAdmin) {
                    const title = req.body.title;
                    if (title.length < 3 || title.length > 20) {
                        res.status(400).send("Invalid title length");
                        return;
                    }
                    const bgColor = req.body.bgColor;
                    if (bgColor.length != 7 || bgColor[0] != '#') {
                        res.status(400).send("Invalid background color");
                        return;
                    }
                    const nameColor = req.body.nameColor;
                    if (nameColor.length != 7 || nameColor[0] != '#') {
                        res.status(400).send("Invalid title color");
                        return;
                    }
                    if (!req.files[0]) {
                        res.status(400).send("Missing image");
                        return;
                    }
                    const icon = req.files[0].buffer;
                    const query = 'INSERT INTO category (name, bg_color, name_color) VALUES (?, ?, ?)'; 
                    connection.query(query, [title, bgColor, nameColor], (checkErr2, checkRes2) => {
                        if (checkErr2) {
                            console.log(checkErr2);
                            res.status(500).send("Couldn't insert into game");
                        } else {
                            const id = checkRes2.insertId;
                            fs.writeFile(__dirname + '/img/categories/' + id + '.png', icon, 'binary', (err) => {
                                if (err) {
                                    console.error(err);
                                    connection.query('DELETE FROM category WHERE id=?', [id]);
                                } else {
                                    res.status(200).send("Category successfully uploaded");
                                }
                            })
                        }
                    })
                } else {
                    res.status(400).send("You are not an admin");
                }
            }
        })
    } else {
        res.status(400).send("You are not logged in");
    }
})

app.post('/update/category/:categoryid', upload.array('files'), (req, res) => {
    if (req.session.loggedInUser) {
        const checkAdmin = 'SELECT * FROM user WHERE email=?';
        connection.query(checkAdmin, [req.session.loggedInUser], (checkErr, checkRes) => {
            if (checkErr) {
                console.log(checkErr);
                res.status(500).send("Error fetching admin");
            } else {
                if (checkRes[0].id == idAdmin) {
                    const title = req.body.title;
                    const bgColor = req.body.bgColor;
                    const nameColor = req.body.nameColor;
                    if (title.length < 3 || title.length > 20) {
                        res.status(400).send("Invalid title length");
                        return;
                    }
                    if (req.files[0]) {
                        fs.writeFile(__dirname + '/img/categories/' + (req.params.categoryid) + '.png', req.files[0].buffer, 'binary', (err) => {
                            if (err) {
                                console.log(err);
                            }
                        });
                    }
                    const queryUpdate = 'UPDATE category SET name=?, bg_color=?, name_color=? WHERE id = ?';
                    connection.query(queryUpdate, [title, bgColor, nameColor, req.params.categoryid], (checkErr, checkRes) => {
                        if (checkErr) {
                            console.log(checkErr);
                            res.status(500).send("Error updating category");
                        } else {
                            res.status(200).send("Category updated successfully");
                        }
                    })
                } else {
                    res.status(400).send("You are not an admin");
                }
            } 
        })
    } else {
        res.status(400).send("You are not logged in");
    }
})

app.post('/update/game/:gameid', encoder, (req, res) => {
    if (req.session.loggedInUser) {
        const checkAdmin = 'SELECT * FROM user WHERE email=?';
        connection.query(checkAdmin, [req.session.loggedInUser], (checkErr, checkRes) => {
            if (checkErr) {
                console.log(checkErr);
                res.status(500).send("Error fetching admin");
            } else {
                if (checkRes[0].id == idAdmin) {
                    const title = req.body.title;
                    const description = req.body.description;
                    const category = req.body.category;
                    if (title.length < 3 || title.length > 20) {
                        res.status(400).send("Invalid title length");
                        return;
                    }
                    if (description.length > 400) {
                        res.status(400).send("Invalid description length");
                        return;
                    }
                    const queryUpdate = 'UPDATE game SET title=?, description=?, category=? WHERE id=?';
                    connection.query(queryUpdate, [title, description, category, req.params.gameid], (checkErr2, checkRes2) => {
                        if (checkErr2) {
                            console.log(checkErr2);
                            res.status(500).send("Error updating game");
                        } else {
                            res.status(200).send("Game updated successfully");
                        }
                    })
                } else {
                    res.status(400).send("You are not an admin");
                }
            } 
        })
    } else {
        res.status(400).send("You are not logged in");
    }
})

app.get('/logout', (req, response) => {
    req.session.destroy();
    response.send("Logged out");
})

app.listen(8080);