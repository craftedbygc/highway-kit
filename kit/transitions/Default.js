import Highway from '@dogstudio/highway/build/highway.min.js'

import AssetLoader from '../AssetLoader'
import PageLoader from '../animations/PageLoader'

export default class DefaultTransition extends Highway.Transition {

    in({ from, to, trigger, done }) {

        AssetLoader.loaded.then( () => {
            PageLoader.hide().then( () => {
                done()
            })
        })
    }

    out({ from, trigger, done }) {

        PageLoader.show().then( () => {
            from.parentNode.removeChild( from )
            done()
        })
    }

}