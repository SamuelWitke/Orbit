import { changeLocation } from '../models/ui';
export const startGame = () => (dispatch, getState, { send }) => {
    send(changeLocation);
};

