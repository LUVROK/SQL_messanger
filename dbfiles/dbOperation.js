const config = require('./dbConfig'),
    sql = require('mssql');

//
// dbReactDemographics
//

// получение всех пользователей с именем firstname (передан в функцию) из таблицы на странице Home
const getEmployees = async (firstname) => {
    try {
        let pool = await sql.connect(config);
        let employees = await pool.request().query(`Select * from dbReactDemographics WHERE firstname = '${firstname}'`)
        console.log(employees)
        return employees;
    }
    catch (error) {
        console.log(error)
    }
}

// получение всех данных из таблицы на странице Home
const getalldata = async () => {
    try {
        let pool = await sql.connect(config);
        let employees = await pool.request().query(`Select * from dbReactDemographics`)
        // console.log(employees)
        return employees;
    }
    catch (error) {
        console.log(error)
    }
}

// изменение данных в таблице на странице Home
const updateUserData = async (Employee) => {
    try {
        let pool = await sql.connect(config);
        let employees = pool.request()
            .query(`update dbReactDemographics 
            SET firstname = '${Employee.firstname}', lastname = '${Employee.lastname}', age = ${Employee.age}, gender = '${Employee.gender}'
            WHERE id = ${Employee.id}`)
        // console.log(employees)
        return employees;
    }
    catch (error) {
        console.log(error)
    }
}

// создание пользователя в таблице на странице Home
const createEmployees = async (Employee) => {
    try {
        let pool = await sql.connect(config);
        let employees = pool.request()
            .query(`insert into dbReactDemographics values 
        (${Employee.id}, '${Employee.firstname}', '${Employee.lastname}', ${Employee.age}, '${Employee.gender}', '${Employee.token}')
        `)
        console.log(employees)
        return employees;
    }
    catch (error) {
        console.log(error)
    }
}

//
// USERS
//

// создание пользователя в таблице users
const CreateUserData = async (Employee) => {
    try {
        let pool = await sql.connect(config);
        if (Employee.email != null && Employee.password.length >= 8) {
            await pool.request()
                .query(`insert into users values 
        ('${Employee.email}', '${Employee.password}', '${Employee.token}')
        `)
        }
        return false;
        // console.log(employees)
    }
    catch (error) {
        console.log(error);
        return true;
    }
}

// Поиск пользователя в таблице users ДЛЯ ВХОДА с параметрами where
const PoiskUserCheck = async (Employee) => {
    try {
        let pool = await sql.connect(config);
        let employees = await pool.request()
            .query(`select * from users where email = '${Employee.email}' AND password_user = '${Employee.password}'`)
        // console.log(employees)
        return employees;
    }
    catch (error) {
        console.log(error)
    }
}

//
//
//

//
const PoiskUserChat = async (Employee) => {
    try {
        console.log(Employee.email)
        let pool = await sql.connect(config);
        let employees = await pool.request()
            .query(`select email, id from users where email LIKE '${Employee.email}%'`)
        console.log(employees)
        return employees;
    }
    catch (error) {
        console.log(error)
    }
}

const PoiskAllUserChat = async (Employee) => {
    try {
        console.log(Employee.tokenFrom)
        let pool = await sql.connect(config);
        let employees = await pool.request()
            .query(`select email, id from users where token != '${Employee.tokenFrom}'`)
        console.log(employees)
        return employees;
    }
    catch (error) {
        console.log(error)
    }
}

const sendMessegesFunc = async (Employee) => {
    try {
        console.log(Employee.emailTo, '   ', Employee.emailFrom, '   ', Employee.messeges.messeges);
        let pool = await sql.connect(config);
        await pool.request().query(`insert into messeges values ('${Employee.emailFrom}', '${Employee.emailTo}','${Employee.messeges.messeges}',CURRENT_TIMESTAMP);`);
        let employees = await pool.request().query(`select * from messeges where from_user_id = '${Employee.emailFrom}' AND to_user_id = '${Employee.emailTo}'
        OR from_user_id = '${Employee.emailTo}' AND to_user_id = '${Employee.emailFrom}'
        ORDER BY date_massage ASC;`)
        // select from messeges where email = '${Employee.emailFrom}' 
        console.log(employees)
        return employees;
    }
    catch (error) {
        console.log(error);
        console.log(Employee.emailTo, '   ', Employee.emailFrom, '   ', Employee.messeges.messeges);
    }
}

const getmessegesFunc = async (Employee) => {
    try {
        console.log(Employee.emailTo, '   ', Employee.emailFrom);
        let pool = await sql.connect(config);
        let employees = await pool.request().query(`select * from messeges where from_user_id = '${Employee.emailFrom}' AND to_user_id = '${Employee.emailTo}'
        OR from_user_id = '${Employee.emailTo}' AND to_user_id = '${Employee.emailFrom}'
        ORDER BY date_massage ASC;`)
        // select from messeges where email = '${Employee.emailFrom}' 
        console.log(employees)
        return employees;
    }
    catch (error) {
        console.log(error);
    }
}





module.exports = {
    getEmployees,
    createEmployees,
    getalldata,
    CreateUserData,
    PoiskUserCheck,
    updateUserData,
    PoiskUserChat,
    PoiskAllUserChat,
    sendMessegesFunc,
    getmessegesFunc
}