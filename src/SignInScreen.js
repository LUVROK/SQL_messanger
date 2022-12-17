import './App.css';
import React, { useState, useEffect } from "react";
import Profile from './Profile';
// import Chat from './Chat';
// import CarsList from './.store/constainers/users-list';
// import { connect } from 'react-redux';
// import { useNavigate, useResolvedPath } from "react-router-dom";

function SignInScreen() {
    const [user, setUser] = useState([{ email: '', password: '', token: '' }]);
    const [success, setSuccess] = useState(false);
    const [Qtoken, setQToken] = useState(false);

    useEffect(() => {
        if (localStorage.token !== null) {
            localStorage.token !== undefined ? console.log('Токен существует') : console.log('Токена не существует');
            console.log(localStorage.token);
            user.token = Math.random().toString(32);
        }
    }, [])

    useEffect(() => {
        CheckUser()
    }, [success]);

    const CheckUser = () => {
        if (success === true) {
            if (localStorage.token === undefined) {
                if (Qtoken === false) {
                    localStorage.token = user.token;
                }
                else {
                    user.token = localStorage.token;
                }
                console.log(localStorage.token);
                window.location.reload();
            }
            else {
                console.log(localStorage.token)
            }
        }
    }

    const setInput = (e) => {
        const { name, value } = e.target;
        // console.log(value)
        setUser(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleAddFormSubmit = (event) => {
        event.preventDefault(); //предотврощение обновление страницы?? рендер
    };

    const OperationDataBase = async (check) => {
        const newData = await fetch(`/${check}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ...user
            })
        })
            .then(res => res.json());
        console.log(newData);
        if (check === 'PoiskUserCheck' && newData.length !== 0) {
            localStorage.token = newData[0].token;
            setQToken(true);
        }
        else {
            setQToken(false);
        }
        if (newData.length !== 0) {
            localStorage.setItem('email', newData[0].email);
            localStorage.setItem('password', newData[0].password_user);
            console.log(localStorage.email + ' - ' + localStorage.password)
        }
        (newData.length !== 0) ? setSuccess(true) : setSuccess(false)
    }

    const exit = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        console.log('токен удален - ' + localStorage.token);
        setSuccess(false);
        window.location.reload();
        setQToken(false);
    }

    return (
        <div className="App">
            {localStorage.token !== undefined ? (
                <div>
                    <Profile />
                    <div className="App">
                        <div className="divcont">
                            <button onClick={() => exit()} className='SearchCreate SignIn'>----Exit</button>
                        </div>
                    </div>
                </div>
            )
                :
                (
                    <div>
                        <div onSubmit={handleAddFormSubmit} className='App'>
                            <input placeholder='email' name='email' onChange={setInput} className='inputB'></input>
                            <input placeholder='password' name='password' onChange={setInput} className='inputB'></input>
                        </div>
                        <div>
                            <div className="divcont">
                                <button onClick={() => OperationDataBase('CreateUser')} className='SearchCreate SignIn'>Create User</button>
                                <button onClick={() => OperationDataBase('PoiskUserCheck')} className='SearchCreate'>SignIn</button>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default SignInScreen;