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
                    REGISTER
                  </div>
                  <h6>
                    It only takes a few seconds to create your account
                  </h6>
                </h4>
              </div>
              <div>
                <div v-if="isAlert">
                  <b-alert :variant="isError ? 'danger' : 'success'" show>
                    {{ alertMsg }}
                  </b-alert>
                </div>
                <textfor
                  v-model="regDetails.firstname"
                  v-bind:isColumndisplay="false"
                  :class="{ 'is-invalid': submitted && $v.regDetails.firstname.$error }"
                  :labelclass="submitted && $v.regDetails.firstname.$error ? 'is-error' : ''"
                  label="First Name *"
                  positionclass="form-group col-md-12"
                  placeholder="Fisrt Name"
                />
                <textfor
                  v-model="regDetails.lastname"
                  v-bind:isColumndisplay="false"
                  :class="{ 'is-invalid': submitted && $v.regDetails.lastname.$error }"
                  :labelclass="submitted && $v.regDetails.lastname.$error ? 'is-error' : ''"
                  label="Last Name *"
                  positionclass="form-group col-md-12"
                  placeholder="Last Name"
                />
                <emailfor
                  v-model="regDetails.email"
                  v-bind:isColumndisplay="false"
                  :class="{ 'is-invalid': submitted && $v.regDetails.email.$error }"
                  :labelclass="submitted && $v.regDetails.email.$error ? 'is-error' : ''"
                  label="Email *"
                  positionclass="form-group col-md-12"
                  placeholder="Enter email"
                />
                <textfor
                  v-model="regDetails.username"
                  v-bind:isColumndisplay="false"
                  :class="{ 'is-invalid': submitted && $v.regDetails.username.$error }"
                  :labelclass="submitted && $v.regDetails.username.$error ? 'is-error' : ''"
                  label="User Name *"
                  positionclass="form-group col-md-12"
                  placeholder="User Name"
                />
                <passwordfor
                  v-model="regDetails.password"
                  v-bind:isColumndisplay="false"
                  :class="{ 'is-invalid': submitted && $v.regDetails.password.$error }"
                  :inputclass="submitted && $v.regDetails.password.$error ? 'is-error' : ''"
                  label="Password *"
                  positionclass="form-group col-md-12"
                  placeholder="Enter Password"
                />
                <passwordfor
                  v-model="regDetails.passwordconfirm"
                  v-bind:isColumndisplay="false"
                  :class="{ 'is-invalid': submitted && $v.regDetails.passwordconfirm.$error }"
                  :inputclass="submitted && $v.regDetails.passwordconfirm.$error ? 'is-error' : ''"
                  label="Confirm Password *"
                  positionclass="form-group col-md-12"
                  placeholder="Confirm Password"
                />
              </div>
              <div class="dropdown-divider" />
              <h6 class="mb-0 pl-2">
                Already Registered?
                <router-link to="/">
                  Login
                </router-link>
              </h6>
            </div>
            <div class="modal-footer d-block text-center">
              <div class="">
                <button
                  @click="handleSubmit"
                  type="button"
                  class="btn btn-primary btn-lg"
                >
                  Create Account
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
import { required, email, sameAs } from 'vuelidate/lib/validators'
import API from '../../assets/scripts/common/apiurl.js'
export default {
  name: 'Register',
  layout: 'standalone',
  data () {
    return {
      isAlert: false,
      alertMsg: '',
      isError: false,
      submitted: false,
      regDetails: {
        'firstname': '',
        'lastname': '',
        'email': '',
        'username': '',
        'password': '',
        'passwordconfirm': '',
        'permission': '0'
      }
    }
  },
  validations: {
    regDetails: {
      firstname: { required },
      lastname: { required },
      email: { required, email },
      username: { required },
      password: { required },
      passwordconfirm: { required, sameAsPassword: sameAs('password') }
    }
  },
  methods: {
    handleSubmit (e) {
      // stop here if form is invalid
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitted = true
        this.isAlert = true
        this.isError = true
        this.alertMsg = 'Please fill the form correctly'
      } else {
        this.submitted = false
        this.isError = false
        this.createAccount()
      }
    },
    createAccount () {
      this.$axios.$post(API.registration, this.regDetails).then((response) => {
        this.isAlert = true
        const tempMsg = 'Account Created Successfully'
        this.SetTime(tempMsg)
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
