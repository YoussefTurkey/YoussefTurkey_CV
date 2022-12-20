// =============== Show Menu ==================
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId);
    if(toggle && nav){
        toggle.addEventListener('click',()=>{
            nav.classList.toggle('show_menu');
        })
    }
}
showMenu('nav_toggle', 'nav_menu');


// =============== Remove Menu Mobile ==================
const navLink = document.querySelectorAll('.nav__link');

function linkAction(){
    const navMenu = document.getElementById('nav_menu');
    navMenu.classList.remove('show_menu'); 
}
navLink.forEach(link => link.addEventListener('click', linkAction));


// =============== Scroll Sections Active Link ==================
const sections = document.querySelectorAll('section[id]');

function scrollActive(){
    const scrollY = window.pageYOffset;

    sections.forEach( current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active_link');
        }else{
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active_link');
        }
    })
}
window.addEventListener('scroll', scrollActive);


// =============== Show Scroll Top ==================
function scrollTop(){
    const scrollTop = document.getElementById('scroll_top');

    if(this.scrollY >= 200)
        scrollTop.classList.add('show_scroll');
    else   
        scrollTop.classList.remove('show_scroll');
}
window.addEventListener('scroll', scrollTop);


// =============== Dark Light Themes ==================
const themeButton = document.getElementById('theme_button'),
      darkTheme = 'dark_theme',
      iconTheme = 'bx-sun';

const selectedTheme = localStorage.getItem('selected-theme'),
      selectedIcon = localStorage.getItem('selected-icon');

const getCurrentTheme = () => document.body.classList.contains(darkTheme) ? 'dark' : 'light',
      getCurrentIcon = () => themeButton.classList.contains(iconTheme) ? 'bx-moon' : 'bx-sun';

if(selectedTheme){
    document.body.classList[selectedTheme === 'dark' ? 'add' : 'remove'](darkTheme)
    themeButton.classList[selectedIcon === 'bx-moon' ? 'add' : 'remove'](iconTheme)
}

themeButton.addEventListener('click', ()=>{
    document.body.classList.toggle(darkTheme);
    themeButton.classList.toggle(iconTheme);

    localStorage.setItem('selected-theme', getCurrentTheme());
    localStorage.setItem('selected-icon', getCurrentIcon());
})


// =============== Reduce the size and print on an A4 sheet ==================
function scaleCV(){
    document.body.classList.add('scale_cv');
}


// =============== Remove the size when the cv is downloaded ==================
function removeScale(){
    document.body.classList.remove('scale_cv');
}


// =============== Generate PDF ==================
let areaCV = document.getElementById('area_cv');
let resumeButton = document.getElementById('resume_button');

let opt={
    margin: 0,
    filename: 'Youssef-Turkey-CV.pdf',
    image: {type: 'jpeg', quality: 0.98},
    html2canvas: {scale: 4},
    jsPDF: {format: 'a4', orientation: 'portrait'}
}

function generateResume(){
    html2pdf(areaCV, opt);
}

resumeButton.addEventListener('click', ()=>{
    scaleCV();
    generateResume();
    setTimeout(removeScale, 3000);
})

//  =============== Generate PDF For Mobile Screen (using jQuery lib) ==================
$('#download_mob').click(function(){
    window.print();
});