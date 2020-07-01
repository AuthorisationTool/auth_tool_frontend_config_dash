import React from 'react'
import {Card} from 'react-bootstrap'
import {Button} from '@material-ui/core'
/*
props include [ props.roleid / props.levelid / props.id / props.type /
     props.name / props.arg / props.permission_or_action ] 
*/
export default function Constraint(props) {
    const handleUpdateConstraint = () => {
        console.log("update constraint clicked");
    }

    const handleDeleteConstraint = () => {
        console.log("update constraint clicked");
    }
 
    return (
        <>
            <Card style={{ width: '18rem' }}>
  <Card.Body>
    <Card.Title>{props.type}</Card.Title>
    <Card.Subtitle className="mb-2 text-muted">constraint ID:{props.id}</Card.Subtitle>
    <Card.Text>
        <b>{props.name}:</b> {props.arg}
        <br/>
        <b>Permission /Action :</b> {props.permission_or_action} 
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
        </>
    )
}
