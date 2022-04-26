import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UpdateUser = () => {
    const {id} = useParams();
    const [user, setUser] = useState({});
    useEffect( () => {
        const url = `http://localhost:5000/user/${id}`;
        fetch(url)
        .then(res => res.json())
        .then(data => setUser(data))
    }, []);

    const handleUpdateUser = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;

        const user = {name, email};

        // Post data to server side 
        const url = `http://localhost:5000/user/${id}`

        fetch(url,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log('data sending success', data)
            alert('User successfully updated')
            event.target.reset();
        })
    }
    return (
        <div>
            <h2>Updating Users: {user.name}</h2>
            <p>Email: {user.email}</p>
            <form onSubmit={handleUpdateUser}>
                <input type="text" name='name' placeholder='Name' required/>
                <br />
                <input type="email" name='email' placeholder='Email' required/>
                <br />
                <input type="submit" value="Submit" />
            </form>

        </div>
    );
};

export default UpdateUser;