import firebase from 'firebase'

const profile = () => {
    const d = document,
        c = console.log

    const profileScripts = setInterval(() => {
        if(d.readyState === 'complete') {
            clearInterval(profileScripts)
            

        }
    }, 100)
    return `
        <article class="Profile Content-section u-show">
            <h2>profile</h2>
        </article>
`}

export default profile