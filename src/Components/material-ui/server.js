var mysql = require('mysql');
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const cors = require('cors')
app.use(bodyParser.json());
app.use(cors())
const port = 8000

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '',
    database: 'park idea',
    port: '3306'
});

connection.connect(function (err) {
    if (!err) {
        console.log("Database is connected");
    } else {
        console.log("Error connecting database", err);
    }
});


//app.get('/', (req, res) => res.send('Hello World!'))

app.post('/signup', (req, res) => {
    let { f_name, l_name, email, password, } = req.body

    var sql = `INSERT INTO signup (f_name, l_name, email,password) VALUES ('${f_name}', '${l_name}','${email}','${password}')`;
    connection.query(sql, (err, result) => {
        if (err) {
            console.log('Errrrrrrrrrrrrrrrrrrrrrrrrrr', err)
            res.status(500).send(JSON.stringify({ error: err, status: 500 }))
        } else {
            console.log("1 record inserted");
            res.status(200).send({ data: req.body, status: 200 })
        }
    });
})

app.post('/signin', (req, res) => {
    let {
        email,
        password } = req.body

    //  var sql = 'SELECT * FROM customers WHERE address = ' + mysql.escape(adr);
    var sql = 'SELECT * FROM signup WHERE email = ' + mysql.escape(email) + 'and password= ' + mysql.escape(password);
    //  var sql ='SELECT * FROM signup WHERE email_id = ? and password= ?';

    connection.query(sql, [email][password], (err, result) => {
        if (err) {
            console.log('Errrrrrrrrrrrrrrrrrrrrrrrrrr', err)
            res.status(500).send(JSON.stringify({ error: err, status: 500 }))
        }
        else {
            if (result.length > 0) {
                console.log("loign success");
                res.status(200).send({ data: result[0], status: 200 })
            }
            else {
                console.log("email and pass dont match");
                res.status(500).send({ error: 'email and pass dont match', status: 204 })
                //res.status(204).send({ data: req.body, status: 204 })
            }
        }

    });
})


app.post('/parkIdea', (req, res) => {
    let { user_id, name, title, description, } = req.body

    var sql = `INSERT INTO idea (user_id, user_name, idea_title, description) VALUES ('${user_id}', '${name}','${title}','${description}')`;
    connection.query(sql, (err, result) => {
        if (err) {
            console.log('Errrrrrrrrrrrrrrrrrrrrrrrrrr', err)
            res.status(500).send(JSON.stringify({ error: err, status: 500 }))
        } else {
            console.log("1 record inserted");
            res.status(200).send({ data: req.body, status: 200 })
        }
    });
})

app.post('/getIdea', (req, res) => {


    //  var sql = 'SELECT * FROM customers WHERE address = ' + mysql.escape(adr);
    var sql = 'SELECT * FROM  idea ORDER BY idea_id desc';
    //  var sql ='SELECT * FROM signup WHERE email_id = ? and password= ?';

    connection.query(sql, (err, result) => {
        if (err) {
            console.log('Errrrrrrrrrrrrrrrrrrrrrrrrrr', err)
            res.status(500).send(JSON.stringify({ error: err, status: 500 }))
        }
        else {
            if (result.length > 0) {
                console.log("idea fetch success");
                res.status(200).send({ data: result, status: 200 })
                //console.log(result)
            }
            else {
                console.log("unable to fetch ideas");
                res.status(500).send({ error: 'unable to fetch ideas', status: 204 })
                //res.status(204).send({ data: req.body, status: 204 })
            }
        }

    });
})


app.post('/getProfile', (req, res) => {
    let {
        user_id 
              } = req.body

    //  var sql = 'SELECT * FROM customers WHERE address = ' + mysql.escape(adr);
    var sql = 'SELECT * FROM signup WHERE user_id = ' + mysql.escape(user_id);
    //  var sql ='SELECT * FROM signup WHERE email_id = ? and password= ?';

    connection.query(sql, [user_id], (err, result) => {
        if (err) {
            console.log('Errrrrrrrrrrrrrrrrrrrrrrrrrr', err)
            res.status(500).send(JSON.stringify({ error: err, status: 500 }))
        }
        else {
            if (result.length > 0) {
                console.log("data fetched");
                res.status(200).send({ data: result[0], status: 200 })
            }
            else {

                console.log("unable to fetch");
                res.status(500).send({ error: 'email and pass dont match', status: 204 })
                //res.status(204).send({ data: req.body, status: 204 })
            }
        }

    });
})

