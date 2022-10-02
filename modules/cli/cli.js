const
    exec = require('child_process').exec

class CLI {

    run = ( command, callback ) => {
        exec( command, ( err, stdout, stderr ) => {
            callback( stdout, stderr )
        })
    }

    off = cb => this.run( 'nvm off', cb )
    on  = cb => this.run( 'nvm on', cb )
    list = cb => this.run( 'nvm list', cb )
    root = cb => this.run( 'nvm root', cb )
    current = cb => this.run( 'nvm current', cb )
    available = cb => this.run( 'nvm list available', cb )

    use = ( version, cb ) => this.run( `nvm use ${version}`, cb )
    install = ( version, cb ) => this.run( `nvm install ${version}`, cb )
    uninstall = ( version, cb ) => this.run( `nvm uninstall ${version}`, cb )

}

module.exports = new CLI()