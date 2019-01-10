import { changeLocation } from '../models/ui'
export const start = (location) => (dispatch, getState, { send }) => {
    send(changeLocation, {location});
};

