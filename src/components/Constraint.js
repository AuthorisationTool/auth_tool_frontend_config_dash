import React from 'react'
import {Card} from 'react-bootstrap'
import {Button} from '@material-ui/core'
{/*
props include [ props.roleid / props.levelid / props.id / props.type / props.name / props.arg ] 
*/}
export default function Constraint(props) {
    

    return (
        <div>
            <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>{props.type}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">constraint ID:{props.id}</Card.Subtitle>
    <Card.Text>
        <b>{props.name}:</b> {props.arg}
    </Card.Text>
    <Button color="primary"
    onCLick={(event) =>
     handleUpdateConstraint(props.roleid,props.levelid,props.id)}>
         Update</Button>
    <Button color="secondary"
    onClick={(event) => handleDeleteConstraint(props.roleid,props.levelid,props.id)}
    >Delete</Button>
  </Card.Body>
</Card>
        </div>
    )
}
