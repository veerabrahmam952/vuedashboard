<template>
  <div>
    <SourceDefinitionComponent />
  </div>
</template>
<script>
import SourceDefinitionComponent from '../../components/pages/source/search.vue'
export default {
  name: 'SourceDefinition',
  components: {
    SourceDefinitionComponent
  },
  provide () {
    return {
      $v: this.$v
    }
  }
}
</script>
