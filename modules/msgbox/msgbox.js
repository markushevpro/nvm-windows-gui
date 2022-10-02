const
    electron = require( 'electron' ),
    { dialog } = require( 'electron' )

class MsgBox {

    show = ( type, text, buttons ) => {        
        const options = {
            type: type || 'info',
            buttons: buttons.map( btn => btn.label ),
            defaultId: 0,
            title: 'NVM GUI',
            message: text
        }
        
        dialog.showMessageBox( options ).then(( result ) => {
            const
                index = result.response

            ;( buttons[index].handler ) && ( buttons[index].handler( result ) )
        })
    }

    error = ( text, callback ) => {
        this.show( 
            'error', 
            text,
            [ 
                {
                    label: "Close",
                    handler: callback
                }
            ]
        )
    }
}

module.exports = new MsgBox()