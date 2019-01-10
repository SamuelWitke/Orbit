import React from 'react'
import { Icon, Label } from 'semantic-ui-react'

const LabelNames = ({ names }) => (
    <>
        {names.map( elmt => (
        <Label image>
            <img src='https://react.semantic-ui.com/images/avatar/small/ade.jpg'  alt="get Good"/>
            {elmt.get("name")}
            <Icon name='delete' />
        </Label>
     ))}
  </>
)

export default LabelNames 