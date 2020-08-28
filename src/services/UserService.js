import axios from 'axios';

export function deleteUser(userid){
    axios.delete(`http://192.168.1.104:8080/users/${userid}`);
}

export function createUser(user){
    axios.post('http://192.168.1.104:8080/user',{
        name: `${user.name}`,
        mobility: `${user.mobility}`,
        confidence: `${user.confidence}`,
        memberOf: `${user.memberOf}`
    });
}