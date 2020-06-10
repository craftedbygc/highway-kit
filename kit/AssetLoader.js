/**
*   Add any promises that need to be resolved before showing
*   the page by using the add( promise ) method.
*/

const AssetLoader = {

    promisesToLoad: [],

    load( { element = document.body, progress = false } = {} ) {

        this.element = element
        this.addMedia()

        return this.loaded = new Promise( resolve => {

            if( progress ) {

                this.progressPromise( this.promisesToLoad, progress ).then( () => {
                    this.promisesToLoad = []
                    resolve()
                })

            } else {

                Promise.all( this.promisesToLoad ).then( () => {
                    this.promisesToLoad = []
                    resolve()
                })
            }
        })
    },

    add( promise ) {
        this.promisesToLoad.push( promise )
    },

    addMedia() {

        const images = this.element.querySelectorAll('img')
        for( let i = 0; i < images.length; i++ ) {

            this.promisesToLoad.push( new Promise( resolve => {

                const imgEl = document.createElement('img')
                imgEl.addEventListener('load', resolve )
                imgEl.addEventListener('error', resolve )
                imgEl.src = images[i].src

            }) )
        }

        const videos = this.element.querySelectorAll('video')
        for( let i = 0; i < videos.length; i++ ) {

            this.promisesToLoad.push( new Promise( resolve => {

                const videoEl = document.createElement('video')
                videoEl.addEventListener('loadedmetadata', resolve )
                videoEl.addEventListener('error', resolve )
                videoEl.src = videos[i].src

            }) )
        }

        // TODO: check background images
    },

    progressPromise( promises, tickCallback ) {

        let len = promises.length
        let progress = 0

        function tick( promise ) {

            promise.then(function () {
                progress++
                tickCallback(progress, len)
            }).catch(reason => {
                console.log(reason)
            })

            return promise

        }

        return Promise.all(promises.map(tick))

    }

}

export default AssetLoader
