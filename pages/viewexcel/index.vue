<template>
  <div class="container">
    <FileViewer />
  </div>
</template>

<script>
import FileViewer from '../../components/shared/file/viewer.vue'

export default {
  name: 'ViewPDF',
  components: {
    FileViewer
  }
}
</script>
