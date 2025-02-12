  const root = document.documentElement;

  const header = document.querySelector('header');
  let lastScrollY = window.scrollY;

  const headerContainer = document.querySelector('.header-container');
  const logo = document.querySelector('.logo');


  // This executes 5 times in practice
  window.addEventListener('scroll', () => {
    console.log(window.scrollY);
    // if (window.scrollY < lastScrollY) {
    //   // Scrolling up - show header with falling effect
    //   header.classList.add('show');
    // } else {
    //   header.classList.remove('show');
    // }
    lastScrollY = window.scrollY;
    // parent of contactMe must be empty div
    if(scrollY >= .1*window.vh)  // 10vh header size
    {
      root.style.setProperty('--header-element-color', '#fffcf2');
    }
    else
    {
      root.style.setProperty('--header-element-color', '#212121');
    }
  });

  // Initially show the header when the page loads
  window.addEventListener('load', () => {
    header.classList.add('show');
    const highlight = document.querySelector(".default-highlight");
    highlight.classList.add("header-active");
  });
