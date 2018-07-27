<template>
  <div>
    <v-subheader>{{ heading }}</v-subheader>
    <v-list-tile v-for="(item, i) in items" :key="i">
      <v-list-tile-content>
        <v-list-tile-title v-if="item.label.show">{{ item.label.text }}</v-list-tile-title>
        <v-list-tile-sub-title>
          <v-text-field v-if="item.type === 'text'" :label="item.label.text" box v-model="params[i]"/>
          <!-- Slider -->
          <v-slider v-if="item.type === 'slider'" class="mx-3" v-model="params[i]" :min="item.min" :max="item.max" :step="item.step"/>
          <!-- Switch -->
          <v-switch v-if="item.type === 'switch'" v-model="params[i]"/>
        </v-list-tile-sub-title>
      </v-list-tile-content>
      <v-list-tile-avatar v-if="item.aside">{{ params[i] }}</v-list-tile-avatar>
    </v-list-tile>
  </div>
</template>

<script>
export default {
  // Do not forget this little guy
  name: 'Sidebar-Group',
  // share common functionality with component mixins
  mixins: [],
  // compose new components
  extends: {},
  // component properties/variables
  props: [ 'items', 'heading' ],
  // variables
  data () {
    return {
      params: (() => {
        let arr = []
        this.items.forEach((item) => {
          switch (item.type) {
            case 'text':
              arr.push('')
              break
            case 'slider':
              arr.push(item.min)
              break
            case 'switch':
              arr.push(false)
              break
          }
        })
        return arr
      })()
    }
  },
  computed: {
    paramObject () {
      const obj = {}
      this.items.forEach((item, i) => {
        obj[item.label.text] = this.params[i]
      })
      return obj
    }
  },
  // when component uses other components
  components: {},
  // methods
  watch: {
    params () {
      this.$emit('update', this.paramObject)
    }
  },
  methods: {},
  // component Lifecycle hooks
  beforeCreate () {},
  mounted () {}
}
</script>

<style scoped>
  
</style>