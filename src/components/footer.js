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
        <footer class="Footer Content-section u-show">
            <h2>Footer</h2>    
            ${signOut()}
        </footer>
`}

export default footer