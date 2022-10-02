const
    path = require( 'path' ),
    { BrowserWindow, systemPreferences  } = require( 'electron' ),
    
    size = {
        width: 800,
        height: 600
    }

class ControlWindow {

    ref = null

    show = commands => {
        this.commands = commands
        
        this.ref = new BrowserWindow({ 
                ...size,
                backgroundColor: systemPreferences.getColor( 'window' ),
                show: false,
                webPreferences: {
                    nodeIntegration: true,
                    preload: path.join( __dirname, 'preload.js' )
                }
            })

        this.ref.removeMenu()
        this.ref.loadFile( `modules/controlWindow/window.html` )
        
        this.ref.webContents.on( 'dom-ready', () => {
            this.ref.show()
        })
    }

}

module.exports = new ControlWindow()