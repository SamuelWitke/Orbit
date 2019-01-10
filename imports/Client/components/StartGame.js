import React from 'react';
import styled from 'styled-components';
import { start} from '../../Shared/actions/ui';
import { connect } from 'react-redux';

const Button = styled.h1`
  text-align: center; 
  background: #400080;
  border: 1px solid #ddd;
  color: white;
  border-radius: 25px;
  cursor: pointer;
`;

const StartButton = ({start}) =>(
    <Button onClick={() => start('/game') }>
        Start Game
    </Button>
)

export default connect(
    null,
    (dispatch) => ({start: (location) => dispatch(start(location))})

)(StartButton);