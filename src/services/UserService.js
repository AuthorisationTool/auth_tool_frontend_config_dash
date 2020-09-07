import axios from 'axios';

export async function deleteUser(userid){
    await axios.delete(`http://localhost:8080/users/${userid}`);
}

export async function createUser(user){
    await axios.post('http://localhost:8080/users',{
        name: `${user.name}`,
        mobility: `${user.mobility}`,
        confidence: `${user.confidence}`,
        memberOf: `${user.memberOf}`
    });
}