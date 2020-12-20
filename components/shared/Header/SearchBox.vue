<template>
  <div>
    <div v-bind:class="{ active: searchOpen }" class="search-wrapper">
      <div class="input-holder">
        <input type="text" class="search-input" placeholder="Type to search">
        <button v-on:click="searchOpen = !searchOpen" class="search-icon">
          <span />
        </button>
      </div>
      <button v-on:click="searchOpen = !searchOpen" class="close" />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchOpen: false
    }
  }
}
</script>
