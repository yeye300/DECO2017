let date = new Date();
// 点击切换月份的事件
document.getElementById('prev').addEventListener('click',function(){
    date.setMonth(date.getMonth()-1);
    add();
})
document.getElementById('next').addEventListener('click',function(){
    date.setMonth(date.getMonth()+1);
    add();
})
add();

//制作日历的函数
function add(){
    // 当前年
    let cYear = date.getFullYear();
    // 当前月
    let cMonth = date.getMonth()+1;
    // 获取到当前日期
    let cDay = date.getDate();
    // 写入年月
    document.getElementById('year').innerHTML = cYear + '年';
    document.getElementById('month').innerHTML = cMonth + '月';
    document.querySelector(".bigMonth").innerHTML = cMonth

    let days = new Date(cYear,cMonth,0);
    // 当前月份的天数
    let n = days.getDate();
    // 每个月的第一天是星期几
    let week = new Date(cYear,cMonth-1,1).getDay();
    let html = '';
    // 写入dom
    for(let i=0;i<week;i++){
        html+=`<li class="invalid"></li>`
    }
    for(let i = 1; i <= n; i++){
        if(i == cDay){
            html+=`<li class="current" onclick="clickDate(${cYear},${i})">${i}</li>`
        }else{
            html+=`<li onclick="clickDate(${cYear},${i})">${i}</li>`
        }
    }
    // 一次性插入
    document.getElementById('ul').innerHTML = html
}
// 日程部分
let dateArr = {}        // 日程对象，日程以数组的形式进行储存
let schedule = document.querySelector(".schedule")
let mark = document.querySelector(".mark")
// 点击日期
let currentYear;        // 点击日期临时储存
let currentDay;         // 点击日期临时储存
function clickDate(year,day) {
    currentYear = year;
    currentDay = day;
    mark.style.display = 'flex'
    seheduleInit()
}
// 初始化日程
function seheduleInit() {
    let dateString = currentYear.toString()+currentDay
    if(dateArr[dateString] == undefined){
        schedule.innerHTML = `<div class="notSchedule">No agenda</div>`
    }else {
        let scheduleHtml = ``
        for(let i = 0; i < dateArr[dateString].length; i++){
            scheduleHtml = scheduleHtml + `<div class="scheduleList">${dateArr[dateString][i].text}</div>`
        }
        schedule.innerHTML = scheduleHtml
    }
}
function closeMark() {
    mark.style.display = 'none'
}

let mark_con = document.querySelector(".mark_con")
let seheduleCon = document.querySelector(".seheduleCon")
// 点击添加
function clickAdd() {
    mark_con.style.display = 'none'
    seheduleCon.style.display = 'block'
}
// 取消添加
function cancelAdd() {
    mark_con.style.display = 'block'
    seheduleCon.style.display = 'none'
    place.value = ''
}
// 确定添加
let place = document.querySelector(".place")
function defineAdd() {
    let dateString = currentYear.toString()+currentDay
    if(place.value == ''){
        return alert('Please enter the information!')
    }
    let obj = {
        text: place.value
    }
    if(dateArr[dateString] == undefined){
        dateArr[dateString] = []
    }
    dateArr[dateString].push(obj)
    seheduleInit()
    mark_con.style.display = 'block'
    seheduleCon.style.display = 'none'
    place.value = ''
}
window.onunload = function () {
    localStorage.setItem('dateArr',JSON.stringify(dateArr))
}
window.onload = function () {
    if(localStorage.getItem('dateArr') == null){
        dateArr = []
    }else {
        dateArr = JSON.parse(localStorage.getItem('dateArr'))
    }

}
// <div className="scheduleList"></div>
