import React, { useState } from 'react'
import { useSocket } from '../hooks/useSocket'

export const BandAdd = () => {

  const [value, setValue] = useState("")

  const {socket} = useSocket('http://localhost:8080')

  const onChange = (e) => {
    const value = e.target.value;

    setValue(value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    socket.emit('agregar-banda', value);
  }

  return (
    <>
    <h3>Agregar Banda</h3>
    <form onSubmit={onSubmit}>
        <input 
            onChange={onChange}
            value={value}
            type='text'
            className='form-control'
            placeholder='Nuevo nombre de banda'
        />
    </form>
    </>
  )
}
