import {SETTINGS} from '../settings/settings';
import {tuileTypesList} from '../js/entities/entities';
import * as THREE from "three";

class AudioManager {
    constructor(camera, scene) {
        this.audioListener = new THREE.AudioListener();
        this.camera = camera
        this.scene = scene
        this.loader = new THREE.AudioLoader();
        this.fire = new THREE.Audio(this.audioListener);
        this.ambianceStart = new THREE.Audio(this.audioListener);
        this.ambianceEnd = new THREE.Audio(this.audioListener);
        this.clic_cta = new THREE.Audio(this.audioListener);
        this.timer = new THREE.Audio(this.audioListener);
        this.canadair1 = new THREE.Audio(this.audioListener);
        this.canadair2 = new THREE.Audio(this.audioListener);
    }

    init() {
        this.camera.add(this.audioListener);
        Object.keys(SETTINGS.tuileTypes).forEach((key) => {
            SETTINGS.tuileTypes[key].sound = new THREE.Audio(this.audioListener);
            tuileTypesList.map((tuileType) => {
                if (tuileType.name === key) {
                    let url = tuileType.sounds ? tuileType.sounds[0] : null
                    if (url) this.loaderProcess(SETTINGS.tuileTypes[key].sound, url)
                }
            })
        })
        this.loaderProcess(this.ambianceStart, '/sound/AMBIANCE/foret_majeur_debut.mp3')
        this.loaderProcess(this.ambianceEnd, '/sound/AMBIANCE/foret_majeur_fin.mp3')
        this.loaderProcess(this.clic_cta, '/sound/clic_cta.mp3')
        this.loaderProcess(this.timer, '/sound/timer.mp3')
        this.loaderProcess(this.canadair1, '/sound/canadair_01.mp3')
        this.loaderProcess(this.canadair2, '/sound/canadair_02.mp3')
        this.loaderProcess(this.fire, '/sound/feu_01.mp3')
    }

    loaderProcess(audio, url){
        this.scene.add(audio);
        this.loader.load(
            // resource URL
            url,
            // onLoad callback
            function (audioBuffer) {
                // set the audio object buffer to the loaded object
                audio.setBuffer(audioBuffer);
            },

            // onProgress callback
            function (xhr) {
                console.log((xhr.loaded / xhr.total * 100) + '% loaded');
            },

            // onError callback
            function (err) {
                console.log('An error happened');
            }
        );
    }

}

export default AudioManager;