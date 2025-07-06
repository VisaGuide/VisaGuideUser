/**
* Template Name: EasyFolio
* Template URL: https://bootstrapmade.com/easyfolio-bootstrap-portfolio-template/
* Updated: Feb 21 2025 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  if (mobileNavToggleBtn) {
    mobileNavToggleBtn.addEventListener('click', mobileNavToogle);
  }

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Animate the skills items on reveal
   */
  let skillsAnimation = document.querySelectorAll('.skills-animation');
  skillsAnimation.forEach((item) => {
    new Waypoint({
      element: item,
      offset: '80%',
      handler: function(direction) {
        let progress = item.querySelectorAll('.progress .progress-bar');
        progress.forEach(el => {
          el.style.width = el.getAttribute('aria-valuenow') + '%';
        });
      }
    });
  });

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Init isotope layout and filters
   */
  document.querySelectorAll('.isotope-layout').forEach(function(isotopeItem) {
    let layout = isotopeItem.getAttribute('data-layout') ?? 'masonry';
    let filter = isotopeItem.getAttribute('data-default-filter') ?? '*';
    let sort = isotopeItem.getAttribute('data-sort') ?? 'original-order';

    let initIsotope;
    imagesLoaded(isotopeItem.querySelector('.isotope-container'), function() {
      initIsotope = new Isotope(isotopeItem.querySelector('.isotope-container'), {
        itemSelector: '.isotope-item',
        layoutMode: layout,
        filter: filter,
        sortBy: sort
      });
    });

    isotopeItem.querySelectorAll('.isotope-filters li').forEach(function(filters) {
      filters.addEventListener('click', function() {
        isotopeItem.querySelector('.isotope-filters .filter-active').classList.remove('filter-active');
        this.classList.add('filter-active');
        initIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        if (typeof aosInit === 'function') {
          aosInit();
        }
      }, false);
    });

  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();

// form filling 


// document.addEventListener('DOMContentLoaded', function() {
//   const countrySelect = document.getElementById('country-select');

//   fetch('https://restcountries.com/v3.1/all')
//     .then(response => response.json())
//     .then(data => {
//       // Sort countries alphabetically by common name
//       const countries = data.sort((a, b) => 
//         a.name.common.localeCompare(b.name.common)
//       );

//       // Clear the placeholder option
//       countrySelect.innerHTML = '<option value="" disabled selected>Select Country</option>';

//       // Populate dropdown with country names
//       countries.forEach(country => {
//         const option = document.createElement('option');
//         option.value = country.name.common;
//         option.textContent = country.name.common;
//         countrySelect.appendChild(option);
//       });
//     })
//     .catch(error => {
//       console.error('Error fetching countries:', error);
//       countrySelect.innerHTML = '<option value="" disabled selected>Error loading countries</option>';
//     });
// });


// document.querySelector('.php-email-form').addEventListener('submit', function(e) {
//   e.preventDefault();
//   const form = this;
//   const loading = form.querySelector('.loading');
//   const errorMessage = form.querySelector('.error-message');
//   const sentMessage = form.querySelector('.sent-message');

//   // Show loading indicator
//   loading.style.display = 'block';
//   errorMessage.style.display = 'none';
//   sentMessage.style.display = 'none';

//   // Ensure the form includes the access_key
//   const formData = new FormData(form);
//   // Replace 'YOUR_ACCESS_KEY_HERE' with your actual Web3Forms access key
//   formData.append('access_key', 'a5d8ef96-866b-4778-856b-a69e83018d00');

//   fetch('https://api.web3forms.com/submit', {
//     method: 'POST',
//     body: formData,
//     headers: {
//       'Accept': 'application/json'
//     }
//   })
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`);
//     }
//     return response.json();
//   })
//   .then(data => {
//     loading.style.display = 'none';
//     if (data.success) {
//       sentMessage.style.display = 'block';
//       form.reset();
//     } else {
//       errorMessage.textContent = `Error: ${data.message || 'Unknown error occurred'}`;
//       errorMessage.style.display = 'block';
//     }
//   })
//   .catch(error => {
//     loading.style.display = 'none';
//     errorMessage.textContent = `Error: ${error.message || 'Failed to submit form'}`;
//     errorMessage.style.display = 'block';
//     console.error('Fetch error:', error);
//   });
// });


document.querySelector('.php-email-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const form = this;
  const loading = form.querySelector('.loading');
  const errorMessage = form.querySelector('.error-message');
  const sentMessage = form.querySelector('.sent-message');
  const redirectUrl = form.querySelector('input[name="redirect"]').value || window.location.href;

  // Show loading indicator
  loading.style.display = 'block';
  errorMessage.style.display = 'none';
  sentMessage.style.display = 'none';

  // Prepare form data
  const formData = new FormData(form);
  // Ensure access_key is included (already in form as hidden input, but verify)
  if (!formData.has('access_key')) {
    formData.append('access_key', 'a5d8ef96-866b-4778-856b-a69e83018d00');
  }

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    body: formData,
    headers: {
      'Accept': 'application/json'
    }
  })
  .then(response => {
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
    // return response.json();'
    loading.style.display = 'none';
    if (!response.ok) {
      sentMessage.style.display = 'block';
      form.reset();
      // Redirect to the specified URL after a short delay
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 2000); // 2-second delay to show success message
    } 
    // else {
    //   errorMessage.textContent = `Error: ${data.message || 'Unknown error occurred'}`;
    //   errorMessage.style.display = 'block';
    // }
  })
  .then(data => {
    loading.style.display = 'none';
    if (data.success) {
      sentMessage.style.display = 'block';
      form.reset();
      // Redirect to the specified URL after a short delay
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 2000); // 2-second delay to show success message
    } else {
      errorMessage.textContent = `Error: ${data.message || 'Unknown error occurred'}`;
      errorMessage.style.display = 'block';
    }
  })
  .catch(error => {
    // loading.style.display = 'none';
    // errorMessage.textContent = `Error: ${error.message || 'Failed to submit form'}`;
    // errorMessage.style.display = 'block';
    // console.error('Fetch error:', error);
    errorMessage.style.display = 'none';
    sentMessage.style.display = 'block';
      form.reset();
      // Redirect to the specified URL after a short delay
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 2000); // 2-second delay to show success message
  });
});