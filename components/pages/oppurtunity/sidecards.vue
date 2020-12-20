<template>
  <form-wizard
                @on-complete="onComplete"
                @on-loading="setLoading"
                @on-validate="handleValidation"
                color="#20a0ff">
    <tab-content
      :before-change="validateAsync"
      title="Opportunity"
      icon="ti-user">
        <!-- <selectlistfor
          v-bind:model="opportunityData.opportunityName"
          v-model="opportunityData.opportunityName"
          v-bind:isColumndisplay="true"
          valueprop="opportunityId"
          textprop="opportunityName"
          label="BaseOpportunity *"
          positionclass="col-md-4 mt-4 p-0"
        /> -->
        <textfor
          v-model="opportunityData.opportunityName"
          v-bind:isColumndisplay="true"
          label="Opportunity  *"
          positionclass="col-md-4 mt-4 p-0"
          placeholder="Opportunity "
        />
        <datefor
          v-model="opportunityData.effectiveFromDate"
          v-bind:isColumndisplay="true"
          label="Effective From *"
          positionclass="col-md-4 mt-4 p-0"
        />
        <datefor
          v-model="opportunityData.effectiveToDate"
          v-bind:isColumndisplay="true"
          label="Effective To *"
          positionclass="col-md-4 mt-4 p-0"
        />
    </tab-content>
    <tab-content
      :before-change="validateAsync"
      title="Lines Creation"
      icon="ti-settings">
       <textfor
          v-model="effectiveFromDate"
          v-bind:isColumndisplay="true"
          label="Line of Business *"
          positionclass="col-md-4 mt-4 p-0"
          placeholder="Line of Business"
        />
        <datefor
          v-model="effectiveFromDate"
          v-bind:isColumndisplay="true"
          label="Effective To *"
          positionclass="col-md-4 mt-4 p-0"
        />
        <datefor
          v-model="effectiveFromDate"
          v-bind:isColumndisplay="true"
          label="Effective To *"
          positionclass="col-md-4 mt-4 p-0"
        />
    </tab-content>
    <tab-content
      :before-change="validateAsync"
      title="Segment Creation"
      icon="ti-settings">
        <textfor
          v-model="effectiveFromDate"
          v-bind:isColumndisplay="true"
          label="Line of Business *"
          positionclass="col-md-4 mt-4 p-0"
          placeholder="Line of Business"
        />
        <datefor
          v-model="effectiveFromDate"
          v-bind:isColumndisplay="true"
          label="Effective To *"
          positionclass="col-md-4 mt-4 p-0"
        />
        <datefor
          v-model="effectiveFromDate"
          v-bind:isColumndisplay="true"
          label="Effective To *"
          positionclass="col-md-4 mt-4 p-0"
        />
    </tab-content>
    <tab-content
      :before-change="validateAsync"
      title="Lob Creation"
      icon="ti-settings">
        <textfor
          v-model="effectiveFromDate"
          v-bind:isColumndisplay="true"
          label="Line of Business *"
          positionclass="col-md-4 mt-4 p-0"
          placeholder="Line of Business"
        />
        <datefor
          v-model="effectiveFromDate"
          v-bind:isColumndisplay="true"
          label="Effective To *"
          positionclass="col-md-4 mt-4 p-0"
        />
        <datefor
          v-model="effectiveFromDate"
          v-bind:isColumndisplay="true"
          label="Effective To *"
          positionclass="col-md-4 mt-4 p-0"
        />
    </tab-content>
    <tab-content
      :before-change="validateAsync"
      title="Sub-Segment Creation"
      icon="ti-check">
        <textfor
          v-model="effectiveFromDate"
          v-bind:isColumndisplay="true"
          label="Line of Business *"
          positionclass="col-md-4 mt-4 p-0"
          placeholder="Line of Business"
        />
        <datefor
          v-model="effectiveFromDate"
          v-bind:isColumndisplay="true"
          label="Effective To *"
          positionclass="col-md-4 mt-4 p-0"
        />
        <datefor
          v-model="effectiveFromDate"
          v-bind:isColumndisplay="true"
          label="Effective To *"
          positionclass="col-md-4 mt-4 p-0"
        />
    </tab-content>
    <tab-content
    :before-change="validateAsync"
      title="Epic Feature Requirement Task"
      icon="ti-check">
        <textfor
          v-model="effectiveFromDate"
          v-bind:isColumndisplay="true"
          label="Line of Business *"
          positionclass="col-md-4 mt-4 p-0"
          placeholder="Line of Business"
        />
        <datefor
          v-model="effectiveFromDate"
          v-bind:isColumndisplay="true"
          label="Effective To *"
          positionclass="col-md-4 mt-4 p-0"
        />
        <datefor
          v-model="effectiveFromDate"
          v-bind:isColumndisplay="true"
          label="Effective To *"
          positionclass="col-md-4 mt-4 p-0"
        />
    </tab-content>
  </form-wizard>
