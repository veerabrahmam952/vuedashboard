<template>
  <div>
    <div>
      <VueDocPreview
        :type="docType"
        :mdStyle="mdStyle"
        value="Markdown Test"
      />
    </div>
  </div>
</template>

<script>
import VueDocPreview from 'vue-doc-preview'
// import Marked from 'marked'

export default {
  name: 'DocViewer',
  components: {
    VueDocPreview
  },
  props: {
    filebinary: Object({})
  },
  data () {
    return {
      docBinary: undefined,
      docValue: undefined,
      docType: 'markdown',
      mdStyle: {
        pre: {
          'background-color': 'rgb(187, 255, 255)'
        },
        code: {
          'background-color': 'rgb(187, 255, 255)',
          'line-height': '20px'
        }
      }
    }
  },
  mounted () {
    this.processFile(this.filebinary)
  },
  methods: {
    processFile (filebinary) {
      this.docBinary = filebinary
    }
  }
}
</script>
