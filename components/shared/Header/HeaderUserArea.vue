<template>
  <div class="d-flex">
    <div class="header-btn-lg pr-0">
      <div class="widget-content p-0">
        <div class="widget-content-wrapper">
          <div class="widget-content-left">
            <b-dropdown toggle-class="p-0 mr-2" menu-class="dropdown-menu-lg" variant="link" right>
              <span slot="button-content">
                <div class="icon-wrapper icon-wrapper-alt rounded-circle">
                  <i class="pe-7s-user" />
                </div>
              </span>
              <div type="button" tabindex="0" class="dropdown-item">
                User Name: {{ username }}
              </div>
              <div tabindex="-1" class="dropdown-divider" />
              <button type="button" tabindex="0" class="dropdown-item">
                <i class="pe-7s-user"> Profile </i>
              </button>
              <button type="button" tabindex="0" class="dropdown-item">
                <i class="pe-7s-unlock"> Change Password </i>
              </button>
              <button type="button" tabindex="0" class="dropdown-item">
                <i class="pe-7s-settings"> Settings </i>
              </button>
            </b-dropdown>
          </div>
          <div class="btn-link icon-wrapper">
            <i @click="logOut" class="pe-7s-power" style="cursor: pointer">
              <span style="font-size: 9px">Logout</span>
            </i>
          </div>
          <!-- <div class="widget-content-left ml-3 header-user-info">
            <i class="pe-7s-power"></i>
            <div class="widget-heading">
              {{ firstname }}
            </div>
            <div class="widget-subheading">
              VP People Manager
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import VuePerfectScrollbar from 'vue-perfect-scrollbar'

import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faAngleDown,
  faCalendarAlt,
  faTrashAlt,
  faCheck,
  faFileAlt,
  faCloudDownloadAlt,
  faFileExcel,
  faFilePdf,
  faFileArchive,
  faEllipsisH
} from '@fortawesome/free-solid-svg-icons'
// import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import API from '../../../assets/scripts/common/apiurl.js'
library.add(
  faAngleDown,
  faCalendarAlt,
  faTrashAlt,
  faCheck,
  faFileAlt,
  faCloudDownloadAlt,
  faFileExcel,
  faFilePdf,
  faFileArchive,
  faEllipsisH
)
export default {
  name: 'HeadUserArea',
  data () {
    return {
      username: ''
    }
  },
  created () {
    this.username = this.$route.params.username
  },
  methods: {
    logOut () {
      this.$axios.$post(API.userlogout, this.logDetails).then((response) => {
        this.$router.push('/')
      }).catch((e) => {
        alert('Error' + e)
      })
    }
  }
}
</script>
