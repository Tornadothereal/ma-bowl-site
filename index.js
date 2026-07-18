if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});
const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            const counter = entry.target;

            const target =
            +counter.dataset.target;

            let current = 0;

            const increment =
            target / 80;

            const updateCounter = ()=>{

                if(current < target){

                    current += increment;

                    if(counter.classList.contains("percent")){

                        counter.textContent =
                        Math.floor(current) + "%";

                    }else{

                        counter.textContent =
                        Math.floor(current) + "+";

                    }

                    requestAnimationFrame(updateCounter);

                }else{

                    if(counter.classList.contains("percent")){

                        counter.textContent =
                        target + "%";

                    }else{

                        counter.textContent =
                        target + "+";

                    }

                }

            };

            updateCounter();

            observer.unobserve(counter);

        }

    });

});

counters.forEach(counter=>{
    observer.observe(counter);
});

const statement =
document.querySelector(".statement-content");

if(statement){

    const statementObserver =
    new IntersectionObserver((entries)=>{

        entries.forEach(entry=>{

            if(entry.isIntersecting){

                statement.classList.add("show");

            }

        });

    },{
        threshold:.4
    });

    statementObserver.observe(statement);

}

const reviewCards =
document.querySelectorAll(".testimonial-card");

const reviewObserver =
new IntersectionObserver((entries)=>{

    entries.forEach(entry=>{

        if(entry.isIntersecting){

            entry.target.classList.add("show");

        }

    });

},{
    threshold:.2
});

reviewCards.forEach(card=>{

    reviewObserver.observe(card);

});
// Product rendering (image / name / price / description, sections, show/hide,
// language switching) is now fully dynamic — handled by products-dynamic.js,
// which fetches everything from the /api/ma-bowl-data endpoint managed by
// the admin dashboard. Nothing to do here anymore.

window.addEventListener("load",()=>{

    const loader =
    document.getElementById("loader");

    setTimeout(()=>{

        loader.classList.add("loader-hidden");

    },2500);

});

document.addEventListener("DOMContentLoaded", () => {

  const section = document.querySelector('.products');
  if(!section) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        section.classList.add('active');
        observer.unobserve(section);
      }
    });
  }, {
    threshold: 0.25
  });

  observer.observe(section);

  // Product-item stagger-in is triggered by products-dynamic.js right after
  // it renders each card, since those cards don't exist yet at this point.
});

/* ============================================================
   MOBILE APP BOTTOM TAB BAR — scroll-spy + smooth navigation.
   This is purely additive: it only touches the new .tab-btn /
   .mobile-tabbar elements, which are display:none on desktop
   via CSS. Nothing above this block is modified.
   ============================================================ */
document.addEventListener("DOMContentLoaded", () => {

    const tabButtons = document.querySelectorAll(".tab-btn");
    if (!tabButtons.length) return;

    const targets = ["home", "products", "gallery", "about", "contact"]
        .map(id => document.getElementById(id))
        .filter(Boolean);

    const tabObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                tabButtons.forEach(btn => {
                    btn.classList.toggle("active", btn.dataset.tabTarget === id);
                });
            }
        });
    }, {
        root: null,
        threshold: 0,
        rootMargin: "-40% 0px -55% 0px"
    });

    targets.forEach(section => tabObserver.observe(section));

    tabButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            tabButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
        });
    });

});