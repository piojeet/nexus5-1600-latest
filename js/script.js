const menuBtn = document.querySelectorAll('.menu_btn');
const closeBtn = document.querySelectorAll('.close_btn');
const navMenu = document.querySelectorAll('.links_nav');

// Menu open
menuBtn.forEach(btn => {
    btn.addEventListener("click", (e) => {
        e.stopPropagation();
        navMenu.forEach(menu => {
            menu.classList.add("active");
        });
        document.body.classList.add("no-scroll"); // 🚫 Scroll disable
    });
});

// Menu close button
closeBtn.forEach(cbtn => {
    cbtn.addEventListener("click", (e) => {
        e.stopPropagation();
        navMenu.forEach(menu => {
            menu.classList.remove("active");
        });
        document.body.classList.remove("no-scroll"); // ✅ Scroll enable
    });
});

// Outside click -> close menu
document.addEventListener("click", (e) => {
    navMenu.forEach(menu => {
        if (menu.classList.contains("active") && !menu.contains(e.target)) {
            menu.classList.remove("active");
            document.body.classList.remove("no-scroll");
        }
    });
});



(function(){
  const cursor = document.getElementById('sat-cursor');
  if(!cursor) return;

  const isTouch = ('ontouchstart' in window) || navigator.maxTouchPoints > 0;
  if (isTouch) {
    cursor.classList.add('sat-disabled');
    return;
  }

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let curX = mouseX, curY = mouseY;
  const ease = 0.18;

  // Default hidden rahega (CSS se), pehla move pe show hoga
  window.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.opacity = '1';   // yaha dikh jayega
  });

  document.addEventListener("mouseleave", () => {
      cursor.style.opacity = "0";
      cursor.style.visibility = "visible"
  });
    
  document.addEventListener("mouseenter", () => {
      cursor.style.opacity = "1";
      cursor.style.visibility = "visible"
  });

  const interactiveSelector = 'a, button, input, textarea, select, .clickable';
  function checkHover() {
    const el = document.elementFromPoint(mouseX, mouseY);
    if (!el) return;

    if (el.closest(interactiveSelector)) {
      cursor.style.opacity = '0';
    } else {
      cursor.style.opacity = '1';
    }

    if (el.closest('footer')) {
      cursor.classList.add('sat-white');
    } else {
      cursor.classList.remove('sat-white');
    }
  }

  function raf() {
    curX += (mouseX - curX) * ease;
    curY += (mouseY - curY) * ease;
    cursor.style.transform = `translate(${curX}px, ${curY}px) translate(-50%, -50%)`;
    checkHover();
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
})();
