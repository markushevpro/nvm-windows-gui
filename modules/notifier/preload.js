const 
    { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld( 'api', {
    close: id => ipcRenderer.send( 'close', id ),
    listen: ( key, cb ) => ipcRenderer.on( key, ( _, args ) => {
        console.log( 'preload', args )
        cb( args )
    })
})