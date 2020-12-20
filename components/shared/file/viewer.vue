<template>
  <div class="row card-body">
    <label for="file">FileViewer</label>
    <input id="file" :accept="FileTypes" @change="fileChange" type="file" class="form-control">
    <a @click="$bvModal.show('viewFile')" href="#">View File</a>
    <b-modal id="viewFile" hide-footer hide-header size="xl">
      <a @click="$bvModal.hide('viewFile')" href="#" style="float:right; font-weight:bold; font-size:20px">X</a>
      <ExcelViewer :filebinary="FileBinary" v-if="ViewerType==='Excel'" />
      <PdfViewer :filebinary="FileBinary" v-if="ViewerType==='Pdf'" />
      <DocViewer :filebinary="FileBinary" v-if="ViewerType==='Doc'" />
    </b-modal>
  </div>
</template>

<script>
import ExcelViewer from '../../shared/excel/viewer.vue'
import PdfViewer from '../../shared/pdf/viewer.vue'
import DocViewer from '../../shared/word/viewer.vue'

export default {
  name: 'FileViewer',
  components: {
    ExcelViewer,
    PdfViewer,
    DocViewer
  },
  data () {
    return {
      ViewerType: '',
      File: {},
      FileBinary: undefined,
      FileExtension: '',
      FileTypes: ['xlsx', 'xlsb', 'xlsm', 'xls', 'xml', 'csv', 'txt', 'ods', 'pdf', 'doc', 'docx'].map((x) => { return '.' + x }).join(',')
    }
  },
  methods: {
    fileChange (evt) {
      // eslint-disable-next-line
      debugger
      const files = evt.target.files
      if (files && files[0] && this.setFileExtension(files[0].name)) {
        if (this.FileExtension.length > 0 && this.setViewerType(this.FileExtension)) {
          if (this.ViewerType.length > 0) {
            if (this.setFile(files[0]) && (this.File)) {
              this.getFileBinary(this.File)
            }
          }
        }
      }
    },
    setFileExtension (fileName) {
      if (fileName.length === 0) {
        return false
      }
      const parts = fileName.split('.')
      this.FileExtension = parts[parts.length - 1]
      return true
    },
    setViewerType (fileExtension) {
      if (fileExtension.length === 0) {
        return false
      }
      const ExcelType = ['xlsx', 'xlsb', 'xlsm', 'xls', 'xml', 'csv', 'txt', 'ods']
      const PdfType = ['pdf']
      const DocType = ['doc', 'docx']
      //   const VisioType = ['']
      //   const TextType = ['']
      if (ExcelType.includes(fileExtension)) {
        this.ViewerType = 'Excel'
      } else if (PdfType.includes(fileExtension)) {
        this.ViewerType = 'Pdf'
      } else if (DocType.includes(fileExtension)) {
        this.ViewerType = 'Doc'
      } else {
        this.ViewerType = ''
      }
      return true
    },
    setFile (file) {
      if (!file) {
        return false
      }
      this.File = file
      return true
    },
    getFileBinary (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        this.FileBinary = e.target.result
      }
      reader.readAsBinaryString(file)
    }
  }
}
</script>
