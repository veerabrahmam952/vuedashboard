<template>
  <div class="app-header header-shadow">
    <div class="logo-src" />
    <div class="app-header__content">
      <div class="app-header-left">
        <SearchBox />
      </div>
      <div class="app-header-right">
        <UserArea />
      </div>
    </div>
    <div class="app-header__mobile-menu">
      <div>
        <button
          @click="toggleMobile('closed-sidebar-open')"
          v-bind:class="{ 'is-active' : isOpen }"
          type="button"
          class="hamburger close-sidebar-btn hamburger--elastic"
        >
          <span class="hamburger-box">
            <span class="hamburger-inner" />
          </span>
        </button>
      </div>
    </div>
    <div class="app-header__menu">
      <span>
        <b-button
          @click="toggleMobile2('header-menu-open')"
          v-bind:class="{ 'active' : isOpenMobileMenu }"
          class="btn-icon btn-icon-only"
          variant="primary"
          size="sm"
        >
          <div class="btn-icon-wrapper">
            <font-awesome-icon icon="ellipsis-v" />
          </div>
        </b-button>
      </span>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import SearchBox from '../shared/Header/SearchBox.vue'
import UserArea from '../shared/Header/HeaderUserArea.vue'
library.add(faEllipsisV)
export default {
  name: 'Header',
  components: {
    SearchBox,
    UserArea,
    'font-awesome-icon': FontAwesomeIcon
  },
  props: {},
  data () {
    return {
      isOpen: false,
      isOpenMobileMenu: false
    }
  },
  methods: {
    toggleMobile (className) {
      const el = document.body
      this.isOpen = !this.isOpen

      if (this.isOpen) {
        el.classList.add(className)
      } else {
        el.classList.remove(className)
      }
    },
    toggleMobile2 (className) {
      const el = document.body
      this.isOpenMobileMenu = !this.isOpenMobileMenu

      if (this.isOpenMobileMenu) {
        el.classList.add(className)
      } else {
        el.classList.remove(className)
      }
    }
  }
}
</script>
