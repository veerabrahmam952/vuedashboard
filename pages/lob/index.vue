<template>
  <div class="container">
    <search-lob />
  </div>
</template>
<script>
import SearchLob from '../../components/pages/lob/search.vue'
export default {
  name: 'DefinedLOB',
  components: {
    SearchLob
  },
  provide () {
    return {
      $v: this.$v
    }
  }
}
</script>
