import React, { useContext, useEffect, useState } from 'react'
import { SocketContext } from '../context/SocketContext'

export const BandList = () => {
    const [bands, setBands] = useState([])
    const {socket} = useContext(SocketContext);

    useEffect(() => {
        socket.on('current-bands', (bands) => {
            console.log(bands)
            setBands(bands);
          })

          return () => socket.off('current-bands');
    },[socket])

    const cambioNombre = (event,id) => {
        const nuevoNombre = event.target.value;
        //*Funcion de flecha como valor de actualizacion
        setBands(bands => bands.map(band => {
            if(band.id === id){
                band.name = nuevoNombre;
            }
            return band;
        }))
    };

    const onPerdioFoco = (id, nombre) => {
        socket.emit('cambiar-nombre', {id,nombre});
    };

    const votar = (id) => {
        console.log('votar-app', id);
        socket.emit('votar-banda', id);
    };

    const eliminarBanda = (id) => {
        console.log('eliminar-app', id);
        socket.emit('eliminar-banda', id);
    }


    const crearRows = () => {
        return (
            bands.map( band => (
            <tr key={band.id}>
                <td>
                    <button 
                        onClick={() => votar(band.id)}
                        className='btn btn-primary'>+1</button>
                </td>
                <td>
                    <input 
                        onChange={(event) => cambioNombre(event,band.id)}
                        className='form-control'
                        value={band.name}
                        onBlur={() => onPerdioFoco(band.id, band.name)}
                    />
                </td>
                <td> <h3>{band.votes}</h3> </td>
                <td>
                    <button 
                        onClick={() => eliminarBanda(band.id)}
                        className='btn btn-danger'
                    >
                        Borrar
                    </button>
                </td>
            </tr>
            ))
        )
    }

  return (
    <>
        <table 
            className='table table-stripped'
        >
            <thead>
                <tr>
                    <th></th>
                    <th>Nombre</th>
                    <th>Votos</th>
                    <th>Borrar</th>
                </tr>
            </thead>
            <tbody>
                    {crearRows()}
            </tbody>
        </table>
    </>
  )
}
