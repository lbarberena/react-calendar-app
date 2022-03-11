import moment from 'moment';
import {types} from "../types/types";


const initialState = {
    events: [{
        id: new Date().getTime(),
        title: 'Reunión importante',
        start: moment().toDate(),
        end: moment().add(2, 'hours').toDate(),
        bgcolor: '#fafafa',
        notes: 'Sobre react',
        user: {
            _id: '123',
            name: 'Leonel',
        }
    }],
    activeEvent: null,
};

export const calendarReducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case types.eventAddNew:
            return {
                ...state,
                events: [ ...state.events, action.payload ],
            };

        case types.eventSetActive:
            return {
                ...state,
                activeEvent: action.payload,
            };

        case types.eventClearActiveEvent:
            return {
                ...state,
                activeEvent: null,
            };

        case types.eventUpdate:
            return {
                ...state,
                events: state.events.map( event => (event.id === action.payload.id) ? action.payload : event ),
            };

        case types.eventDeleted:
            return {
                ...state,
                events: state.events.filter( event => (event.id !== state.activeEvent.id) ),
                activeEvent: null,
            };

        default:
            return state;
    }
};
