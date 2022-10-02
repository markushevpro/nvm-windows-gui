const 
    exec = require( 'child_process' ).exec,
    MsgBox = require( '../msgbox/msgbox' )

class Admin {

    check = ( cb ) => {
        exec( 'NET SESSION', function( err, so, se ) {
            cb ( se.length === 0 )
        })
    }

    close = () => {
        MsgBox.error(
            process.env.NODE_ENV === 'production'
                ? "Please restart the application with admin rights"
                : "Please restart your IDE or Terminal with admin rights",
            () => process.exit()
        )
    }
}

module.exports = new Admin()