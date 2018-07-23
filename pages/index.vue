<template>
  <main>
    <v-navigation-drawer value="true" stateless fixed clipped class="grey lighten-4" app>
      <v-list dense two-line class="grey lighten-4">
        <template v-for="(item, i) in menu">
          <!-- Divider -->
          <v-divider v-if="item.type === 'divider'" :key="i" dark class="my-3"/>

          <!-- Heading -->
          <v-layout v-else-if="item.type === 'heading'" :key="i" row align-center >
            <v-flex xs6>
              <v-subheader>
                {{ item.text }}
              </v-subheader>
            </v-flex>
          </v-layout>

          <v-list-tile v-else :key="i">
            <v-list-tile-content>
              <v-list-tile-title>{{ item.label }}</v-list-tile-title>
              <v-list-tile-sub-title>
                <!-- Button -->
                <v-btn 
                  v-if="item.type === 'btn'"
                  @click.native="handler(item.method)"
                  :block="item.block"
                  :flat="item.round" 
                  :dark="item.dark" 
                  :color="item.colour"
                >{{ item.text }}</v-btn>

                <!-- Slider -->
                <v-slider 
                  v-else-if="item.type === 'slider'"
                  class="mx-3"
                  v-model="params[item.model_type][item.model_param]"
                  :min="item.min" 
                  :max="item.max" 
                  :step="item.step"
                  />

                <!-- Switch -->
                <v-switch 
                  v-else-if="item.type === 'switch'"
                  v-model="params[item.model_type][item.model_param]"/>
              </v-list-tile-sub-title>
            </v-list-tile-content>

            <v-list-tile-avatar v-if="item.type === 'slider'">
              {{ params[item.model_type][item.model_param] }}
            </v-list-tile-avatar>
          </v-list-tile>

        </template>
      </v-list>
    </v-navigation-drawer>
    <v-content>
      <v-container fluid fill-height>
        <v-layout justify-center align-center>
          <map-container/>
        </v-layout>
      </v-container>
    </v-content>
  </main>
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
      menu: [
        { type: 'btn', text: 'generate', block: true, flat: true, dark: true, colour: 'primary', method: 'submit' },
        { type: 'divider' },
        { type: 'heading', text: 'Size' },
        { type: 'slider', label: 'width', min: 10, max: 100, step: 1, model_type: 'size', model_param: 'width' },
        { type: 'slider', label: 'height', min: 10, max: 100, step: 1, model_type: 'size', model_param: 'height' },
        { type: 'divider' },
        { type: 'heading', text: 'Base Params' },
        { type: 'slider', label: 'a', min: 0.01, max: 2, step: 0.01, model_type: 'base', model_param: 'a' },
        { type: 'slider', label: 'b', min: 0.1, max: 5, step: 0.1, model_type: 'base', model_param: 'b' },
        { type: 'slider', label: 'c', min: 1, max: 50, step: 1, model_type: 'base', model_param: 'c' },
        { type: 'slider', label: 'lacunarity', min: 0, max: 20, step: 1, model_type: 'base', model_param: 'lacunarity' },
        { type: 'switch', label: 'manhattan', model_type: 'base', model_param: 'manhattan' },
        { type: 'switch', label: 'euclidian', model_type: 'base', model_param: 'euclidian', },
        { type: 'switch', label: 'multiply', model_type: 'base', model_param: 'multiply' },
        { type: 'switch', label: 'add', model_type: 'base', model_param: 'add' },
        { type: 'slider', label: 'octaves', min: 0, max: 10, step: 1, model_type: 'base', model_param: 'octaves' },
        { type: 'slider', label: 'persistence', min: 0, max: 0.9, step: 0.05, model_type: 'base', model_param: 'persistence' },
        { type: 'slider', label: 'redistribution', min: 0, max: 7, step: 0.1, model_type: 'base', model_param: 'redistribution' },
        { type: 'slider', label: 'scale', min: 0, max: 2, step: 0.1, model_type: 'base', model_param: 'scale' },
      ],
      params: {
        size: {
          width: 50,
          height: 20
        },
        base: {
          a: 0.05,
          b: 1.5,
          c: 25,
          lacunarity: 10,
          manhattan: true,
          euclidian: false,
          multiply: false,
          add: true,
          octaves: 5,
          persistence: 0.5,
          redistribution: 5.5,
          scale: 0.5
        },
        biome: {
          moisture: {
            lacunarity: 5,
            octaves: 2,
            persistence: 0.25,
            scale: 1
          }
        }
      }
    }
  },
  computed: {},
  // when component uses other components
  components: {
    MapContainer
  },
  // methods
  watch: {
    'params.base.manhattan' (val) {
      this.params.base.euclidian = !val
    },
    'params.base.euclidian' (val) {
      this.params.base.manhattan = !val
    },
    'params.base.multiply' (val) {
      this.params.base.add = !val
    },
    'params.base.add' (val) {
      this.params.base.multiply = !val
    }
  },
  methods: {
    handler (method) { this[method]() },
    submit () { this.$store.dispatch('map/generate', { params: this.params }) }
   },
  // component Lifecycle hooks
  beforeCreate () {},
  mounted () {}
}
</script>

<style>
  
</style>