<template>
  <v-navigation-drawer value="true" stateless fixed clipped class="grey lighten-4" app>
    <v-dialog v-model="dialog" max-width="400">
      <sidebar-dialog @close="dialog = false"/>
    </v-dialog>
    <v-list dense two-line class="grey lighten-4">
      <div class="mx-3">
        <v-btn @click.stop="dialog = true" block round color="primary">export</v-btn>
      </div>
      <div class="mx-3">
        <v-btn @click.native="submit" block flat round color="primary">generate</v-btn>
      </div>
      <v-divider/>
      <v-list-tile>
        <v-list-tile-content>
          <v-list-tile-title>
            <v-checkbox color="primary" label="dynamic generation" v-model="dynamic"/>
          </v-list-tile-title>
        </v-list-tile-content>
        <v-list-tile-action>
          <v-tooltip bottom>
            <v-icon slot="activator">help</v-icon>
            <span>When on, the map will regenerate whenever the parameters are changed.</span>
          </v-tooltip>
        </v-list-tile-action>
      </v-list-tile>

      <template v-for="(item, i) in items">
        <v-divider v-if="item.type === 'divider'" :key="i" dark class="my3"/>
        <sidebar-group v-else :items="item.items" :heading="item.heading.toUpperCase()" :key="i" @update="(data) => update(item.heading, data)"/>
      </template>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import SidebarDialog from './Dialog'
import SidebarGroup from './Group'

export default {
  // Do not forget this little guy
  name: 'Sidebar-Container',
  // share common functionality with component mixins
  mixins: [],
  // compose new components
  extends: {},
  // component properties/variables
  props: {},
  // variables
  data () {
    return {
      items: [
        { type: 'divider' },
        { type: 'group', heading: 'config', items: [
          { type: 'text', label: { text: 'seed', show: false } },
          { type: 'slider', label: { text: 'width', show: true }, aside: true, min: 10, max: 100, step: 1 },
          { type: 'slider', label: { text: 'height', show: true }, aside: true, min: 10, max: 100, step: 1 }
        ]},
        { type: 'divider' },
        { type: 'group', heading: 'terrain', items: [
          { type: 'slider', label: { text: 'octaves', show: true }, aside: true, min: 1, max: 10, step: 1 },
          { type: 'slider', label: { text: 'persistence', show: true }, aside: true, min: 0, max: 0.9, step: 0.05 },
        ]},
        { type: 'divider' },
        { type: 'group', heading: 'climate', items: [

        ]}
      ],
      params: {
        config: {
          seed: '',
          width: 10,
          height: 10
        },
        terrain: {
          octaves: 1,
          persistence: 0
        },
        climate: null
      },
      dialog: null,
      dynamic: true
    }
  },
  computed: {},
  // when component uses other components
  components: {
    SidebarDialog,
    SidebarGroup
  },
  // methods
  watch: {
  },
  methods: {
    update (key, val) { 
      this.params[key] = val

      if (this.dynamic)
        this.submit()
    },
    submit () { this.$store.dispatch('map/setParams', this.params) }
  },
  // component Lifecycle hooks
  beforeCreate () {},
  mounted () {}
}
</script>

<style scoped>
  
</style>