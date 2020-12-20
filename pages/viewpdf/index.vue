<template>
  <div>
    <!-- <PdfViewer />
    <hr>
    <ExcelViewer :excelPath="excelPath" /> -->
  </div>
</template>

<script>
// import PdfViewer from '../../components/shared/Pdf/viewer.vue'
// import ExcelViewer from '../../components/shared/Excel/viewer.vue'

export default {
  name: 'ViewPDF',
  components: {
    // PdfViewer,
    // ExcelViewer
  },
  data () {
    return {
      excelPath: 'XYZ'
    }
  }
}
</script>
