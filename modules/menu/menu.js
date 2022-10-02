const
    electron = require( 'electron' ),
    { Menu } = electron

class ContextMenu {

    ref = null

    template = [
        { 
            id: 'toggle',
            label: "Loading status...", 
            enabled: false,
            command: [ 'toggle' ],
            update: [ 'status', 'currentVersion' ]
        },
        { type: "separator" },
        { 
            id: 'current',
            label: "Current: ...", 
            enabled: false 
        },
        { 
            id: 'set',
            label: "Set version", 
            submenu: [
                { 
                    id: 'loadInstalled',
                    label: "Loading installed...", 
                    enabled: false 
                },
                { 
                    id: 'install',
                    label: "Install", 
                    submenu: [
                        {
                            id: 'loadAvailable',
                            label: "Loading available...",
                            enabled: false
                        }
                    ]
                }
            ]
        },
        {
            id: 'configure',
            label: "Configure",
            command: [ 'configure' ]
        },
        { type: "separator" },
        {
            id: 'folder',
            label: "Open folder",
            command: [ 'openFolder' ]
        },
        /*{ type: "separator" },
        {
            id: 'test',
            label: 'Test notification',
            precall: () => {
                ;( this.parent ) && ( this.parent.notify( 'notify' ))
            },
            command: [ 'notify' ]
        },*/
        { type: "separator" },
        { 
            id: 'close',
            label: 'Close', 
            command: [ 'close' ]
        }
    ]

    generateArgs = config => {
        const
            res = {}

        if ( config && typeof config === 'object' && !Array.isArray( config ) && Object.keys( config ).length > 0 ) {
            Object.keys( config ).forEach( key => {
                res[key] = config[key]
            })
        }

        return res
    }

    buildTemplate = list => {
        const
            res = []

        ;( list || this.template ).forEach( item => {
            if ( item.command ) {
                item.click = () => {
                    ;( this.parent ) && ( this.parent.loading() )
                    ;( item.precall ) && ( item.precall() )

                    this.commands.run( 
                        item.command[0], 
                        {
                            callback: () => {
                                if ( item.update ) {
                                    item.update.forEach( key => {
                                        this.update[ key ]()
                                    })
                                }

                                if ( item.aftercall ) {
                                    item.aftercall()
                                }
                            },
                            ...this.generateArgs( item.command[1] )
                        }
                    )
                }
            }

            if ( item.submenu ) {
                item.submenu = this.buildTemplate( item.submenu )
            }

            res.push( item )
        })

        return res
    }

    init = commands =>
        {
            this.commands = commands
            this.rebuild()
        }

    rebuild = () => {        
        this.ref = Menu.buildFromTemplate( this.buildTemplate() )
        ;( this.parent ) && ( this.reassign() )
    }

    assign = parent => {
        this.parent = parent
        return this.ref
    }

    reassign = () => {
        this.parent.setMenu( this )
    }

    loadData = () => {
        this.update.status()
        this.update.currentVersion()
        this.update.installed(() => {
            this.update.available()
        })
    }

    findItem = ( id, list ) => {
        let
            res = null

        ;( list || this.buildTemplate() ).forEach( item => {
            if ( res ) return

            if ( item.id === id ) {
                res = item
                return
            }

            if ( item.submenu ) {
                res = this.findItem( id, item.submenu )
            }
        })

        return res
    }

    update = {
        label: ( id, label, enabled ) => {
            const
                item = this.findItem( id )

            item.label = label
            item.enabled = !!enabled

            this.rebuild()
        },

        status: () => {
            this.commands.run( 
                'current', 
                {
                    callback: version => {
                        this.update.label( 'toggle', version === 'No version' ? 'Turn on' : 'Turn off', true )
                        ;( this.parent ) && ( this.parent.notify( 'status', version === 'No version' ? 'off' : 'on' ))
                    }
                }
            )
        },

        currentVersion: () => {            
            this.commands.run( 
                'current', 
                {
                    callback: version => {
                        this.update.label( 'current', version )
                        ;( this.parent ) && ( this.parent.notify( 'version', version ))
                    }
                }
            )
        },

        preinstall: version => () => {
            const
                target = this.findItem( 'set' )

            if ( target ) {
                const
                    res = []

                target.submenu.forEach( item => {
                    res.push( item )
                })
            
                res.unshift({ 
                    id: `v-${version}`,
                    label: `Installing ${version}...`,
                    type: 'radio',
                    enabled: false
                })

                target.submenu = res

                this.rebuild()
            }
        },

        installed: cb => {
            this.commands.run( 
                'list', 
                {
                    callback: list => {
                        const
                            target = this.findItem( 'set' )

                        if ( target ) {
                            const
                                load = target.submenu.find( item => item.id === 'loadInstalled' ),
                                versions = target.submenu.filter( item => item.id.substr( 0, 2 ) === 'v-' ),
                                remove = [ load, ...versions ],
                                res = []

                            target.submenu.forEach( item => {
                                if ( !remove.includes( item ) ) {
                                    res.push( item )
                                }
                            })

                            list.forEach( version => {
                                res.unshift({ 
                                    id: `v-${version}`,
                                    label: version,
                                    type: 'radio',
                                    checked: version === this.commands.getCurrent(),
                                    command: [ 'set', { version }],
                                    update: [ 'status', 'currentVersion', 'installed' ]
                                })
                            })

                            target.submenu = res

                            this.rebuild()
                            ;( cb ) && ( cb() )
                        }
                    }
                }
            )
        },

        available: () => {
            this.commands.run( 
                'available', 
                {
                    callback: list => {
                        const
                            target = this.findItem( 'install' ),
                            top = {},
                            build = []

                        if ( target ) {
                            const
                                load = target.submenu.find( item => item.id === 'loadAvailable' ),
                                versions = target.submenu.filter( item => item.id.substr( 0, 2 ) === 'v-' ),
                                remove = [ load, ...versions ],
                                res = []

                            target.submenu.forEach( item => {
                                if ( !remove.includes( item ) ) {
                                    res.push( item )
                                }
                            })

                            list.forEach( version => {
                                const
                                    split = version.split( /\./ ),
                                    major = split[0],
                                    minor = split[1]

                                if ( !top[major] ) {
                                    top[major] = {}
                                }

                                if ( !top[major][minor] ) {
                                    top[major][minor] = []
                                }

                                top[major][minor].push( version )
                            })

                            Object.keys( top ).forEach( major => {
                                const
                                    listMajor = top[major],
                                    tmplMajor = {
                                        id: `v-major-${major}`,
                                        label: `${major}.x.x`
                                    }
                                
                                tmplMajor.submenu = Object.keys( listMajor ).map( minor => {
                                    const
                                        listMinor = top[major][minor],
                                        tmplMinor = {
                                            id: `v-minor-${minor}`,
                                            label: `${major}.${minor}.x`,
                                        }

                                    tmplMinor.submenu = Object.keys( listMinor ).map( patch => {
                                        const
                                            version = `${major}.${minor}.${patch}`

                                        return {
                                            id: `v-${version}`,
                                            label: version,
                                            precall: this.update.preinstall( version ),
                                            aftercall: () => ( ( this.parent ) && ( this.parent.notify( 'installed', version ))),
                                            command: [ 'install', { version }],
                                            update: [ 'installed', 'available' ]
                                        }
                                    })

                                    return tmplMinor
                                })

                                res.push( tmplMajor )
                            })

                            target.submenu = res

                            this.rebuild()
                        }
                    }
                }
            )
        }
    }
}

module.exports = new ContextMenu()