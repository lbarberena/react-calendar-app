import React from 'react';
import './login.css';
import { useForm } from '../../hooks/useForm';
import { useDispatch } from 'react-redux';
import {startLogin, startRegister} from '../../actions/authActions';
import Swal from "sweetalert2";

export const LoginScreen = () => {

    const dispatch = useDispatch();

    const [ formLoginValues, handleLoginInputChange, reset ] = useForm( {
        lEmail: 'leonel@gmail.com',
        lPassword: '123456789'
    });

    const [ formRegisterValues, handleRegisterInputChange, rReset ] = useForm( {
        rEmail: 'octavio@gmail.com',
        rPassword: '123456789',
        rConfirmPassword: '123456789',
        rName: 'Octavio'
    });

    const { lEmail, lPassword } = formLoginValues;

    const { rEmail, rPassword, rConfirmPassword, rName } = formRegisterValues;

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch( startLogin( lEmail, lPassword ) );
    };

    const handleRegister = (e) => {
        e.preventDefault();

        if ( rPassword !== rConfirmPassword ) {
            return Swal.fire({
                title: 'Error',
                text: 'Contraseñas no coinciden',
                icon: 'error',
                showCancelButton: false,
                showConfirmButton: true,
                showCloseButton: true,
            });
        } else {
            dispatch( startRegister(rEmail, rName, rPassword) );
        }
    }

    return (
        <div className="container login-container">
            <div className="row">
                <div className="col-md-6 login-form-1">
                    <h3>Ingreso</h3>
                    <form onSubmit={ handleLogin }>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="lEmail"
                                value={ lEmail }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="lPassword"
                                value={ lPassword }
                                onChange={ handleLoginInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Login"
                            />
                        </div>
                    </form>
                </div>

                <div className="col-md-6 login-form-2">
                    <h3>Registro</h3>
                    <form onSubmit={ handleRegister }>
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Nombre"
                                name="rName"
                                value={ rName }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-control"
                                placeholder="Correo"
                                name="rEmail"
                                value={ rEmail }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                name="rPassword"
                                value={ rPassword }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Repita la contraseña"
                                name="rConfirmPassword"
                                value={ rConfirmPassword }
                                onChange={ handleRegisterInputChange }
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="submit"
                                className="btnSubmit"
                                value="Crear cuenta" />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
