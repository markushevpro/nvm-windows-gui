const 
    fs = require( 'fs' ),
    electron = require( 'electron' ),
    { ControlWindow } = require( './modules' )

const originalErrorBox = electron.dialog.showErrorBox

electron.dialog.showErrorBox = ( title, content ) => {
    fs.writeFile( `${process.cwd()}/last-box-error.log`, `ERRBOX: ${title}: ${content}`, { flag: 'w' }, () => {
        originalErrorBox( title, content )
    })
}

const
    app = electron.app,
    { Admin, Commands, Menu, Tray } = require( './modules' )

app.on( 'ready', () => {
    Admin.check( isAdmin => {
        if ( !isAdmin ) {
            Admin.close()
        } else {
            Tray.init()
            Commands.setWindow( ControlWindow )
            Menu.init( Commands )

            Tray.setMenu( Menu )
            Menu.loadData()
        }
    })
})

app.on( 'window-all-closed', () => {
    //;( process.platform !== 'darwin' ) && ( app.quit() )
})

app.on( 'activate', () => {
    //?
})