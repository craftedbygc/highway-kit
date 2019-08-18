import 'whatwg-fetch'
import Highway from '@dogstudio/highway/build/highway.min.js'

import DefaultRenderer from './renderers/Default'
import DefaultTransition from './transitions/Default'

export default class H extends Highway.Core {

    constructor() {

        super({
            renderers: {
                default: DefaultRenderer
            },
            transitions: {
                default: DefaultTransition
            }
        })

        this.on('NAVIGATE_IN', this.onNavigateIn)

    }

    onNavigateIn({ to, location }) {

        const menuItems = document.querySelectorAll('.menu-item')

        // Update Active Nav Link
        for( let i = 0; i < menuItems.length; i++ ) {

            menuItems[i].classList.remove('active')

            if( menuItems[i].href === location.href ) {
                menuItems[i].classList.add('active')
            }

        }

        // Update body classes
        document.body.className = to.page.body.className
    }

    attach() {
        this.links = document.querySelectorAll( 'a[href]:not([target]):not([href|="#"]):not([data-router-disabled]):not(.sf-dump-toggle)' )
        for (const link of this.links) {
            link.addEventListener('click', this._navigate);
        }
    }

}