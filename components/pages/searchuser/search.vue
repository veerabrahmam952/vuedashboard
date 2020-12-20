<template>
  <PageTemplate templateheader="Search User">
    <div slot="SearchContorls">
      <div v-if="isAlert">
        <b-alert :variant="isError ? 'danger' : 'success'" show>
          {{ alertMsg }}
        </b-alert>
      </div>
      <b-container class="card-body">
        <b-table
          :items="items"
          :fields="fields"
          :filter="filter"
          show-empty
          small
          stacked="md"
          responsive="sm"
          striped
          class="mt-3"
          style="border:2px solid #ccdff48c"
          hover
        >
          <template v-slot:cell(role_details)="row">
            <selectlistfor
              v-bind:model="rolesData"
              v-model="row.item.roles"
              v-bind:isColumndisplay="false"
              :class="{ 'is-invalid': submitted && $v.item.roles.$error }"
              :labelclass="submitted && $v.item.roles.$error ? 'is-error form-row' : 'form-row'"
              valueprop="id"
              textprop="role"
              positionclass="form-group col-md-8"
            />
          </template>
          <template v-slot:cell(actions)="row">
            <b-form-checkbox v-model="row.item.selected" />
          </template>
        </b-table>
        <div class="text-center">
          <button
            @click="SumbitRole"
            type="button"
            class="btn btn-primary btn-lg"
          >
            Save User Details
          </button>
        </div>
      </b-container>
    </div>
  </PageTemplate>
</template>
<script>
import API from '../../../assets/scripts/common/apiurl.js'
import PageTemplate from '../../templates/page.vue'
export default {
  name: 'SearchUserComponent',
  inject: ['$v'],
  components: {
    PageTemplate
  },
  data () {
    return {
      rolesData: {},
      rolesList: [],
      rolesstr: '',
      isError: false,
      saveRoleDetails: [],
      isEdit: false,
      displaydiv: false,
      items: [],
      fields: [],
      filter: null,
      isAlert: false,
      alertMsg: ''
    }
  },
  async mounted () {
    const referenceData = await this.$axios.$get(API.roledetails)
    this.rolesData = referenceData
    this.items = []
    const res = await this.$axios.$get(API.userdetails)
    res.forEach((element) => {
      this.items.push({
        'id': element.id,
        'email': element.email,
        'firstname': element.firstname,
        'lastname': element.lastname,
        'username': element.username,
        'password': element.password,
        'passwordconfirm': element.passwordconfirm,
        'active': element.active,
        'permission': element.permission,
        'roles': element.roles,
        'selected': false
      })
    })
    const headerstyle = { background: '#3f6ad7', color: '#ffffff' }
    this.fields = [
      { key: 'email', label: 'Email', thStyle: headerstyle },
      { key: 'firstname', label: 'First Name', thStyle: headerstyle },
      { key: 'role_details', label: 'Roles', thStyle: headerstyle },
      { key: 'actions', label: 'Actions', thStyle: headerstyle }
    ]
  },
  methods: {
    handleSubmit (e) {
      // stop here if form is invalid
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitted = true
        this.isAlert = true
        this.isError = true
        this.alertMsg = 'Please Fill Form Correctly'
      } else {
        this.SumbitRole()
      }
    },
    SumbitRole () {
      this.items.forEach((element) => {
        if (element.selected === true) {
          this.saveRoleDetails.push({
            'id': element.id,
            'roles': [element.roles]
          })
        }
      })
      this.$axios.post(API.saveuserdetails, this.saveRoleDetails).then((res) => {
        this.isAlert = true
        const tempMsg = 'Role Added Successfully'
        this.SetTime(tempMsg)
      }).catch((e) => {
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
