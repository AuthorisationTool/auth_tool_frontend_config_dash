import http from '../http-common'

export async function getConstraintsAll(roleid,levelid){
    await http.get(`/role/${roleid}/level/${levelid}`);
}

export async function createConstraint(roleid,levelid,constraint){
    await http.post(`/role/${roleid}/level/${levelid}/constraint`,{
        "id": `${constraint.id}`,
        "permission_or_action": `${constraint.permission_or_action}`,
        "constraint_type": `${constraint.type}`,
        "specific_type": `${constraint.name}`,
        "arg": `${constraint.arg}`
    });
}

export async function deleteConstraint(roleid,levelid,id){
    await http.delete(`/role/${roleid}/level/${levelid}/constraint/${id}`);
}

