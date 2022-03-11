import React, {useEffect, useState} from 'react';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import Swal from 'sweetalert2';
import '../../styles.css';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { uiCloseModal } from '../../actions/uiActions';
import {eventAddNew, eventClearActiveEvent, eventUpdated} from "../../actions/eventsActions";

const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
};

Modal.setAppElement('#root');

const startDate = moment().minutes(0).seconds(0).add(1, 'hours');

const endDate = startDate.clone().add(1, 'hours');

const initEvent = {
    title: '',
    notes: '',
    start: startDate.toDate(),
    end: endDate.toDate(),
};

export const CalendarModal = () => {

    const dispatch = useDispatch();

    const { modalOpen } = useSelector( state => state.ui );

    const { activeEvent } = useSelector( state => state.calendar );

    const [ startDateValue, setStartDateValue ] = useState(startDate.toDate());

    const [ endDateValue, setEndDateValue ] = useState(endDate.toDate());

    const [ formValues, setFormValues ] = useState( initEvent );

    const [ titleValid, setTitleValid ] = useState(true);

    const { notes, title, start, end } = formValues;

    useEffect( () => {
        if ( activeEvent ) {
            setFormValues(activeEvent);
        } else {
            setFormValues( initEvent );
        }
    }, [activeEvent]);

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value,
        });
    };

    const closeModal = () => {
        dispatch( uiCloseModal() );
        dispatch( eventClearActiveEvent() );
        setFormValues( initEvent );
    };

    const afterOpenModal = () => {};

    const handleStartDateChange = (e) => {
        setStartDateValue(e);
        setFormValues({
            ...formValues,
            start: e,
        });
    };

    const handleEndDateChange = (e) => {
        setEndDateValue(e);
        setFormValues({
            ...formValues,
            end: e,
        });
    };

    const handleSubmitForm = (e) => {
        e.preventDefault();

        const momentStart = moment( start );
        const momentEnd = moment( end );

        if ( momentStart.isSameOrAfter( momentEnd ) ) {
            Swal.fire({
                title: 'Error',
                text: 'La fecha de fin debe ser mayor a la de inicio',
                icon: 'error',
                showConfirmButton: true,
                showCloseButton: true,
            });
            return;
        }

        if ( title.trim().length < 2 ) {
            return setTitleValid(false);
        }

        if ( activeEvent ) {
            dispatch( eventUpdated( formValues ) );
        } else {
            dispatch( eventAddNew({
                ...formValues,
                id: new Date().getTime(),
                user: {
                    _id: '123',
                    name: 'Leonel',
                }
            }) );
        }

        setTitleValid(true);
        closeModal();
    };

    return (
        <Modal
            isOpen={ modalOpen }
            onAfterOpen={ afterOpenModal }
            onRequestClose={ closeModal }
            style={ customStyles }
            closeTimeoutMS={ 200 }
            className='modal'
            overlayClassName='modal-fondo'>

            { activeEvent ? <h1> Editar evento </h1> : <h1> Nuevo evento </h1>}
            <hr/>
            <form className="container" onSubmit={ handleSubmitForm }>

                <div className="form-group">
                    <label>Fecha y hora inicio</label>
                    <DateTimePicker className='form-control' onChange={ handleStartDateChange } value={ start } />
                </div>

                <div className="form-group">
                    <label>Fecha y hora fin</label>
                    <DateTimePicker minDate={ startDateValue } className='form-control' onChange={ handleEndDateChange } value={ end } />
                </div>

                <hr/>
                <div className="form-group">
                    <label>Titulo y notas</label>
                    <input
                        type="text"
                        className={ `form-control ${ (!titleValid && 'is-invalid') || ((titleValid && title.trim().length >= 2) && 'is-valid') }` }
                        placeholder="Título del evento"
                        name="title"
                        autoComplete="off"
                        value={ title }
                        onChange={ handleInputChange }
                    />
                    <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
                </div>

                <div className="form-group">
                    <textarea
                        type="text"
                        className="form-control"
                        placeholder="Notas"
                        rows="5"
                        name="notes"
                        value={ notes }
                        onChange={ handleInputChange }
                    ></textarea>
                    <small id="emailHelp" className="form-text text-muted">Información adicional</small>
                </div>

                <button type="submit" className="btn btn-outline-primary btn-block">
                    <i className="far fa-save"></i>
                    <span> Guardar</span>
                </button>

            </form>
        </Modal>
    )
}
