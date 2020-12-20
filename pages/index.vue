<template>
  <div class="h-100 bg-plum-plate bg-animation">
    <div class="d-flex h-100 justify-content-center align-items-center">
      <div class="mx-auto app-login-box col-md-8">
        <div class="col-md-12 text-center">
          <h1>
            Requirement Portal
          </h1>
        </div>
        <div class="modal-dialog w-100 mx-auto">
          <div class="modal-content">
            <div class="modal-body">
              <div class="h5 modal-title text-center">
                <h4 class="mt-2">
                  <div>
                    Welcome Back
                  </div>
                  <span>
                    Please Sign In to your Account
                  </span>
                </h4>
              </div>
              <div>
                <div v-if="isAlert">
                  <b-alert :variant="isError ? 'danger' : 'success'" show>
                    {{ alertMsg }}
                  </b-alert>
                </div>
                <textfor
                  v-model="logDetails.username"
                  v-bind:isColumndisplay="false"
                  :class="{ 'is-invalid': submitted && $v.logDetails.username.$error }"
                  :labelclass="submitted && $v.logDetails.username.$error? 'is-error form-row' : 'form-row'"
                  label="User Name *"
                  positionclass="form-group col-md-12"
                  placeholder="enter email"
                />
                <passwordfor
                  v-model="logDetails.password"
                  v-bind:isColumndisplay="false"
                  :class="{ 'is-invalid': submitted && $v.logDetails.password.$error }"
                  :inputclass="submitted && $v.logDetails.password.$error ? 'is-error' : ''"
                  label="Password *"
                  positionclass="form-group col-md-12"
                  labelclass="form-row"
                  placeholder="password"
                />
              </div>
              <div class="dropdown-divider" />
              <h6 class="mb-0 pl-2">
                No Account ?
                <router-link to="/Register">
                  Register Now
                </router-link>
              </h6>
            </div>
            <div class="modal-footer">
              <div class="float-right">
                <button
                  @click="handleSubmit"
                  type="button"
                  class="btn btn-primary btn-lg"
                >
                  Login to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import API from '../assets/scripts/common/apiurl.js'
export default {
  name: 'Login',
  layout: 'standalone',
  data () {
    return {
      isAlert: false,
      alertMsg: '',
      submitted: false,
      isError: false,
      logDetails: {
        'username': '',
        'password': ''
      }
    }
  },
  validations: {
    logDetails: {
      username: { required },
      password: { required }
    }
  },
  methods: {
    handleSubmit (e) {
      // stop here if form is invalid
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitted = true
        this.isError = true
        this.isAlert = true
        this.alertMsg = 'Please fill the form correctly'
      } else {
        this.loginAccount()
      }
    },
    loginAccount () {
      this.$axios.$post(API.authenticate, this.logDetails).then((response) => {
        if (response.indexOf(':') > 0) {
          this.role = response.split(':')[1].trim()
          this.$router.push(
            { name: 'dashboard', params: { role: this.role, username: this.logDetails.username } }
          )
        } else {
          this.isError = true
          this.isAlert = true
          const tempMsg = 'User Not Found'
          this.SetTime(tempMsg)
        }
      }).catch((e) => {
        this.isError = true
        this.isAlert = true
        const tempMsg = 'Error' + ' ' + e
        this.SetTime(tempMsg)
      })
    },
    SetTime (tempMsg) {
      const v = this
      v.alertMsg = tempMsg
      setTimeout(function () {
        v.alertMsg = ''
        v.isAlert = false
      }, 1500)
    }
  }
}
</script>