app.post('/updateProfile', (req, res) => {

    let {user_id,f_name, l_name, email, password} = req.body

    //UPDATE signup SET f_name="Dpak",l_name="yes" WHERE User_id=1

    
    var sql = 'UPDATE signup SET f_name =' + mysql.escape(f_name) + ', l_name = ' + mysql.escape(l_name) + ', email = ' + mysql.escape(email) + ', password = ' + mysql.escape(password)
    'WHERE user_id =' + mysql.escape(user_id);
   
    

    connection.query(sql,[f_name][l_name][email][password][user_id],(err, result) => {
        if (err) {
            console.log('Errrrrrrrrrrrrrrrrrrrrrrrrrr', err)
            res.status(500).send(JSON.stringify({ error: err, status: 500 }))
        } else {
            console.log("profile edited");
            res.status(200).send({ data: req.body, status: 200 })
        }
    });
})


app.post('/deleteIdea', (req, res) => {

    let {
        idea_id
        } = req.body
              

    //  var sql = 'SELECT * FROM customers WHERE address = ' + mysql.escape(adr);
    var sql = 'DELETE from idea where idea_id ='+ mysql.escape(idea_id);
    //  var sql ='SELECT * FROM signup WHERE email_id = ? and password= ?';

    connection.query(sql, [idea_id], (err, result) => {
        if (err) {
            console.log('Errrrrrrrrrrrrrrrrrrrrrrrrrr', err)
            res.status(500).send(JSON.stringify({ error: err, status: 500 }))
        }
        else {
            console.log("idea deleted");
            res.status(200).send({ data: req.body, status: 200 })
        }

    });
})

app.post('/searchIdea', (req, res) => {


    let {
        SearchKeyWord
        } = req.body

    //  var sql = 'SELECT * FROM customers WHERE address = ' + mysql.escape(adr);
   
    //
  
    //  var sql ='SELECT * FROM signup WHERE email_id = ? and password= ?';4
    console.log('SearchKeyWord', SearchKeyWord)
    connection.query(`SELECT * FROM idea where idea_title like '%${SearchKeyWord}%'` ,(err, result)=>{

    //connection.query(sql,(err, result)=> {
        if (err) {
            console.log('Errrrrrrrrrrrrrrrrrrrrrrrrrr', err)
            res.status(500).send(JSON.stringify({ error: err, status: 500 }))
        }
        else {
            if (result.length > 0) {
                console.log("idea fetch success");
                res.status(200).send({ data: result, status: 200 })
                //console.log(result)
            }
            else {
                console.log("unable to fetch ideas");
                res.status(200).send({ error: 'no idea found', status: 204 })
                //res.status(204).send({ data: req.body, status: 204 })
            }
        }

    });
})


app.post('/updatedIdea', (req, res) => {

    let {idea_id,
        idea_title,
        description} = req.body

    //UPDATE signup SET f_name="Dpak",l_name="yes" WHERE User_id=1

    //UPDATE idea SET idea_title ="soban" , description ="waraich" WHERE idea_id =42

  //  var sql = 'UPDATE idea SET idea_title =' + mysql.escape(idea_title) + ', description =' + mysql.escape(description) + 'WHERE idea_id =' + mysql.escape(idea_id);
   
   // 'UPDATE collegeusers SET printCount = ? WHERE userid = ?', [printCount, userid]
   //connection.query(sql,[idea_title][description][idea_id],(err, result)

    connection.query('UPDATE idea SET idea_title = ?, description = ? WHERE idea_id = ?',[idea_title,description,idea_id],(err, result) => {
        if (err) {
            console.log('Errrrrrrrrrrrrrrrrrrrrrrrrrr', err)
            res.status(500).send(JSON.stringify({ error: err, status: 500 }))
        } else {
            console.log("idea updated");
            res.status(200).send({ data: req.body, status: 200 })
        }
    });
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))