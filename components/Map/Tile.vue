<template>
  <span class="map-tile" :style="`color: ${ colour };`"><slot/></span>
</template>

<script>
export default {
  // Do not forget this little guy
  name: 'Map-Tile',
  // share common functionality with component mixins
  mixins: [],
  // compose new components
  extends: {},
  // component properties/variables
  props: {
    colour: String
  },
  // variables
  data () {
    return {

    }
  },
  computed: {},
  // when component uses other components
  components: {},
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