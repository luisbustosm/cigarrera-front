import { useState, useEffect } from 'react';
import { environment } from '../environment'

export const Home = () => {

    const [countRecords, setCountRecords] = useState([]);
    const [countRecordsToday, setCountRecordsToday] = useState([]);
    const [countRecordsYesterday, setCountRecordsYesterday] = useState([]);
    const [startDate, setStartDate] = useState([]);
    const [cost, setCost] = useState(0);
    const [loading, setLoading] = useState(true);
  
    const onInit = async() => {
      try {
        let response = await fetch(`${environment.baseUrl}/puffs?today=true`);
  
        if (!response.ok) {
            setLoading(false);
            throw new Error('Ocurrió un error ' + response.statusText);
        }
  
        let responseData = await response.json();

        const countRecordsTodayValue = responseData.result.length;

        setCountRecordsToday(countRecordsTodayValue);

        response = await fetch(`${environment.baseUrl}/puffs`);
  
        if (!response.ok) {
            setLoading(false);
            throw new Error('Ocurrió un error ' + response.statusText);
        }
  
        responseData = await response.json();
  
        setCountRecords(responseData.result.length);
        setStartDate(new Date(responseData.result[responseData.result.length-1].createdAt).toLocaleDateString())
        

        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);

        response = await fetch(`${environment.baseUrl}/puffs?yesterday=true`);
  
        if (!response.ok) {
            setLoading(false);
            throw new Error('Ocurrió un error ' + response.statusText);
        }
  
        responseData = await response.json();

        setCountRecordsYesterday(responseData.result.length);

        setCost((countRecordsTodayValue * 1000) / 20);
        
        setLoading(false);
      }catch (error) {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      onInit();
    }, []);

    return <>
        <div className="row mt-5">
            <div className="col">
                <h1 className="text-secondary">¡Hola Maria! 👋</h1>
            </div>
        </div>
        {loading ? 
        <div className="row mt-5">
            <div className='text-center'><div className="spinner-border" role="status"></div></div>
        </div>
        :
        <div className="row mt-5">
            <div className="col-12 col-sm-6">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Cantidad de cigarros en el día</h5>
                        <h4 className="card-text">Hoy has fumado { countRecordsToday } 🚬. ¡Tú puedes!</h4>
                    </div>
                </div>
            </div>
            <div className="col-12 col-sm-6 mt-5 mt-sm-0">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Descubrimiento</h5>
                        <h4 className="card-text">
                            { countRecordsYesterday > countRecordsToday 
                            ? <p>Has fumado { countRecordsYesterday - countRecordsToday } cigarros menos que ayer. ¡Felicitaciones! 🥳</p>
                            : countRecordsYesterday < countRecordsToday 
                            ? <p>Has fumado { countRecordsToday - countRecordsYesterday} cigarros más que ayer. ¡Puedes hacerlo mejor! 😥</p>
                            : <p>Has fumado la misma cantidad que ayer 💆</p>}
                        </h4>
                    </div>
                </div>
            </div>
            <div className="col-12 col-sm-6 mt-5">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Cantidad total de cigarros</h5>
                        <h4 className="card-text">Desde el { startDate } hasta hoy has fumado { countRecords } 🚬</h4>
                    </div>
                </div>
            </div>
            <div className="col-12 col-sm-6 mt-5 mt-sm-5 mt-0">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Dinero diario ahorrado</h5>
                        <h4 className="card-text">
                            Fumabas 40 cigarros a un costo de $2.000. Hoy has fumado { countRecordsToday } 🚬 y
                            llevas gastado ${ cost } generando un ahorro de ${ (2000 - cost).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") } 💸.
                        </h4>
                    </div>
                </div>
            </div>
        </div>
        }
    </>
};