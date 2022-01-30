const slider1 = new Swiper('.app-slider', {
  slidesPerView: 4,
  spaceBetween: 30,
  slidesPerView: 'auto',
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  on: {
    init() {
      this.el.addEventListener('mouseenter', () => {
        this.autoplay.stop();
      });

      this.el.addEventListener('mouseleave', () => {
        this.autoplay.start();
      });
    }
  },
});

const slider2 = new Swiper('.review-slider', {
  slidesPerView: 3,
  spaceBetween: 30,
  slidesPerView: 'auto',
  autoplay: {
    delay: 2000,
    disableOnInteraction: false,
  },
  on: {
    init() {
      this.el.addEventListener('mouseenter', () => {
        this.autoplay.stop();
      });

      this.el.addEventListener('mouseleave', () => {
        this.autoplay.start();
      });
    }
  },
});

var x, i, j, l, ll, selElmnt, a, b, c;
/*look for any elements with the class "custom-select":*/
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
  selElmnt = x[i].getElementsByTagName("select")[0];
  ll = selElmnt.length;
  /*for each element, create a new DIV that will act as the selected item:*/
  a = document.createElement("DIV");
  a.setAttribute("class", "select-selected");
  a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
  x[i].appendChild(a);
  /*for each element, create a new DIV that will contain the option list:*/
  b = document.createElement("DIV");
  b.setAttribute("class", "select-items select-hide");
  for (j = 1; j < ll; j++) {
    /*for each option in the original select element,
    create a new DIV that will act as an option item:*/
    c = document.createElement("DIV");
    c.innerHTML = selElmnt.options[j].innerHTML;
    c.addEventListener("click", function (e) {
      /*when an item is clicked, update the original select box,
      and the selected item:*/
      var y, i, k, s, h, sl, yl;
      s = this.parentNode.parentNode.getElementsByTagName("select")[0];
      sl = s.length;
      h = this.parentNode.previousSibling;
      for (i = 0; i < sl; i++) {
        if (s.options[i].innerHTML == this.innerHTML) {
          s.selectedIndex = i;
          h.innerHTML = this.innerHTML;
          y = this.parentNode.getElementsByClassName("same-as-selected");
          yl = y.length;
          for (k = 0; k < yl; k++) {
            y[k].removeAttribute("class");
          }
          this.setAttribute("class", "same-as-selected");
          break;
        }
      }
      h.click();
    });
    b.appendChild(c);
  }
  x[i].appendChild(b);
  a.addEventListener("click", function (e) {
    /*when the select box is clicked, close any other select boxes,
    and open/close the current select box:*/
    e.stopPropagation();
    closeAllSelect(this);
    this.nextSibling.classList.toggle("select-hide");
    this.classList.toggle("select-arrow-active");
  });
}
function closeAllSelect(elmnt) {
  /*a function that will close all select boxes in the document,
  except the current select box:*/
  var x, y, i, xl, yl, arrNo = [];
  x = document.getElementsByClassName("select-items");
  y = document.getElementsByClassName("select-selected");
  xl = x.length;
  yl = y.length;
  for (i = 0; i < yl; i++) {
    if (elmnt == y[i]) {
      arrNo.push(i)
    } else {
      y[i].classList.remove("select-arrow-active");
    }
  }
  for (i = 0; i < xl; i++) {
    if (arrNo.indexOf(i)) {
      x[i].classList.add("select-hide");
    }
  }
}

/*if the user clicks anywhere outside the select box,
then close all select boxes:*/
document.addEventListener("click", closeAllSelect);

$('.popup-open').click(function (e) {
  e.preventDefault();
  $('.popup').fadeIn(300);
  $('body').addClass('no-scroll');
});

$('.popup-close').click(function () {
  $('.popup').fadeOut(300);
  $('body').removeClass('no-scroll');
});

$('.form__btn').click(function (e) {
  e.preventDefault();
  $('.popup-final').fadeIn(300);
  $('.popup').fadeOut(300);
  $('body').addClass('no-scroll');
});

$('.popup-final__close').click(function () {
  $('.popup-final').fadeOut(300);
  $('body').removeClass('no-scroll');
});

const iconMenu = document.querySelector('.header__burger-wrap');
const menuBody = document.querySelector('.menu');
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle('lock1');
    iconMenu.classList.toggle('active');
    menuBody.classList.toggle('active');
  })
}

$(function () {
  $('.header__burger-wrap').on("click", function (e) {
    e.preventDefault();
    $(".menu-popup").fadeToggle();
  });
  $('.menu__link').on("click", function (e) {
    e.preventDefault();
    $(".menu-popup").fadeOut();
  });
  $(document).on("click", ".menu-popup", function (e) {
    $(this).fadeOut(function () {
      $(".header__burger-wrap").removeClass("active");
      $(".menu").removeClass("active");
      $("body").removeClass("lock1");
    });
  });
})

const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });

  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + pageYOffset;

      if (iconMenu.classList.contains('active')) {
        document.body.classList.remove('lock1');
        iconMenu.classList.remove('active');
        menuBody.classList.remove('active');
      }

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth"
      });
      e.preventDefault();
    }
  }
}

//scrolltoUp
const offset = 100;
const scrollUp = document.querySelector('.up');

const getTop = () => window.pageYOffset || document.documentElement.scrollTop;

//onScroll
window.addEventListener('scroll', () => {
  if (getTop() > offset) {
    scrollUp.classList.add('up--active');
  } else {
    scrollUp.classList.remove('up--active');
  }
});

//click
scrollUp.addEventListener('click', () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});

// lazy load
const images = document.querySelectorAll('img');

const options = {
  root: null,
  rootMargin: '200px',
  threshold: 0.1
}

function handleImg(myImg, observer) {
  myImg.forEach(myImgSingle => {
    if (myImgSingle.intersectionRatio > 0) {
      loadImage(myImgSingle.target);
    }
  })
}

function loadImage(image) {
  image.src = image.getAttribute('data-src');
}

const observer = new IntersectionObserver(handleImg, options);

images.forEach(img => {
  observer.observe(img);
});