import React from 'react'
import {getConstraintsAll,createConstraint,deleteConstraint} from '../services/ConstraintService';
import { useState, useEffect } from 'react';
{/*
    props include : [ props.roledid, props.levelid ]
*/}
export default function Level(props) {

    const [constraintList, setconstraintList] = useState([]);
    const [reupload, setreupload] = useState(false);

    const fetchConstraintList =  () => {
        getConstraintsAll().then(res => {
            console.log(res);
            setconstraintList(res.data);
        })
    } 
    
    useEffect(() => {
        fetchConstraintList();
    },[reupload]);

    useEffect(() => {
        fetchConstraintList();
    }, []);


    return (
        <div>
          <Paper elevation={3}>
                <Typography variant="h3">{`LEVEL ID: ${props.levelid}`}</Typography>
                <Typography variant="h3">{`ACCESS CONTROL MODEL : ${props.model}`}</Typography>
                <div>

                </div>
          </Paper>
        </div>
    );
}

export default Levels;
