import axios from 'axios';

export async function deleteUser(userid){
    await axios.delete(`http://192.168.1.104:8080/users/${userid}`);
}

export async function createUser(user){
    await axios.post('http://192.168.1.104:8080/user',{
        name: `${user.name}`,
        mobility: `${user.mobility}`,
        confidence: `${user.confidence}`,
        memberOf: `${user.memberOf}`
    });
}