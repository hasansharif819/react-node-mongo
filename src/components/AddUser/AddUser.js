import React from 'react';

const AddUser = () => {
    const handleUser = event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;

        const user = {name, email};

        // Post data to server side 
        fetch('http://localhost:5000/user',{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body:JSON.stringify(user)
        })
        .then(res => res.json())
        .then(data => {
            console.log('data sending success', data)
            alert('New user successfully added')
            event.target.reset();
        })
    }
    return (
        <div>
            <h1>Add New User</h1>
            <form onSubmit={handleUser}>
                <input type="text" name='name' placeholder='Name' required/>
                <br />
                <input type="email" name='email' placeholder='Email' required/>
                <br />
                <input type="submit" value="Submit" />
            </form>
        </div>
    );
};

export default AddUser;