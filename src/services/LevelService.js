import http from '../http-common'

export const createLevel = (roleId,id,model) => {
    http.post(`/role/${roleId}/level`,{
        id: `${id}`,
        levelModel: `${model}`
    });
}

export const updateLevel = (roleId, levelId, level) => {
    http.put(`/role/${roleId}/level/${levelId}`,level);
}

export const deleteLevel = (roleId,levelId) => {
    http.delete(`/role/${roleId}/level/${levelId}`);
}


export const getLevel = (roleId,levelId) => {
    
    http.get(`/role/${roleId}/level/${levelId}`).then( res => {

    })
}
