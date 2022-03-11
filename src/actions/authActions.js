import {fetchWithoutToken, fetchWithToken} from '../helpers/fetch';
import { types } from '../types/types';
import Swal from 'sweetalert2';

export const startLogin = ( email, password ) => {
    return async ( dispatch ) => {
        const response = await fetchWithoutToken('auth', { email, password }, 'POST');
        const body = await response.json();

        if ( body.ok ) {
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( login({ uid: body.uid, name: body.name }));
        } else {
            await Swal.fire({
                title: 'Error',
                text: body.msg,
                icon: 'error',
                showCloseButton: true,
                showConfirmButton: true,
                showCancelButton: false,
            });
        }
    };
};

const login = ( user ) => ({
    type: types.authLogin,
    payload: user,
});

export const startRegister = ( email, name, password ) => {
    return async ( dispatch ) => {
        const response = await fetchWithoutToken('auth/new', { email, password, name }, 'POST');
        const body = await response.json();

        if ( body.ok ) {
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( login({ uid: body.uid, name: body.name }));
        } else {
            await Swal.fire({
                title: 'Error',
                text: body.msg,
                icon: 'error',
                showCloseButton: true,
                showConfirmButton: true,
                showCancelButton: false,
            });
        }
    };
};

export const startChecking = () => {
    return async ( dispatch ) => {
        const response = await fetchWithToken('auth/renew', {}, 'GET');
        const body = await response.json();

        if ( body.ok ) {
            localStorage.setItem( 'token', body.token );
            localStorage.setItem( 'token-init-date', new Date().getTime() );

            dispatch( login({ uid: body.uid, name: body.name }));
        } else {
            await Swal.fire({
                title: 'Error',
                text: body.msg,
                icon: 'error',
                showCloseButton: true,
                showConfirmButton: true,
                showCancelButton: false,
            });
            dispatch( checkingFinished() );
        }
    };
};

const checkingFinished = () => ({ type: types.checkingFinished });
