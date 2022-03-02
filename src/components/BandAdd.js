import React, { useState } from 'react'

export const BandAdd = ({agregar}) => {

  const [value, setValue] = useState("")

  const onChange = (e) => {
    const value = e.target.value;

    setValue(value);
  }

  const onSubmit = (e) => {
    e.preventDefault();
    agregar(value);
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
