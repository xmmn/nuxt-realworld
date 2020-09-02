import Vue from 'vue'
import dayjs from 'dayjs'

Vue.filter('format', (date, format) => {
    return dayjs(date).format(format)
})