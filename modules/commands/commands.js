const
    electron = require( 'electron' ),
    MsgBox = require( '../msgbox/msgbox' ),
    CLI = require( '../cli/cli' )

class Commands {

    current = false
    installed = []
    available = []

    setWindow = wnd => this.controlWindow = wnd

    list = {
        close: () => electron.app.quit(),

        notify: ({ callback}) => callback(),

        configure: () => {
            this.controlWindow.show( this )
        },

        on: ({ callback }) => {
            CLI.on(() => {
                ;( callback ) && ( callback( true ))
            })
        },

        off: ({ callback }) => {
            CLI.off(() => {
                ;( callback ) && ( callback( false ))
            })
        },

        toggle: ({ callback }) => {
            ;( this.current )
                ? this.list.off({ callback })
                : this.list.on({ callback })
        },

        current: ({ callback }) => {
            CLI.current( result => {
                if ( result.split( ' ' )[0].toLowerCase() === 'no' ) {
                    this.current = false
                    callback( 'No version' )
                } else {
                    this.current = result.substr( 1 ).trim()
                    callback( this.current )
                }
            })
        },

        list: ({ callback }) => {
            CLI.list( result => {
                const
                    res = result.split( '\n' ).map( line => line.split( '(' )[0].replace( /[^0-9\.\n]/gi, '' )).filter( item => !!item )

                this.installed = res                    
                callback( res )
            })
        },

        available: ({ callback }) => {
            CLI.available( result => {
                let
                    res = []
                
                result.replace( /[^0-9\.\|\n]/gi, '' ).split( '\n' ).forEach( line => line.split( '|' ).forEach( ver => ( !!ver.trim() && ver !== '..' ) && res.push( ver.trim() )))

                res = res.filter( item => !this.installed.includes( item )).sort(( a, b ) => parseInt( b ) - parseInt( a ))

                this.available = res
                callback( res )
            })
        },

        availableFull: ({ callback }) => {
            CLI.available( result => {
                let
                    res = [],
                    split = result.trim().split( '\n' ),
                    types = split.splice( 0, 2 )[0].trim().split( '|' ).filter( type => !!type ).map( type => type.trim() ),
                    lines = split.map( line => line.split( '|' ).filter( v => !!v ).map( v => v.trim() ))

                lines.pop()

                lines.forEach( line => {
                    line.forEach(( version, index) => {
                        res.push({
                            version,
                            type: types[index]
                        })
                    })
                })
                    
                callback( res.sort(( a, b ) => types.indexOf( a.type ) - types.indexOf( b.type )))
            })
        },

        set: ({ callback, version }) => {
            CLI.use( 
                version,
                callback
            )
        },

        install: ({ callback, version }) => {
            CLI.install(
                version,
                callback
            )
        },

        uninstall: ({ callback, version }) => {
            CLI.uninstall(
                version,
                callback
            )
        },

        openFolder: () => {
            CLI.root(result => {
                CLI.run( `start "" "${result.split( ': ' )[1]}"`, () => {})
            })
        }
    }

    run = ( command, args ) => {
        if ( !this.list[command] ) {
            MsgBox.error( `Command "${command}" not found` )
            return
        }

        this.list[command]( args )
    }

    defer = ( command, args ) => () => {
        this.run( command, args )
    }

    getCurrent = () => this.current
}

module.exports = new Commands()