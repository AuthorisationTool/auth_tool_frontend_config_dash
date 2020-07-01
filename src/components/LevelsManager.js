import React, {useState,useEffect} from 'react'
import Level from '../components/Level';
import axios from 'axios';
import { Paper } from '@material-ui/core'
export default function LevelsManager(props) {
    
    const [levels, setlevels] = useState([]);
    const [roleid, setroleid] = useState(props.location.state.roleid);

    useEffect(() => {
      fetchLevelsList();
    },[]);

    useEffect(() => {
        fetchLevelsList();
      }, [roleid]);

    const fetchLevelsList = () => {
        axios.get(`http://192.168.1.104:8080/policy/role/${props.location.state.roleid}/level`).then( res => {
            console.log(res);
            setlevels(res.data);
        })
        }
    
    return (
        
        <>
            {levels.map(level => {
                return (<Level 
                roleid={props.location.state.roleid}
                levelid={level.id}
                model={level.acm.modelName}/>);
            })
            }
        </>
    )
}
