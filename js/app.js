/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

const activeClassName = 'your-active-class';
const sections = [];
let currentActiveSectionId = null;
let activeNavbarElement = null;

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

const fillSectionsArray = () => {
    const sectionElements = document.querySelectorAll('section');
    for (let sectionElement of sectionElements) {
        if (sectionElement.classList.contains(activeClassName)){
            currentActiveSectionId = sectionElement.getAttribute('id')
        }
        sections.push({
            name: sectionElement.getAttribute('data-nav'),
            id: sectionElement.getAttribute('id')
        })
    }
}

const isInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

const setActiveSection = (section) => {
    const lastActiveSection = document.querySelector(`#${currentActiveSectionId}`);
    lastActiveSection.classList.remove(activeClassName);
    section.classList.add(activeClassName);
    currentActiveSectionId = section.getAttribute('id');
}

const setActiveNavbarLink = (navbarElement) => {
    navbarElement.classList.add('active-link');
    if (activeNavbarElement && activeNavbarElement.getAttribute('id') != navbarElement.getAttribute('id')){
        activeNavbarElement.classList.remove('active-link');
    }
    activeNavbarElement = navbarElement;
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
const buildNav = () => {
    fillSectionsArray()
    const fragment = document.createDocumentFragment();

    for (let section of sections) {
        const listItem = document.createElement('li');
        const menuLink  = document.createElement('a');

        menuLink.setAttribute('href', section.id);
        menuLink.setAttribute('class', 'menu__link');
        menuLink.setAttribute('id', section.id + '-nav')
        menuLink.textContent = section.name;

        listItem.appendChild(menuLink);
        fragment.appendChild(listItem);
    }

    const navbarList = document.querySelector('#navbar__list');
    navbarList.appendChild(fragment);
}

// Add class 'active' to section when near top of viewport
const findSectionInViewPort = () => {
    const viewportWidth = window.innerWidth || document.documentElement.clientWidth;
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    for (let section of sections) {
        const sectionElement = document.querySelector(`#${section.id}`);
        if(isInViewport(sectionElement)){
            setActiveSection(sectionElement);
            const navElement = document.querySelector(`#${section.id}-nav`);
            setActiveNavbarLink(navElement);
        }
    }
}

// Scroll to anchor ID using scrollTO event
const scrollToSection = (event) => {
    event.preventDefault();
    if(event.target.nodeName == 'A') {
        const id = event.target.getAttribute('href');
        setActiveNavbarLink(event.target);
        const section = document.querySelector(`#${id}`);
        section.scrollIntoView({ behavior: 'smooth', block: 'start'});
        setActiveSection(section);
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', buildNav);

// Scroll to section on link click
const navbarList = document.querySelector('#navbar__list');
navbarList.addEventListener('click', scrollToSection);

// Set sections as active

document.addEventListener('scroll', findSectionInViewPort);