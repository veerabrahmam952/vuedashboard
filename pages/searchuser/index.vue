
<template>
  <div class="container">
    <search-user-component />
  </div>
</template>
<script>
import SearchUserComponent from '../../components/pages/searchuser/search.vue'
export default {
  name: 'SearchUser',
  components: {
    SearchUserComponent
  },
  provide () {
    return {
      $v: this.$v
    }
  }
}
</script>
