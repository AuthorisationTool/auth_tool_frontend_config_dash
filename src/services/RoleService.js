import http from '../http-common'

export function deleteRole(roleId) {
     http.delete(`/role/${roleId}`);
}


export function updateRole(roleId,role) {
    http.put(`/role/${roleId}`,role);
}

/*function getRole(roleId) {
    http.get(`/role/${roleId}`);
}

function getRolesAll() {
    http.get("/role");
}*/

export function createRole(rolename,argument,classification)  {

    switch(argument){

        case 'web_application':
        case 'business_plan':
        case 'contracts':
        case 'client_records':
        case 'financial_document': classification = 'type'; break;

        case 'administrative':
        case 'business': classification = 'category'; break;

        case 'very_sensitive':
        case 'sensitive':
        case 'only_internal_use':
        case 'business_external_use':
        case 'public_use' : classification = 'sensitivity'; break;

        default: classification = 'type'; break;
    }
    

    http.post("/role",{
        "roleName": `${rolename}`,
        "classification": `${classification}`,
        "classificationArg": `${argument}`
    });
}


