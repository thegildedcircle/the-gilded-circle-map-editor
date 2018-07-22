<template>
  <div class="container">
    <map-container/>
  </div>
</template>

<script>
import MapContainer from '~/components/Map/Container'

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
    return {

    }
  },
  computed: {},
  // when component uses other components
  components: {
    MapContainer
  },
  // methods
  watch: {},
  methods: {},
  // component Lifecycle hooks
  beforeCreate () {},
  mounted () {
    this.$store.dispatch('map/generate', { width: 20, height: 20 })
  }
}
</script>

<style>
  
</style>