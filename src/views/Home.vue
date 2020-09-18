<template>
	<div>

		<v-text-field color="pink accent-3" v-model="search" dark placeholder="Search..." class="mx-3 my-3" outlined />

		<div v-for="i in lts">
			<v-card color="pink accent-3" class="mx-3 my-2" dark :href="'#/read/'+i.id">
				<v-card-title>
					{{ i.name }}
				</v-card-title>
			</v-card>
		</div>

		<v-btn color="pink accent-3" href="#/add" fab bottom fixed right dark>
			<v-icon>{{ plus }}</v-icon>
		</v-btn>
		
	</div>
</template>


<script>
	import { mdiPlus } from '@mdi/js';
	import { db, auth } from '../firebase.js';

	export default {
		created() {

			auth.onAuthStateChanged(async user => {
				if (user) {
					db.collection('notes').where('uid', '==', user.uid).onSnapshot(docs => {
						this.lts = []
						docs.forEach(doc => {
							this.lts.push({name: doc.data().name, id: doc.id});
							this.lts_back.push({name: doc.data().name, id: doc.id});
						})

						console.log(user.uid)
					});

				} else {
					location.href = '#/login';
				}
			})

		},
		data() {
			return {
				plus: mdiPlus,
				lts: [],
				lts_back: [],
				search: ''
			}
		},
		watch: {
			search(val) {
				console.log(val);

				this.lts = []

				this.lts_back.forEach(doc => {
					const filter = doc.name.includes(val);
					console.log(filter)

					if (filter) {
						this.lts.push(doc)
					}
				})
			}
		}
	}
</script>