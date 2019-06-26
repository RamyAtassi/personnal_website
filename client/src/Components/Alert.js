import React from 'react';
import { Alert } from 'reactstrap';

const Msg = (props) => {

    return(
      <Alert color={props.alertType}>
          {props.msg}
      </Alert>
    )

};


export default Msg;
