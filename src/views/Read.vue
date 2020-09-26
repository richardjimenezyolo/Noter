<template>
	<div>
		<v-toolbar dark>
			<v-btn icon @click="save">
				<v-icon>{{ arrow }}</v-icon>
			</v-btn>
			
			<v-toolbar-title> {{ name }}</v-toolbar-title>

			<v-spacer/>

			<v-btn icon @click="upload">
				<v-icon>
					{{ photoIcon }}
				</v-icon>
			</v-btn>

			<v-btn icon @click="del">
				<v-icon>{{ deleteIcon }}</v-icon>
			</v-btn>
		</v-toolbar>
		
		<div id="editorjs"></div>

	</div>
</template>

<script lang="ts">

	import { mdiArrowLeft, mdiDelete, mdiImage  } from '@mdi/js';
	import { Load } from '../editor.js';
	import { db, auth, storage } from '../firebase.js';

	export default {
		created() {

			db.collection('notes').doc(this.id).onSnapshot( doc => {
				this.doc = doc.data()
				const note = this.doc.note;
				this.name = doc.data().name

				if (this.load) {
					this.editor.render(note)
				} else {
					this.editor = Load(note);
				}

				this.load = true
			} )

		},
		methods: {
			upload() {
				let input = document.createElement('input')
				input.type = 'file';
				input.click()

				input.onchange = _ => {
					
					let imgRef = storage.ref(`imgs/${Math.random()}.jpg`);

					imgRef.put(input.files[0]).then(out => {
						
						console.log("File upload successfully");
						
						imgRef.getDownloadURL().then(url => {
							console.log(url)

							this.editor.blocks.insert("image", {url: url})

						})

					}).catch(out => {
						alert(out)
					})


				}
			},
			save() {
				if (this.load) {
					auth.onAuthStateChanged(async user => {
						const name = this.name;

						if (name != '') {

							const out = await this.editor.save();

							db.collection('notes').doc(this.id).set({
								uid: user.uid,
								name: name,
								note: out
							})

							setTimeout(_ => {
								location.href = '#/';
							}, 500)

						} else {
							alert('You need to write a name to save this note')
						}

					})
				}
				
			},

			del() {
				console.log('del')
				

				if (confirm("Are you sure?")) {
					console.log('yes')

					this.editor.save().then(out => {
						db.collection('trash').add(this.doc);

						db.collection('notes').doc(this.id).delete().then(_ => {
							location.href = '#/';
						})

						location.href = '#/';
					})

				} else {
					console.log('no')
				}
			}
		},
		data() {
			return {
				arrow: mdiArrowLeft,
				deleteIcon: mdiDelete,
				photoIcon: mdiImage,
				editor: '',
				name: '',
				id: this.$route.params.id,
				load: false,
				doc: {}
			}
		}
	}
</script>