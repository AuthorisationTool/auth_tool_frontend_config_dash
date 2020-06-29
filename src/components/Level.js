import React from 'react'
import { useState, useEffect } from 'react';
{/*
    props include : [ props.roledid, props.levelid ]
*/}
export default function Level(props) {

    const [constraintList, setconstraintList] = useState([]);
    const [reupload, setreupload] = useState(false);
    const [roleid, setroleid] = useState(props.roleid);

    const fetchLevelList =  () => {
        axios.get(`http://192.168.1.104/policy/role/${props.roleid}/level/${props.levelid}/constraint`).then(res => {
        console.log(res);
        setlevelList(res.data)});
      }

    useEffect(() => {
        fetchLevelList()
    }, [roleid]);

    useEffect(() => {
        fetchLevelList()
    }, []);


    return (
        <div>
          <Paper elevation={3}>

            

          </Paper>
        </div>
    );
}

export default Levels;
