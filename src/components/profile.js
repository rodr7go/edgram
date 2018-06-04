import firebase from 'firebase'

const profile = () => {
	let profilePhotos = ''
	
	const d = document,
		c = console.log,
		user = firebase.auth().currentUser,
		dbRef = firebase.database().ref().child('photos')
	
	const profileScripts = setInterval(() => {
		if(d.readyState === 'complete') {
			clearInterval(profileScripts)
			dbRef.on('value', data => {
				// c(data, data.key, data.val().photoUrl)
				data.forEach(photo => {
					if (photo.val().uid === user.uid) {
						profilePhotos += `<img src="${photo.val().photoUrl}">`
					}
				})
				d.querySelector('.Profile-photos').innerHTML = profilePhotos
			})

		}
	}, 100)
	return `
		<article class="Profile Content-section u-show">
			<h2 class="Profile-name">${user.displayName}</h2>
			<p class="Profile-email">${user.email}</p>
			<img src="${user.photoURL}" alt="" class="Profile-avatar">
			<h3>Tus fotos</h3>
			<aside class="Profile-photos"></aside>
		</article>
`}

export default profile