const 
    path = require( 'path' ),
    { BrowserWindow, screen, ipcMain } = require('electron'),

    size = {
        width: 300,
        height: 100,
        offset: 20
    }

class Notifier {

    _init = false
    list = []

    init = () => {
        ipcMain.on( 'close', ( _, id ) => {
            const
                index = this.list.findIndex( item => item.id === id )

            this.list[index].win.close()
            this.list.splice( index, 1 )
            this.updatePositions()
        })

        this._init = true
    }

    getMainScreen = () => {
        const
            main = screen.getPrimaryDisplay()

        return main.workArea
    }

    updatePositions = () => {
        const
            screen = this.getMainScreen()

        this.list.forEach(( item, index ) => {
            item.win.setPosition( item.win.getBounds().x, screen.y + screen.height - size.height * ( index + 1 ) - size.offset * index - size.offset, )
        })
    }

    show = ({ title, text, id }) => {
        const
            finalId = id ?? Math.random().toString(36).substr(2, 9),
            screen = this.getMainScreen(),
            win = new BrowserWindow({ 
                ...size,
                id: finalId,
                x: screen.x + screen.width - size.width - size.offset,
                y: screen.y + screen.height - size.height * ( this.list.length + 1 ) - size.offset * this.list.length - size.offset,
                show: false,
                frame: false,
                skipTaskbar: true,
                alwaysOnTop: true,
                focusable: false,
                webPreferences: {
                    devTools: true,
                    nodeIntegration: true,
                    preload: path.join( __dirname, 'preload.js' )
                }
            })

        win.webContents.on( 'dom-ready', () => {
            win.webContents.send( 'notify', { title, text, id: finalId })
            win.show()
        })

        win.loadFile( `modules/notifier/notification.html` )
        this.list.push({ id: finalId, win })

        ;( !this._init ) && ( this.init() )
    }

    remove = id => {

    }

}

module.exports = new Notifier()