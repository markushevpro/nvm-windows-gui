const 
    { contextBridge } = require('electron'),
    Commands = require( '../commands/commands' )

contextBridge.exposeInMainWorld( 'api', {
    remove: ( version, callback ) => {
        Commands.run( 'uninstall', { version, callback })
    },
    use: ( version, callback ) => {
        Commands.run( 'set', { version, callback })
    },
    install: ( version, callback ) => {
        Commands.run( 'install', { version, callback })
    },
    available: callback => {
        Commands.run( 'availableFull', { callback })
    },
    installed: callback => {
        Commands.run( 'list', { callback })
    },
    current: callback => {
        Commands.run( 'current', { callback })
    },
})