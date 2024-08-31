import { useState } from 'react';
import { environment } from '../environment';


export const SmokeCigarrete = () => {

    const [success, useSuccess] = useState(false);
    const [error, useError] = useState(false);
    const [loading, useLoading] = useState(false);

    const onSmoke = async() => {
        try {
            useLoading(true);
            useSuccess(false);
            useError(false);
            const response = await fetch(`${environment.baseUrl}/puffs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: null
            });
    
            if (!response.ok) {
                useLoading(false);
                useSuccess(false);
                useError(true);
                throw new Error('Ocurrió un error ' + response.statusText);
            }
    
            const responseData = await response.json();

            useLoading(false);
            useSuccess(true);
            useError(false);
        } catch (error) {
            useLoading(false);
            useSuccess(false);
            useError(true);
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