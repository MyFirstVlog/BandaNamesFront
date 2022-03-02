import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

import { BandAdd } from './components/BandAdd';
import { BandList } from './components/BandList';

const connectSocketServer = () => {
  const socket = io('http://localhost:8080',{
    transports: ['websocket']
  });
  return socket;
}

function App() {

  const [socket] = useState(connectSocketServer());
  const [online, setOnline] = useState(false);
  const [bands, setBands] = useState([]);

  useEffect(() => {
    console.log({socket})
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on('connect', () => {
      setOnline(true);
    } )
  }, [socket]);

  useEffect(() => {
    socket.on('disconnect', () => {
      setOnline(false);
    } )
  }, [socket])

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

  const agregarBanda = (nombre) => {
    console.log('agregar-banda', nombre);
    socket.emit('agregar-banda', nombre);
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
            <BandAdd
              agregar={agregarBanda}
            />
        </div>
      </div>
    </div>
  );
}

export default App;
