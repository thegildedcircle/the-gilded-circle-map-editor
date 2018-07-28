<template>
  <v-card>
    <v-card-title class="headline">Export Map</v-card-title>
    <v-card-text>
      <v-text-field class="mx-3" v-model="name" label="name" suffix=".json"/>
    </v-card-text>
    <v-card-actions>
      <v-spacer/>
      <v-btn color="red darken-1" flat @click.native="$emit('close')">cancel</v-btn>
      <v-btn color="green darken-1" flat @click.native="save">save</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { saveAs } from 'file-saver/FileSaver'

export default {
  // Do not forget this little guy
  name: '',
  // share common functionality with component mixins
  mixins: [],
  // compose new components
  extends: {},
  // component properties/variables
  props: {},
  // variables
  data () {
    return {}
  },
  computed: {
    name: {
      get () { 
        return this.$store.getters.worldMap.name 
      },
      set (name) {
        this.$store.dispatch('map/setName', name)
      }
    }
  },
  // when component uses other components
  components: {},
  // methods
  watch: {},
  methods: {
    save () {
      const { map } = this.$store.getters.worldMap
      const blob = new Blob([ JSON.stringify(map) ], { type: 'text/plain' })

      saveAs(blob, `${this.name}.json`)

      this.$emit('close')
     }
  },
  // component Lifecycle hooks
  beforeCreate () {},
  mounted () {}
}
</script>

<style scoped>
  
</style>