import axios from 'axios'

export default axios.create({
    baseURL: "http://192.168.1.104:8080/policy",
    headers: {
    "Content-type": "application/json"
  }
})