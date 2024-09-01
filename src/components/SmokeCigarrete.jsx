import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { environment } from '../environment';


export const SmokeCigarrete = () => {

    const navigate = useNavigate();
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSmoke = async() => {
        try {
            setLoading(true);
            setSuccess(false);
            setError(false);
            const response = await fetch(`${environment.baseUrl}/puffs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: null
            });
    
            if (!response.ok) {
                setLoading(false);
                setSuccess(false);
                setError(true);
                throw new Error('Ocurrió un error ' + response.statusText);
            }

            navigate('/records', { state: { added: true } });
            return;

        } catch (error) {
            setLoading(false);
            setSuccess(false);
            setError(true);
        }

    };

    return <>
        <div style={{ height: '70vh' }} className="d-flex justify-content-center align-items-center">
            <div>
                <h1 className="text-center">¿Estás seguro de que deseas fumar un cigarro?</h1>
                <div className="text-center">
                    {loading ?(
                    <div className="spinner-border" role="status"></div>) :
                    (<button onClick={ onSmoke } type="button" className="btn btn-warning btn-lg mt-5"><i className="bi bi-plus-circle"></i> Si, fumaré un cigarro 😔</button>) }
                </div>

                { !loading && success && (<div className="alert alert-success mt-5" role="alert">
                    Se agregó un cigarro a tu registro.
                </div>) }

                { !loading && error && (<div className="alert alert-danger mt-5" role="alert">
                    Ocurrió un error.
                </div>) }

            </div>
        </div>
    </>

};