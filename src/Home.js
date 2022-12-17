// import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from "react";
// import reactTable from 'react-table';
// import { columns } from '../dbfiles/columns';

function Home() {

    const [returnedData, setReturnedData] = useState([]);
    const [employee, setEmployee] = useState([{ id: 0, firstname: '', lastname: '', age: 0, gender: '' }]);

    useEffect(() => {
        (async () => {
            const newData = await fetch('/alldata', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    ...employee
                })
            })
                .then(res => res.json())
            console.log(newData);
            setReturnedData(newData)
            console.log(returnedData)
        })()

    }, []); // срабатывает 1 раз при загрузке, если убрать [] будет срабатывать при рендеренге, то бишь постоянно обновляться, если поместить 
    //туда переменную usestate то будет срабаывать при ее изменении

    const handleAddFormSubmit = (event) => {
        event.preventDefault(); //предотврощение обновление страницы?? рендер
    };

    //при введении данных сразу добавляются в addFormData, для input add
    const setInput = (e) => {

        const { name, value } = e.target;
        // console.log(value)
        if (name === 'id' || name === 'age') {
            setEmployee(prevState => ({
                ...prevState,
                [name]: parseInt(value) //id или age преобразуем в инт
            }));
            return;
        }
        setEmployee(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    // поиск данных в таблице dbReactDemographics
    const fetchData = async () => {
        console.log(returnedData);
        const newData = await fetch('/api', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                name: employee.firstname
            })
        })
            .then(res => res.json())
        console.log(newData);
        setReturnedData(newData)
        console.log(returnedData)
    }

    const operationdbReactDemographics = async (check) => {
        console.log(employee);
        const newData = await fetch(`/${check}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                ...employee
            })
        })
            .then(res => res.json())
        console.log(newData);
        setReturnedData(newData)
        console.log(returnedData)
    }


    return (
        <div className="App">
            <div onSubmit={handleAddFormSubmit} className='App'>
                <input type="number" pattern="[0-9]*" placeholder='id' name='id' onChange={setInput} className='inputB'></input>
                <input placeholder='firstname' name='firstname' onChange={setInput} className='inputB'></input>
                <input placeholder='lastname' name='lastname' onChange={setInput} className='inputB'></input>
                <input type="number" pattern="[0-9]*" placeholder='age' name='age' onChange={setInput} className='inputB'></input>
                <input placeholder='gender' name='gender' onChange={setInput} className='inputB'></input>
                <div className="divcont">
                    <div className='SearchCreateWITH'>
                        <button onClick={() => fetchData()} className='SearchCreate'>Поиск</button>
                        <button onClick={() => operationdbReactDemographics('hello')} className='SearchCreate Create'>Создать</button>
                        <button onClick={() => operationdbReactDemographics('alldata')} className='SearchCreate'>Все данные</button>
                        <button onClick={() => operationdbReactDemographics('update')} className='SearchCreate'>Обновить данные</button>
                    </div>
                </div>
            </div>

            <div className='tablediv'>
                <table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>firstname</th>
                            <th>lastname</th>
                            <th>age</th>
                            <th>gender</th>
                        </tr>
                    </thead>
                    <tbody>
                        {returnedData.map((data, i) => (
                            <tr key={i}>
                                <td>{data.id}</td>
                                <td>{data.firstname}</td>
                                <td>{data.lastname}</td>
                                <td>{data.age}</td>
                                <td>{data.gender}</td>
                            </tr>
                        ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
}


export default Home;
