import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    const [users, setUers] = useState([]);
    useEffect( () => {
        fetch('http://localhost:5000/user')
        .then(res => res.json())
        .then(data => setUers(data))
    },[])

    const handleDeleteUser = id => {
        const proceed = window.confirm('Are you sure to delete user');
        if(proceed){
            console.log('deleting user id', id);
            const url = `http://localhost:5000/user/${id}`
            fetch(url, {
                method: "DELETE"
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if(data.deletedCount > 0){
                    const remaining = users.filter(user => user._id !== id)
                    setUers(remaining);
                }
            })
        }
    }
    return (
        <div>
            <h2>This is home page</h2>
            <h3>Available Users: {users.length}</h3>
            {
                users.map(user => <li
                     key={user._id}>
                         Name: {user.name}::Email: {user.email}
                         <Link to={`/update/${user._id}`}><button>Update</button></Link>
                         <button onClick={()=>handleDeleteUser(user._id)}> Delete User </button>
                     </li>)
            }
        </div>
    );
};

export default Home;