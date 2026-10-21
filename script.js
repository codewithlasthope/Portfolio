const menuToggle = document.querySelector('#menu-toggle')
const maiNav = document.querySelector('#main-nav')

menuToggle.addEventListener('click', ()=> {
    console.log('clicked')
    maiNav.classList.toggle('nav-active')
    if (maiNav.classList.contains('nav-active')) {
        menuToggle.setAttribute('aria-label', 'Close navigation menu');
    }
    else {
        menuToggle.setAttribute('aria-label', 'Open navigation menu');
    }
})


const revealSections = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.3
    }
);

revealSections.forEach(section => {
    observer.observe(section);
});

const back2Top = document.getElementById('back-to-top')
const scrollThreshold = 300

window.addEventListener('scroll', ()=> {
    if (window.scrollY > scrollThreshold) {
        back2Top.classList.add('show')
    }
    else {
        back2Top.classList.remove('show')
    }
})

back2Top.addEventListener('click', ()=> {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
})

// const navLinks = document.querySelectorAll('#main-nav a');

// const sections = document.querySelectorAll(
//     '#hero-section, #skill-section, #project-section, #footer'
// );

// const navObserver = new IntersectionObserver(
//     (entries) => {
//         entries.forEach(entry => {
//             if (!entry.isIntersecting) return;

//             navLinks.forEach(link => {
//                 link.parentElement.classList.remove('nav-active');
//             });

//             const activeLink = document.querySelector(
//                 `#main-nav a[href="#${entry.target.id}"]`
//             );

//             if (activeLink) {
//                 activeLink.parentElement.classList.add('nav-active');
//             }
//         });
//     },
//     {
//         threshold: 0.1
//     }
// );

// sections.forEach(section => {
//     navObserver.observe(section);
// });

const navLinks = document.querySelectorAll('#main-nav a');

const sections = document.querySelectorAll(
    '#hero-section, #skill-section, #project-section, #footer'
);

function updateActiveNav() {
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 150) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.parentElement.classList.remove('nav-active');
    });

    const activeLink = document.querySelector(
        `#main-nav a[href="#${currentSection}"]`
    );

    if (activeLink) {
        activeLink.parentElement.classList.add('nav-active');
    }
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

window.addEventListener('scroll', ()=> {
    const atBottom = 
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 5

    if (atBottom) {
        navLinks.forEach(link => {
            link.parentElement.classList.remove('nav-active')
        })
        
        const contactLink = document.querySelector('#main-nav a[href="#footer"]')

        if (contactLink) {
            contactLink.parentElement.classList.add('nav-active')
        }
    }
})

const projectImages = document.querySelectorAll('.projects img');

const imagePreview = document.querySelector('#image-preview');
const previewImage = document.querySelector('#preview-image');
const previewClose = document.querySelector('#preview-close');
console.log('Images:', projectImages.length);
console.log('Preview:', imagePreview);
console.log('Preview image:', previewImage);

projectImages.forEach((img) => {
    img.addEventListener('click', ()=> {
        previewImage.src = img.src
        previewImage.alt = img.alt
        imagePreview.classList.add('show-image')
    })

    previewClose.addEventListener('click', () => {
        imagePreview.classList.remove('show-image');
    });

    imagePreview.addEventListener('click', (e)=> {
        if (e.target === imagePreview) {
            imagePreview.classList.remove('show-image')
        }
    })

    document.addEventListener('keydown', (e)=> {
        if (e.key === 'Escape') {
            imagePreview.classList.remove('show-image')
        }
    })
})