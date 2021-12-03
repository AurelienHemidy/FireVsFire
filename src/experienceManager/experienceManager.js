import gsap from "gsap";
import {countDown} from '../js/utils/countDown';

export default class ExperienceManager {
    constructor(audioManager) {
        this.currentScene = 0 //landing page
        this.audioManager = audioManager;
    }

    landing() {
        gsap.from(["#intro", '.footer'], {
            opacity: 0,
            duration: 4
        });
        gsap.from("#intro-left", {
            y: -100,
            duration: 4
        });
        gsap.from("#intro-right", {
            y: 100,
            duration: 4
        });
        gsap.from("#logo", {
            opacity: 0,
            // scale: 0.7,
            duration: 4
        });
        document.getElementById('button-start').addEventListener('click',
            () => {
                this.switchSceneTo(1)
                this.audioManager.clic_cta.play()
                gsap.from("#button-start", {
                    opacity: 0,
                    scale: 0,
                    duration: 4
                });
            })
    }

    switchSceneTo(toScene) {
        console.log('switch to scene' + toScene)
        switch (toScene) {
            case 0:
                this.landing();//landing
                break;
            case 1:
                this.playScene1();//cinématique
                break;
            case 2:
                this.playScene2();//mission
                this.audioManager.ambianceStart.play()
                this.audioManager.ambianceStart.loop = true

                this.audioManager.ambianceEnd.play()
                this.audioManager.ambianceEnd.loop = true

                break;
            case 3:
                this.setCurrentScene(3)//game
                this.playScene3();
                // countDown("footer-timer-time", 0, 4);
                // setTimeout(() => {
                //     this.audioManager.timer.play()
                //     this.switchSceneTo(4)
                // }, 4000)
                countDown("footer-timer-time", 3, 0);
                setTimeout(() => {
                    this.audioManager.timer.play()
                    this.switchSceneTo(4)
                }, 181000)
                break
            case 4:
                this.setCurrentScene(4)//winpage
                this.playScene4();
                break;
        }
    }

    playScene1() {
        let cine = document.getElementById('cine')
        gsap.to(["#intro", ".footer"], {
            opacity: 0,
            duration: 2,
            display: "none",
            onComplete: () => {
                cine.play()
                gsap.fromTo(cine, {
                        volume: 0,
                        scale: 1,
                        // transform:"translate(-50%,-50%)"
                    }, {
                        volume: 0.6,
                        scale: 1.08,
                        transform: "translate(-50%,0)",
                        duration: 8
                    }
                )
                gsap.fromTo(cine, {
                    display: "block",
                    opacity: 0,
                }, {
                    opacity: 1,
                    duration: 2,
                })
            }
        });

        cine.onended = () => {
            gsap.to('#cine', {
                opacity: 0,
                display: "none",
                duration: 1,
                onComplete: () => this.switchSceneTo(2)
            })
        }
    }

    playScene2() {
        let mission1 = document.getElementById('mission1')
        let mission2 = document.getElementById('mission2')
        mission1.addEventListener('click',
            () => {
                this.audioManager.clic_cta.play()
                gsap.to(mission1, {
                    opacity: 0,
                    display: 'none',
                    duration: 2
                })
                gsap.fromTo(mission2, {
                        opacity: 0,
                        display: 'block'
                    },
                    {
                        opacity: 1,
                        duration: 2
                    })
            })
        mission2.addEventListener('click',
            () => {
                this.audioManager.clic_cta.play();
                gsap.to('#scene-2', {
                    autoAlpha: 0,
                    duration: 1.5,
                    onComplete: () => this.switchSceneTo(3)
                })
            })

        gsap.to(["#intro"], {
            opacity: 0,
            display: 'none'
        });
        gsap.fromTo('#scene-2', {
            opacity: 0,
        }, {
            opacity: 1,
            duration: 2,
            display: 'block',
            // onComplete:()=>{
            //     gsap.fromTo('#scene-3',{
            //         opacity: 0,
            //         display: 'block',
            //     },{
            //         opacity: 1,
            //         display: 'block',
            //         duration: 2
            //     })
            // }
        })

    }

    setCurrentScene(scene) {
        this.currentScene = scene
    }

    playScene3() {
        gsap.to(["#intro"], {
            opacity: 0,
            display: 'none'
        });
        gsap.fromTo([".webgl"], {
            scale: 0.7,
        }, {
            scale: 1,
            duration: 2
        });
        gsap.fromTo(['#scene-3', '.footer'], {
            opacity: 0,
        }, {
            opacity: 1,
            display: 'block',
            duration: 2
        })
        gsap.fromTo(
            ['.indicators', '.wind-rose'], {
                y: 100
            },
            {
                y: 0,
                opacity: 1,
                display: 'block',
                duration: 2
            }
        )
        gsap.fromTo(
            '.footer-timer', {
                y: 100,
                x: '-50%',
            },
            {
                y: 0,
                opacity: 1,
                display: 'block',
                duration: 2
            }
        )
    }

    playScene4() {
        let winPage = document.getElementById('win-page')
        gsap.fromTo(['#scene-3', '.footer', '.indicators'], {
            opacity: 1,
        }, {
            opacity: 0,
            display: 'none',
            duration: 2
        })
        gsap.fromTo(['#scene-4', winPage], {
                opacity: 0,
            },
            {
                opacity: 1,
                display: 'block',
                duration: 4
            })
        winPage.addEventListener('click',
            () => {
                this.audioManager.clic_cta.play()
                gsap.to(winPage, {
                    opacity: 0,
                    display: 'none',
                    duration: 2,
                    onComplete: () => this.switchSceneTo(3)
                })
            })

        // gsap.to(["#intro"], {
        //     opacity: 0,
        //     display: 'none'
        // });
        // gsap.fromTo('#scene-2', {
        //     opacity: 0,
        // }, {
        //     opacity: 1,
        //     duration: 2,
        //     display: 'block',
        // })

    }
    fire(){
        this.audioManager.fire.play()
    }
}