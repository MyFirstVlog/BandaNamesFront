import React, { useContext, useState } from 'react'
import { SocketContext } from '../context/SocketContext'

export const BandAdd = () => {

  const [value, setValue] = useState("")

  const {socket} = useContext(SocketContext);

  const onSubmit = (e) => {
    e.preventDefault();
    socket.emit('agregar-banda', value);
    setValue('');
  }

  return (
    <>
    <h3>Agregar Banda</h3>
    <form onSubmit={onSubmit}>
        <input 
            onChange={(ev) => setValue(ev.target.value)}
            value={value}
            type='text'
            className='form-control'
            placeholder='Nuevo nombre de banda'
        />
    </form>
    </>
  )
}