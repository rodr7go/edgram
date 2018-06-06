import firebase from 'firebase'
import { progressBar, progressStatus, showProgress, hideProgress } from './upload_progress';
import { errorMsg, successMsg } from './helpers/messages'
import { savePhotoInDB } from './helpers/photos_db'

const camera = () => {
    const d = document,
        c = console.log,
        n = navigator

    const cameraScripts = setInterval(() => {
        if(d.readyState === 'complete') {
            clearInterval(cameraScripts)
            const cameraApp = d.querySelector('.Camera'),
                video = d.getElementById('camera-stream'),
                photo = d.getElementById('photo'),
                startCameraBtn = d.getElementById('start-camera'),
                output = d.querySelector('.Camera').querySelector('.Progress-output'),
                controls = d.querySelector('.Camera-menu'),
                takePhotoBtn = d.getElementById('take-photo'),
                deletePhotoBtn = d.getElementById('delete-photo'),
                uploadPhotoBtn = d.getElementById('upload-photo'),
                downloadPhotoBtn = d.getElementById('download-photo'),
                canvas = d.getElementById('canvas-snap'),
                context = canvas.getContext('2d')

            let snapshot

            function cameraInit () {
                n.getMedia = (
                    n.getUserMedia ||
                    n.webkitGetUserMedia ||
                    n.mozGetUserMedia ||
                    n.msGetUserMedia
                )

                if (!n.getMedia) {
                    output.innerHTML = errorMsg('Tu navegador no soporta el uso de la camara de tu dispositivo', null)
                } else {
                    n.getMedia(
                        {video: true},
                        stream => {

                            video.src = window.URL.createObjectURL(stream)
                            video.play()

                        },
                        err => output.innerHTML = errorMsg(`Hubo un error al acceder a la camara de tu dispositivo: ${err.message}`, err)
                    )
                }
            }

            cameraInit()
        }
    }, 100)
    return `
        <article id="camera-app" class="Camera Content-section u-show">
            <video muted id="camera-stream" class="Camera-video"></video>
            <img id="photo" class="Camera-photo">
            <nav class="Camera-menu">
                <button id="start-camera" title="Iniciar Cámara">
                    <i class="fa   fa-power-off"></i>
                </button>
                <button id="take-photo" title="Tomar Foto">
                    <i class="fa fa-camera"></i>
                </button>
                <button class="u-disabled" id="delete-photo" title="Borrar Foto">
                    <i class="fa fa-trash"></i>
                </button>
                <button class="u-disabled" id="upload-photo" title="Subir Foto">
                    <i class="fa fa-upload"></i>
                </button>
                <button class="u-disabled" id="download-photo" title="Guardar Foto">
                    <a href="#" download="selfie_${Math.floor(Math.random() * 10000000)}.png">
                    <i class="fa fa-download"></i></a>
                </button>
            </nav>
            <canvas id="canvas-snap"></canvas>
            ${progressBar()}
        </article>
`}

export default camera