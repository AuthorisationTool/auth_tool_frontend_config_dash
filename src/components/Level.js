import React from 'react'
import {CardDeck} from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Constraint from './Constraint';
import {Paper,Typography} from '@material-ui/core';
import Axios from 'axios';
import { blue } from '@material-ui/core/colors';
{/*
    props include : [ props.roledid, props.levelid ]
*/}
export default function Level(props) {

    const [constraintList, setconstraintList] = useState([]);
   // const [reupload, setreupload] = useState(false);

    const fetchConstraintList =  () => {
      Axios.get(`http://localhost:8080/policy/role/${props.roleid}/level/${props.levelid}/constraint`).then( res =>
      setconstraintList(res.data));
    } 
    
  /*  useEffect(() => {
        fetchConstraintList();
    },[reupload]); */

    useEffect(() => {
        fetchConstraintList();
    }, []);

    const levelStyle = {
        marginBottom: 20,
        color: "blue",
    }


    return (
        <div style={levelStyle}>
          <Paper elevation={3}>
                <Typography variant="h6">{`LEVEL ID: ${props.levelid}`}</Typography>
                <Typography variant="h6">{`ACCESS CONTROL MODEL : ${props.model}`}</Typography>
                <CardDeck>
                {constraintList.map(constraint => {
                     return (<Constraint 
                    roleid={props.roleid}
                    levelid={props.levelid}
                    id={constraint.id}
                    type={constraint.constraint_type}
                    name={constraint.specific_type}
                    arg={constraint.arg}
                    permission_or_action={constraint.permission_or_action} />)
                })}
                </CardDeck>
          </Paper>
        </div>
    );
}
