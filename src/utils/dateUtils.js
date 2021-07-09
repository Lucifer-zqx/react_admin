//将毫秒数转化为日期格式的字符串

export default function transformTime(day){
    if (!day) return ''
    let date = new Date(day)
    return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + (date.getDay()+4) + ' '
    + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
}
