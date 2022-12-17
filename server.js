const express = require('express'),
    Employee = require('./dbfiles/employee'),
    dbOperation = require('./dbfiles/dbOperation'),
    cors = require('cors');

// var sql = require("mssql/msnodesqlv8")

const API_PORT = process.env.PORT || 5000;
const app = express();

let client;
let session;
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

//
// dbReactDemographics
//

// поиск данных по firstname в таблице dbReactDemographics
app.post('/api', async (req, res) => {
    console.log('called');
    const result = await dbOperation.getEmployees(req.body.name);
    res.send(result.recordset);
});

// поиск всех данных в таблице dbReactDemographics
app.post('/alldata', async (req, res) => {
    console.log('called');
    const result = await dbOperation.getalldata();
    res.send(result.recordset);
});

// создание данных в таблице dbReactDemographics
app.post('/hello', async (req, res) => {
    console.log('called');
    await dbOperation.createEmployees(req.body);
    const result = await dbOperation.getalldata();
    res.send(result.recordset);
});

// dbReactDemographics, функция update
app.post('/update', async (req, res) => {
    console.log('called');
    await dbOperation.updateUserData(req.body); // сначала обновлям данные без возвращения результата
    const result = await dbOperation.getalldata(); // потом получаем все данные из таблицы dbReactDemographics на страницу Home
    res.send(result.recordset); // передаем результат чтобы его можно было вывести и обратиться к этим данным
});

//
// USERS
//

// поиск пользователя в БД, надо для входа и для создания пользователя в таблице users
app.post('/PoiskUserCheck', async (req, res) => {
    console.log('called');
    const result = await dbOperation.PoiskUserCheck(req.body);
    res.send(result.recordset);
});

// создание пользователя в таблицу users и поиск пользователя для входа (дополнительная проверка на то создался ли пользователь, если данные не вернутся войти никак нельзя)
app.post('/CreateUser', async (req, res) => {
    const error = await dbOperation.CreateUserData(req.body);
    if (!error) {
        const result = await dbOperation.PoiskUserCheck(req.body);
        console.log('called');
        res.send(result.recordset);
    }
});

//
// Firends Chat
//

app.post('/Poisk', async (req, res) => {
    const result = await dbOperation.PoiskUserChat(req.body);
    console.log('called');
    res.send(result.recordset);
});

app.post('/PoiskAllData', async (req, res) => {
    const result = await dbOperation.PoiskAllUserChat(req.body);
    console.log('called');
    res.send(result.recordset);
});

app.post('/send', async (req, res) => {
    const result = await dbOperation.sendMessegesFunc(req.body);
    console.log('called');
    if (req.body.emailFrom != undefined && req.body.emailTo != undefined && req.body.messeges.messeges != undefined) {
        res.send(result.recordset);
    }
});

app.post('/getmesseges', async (req, res) => {
    const result = await dbOperation.getmessegesFunc(req.body);
    if (req.body.emailFrom != undefined && req.body.emailTo != undefined) {
        res.send(result.recordset);
    }
});

// let Pam = new Employee(1002, 'Pam', 'Beezley', 29, 'Female');
// dbOperation.createEmployees(Pam);

app.listen(API_PORT, () => console.log(`listening on Port ${API_PORT}`));