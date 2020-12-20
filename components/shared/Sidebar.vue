<template>
  <div
    @mouseover="toggleSidebarHover('add','closed-sidebar-open')"
    @mouseleave="toggleSidebarHover('remove','closed-sidebar-open')"
    class="app-sidebar sidebar-shadow"
  >
    <div class="app-header__logo">
      <div class="logo-src" />
      <div class="header__pane ml-auto">
        <button
          @click="toggleBodyClass('closed-sidebar', 'closed-sidebar-open')"
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
    <div class="app-sidebar-content">
      <VuePerfectScrollbar class="app-sidebar-scroll">
        <sidebar-menu :menu="menu" :show-one-child="true" />
      </VuePerfectScrollbar>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { SidebarMenu } from 'vue-sidebar-menu'
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import MenuOptions from '../../assets/scripts/common/menu.js'
import RoleAccess from '../../assets/scripts/common/roleaccess.js'
export default {
 components: {
    SidebarMenu,
    VuePerfectScrollbar
  },
  props: {
    // eslint-disable-next-line
    sidebarbg: String
  },
  data () {
    return {
      isOpen: false,
      sidebarActive: false,
      menu: MenuOptions,
      collapsed: true,
      windowWidth: 0,
      role: ''
    }
  },
  created () {
    this.role = this.$route.params.role
  },
  mounted () {
    this.SetMenuToggle(this.$route.params.role)
    this.$nextTick(function () {
      // window.addEventListener('resize', this.getWindowWidth)
      // Init
      this.getWindowWidth()
    })
  },
  beforeDestroy () {
    // window.removeEventListener('resize', this.getWindowWidth)
  },
  methods: {
    toggleBodyClass (className, closeName) {
      const el = document.body
      this.isOpen = !this.isOpen

      if (this.isOpen) {
        el.classList.add(className)
        el.classList.remove(closeName)
      } else {
        el.classList.remove(className)
        el.classList.remove(closeName)
      }
    },
    toggleSidebarHover (add, className) {
      const el = document.body
      this.sidebarActive = !this.sidebarActive

      this.windowWidth = document.documentElement.clientWidth

      if (this.windowWidth > '992') {
        if (add === 'add') {
          el.classList.add(className)
        } else {
          el.classList.remove(className)
        }
      }
    },
    getWindowWidth () {
      const el = document.body
      this.windowWidth = document.documentElement.clientWidth
      if (this.windowWidth < '1350') {
        el.classList.add('closed-sidebar', 'closed-sidebar-md')
      } else {
        el.classList.remove('closed-sidebar', 'closed-sidebar-md')
      }
    },
    SetMenuToggle (role) {
      const tempRole = role
      const roleAccess = RoleAccess[tempRole]
      MenuOptions.forEach((element) => {
        if (roleAccess.includes(element.title)) {
          element.disabled = false
          if (element.child.length > 0) {
            element.child.forEach((item) => {
              if (roleAccess.includes(item.title)) {
                item.disabled = false
              } else {
                item.disabled = true
              }
            })
          }
        } else {
          element.disabled = true
        }
      })
    }
  }
}
</script>
