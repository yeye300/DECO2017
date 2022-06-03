let date = new Date();
// Click to switch the month's events
document.getElementById('prev').addEventListener('click',function(){
    date.setMonth(date.getMonth()-1);
    add();
})
document.getElementById('next').addEventListener('click',function(){
    date.setMonth(date.getMonth()+1);
    add();
})
add();

// Make calendar function
function add(){
    // The current year
    let cYear = date.getFullYear();
    // The current month
    let cMonth = date.getMonth()+1;
    // The current day
    let cDay = date.getDate();
    // Write monthly on calendar
    document.getElementById('year').innerHTML = cYear + '年';
    document.getElementById('month').innerHTML = cMonth + '月';
    document.querySelector(".bigMonth").innerHTML = cMonth

    let days = new Date(cYear,cMonth,0);
    // Number of days in the current month
    let n = days.getDate();
    // What day is the first day of each month
    let week = new Date(cYear,cMonth-1,1).getDay();


    let html = '';
    // dom
    for(let i=0;i<week;i++){
        html += `<li class="invalid"></li>`
    }

    for(let i = 1; i <= n; i++){
        if(i == cDay){
            html+=`<li class="current" onclick="clickDate(${cYear},${cMonth},${i})">${i}</li>`
        }else{
            html+=`<li onclick="clickDate(${cYear},${cMonth},${i})">${i}</li>`
        }
    }
    
    document.getElementById('ul').innerHTML = html
}
// The schedule part
let dateArr = {}        // Agenda object, which is stored as an array
let schedule = document.querySelector(".schedule")
let mark = document.querySelector(".mark")
// Click on the date
let currentYear;        // Click on date temporary save
let currentMonth;         // Click on date temporary save
let currentDay;         // Click on date temporary save
function clickDate(year,Month,day) {
    currentYear = year;
    currentMonth = Month;
    currentDay = day;
    mark.style.display = 'flex'
    seheduleInit()
}
// Initialization schedule
function seheduleInit() {
    let dateString = currentYear.toString()+currentMonth.toString()+currentDay
    if(dateArr[dateString] == undefined){
        schedule.innerHTML = `<div class="notSchedule">暂无日程</div>`
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
// Click on add
function clickAdd() {
    mark_con.style.display = 'none'
    seheduleCon.style.display = 'block'
}
//Cancel the add
function cancelAdd() {
    mark_con.style.display = 'block'
    seheduleCon.style.display = 'none'
    place.value = ''
}
// Sure to add
let place = document.querySelector(".place")
function defineAdd() {
    let dateString = currentYear.toString()+currentMonth.toString()+currentDay
    console.log(dateString);
    if(place.value == ''){
        return alert('请输入信息!')
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
        dateArr = {}
    }else {
        dateArr = JSON.parse(localStorage.getItem('dateArr'))
    }
}
// <div className="scheduleList"></div>
