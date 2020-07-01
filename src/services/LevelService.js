import http from '../http-common'

const createLevel = (roleId,level) => {
    http.post(`/role/${roleId}/level`,level);
}

const updateLevel = (roleId, levelId, level) => {
    http.put(`/role/${roleId}/level/${levelId}`,level);
}

const deleteLevel = (roleId,levelId) => {
    http.delete(`/role/${roleId}/level/${levelId}`);
}


const getLevel = (roleId,levelId) => {
    
    http.get(`/role/${roleId}/level/${levelId}`).then( res => {

    })
}

export default {
    getLevel,
    getLevelsAll,
    createLevel,
    updateLevel,
    deleteLevel,
}