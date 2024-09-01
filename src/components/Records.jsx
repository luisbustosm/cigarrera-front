import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { environment } from '../environment';

export const Records = () => {

  const location = useLocation();
  const [records, useRecords] = useState([]);
  const [loading, useLoading] = useState(true);
  const [success, setSuccess] = useState(true);

  const onInit = async() => {
    try {
      // Acceder a los datos enviados
      const { added } = location.state || false;

      const response = await fetch(`${environment.baseUrl}/puffs`);

      if (!response.ok) {
          useLoading(false);
          throw new Error('Ocurrió un error ' + response.statusText);
      }

      const responseData = await response.json();

      setSuccess(added);
      useLoading(false);
      useRecords(responseData.result);
    }catch (error) {
        useLoading(false);
    }
  };

  useEffect(() => {
    onInit();
  }, []);

  const formatDate = (date) => {
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();

    // Formato de hora en 24 horas
    const timeOptions = {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false, // Usa formato de 24 horas
    };
    const timeFormatter = new Intl.DateTimeFormat('es-ES', timeOptions);
    const formattedTime = timeFormatter.format(date);

    // Formato de fecha
    const dateOptions = {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    };
    const dateFormatter = new Intl.DateTimeFormat('es-ES', dateOptions);
    const formattedDate = dateFormatter.format(date).replace(/\//g, '-'); // Cambiar las barras por guiones

    // Construcción de la cadena de fecha
    const dayOfWeekOptions = { weekday: 'long' };
    const dayOfWeekFormatter = new Intl.DateTimeFormat('es-ES', dayOfWeekOptions);
    const dayOfWeek = dayOfWeekFormatter.format(date);

    const datePart = isToday ? `Hoy ${formattedDate}` : `${dayOfWeek} ${formattedDate}`;
    const formattedDateWithTime = `${datePart} a las ${formattedTime}`;

    return formattedDateWithTime;
  }

    return <>
    <div className="row mt-5">
        <div className="col">
            <h1 className="text-secondary">Registros 📘</h1>
        </div>
    </div>
    <div className="row mt-5">
    <div className="col">
  {loading 
    ? (
      <div className='text-center'>
        <div className="spinner-border" role="status"></div>
      </div>
    ) 
    : (
      <>
        {success && <div className="alert alert-success mt-5" role="alert">
                    Se agregó un cigarro a tu registro.
                </div>}
        <table className="table table-striped">
          <tbody>
            { 
              records.map(r => (
                <tr key={ r._id }>
                  <td className='p-3'>Fumaste 1 🚬 {formatDate(new Date(r.createdAt))}</td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </>
    )
  }
</div>

    </div>
    </>
};