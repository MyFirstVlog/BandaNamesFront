import React, { useEffect, useState } from 'react'

export const BandList = ({data, votar, eliminar, cambiar}) => {
    const [bands, setBands] = useState(data)

    useEffect(() => {
        setBands(data);
    },[data])

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
     console.log(id, nombre);
     cambiar(id, nombre)
    };

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
                        onClick={() => eliminar(band.id)}
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
