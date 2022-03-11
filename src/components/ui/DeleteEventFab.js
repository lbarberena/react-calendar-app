import { useDispatch } from 'react-redux';
import { eventDeleted } from '../../actions/eventsActions';

export const DeleteEventFab = () => {

    const dispatch = useDispatch();

    const handleClickDelete = () => {
        dispatch( eventDeleted() );
    }

    return (
        <button className='btn btn-danger fab-danger' onClick={ handleClickDelete }>
            <i className='fas fa-trash'></i>
            <span> Borrar Evento</span>
        </button>
    )
}
