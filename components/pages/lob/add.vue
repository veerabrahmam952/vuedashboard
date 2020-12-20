<template>
  <div class="card-body">
    <div v-if="isAlert">
      <b-alert :variant="isError ? 'danger' : 'success'" show>
        {{ alertMsg }}
      </b-alert>
    </div>
    <form @submit.prevent="handleSubmit">
      <textfor
        v-model="lobdata.portalLines.linesName"
        v-bind:isColumndisplay="true"
        :class="{ 'is-invalid': submitted && $v.lobdata.portalLines.linesName.$error }"
        :labelclass="submitted && $v.lobdata.portalLines.linesName.$error ? 'is-error col-md-8 mt-4' : 'col-md-8 mt-4'"
        label="Lines *"
        positionclass="col-md-4 mt-4 p-0"
        placeholder="Lines"
      />
      <!-- <selectlistfor
        v-bind:model="masterData.portalLines"
        v-model="lobdata.portalLines"
        v-bind:isColumndisplay="true"
        :class="{ 'is-invalid': submitted && $v.lobdata.portalLines.$error }"
        :labelclass="submitted && $v.lobdata.portalLines.$error ? 'is-error col-md-8 mt-4' : 'col-md-8 mt-4'"
        valueprop="linesId"
        textprop="linesName"
        label="Lines *"
        positionclass="col-md-4 mt-4 p-0"
      /> -->
      <!-- <input v-model="lobdata.lob.lobId" type="hidden"> -->
      <textfor
        v-model="lobdata.lob.lobName"
        v-bind:isColumndisplay="true"
        :class="{ 'is-invalid': submitted && $v.lobdata.lob.lobName.$error }"
        :labelclass="submitted && $v.lobdata.lob.lobName.$error ? 'is-error col-md-8 mt-4' : 'col-md-8 mt-4'"
        label="Line of Business *"
        positionclass="col-md-4 mt-4 p-0"
        placeholder="Line of Business"
      />
      <textfor
        v-model="lobdata.geography.geographyName"
        v-bind:isColumndisplay="true"
        :class="{ 'is-invalid': submitted && $v.lobdata.geography.geographyName.$error }"
        :labelclass="submitted && $v.lobdata.geography.geographyName.$error ? 'is-error col-md-8 mt-4' : 'col-md-8 mt-4'"
        label="Geography *"
        positionclass="col-md-4 mt-4 p-0"
        placeholder="Geography"
      />
      <!-- <selectlistfor
        v-bind:model="masterData.geography"
        v-model="lobdata.geography"
        v-bind:isColumndisplay="true"
        :class="{ 'is-invalid': submitted && $v.lobdata.geography.$error }"
        :labelclass="submitted && $v.lobdata.geography.$error ? 'is-error col-md-8 mt-4' : 'col-md-8 mt-4'"
        valueprop="geographyId"
        textprop="geographyName"
        label="Geography *"
        positionclass="col-md-4 mt-4 p-0"
      /> -->
      <textfor
        v-model="lobdata.bureau.bureauName"
        v-bind:isColumndisplay="true"
        :class="{ 'is-invalid': submitted && $v.lobdata.bureau.bureauName.$error }"
        :labelclass="submitted && $v.lobdata.bureau.bureauName.$error ? 'is-error col-md-8 mt-4' : 'col-md-8 mt-4'"
        label="Bureau *"
        positionclass="col-md-4 mt-4 p-0"
        placeholder="Bureau"
      />
      <!-- <selectlistfor
        v-bind:model="masterData.bureau"
        v-model="lobdata.bureau"
        v-bind:isColumndisplay="true"
        :class="{ 'is-invalid': submitted && $v.lobdata.bureau.$error }"
        :labelclass="submitted && $v.lobdata.bureau.$error ? 'is-error col-md-8 mt-4' : 'col-md-8 mt-4'"
        valueprop="bureauId"
        textprop="bureauName"
        label="Bureau *"
        positionclass="col-md-4 mt-4 p-0"
      /> -->
      <datefor
        v-model="lobdata.effectiveFrom"
        v-bind:isColumndisplay="true"
        :class="{ 'is-invalid': submitted && $v.lobdata.effectiveFrom.$error }"
        :labelclass="submitted && $v.lobdata.effectiveFrom.$error ? 'is-error col-md-8 mt-4' : 'col-md-8 mt-4'"
        label="Effective From *"
        positionclass="col-md-4 mt-4 p-0"
      />
      <datefor
        v-model="lobdata.effectiveTo"
        v-bind:isColumndisplay="true"
        :class="{ 'is-invalid': submitted && $v.lobdata.effectiveTo.$error }"
        :labelclass="submitted && $v.lobdata.effectiveTo.$error ? 'is-error col-md-8 mt-4' : 'col-md-8 mt-4'"
        label="Effective To *"
        positionclass="col-md-4 mt-4 p-0"
      />
      <div class="d-block text-center pt-4">
        <button @click="handleSubmit" type="button" class="btn btn-outline-primary">
          {{ isEdit ? 'Save' : 'ADD' }}
        </button>
        <button @click="$bvModal.hide('addPopup')" type="button" class="btn btn-outline-primary">
          Close
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import { required } from 'vuelidate/lib/validators'
import { DefineLOB } from '../../../assets/scripts/common/apiurl.js'
export default {
  name: 'AddLOB',
  props: {
    masterData: Object({}),
    isEdit: Boolean(false),
    selectedRow: Object({})
  },
  data () {
    return {
      isAlert: false,
      alertMsg: '',
      isError: false,
      submitted: false,
      lobdata: {
        'portalLines': {},
        'bureau': {},
        'geography': {},
        'lob': {},
        'effectiveFrom': '',
        'effectiveTo': '',
        'isActive': true
      },
      tempLobData: {
        'defineLobId': 0,
        'portalLines': {},
        'bureau': {},
        'geography': {},
        'lob': {},
        'effectiveFrom': '',
        'effectiveTo': '',
        'isActive': true
      }
    }
  },
  validations: {
    lobdata: {
      portalLines: {
        linesName: { required }
      },
      bureau: {
        bureauName: { required }
      },
      geography: {
        geographyName: { required }
      },
      lob: {
        lobName: { required }
      },
      effectiveFrom: { required },
      effectiveTo: { required }
    }
  },
  mounted () {
    if (this.isEdit) {
      this.lobdata = this.selectedRow
      this.tempLobData.defineLobId = this.selectedRow.defineLobId
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
        this.isAlert = false
        this.submitted = false
        this.addDefinedLOB()
      }
    },
    addDefinedLOB () {
      this.lobdata.effectiveFrom = this.lobdata.effectiveFrom + 'T00:00:00'
      this.lobdata.effectiveTo = this.lobdata.effectiveTo + 'T00:00:00'
      this.tempLobData.portalLines.linesName = this.lobdata.portalLines.linesName
      this.tempLobData.bureau.bureauName = this.lobdata.bureau.bureauName
      this.tempLobData.geography.geographyName = this.lobdata.geography.geographyName
      this.tempLobData.lob.lobName = this.lobdata.lob.lobName
      this.tempLobData.effectiveFrom = this.lobdata.effectiveFrom
      this.tempLobData.effectiveTo = this.lobdata.effectiveTo
      this.tempLobData.effectiveFrom = this.lobdata.effectiveFrom
      this.tempLobData.effectiveTo = this.lobdata.effectiveTo
      if (!this.isEdit) {
        this.$axios.$post(DefineLOB.addDefineLobRecord, this.lobdata).then((response) => {
          this.isAlert = true
          const tempMsg = 'LOB Added Successful'
          this.SetTime(tempMsg)
        }).catch((e) => {
          this.isError = true
          this.isAlert = true
          const tempMsg = 'Error' + ' ' + e
          this.SetTime(tempMsg)
        })
      } else {
        this.$axios.$post(DefineLOB.editDefineLobRecord, [this.tempLobData]).then((response) => {
          this.isAlert = true
          const tempMsg = 'Row Edited Successfully'
          this.SetTime(tempMsg)
          // alert('Row Edited Successfully')
        }).catch((e) => {
          this.isError = true
          this.isAlert = true
          const tempMsg = 'Error' + ' ' + e
          this.SetTime(tempMsg)
        })
      }
    },
    SetTime (tempMsg) {
      const v = this
      v.alertMsg = ''
      v.alertMsg = tempMsg + ' ' + 'Pop up will close in 2 sec'
      setTimeout(function () {
        v.alertMsg = ''
        v.$bvModal.hide('addPopup')
      }, 1500)
    }
  }
}
</script>
