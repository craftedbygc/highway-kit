import Highway from '@dogstudio/highway/build/highway.min.js'

import AssetLoader from '../AssetLoader'
import PageLoader from '../animations/PageLoader'

export default class DefaultRenderer extends Highway.Renderer {

    onEnter() {

        this.loadScripts()

        AssetLoader.load( { element: this.properties.view } ).then( () => {

            console.log('assets loaded')

        })
    }

    onFirstLoad() {

        this.loadScripts(true)
        this.onEnter()
        AssetLoader.loaded.then(() => {
            PageLoader.hide().then( () => {
                this.onEnterCompleted()
            })
        })
    }

    onEnterCompleted() {

    }

    onLeave() {

    }

    onLeaveCompleted() {

    }

    setup() {
        this.onFirstLoad()
    }

    loadScripts( firstLoad ) {

        this.reloadScripts = [] // scripts to reload every time

        const scripts = this.properties.view.querySelectorAll('script')
        const scriptsLength = scripts.length

        for( let i = 0; i < scriptsLength; i++ ) {

            const code = scripts[i].innerText
            const src = scripts[i].src

            if ( !firstLoad && code.length > 0 ) {
                // TODO: test adding script to page with innerHTML
                window.eval(code) // eslint-disable-line
            } else if( src.length > 0) {

                // TODO: resolve when all scripts are loaded
                this.appendScript( src, src.split('/').pop(), firstLoad )
                    .catch(error => { console.log(error) })

            }
        }
    }

    appendScript( src, filename, firstLoad ) {

        return new Promise((resolve, reject) => {

            if( !!document.querySelector(`[data-filename="${filename}"]`) ) return
    
            const script = document.createElement('script')
    
            // don't cache certain scripts
            if( !this.reloadScripts.includes( filename ) ) {
                script.dataset.filename = filename
            }
    
            if( !firstLoad ) {
                script.async = true
                script.src = src
                script.addEventListener('load', resolve)
                script.addEventListener('error', () => reject('Error loading script: ' + filename))
                script.addEventListener('abort', () => reject('Script loading aborted: ' + filename))
            }
    
            document.body.appendChild(script)
    
        })
    }

}