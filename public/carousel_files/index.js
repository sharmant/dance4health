$('.owl-carousel').owlCarousel({

    responsiveClass:true,
    responsive:{
        0:{
            items:1,
            nav:true
        },
        600:{
            items:3,
            nav:false
        },
        1000:{
            items:5,
            nav:true,
            loop:false
        }
    },

    items:4,
    loop: false,
    center:true,
    margin:10,
    callbacks: true,
    URLhashListener:true,
    autoplayHoverPause:true,
    startPosition: 'URLHash'

})
