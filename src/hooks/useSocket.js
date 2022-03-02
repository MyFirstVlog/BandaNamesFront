import { useMemo, useEffect, useState } from 'react';
import io from 'socket.io-client';
//? es parecidoa un functional component

export const useSocket = (serverPath) => {

    //? Si server path no cambia uso use memo

    const socket = useMemo(() => io(serverPath,{
        transports: ['websocket']
      }), [serverPath]);

      const [online, setOnline] = useState(false);

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

    return {
        socket,
        online
    }
}