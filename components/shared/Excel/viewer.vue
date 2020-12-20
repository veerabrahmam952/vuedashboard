<template>
  <div v-if="exceldata.tabheader.length > 0">
    <TabsFor :tabs="exceldata" />
  </div>
</template>

<script>
import XLSX from 'xlsx'
import TabsFor from '../../editortemplates/tabsfor.vue'

export default {
  name: 'ExcelViewer',
  components: { TabsFor },
  props: {
    filebinary: Object({})
  },
  data () {
    return {
      exceldata: {
        tabheader: [],
        tabcontent: []
      },
      excelBinary: undefined
    }
  },
  mounted () {
    this.processFile(this.filebinary)
  },
  methods: {
    get_header_row (sheet) {
      const headers = []
      const range = XLSX.utils.decode_range(sheet['!ref'])
      const R = range.s.r /* start in the first row */
      for (let C = range.s.c; C <= range.e.c; C++) { /* walk every column in the range */
        const cell = sheet[XLSX.utils.encode_cell({ c: C, r: R })] /* find the cell in the first row */
        let hdr = 'UNKNOWN ' + C // <-- replace with your desired default
        if (cell && cell.t) {
          hdr = XLSX.utils.format_cell(cell)
        }
        headers.push(hdr)
      }
      return headers
    },
    processFile (filebinary) {
      /* Parse data */
      this.excelBinary = filebinary
      const wb = XLSX.read(this.excelBinary, { type: 'binary' })
      /* Get first worksheet */
      this.exceldata.tabheader = wb.SheetNames
      this.exceldata.tabheader.forEach((sheet, index) => {
        const ws = wb.Sheets[sheet]
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_json(ws, { header: 1 })
        const sheetcontent = {
          'contentheader': this.get_header_row(ws),
          'content': data
        }
        this.exceldata.tabcontent.push(sheetcontent)
      })
    }
  }
}
</script>
