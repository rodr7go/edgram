import firebse from 'firebase'
import app from './app'

const d = document, 
    c = console.log

const githubSignIn = () => {
    const provider = new firebse.auth.GithubAuthProvider()
    firebse.auth().signInWithPopup(provider)
        .then(result => c(`${result.user.email}  ha iniciado sesion con github`, result))
        .catch(err => c(`Error: ${err.code}: ${err.message}`))
}

const githubSignOut = () => {
    firebse.auth().signOut()
        .then(() => c('has salido'))
        .catch(() => c('error al salir'))
}

const signIn = () => {
    d.addEventListener('click', e => {
        if(e.target.matches('.Sign-button'))
            githubSignIn()
    })
    return `
        <div class="Sign">
            <h1 class="Sign-title">EDgram</h1>
            <button class="Sign-button">
                <i class="fa fa-sign-in"></i>
                entra con
                <i class="fa fa-github"></i>
            </button>
        </div>
    `
}

export const signOut = () => {
    d.addEventListener('click', e => {
        if(e.target.matches('.logout'))
            githubSignOut()
    })
    return `
        <button class="logout" title="salir">
            <i class="logout fa fa-sign-out"></i>
        </button>
    `

}

export const isAuth = () => {
   
    firebse.auth().onAuthStateChanged(user => {
        const EDgram = d.querySelector('.EDgram')
        c(user)

        if(user) {
            EDgram.innerHTML = app()
            c('usuario autenticado')
        } else {
            EDgram.innerHTML = signIn()
            c('no auth')
        }
    })

}