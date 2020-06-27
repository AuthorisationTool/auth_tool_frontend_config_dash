import http from '../http-common'

function deleteRole(roleId) {
     http.delete(`/role/${roleId}`);
}


function updateRole(roleId,role) {
    http.put(`/role/${roleId}`,role);
}

/*function getRole(roleId) {
    http.get(`/role/${roleId}`);
}

function getRolesAll() {
    http.get("/role");
}*/

function createRole(role) {
    http.post("/role",role);
}

export default {
    createRole,
    updateRole,
    deleteRole,
}