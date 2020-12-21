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
        menuLink.textContent = section.name;

        listItem.appendChild(menuLink);
        fragment.appendChild(listItem);
    }

    const navbarList = document.querySelector('#navbar__list');
    navbarList.appendChild(fragment);
}

// Add class 'active' to section when near top of viewport


// Scroll to anchor ID using scrollTO event
const scrollToSection = (event) => {
    event.preventDefault();
    if(event.target.nodeName == 'A') {
        const id = event.target.getAttribute('href');
        const section = document.querySelector(`#${id}`);
        section.scrollIntoView({ behavior: 'smooth', block: 'start'});
        const lastActiveSection = document.querySelector(`#${currentActiveSectionId}`);
        lastActiveSection.classList.remove(activeClassName);
        section.classList.add(activeClassName);
        currentActiveSectionId = id;
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
