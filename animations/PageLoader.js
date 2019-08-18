import { TimelineMax, TweenMax } from 'gsap'

const PageLoader = {

    timeline: new TimelineMax({
            paused: true
        })
        .fromTo( '.page-loader', 1, {
            autoAlpha: 0
        }, {
            autoAlpha: 1,
            ease: 'Linear.easeNone',
            immediateRender: false
        }
    ),

    hide() {
        
        return new Promise( resolve => {

            this.timeline.tweenFromTo( this.timeline.duration(), 0, {
                ease: 'Expo.easeInOut'
            })

            TweenMax.delayedCall( this.timeline.duration() * 0.4, resolve)
        })
    },

    show() {

        return new Promise( resolve => {

            this.timeline.tweenFromTo( 0, this.timeline.duration(), {
                ease: 'Expo.easeInOut',
                onComplete: resolve
            })
        })
    }

}

export default PageLoader