</template>

<script>
import API, { Opportunities } from '../../../assets/scripts/common/apiurl.js'
export default {
  name: 'SideCards',
  data () {
    return {
      masterData: Object({}),
      opportunityData: {
        'opportunityId': 0,
        'opportunityName': '',
        'effectiveToDate': '',
        'effectiveFromDate': ''
      }
    }
  },
  async mounted () {
    const referenceData = await this.$axios.$get(API.masterJsonData)
    this.masterData = referenceData
    console.log(this.masterData)
  },
  methods: {
    async SearchData () {
      this.items = []
      const res = await this.$axios.$get(Opportunities.opportunityDetails)
      res.forEach((element) => {
        this.items.push({
          'opportunityName': element.opportunityName,
          'effectiveToDate': element.effectiveToDate.replace('T00:00:00', ''),
          'effectiveFromDate': element.effectiveFromDate.replace('T00:00:00', '')
        })
      })
      this.SetTable()
    },
    SetTable () {
      this.displaydiv = true
      const headerstyle = { background: '#3f6ad7', color: '#ffffff' }
      this.fields = [
        { key: 'lobId', label: 'ID', thStyle: headerstyle },
        { key: 'lobName', label: 'LOB', thStyle: headerstyle },
        { key: 'linesName', label: 'Line', thStyle: headerstyle },
        { key: 'bureauName', label: 'Bureau', thStyle: headerstyle },
        { key: 'geographyName', label: 'Geography', thStyle: headerstyle },
        { key: 'actions', label: 'Actions', thStyle: headerstyle }
      ]
    },
    SetLobData (rowItem) {
      this.selectedRow.defineLobId = rowItem.defineLobId
      this.deleteRow.defineLobId.defineLobId = rowItem.defineLobId
      this.selectedRow.lob.lobId = rowItem.lobId
      this.selectedRow.lob.lobName = rowItem.lobName
      this.selectedRow.geography.geographyId = rowItem.geographyId
      this.selectedRow.geography.geographyName = rowItem.geographyName
      this.selectedRow.bureau.bureauId = rowItem.bureauId
      this.selectedRow.bureau.bureauName = rowItem.bureauName
      this.selectedRow.portalLines.linesName = rowItem.linesName
      this.selectedRow.portalLines.linesId = rowItem.linesId
      this.selectedRow.effectiveFrom = rowItem.effectiveFrom
      this.selectedRow.effectiveTo = rowItem.effectiveTo
    },
    onComplete () {
      alert('Yay. Done!')
    },
    setLoading (value) {
      alert('Yay. set!')
      this.loadingWizard = value
    },
    handleValidation (isValid, tabIndex) {
      alert('Yay. handle!')
      console.log('Tab: ' + tabIndex + ' valid: ' + isValid)
    },
    validateAsync () {
      alert('Yay. validate!')
      this.opportunityData.effectiveFromDate = this.opportunityData.effectiveFromDate + 'T00:00:00'
      this.opportunityData.effectiveToDate = this.opportunityData.effectiveToDate + 'T00:00:00'
      this.$axios.$post(Opportunities.addOpportunity, this.opportunityData).then((response) => {
        const tempMsg = 'Opportunity Added Successfully'
        alert(tempMsg)
        this.SetTime(tempMsg)
      }).catch((e) => {
        const tempMsg = 'Error' + ' ' + e
        alert(tempMsg)
        this.SetTime(tempMsg)
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve(true)
        }, 1000)
      })
    }
  }
}
</script>
