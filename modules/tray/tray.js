const
    path = require( 'path' ),
    electron = require( 'electron' ),
    { Tray, Menu } = electron,
    Icons = require( '../icons/icons' ),
    Notifier = require( '../notifier/notifier' ),

    defaultIcon = Icons.default,
    defaultTooltip = 'NVM GUI'

class TrayIcon {

    ref = null

    init = () =>
        {
            this.ref = new Tray( defaultIcon )

            const 
                defMenu = Menu.buildFromTemplate([
                    { label: "Loading...", type: "normal", enabled: false },
                    { type: "separator" },
                    { label: 'Exit', type: 'normal', click: () => electron.app.quit() }
                ])

            this.ref.setToolTip( defaultTooltip )
            this.ref.setContextMenu( defMenu )
        }

    setMenu = menu => {
        const
            menuRef = menu.assign( this )
        
        this.ref.setContextMenu( menuRef )
    }

    loading = () => this.ref.setImage( Icons.loading )

    notify = ( key, value ) => {
        console.log( `notification: ${key} = ${value}` )

        switch ( key ) {
            case 'notify':                
                const id = Math.random().toString(36).substr(2, 9)
                Notifier.show({ title: `NVM GUI`, text: `Test notification ${id}`, id })
                break

            case 'installed':
                Notifier.show({ title: `Node v${value}`, text: "Installation completed", icon: Icons.default })
                //this.ref.displayBalloon({ title: `Node v${value}`, content: "Installation completed", icon: path.join(process.cwd(), "./nvmgui.png") })
                break

            case 'version':
                ;( value !== 'No version' ) && ( this.ref.setToolTip( `${defaultTooltip} — ${value}` ))
                break

            case 'status':
                switch ( value ) {
                    case 'on':
                        this.ref.setImage( Icons.on )
                        break

                    case 'off':
                        this.ref.setImage( Icons.off )
                        this.ref.setToolTip( `${defaultTooltip} — Off`)
                        break

                    default:
                        this.ref.setImage( Icons.default )
                }
                break

            default:
                //Do nothing
        }
    }
}

module.exports = new TrayIcon()