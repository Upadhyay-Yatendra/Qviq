import React from 'react'
import Alert from 'react-bootstrap/Alert';

function Alertmst(props) {
    if(props.msg)
    return (
        <Alert variant="danger" onClose={() => props.setMsg("")} dismissible>
            <strong>{props.msg}</strong>
        </Alert>
    )
}

export default Alertmst