<template>
  <div class="container">
    <Feature />
  </div>
</template>
<script>
import Feature from '../../components/pages/feature/search.vue'
export default {
  name: 'FeaturePage',
  components: {
    Feature
  },
  provide () {
    return {
      $v: this.$v
    }
  }
}
</script>
