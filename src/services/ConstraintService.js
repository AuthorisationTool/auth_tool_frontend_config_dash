import http from '../http-common'

export function getConstraintsAll(roleid,levelid){
    http.get(`/role/${roleid}/level/${levelid}`);
}

