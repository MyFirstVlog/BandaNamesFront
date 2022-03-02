import React, { useEffect, useState } from 'react';

import { BandAdd } from './components/BandAdd';
import { BandList } from './components/BandList';
import { useSocket } from './hooks/useSocket';

function App() {
  const [bands, setBands] = useState([]);

  const {socket, online} = useSocket('http://localhost:8080');

  useEffect(() => {
    socket.on('current-bands', (bands) => {
      console.log(bands)
      setBands(bands);
    } )
  }, [socket])

  const votar = (id) => {
    console.log('votar-app', id);
    socket.emit('votar-banda', id);
  }

  const eliminarBanda = (id) => {
    console.log('eliminar-app', id);
    socket.emit('eliminar-banda', id);
  }

  const cambiarNombre = (id,nombre) => {
    console.log('cambiar-nombre', id);
    socket.emit('cambiar-nombre', {id,nombre});
  }
  

  return (
    <div className="container">
      <div className="alert">
        <p>
          Service Status: 
          {
            online  ? 
            <span className="text-success">Online</span>
                    :
            <span className="text-danger">Offline</span>
          }
        </p>
      </div>
      <h1>BandNames</h1>
      <hr />

      <div className='row'> 
        <div className='col-8'>
            <BandList 
              data={bands}
              votar={votar}
              eliminar={eliminarBanda}
              cambiar={cambiarNombre}
            />
        </div>
        <div className='col-4'>
            <BandAdd />
        </div>
      </div>
    </div>
  );
}

export default App;
