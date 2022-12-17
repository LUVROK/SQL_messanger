import './App.css';
import './Chat';
import React, { useState, useEffect, useRef } from "react";
import { Scrollbar } from "react-scrollbars-custom";


function Chat() {
    const [poisk, setPoisk] = useState({ email: '', tokenFrom: localStorage.token });
    const [returnedData, setReturnedData] = useState([]);
    const [chat_with_user, SetChat_With_User] = useState([{ emailTo: '', emailFrom: localStorage.email, messeges: '' }]);
    const [messeges, setMesseges] = useState([]);
    const [returnedDataMesseges, setReturnedDataMesseges] = useState([]);


    const handleAddFormSubmit = (event) => {
        event.preventDefault(); //предотврощение обновление страницы?? рендер
    };

    useEffect(() => {
        funcSendPOST('PoiskAllData');
        chat_with_user.emailFrom = localStorage.email;
        if (localStorage.lastEmailTo !== undefined) {
            chat_with_user.emailTo = localStorage.lastEmailTo;
        }
    }, [])

    const setInput = (e) => {
        const { name, value } = e.target;
        // console.log(value)
        setPoisk(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const setInputMesseges = (e) => {
        const { name, value } = e.target;
        // console.log(value)
        setMesseges(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const funcSendPOST = async (check) => {
        const newData = await fetch(`/${check}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ...poisk
            })
        })
            .then(res => res.json());
        console.log(newData + '4444444444');
        setReturnedData(newData);

        // if (check === 'PoiskUserCheck' && newData.length !== 0) {
        //     localStorage.token = newData[0].token;
        //     setQToken(true);
        // }
        // else {
        //     setQToken(false);
        // }
        // if (newData.length !== 0) {
        //     localStorage.setItem('email', newData[0].email);
        //     localStorage.setItem('password', newData[0].password_user);
        //     console.log(localStorage.email + ' - ' + localStorage.password)
        // }
        // (newData.length !== 0) ? setSuccess(true) : setSuccess(false)
    }

    const hundleClickChat = (email) => {
        chat_with_user.emailTo = email;
        console.log(chat_with_user.emailTo);
        setPoisk(email);
        getMesseges();
        localStorage.setItem('lastEmailTo', chat_with_user.emailTo);
    }

    const getMesseges = async () => {
        const newData = await fetch('/getmesseges', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ...chat_with_user
            })
        })
            .then(res => res.json());
        console.log(newData);
        setReturnedDataMesseges(newData);
        scrollToBottom();
    }

    const sendMesseges = async () => {
        chat_with_user.messeges = messeges;
        console.log(chat_with_user.emailTo);
        console.log(chat_with_user.emailFrom);
        console.log(chat_with_user.messeges.messeges);
        const newData = await fetch('/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ...chat_with_user
            })
        })
            .then(res => res.json());
        console.log(newData);
        setReturnedDataMesseges(newData);
        scrollToBottom();
    }

    const messagesEnd = useRef(null)

    const scrollToBottom = () => {
        messagesEnd.current.scrollIntoView({ behavior: "smooth" }); // если убрать бихейвер плавности не будет это плюс
    }

    const something = (event) => {
        if (event.keyCode === 13) {
            sendMesseges()
        }
    }

    return (
        <div className="App">
            {localStorage.token !== undefined ? (
                <div className='chatContainer'>
                    <div className='logoChat'>ChatIK</div>

                    <div className='intefaceChat'>
                        <div className='friends'>
                            <div className='texth1'>Список друзей</div>
                            <div onSubmit={handleAddFormSubmit}>
                                <input placeholder='найти пользователя' name='email' onChange={setInput} className='inputChat'></input>
                            </div>
                            <div className="divcont">
                                <div className='SearchCreateWITH'>
                                    <button className='SearchCreate' onClick={() => funcSendPOST('Poisk')}>Поиск</button>
                                </div>
                            </div>
                            <Scrollbar style={{ width: '98%', height: '70%' }}>
                                {returnedData.map((data, i) => (

                                    <div key={i} className='divDataStylePoiskEmail'>
                                        <div className='dataStylePoiskEmail'>
                                            <div className='emailChat'>{data.email}</div>
                                            <div className="chatButton">
                                                <button className="ButtonSama" onClick={() => hundleClickChat(data.email)}>Чат</button>
                                            </div>
                                        </div>
                                        {/* <div className='dataStylePoiskEmail'>{data.id}</div> */}
                                    </div>

                                ))

                                }
                            </Scrollbar>

                        </div>
                        <div className='chat'>
                            <div className='chatMessages'>
                                <div style={{ marginTop: '10px' }}>Чат с {chat_with_user.emailTo}</div>
                                <Scrollbar style={{ width: '100%', height: '80%', margin: '0', padding: '0', marginTop: '20px' }}>
                                    {returnedDataMesseges.map((data, i) => (
                                        data.from_user_id === localStorage.email ?
                                            (
                                                <div key={i} className='StyleMessege FromUser'>
                                                    <div>{data.messeges}</div>
                                                </div>)
                                            :
                                            (
                                                <div key={i} className='StyleMessege ToUser'>
                                                    <div>{data.messeges}</div>
                                                </div>
                                            )
                                    ))
                                    }
                                    <div ref={messagesEnd} className='dicP'></div>
                                </Scrollbar>

                            </div>

                            <div className='messegesChat'>
                                <div onSubmit={handleAddFormSubmit} className='handleAddFormSubmit'>
                                    <input onKeyDown={(e) => something(e)} placeholder='написать сообщение' name='messeges' onChange={setInputMesseges} className='inputChat inputChatMessages'></input>
                                </div>

                                <div className="chatButton ButtonMassegesdiv">
                                    <button type="submit" className="ButtonMasseges" onClick={() => sendMesseges()}>send</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
                : (
                    <div>
                        Ты не вошел в аккаунт
                    </div>
                )
            }
        </div>
    );
}

export default Chat;