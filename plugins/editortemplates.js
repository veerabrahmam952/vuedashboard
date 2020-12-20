import Vue from 'vue'
import Multiselect from 'vue-multiselect'
import TextFor from '~/components/editortemplates/textfor.vue'
import DateFor from '~/components/editortemplates/datefor.vue'
import SelectlistFor from '~/components/editortemplates/selectlistfor.vue'
import RadioFor from '~/components/editortemplates/radiofor.vue'
import FileUploadFor from '~/components/editortemplates/fileuploadfor.vue'
import TextAreaFor from '~/components/editortemplates/textarea.vue'
import CheckListfor from '~/components/editortemplates/checklistfor.vue'
import Passwordfor from '~/components/editortemplates/passwordfor.vue'
import Emailfor from '~/components/editortemplates/emailfor.vue'

// Install components globally
Vue.component('textfor', TextFor)
Vue.component('textareafor', TextAreaFor)
Vue.component('datefor', DateFor)
Vue.component('selectlistfor', SelectlistFor)
Vue.component('radiofor', RadioFor)
Vue.component('fileuploadfor', FileUploadFor)
Vue.component('checklistfor', CheckListfor)
Vue.component('multiselectfor', Multiselect)
Vue.component('passwordfor', Passwordfor)
Vue.component('emailfor', Emailfor)
