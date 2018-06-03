import firebase from 'firebase'
import {signOut} from './auth'

const footer = () => {
    const d = document,
        c = console.log

    const footerScripts = setInterval(() => {
        if(d.readyState === 'complete') {
            clearInterval(footerScripts)
            

        }
    }, 100)
    return `
        <footer class="Footer u-fixed">
            <nav class="Footer-menu">
                <button class="Profile-button" title="Perfil">
                    <i class="fa fa-user"></i>
                </button>
                <button class="Uploader-button" title="Subir Foto">
                    <i class="fa fa-picture-o"></i>
                </button>
                <button class="Timeline-button" title="Home">
                    <i class="fa fa-home"></i>
                </button>
                <button class="Camera-button" title="Cámara">
                    <i class="fa fa-camera"></i>
                </button>
                ${signOut()}
            </nav>
        </footer>
`}

export default footer