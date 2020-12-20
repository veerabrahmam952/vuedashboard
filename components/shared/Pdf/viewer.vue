<template>
  <div v-if="numPages > 0">
    <div>
      <pdf
        v-for="i in numPages"
        :key="i"
        :src="pdfSrc"
        :page="i"
      />
    </div>
  </div>
</template>

<script>
import pdf from 'vue-pdf'

export default {
  name: 'PdfViewer',
  components: {
    pdf
  },
  props: {
    filebinary: Object({})
  },
  data () {
    return {
      pdfBinary: undefined,
      pdfSrc: undefined,
      numPages: undefined
    }
  },
  mounted () {
    this.processFile(this.filebinary)
  },
  methods: {
    processFile (filebinary) {
      this.pdfBinary = filebinary
      this.pdfSrc = pdf.createLoadingTask({ data: this.pdfBinary })
      this.pdfSrc.then((pdf) => {
        this.numPages = pdf.numPages
      })
    }
  }
}
</script>
