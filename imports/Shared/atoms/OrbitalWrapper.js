import PropTypes from 'prop-types';
import styled from 'styled-components';

const OrbitalWrapper = styled.div`
  width: ${props => props.containerSize || 10}vw;
  height: ${props => props.containerSize || 10}vw;
  position: relative;
  margin: auto;
`;

OrbitalWrapper.propTypes = {
  containerSize: PropTypes.number,
};

export default OrbitalWrapper;