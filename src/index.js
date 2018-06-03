import css from './style.scss'
import {init} from './components/helpers/init'
import { isAuth } from './components/auth';

init()

const app = `
  <main class="EDgram">
    ${isAuth()}
  </main>
`

document.getElementById('root').innerHTML = app