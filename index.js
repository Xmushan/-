const headerEL = document.querySelector('header')
const scrollToTop = document.querySelector(".scrollToTop")
window.addEventListener("scroll", () => {
    let height = headerEL.getBoundingClientRect().height
    if (window.pageYOffset - height >800) {
        if (!headerEL.classList.contains('sticky')) {
            headerEL.classList.add('sticky')
        }
    }else {
        headerEL.classList.remove('sticky')
    }
    if (window.pageYOffset > 2000) {
        scrollToTop.style.display = "block" 
    } else {
        scrollToTop.style.display = "none"
    }
})

const glide = new Glide(".glide")
const captionEL = document.querySelectorAll('.slide-caption')

glide.on(["mount.after","run.after",], () => {
    const caption = captionEL[glide.index]
    anime({
        targets : caption.children,
        opacity : [0,1],
        duration :400,
        easing : "linear",
        delay : anime.stagger(400, {start:300}),
        translateY : [anime.stagger([40,10]),0]
    })
})

glide.on("run.before", () => {
    document.querySelectorAll(".slide-caption > *").forEach( el => {
        el.style.opacity = 0
    })
})
glide.mount();

const isotope = new Isotope(".cases",{
    layoutMod : 'fitRows',
    itemSelected : ".case-item"
})

const filterBtns = document.querySelector(".filter-btns")

filterBtns.addEventListener("click",e => {
    let {target} = e
    const filterOption = target.getAttribute("data-filter")
    if (filterOption) {
        document.querySelectorAll(".filter-btn.active").forEach(btn => {
            btn.classList.remove("active")
        })
        target.classList.add('active')
        isotope.arrange({filter:filterOption})
    }
})

const staggeringOption = {
    delay:300,
    distance: "50px",
    duration :500,
    easing:"ease-in-out",
    origin:'bottom'
}
ScrollReveal().reveal(".feature",{...staggeringOption,interval:350});
ScrollReveal().reveal(".service-item",{...staggeringOption,interval:350});
ScrollReveal().reveal(".data-section",{
    beforeReveal: () => {
        anime({
            targets : ".data-piece .num",
            innerHTML : el => {
                return [0,el.innerHTML]
            },
            duration : 2000,
            round : 1,
            easing : "easeInExpo"
        })
        dataSectionEL.style.backgroundPosition = `center calc(50% - ${dataSectionEL.getBoundingClientRect().bottom / 5}px)`
    }
});

const dataSectionEL = document.querySelector(".data-section")
window.addEventListener("scroll",() => {
    const bottom = dataSectionEL.getBoundingClientRect().bottom
    const top = dataSectionEL.getBoundingClientRect().top

    if (bottom >= 0 && top <= window.innerHeight){
        dataSectionEL.style.backgroundPosition = `center calc(50% - ${bottom / 5}px)`
    }
})

const scroll = new SmoothScroll('nav a[href*="#"], .scrollToTop a[href*="#"]',{
    header : 'header',
    offset : 80

})
document.addEventListener('scrollStart', () => {
    if (headerEL.classList.contains('open')){
        headerEL.classList.remove('open')
    }
})

const exploreBtnELs = document.querySelectorAll('.explore-btn')
exploreBtnELs.forEach(exploreBtnEL => {
    exploreBtnEL.addEventListener('click', () => {
    scroll.animateScroll(document.querySelector("#about-us"))
})
})

//折叠按钮
const burgerEL = document.querySelector('.burger')
burgerEL.addEventListener("click", () => {
    headerEL.classList.toggle('open')
})
