<template>
  <div class="map-container">
    <div v-for="(row, y) in map" :key="y" class="map-container-row">
      <map-tile v-for="(tile, x) in row" :key="x" :colour="tile.colour">{{ tile.char }}</map-tile>
    </div>
  </div>
</template>

<script>
import MapTile from './Tile.vue'

export default {
  // Do not forget this little guy
  name: 'Map-Container',
  // share common functionality with component mixins
  mixins: [],
  // compose new components
  extends: {},
  // component properties/variables
  props: {},
  // variables
  data () {
    return {
      // map: MAP
    }
  },
  computed: {
    map () { return this.$store.state.map.tiles }
  },
  // when component uses other components
  components: {
    MapTile
  },
  // methods
  watch: {},
  methods: {},
  // component Lifecycle hooks
  beforeCreate () {},
  mounted () {}
}
</script>

<style scoped>
  
</style>