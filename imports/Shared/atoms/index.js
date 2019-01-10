import React from 'react';
import OrbitalWrapper from './OrbitalWrapper';
import Planetoid from './Planetoid';
import PlanetoidStripe from './PlanetoidStripe';

export default () => (
    <OrbitalWrapper containerSize={30}>
        <Planetoid fill="#9400D3" radius={31}>
            <PlanetoidStripe angle={220} length={7} offset={25} />
        </Planetoid>
        <Planetoid fill="#EE82EE"
            radius={6}
            positionRadius={30}
            positionAngle={56}
            orbitAnimationDuration={7} />
        <Planetoid
            fill="#9932CC"
            radius={6}
            positionRadius={38}
            positionAngle={-50}
            orbitAnimationDuration={4}
            orbitAnimationDelay={2}
        />
        <Planetoid
            fill="#E97B7D"
            radius={4}
            positionRadius={42}
            positionAngle={45}
            orbitAnimationDuration={8}
        />
    </OrbitalWrapper>
)