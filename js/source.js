document.addEventListener("DOMContentLoaded", () => {
  let containers = document.querySelectorAll(".content-container > div");

  let scrollbar = document.getElementsByClassName(
    "custom-scrollbar-container"
  )[0];
  let contentTemplate;
  if (scrollbar) {
    contentTemplate = scrollbar.querySelector("div");
    scrollbar.replaceChildren();
  }
  containers.forEach((value, key) => {
    const newDiv = contentTemplate.cloneNode(true);
    newDiv.children[0].textContent = "0" + key;
    newDiv.children[1].textContent = value.dataset.partName;

    scrollbar.appendChild(newDiv);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  let scrollDivs = document.querySelectorAll(
    ".custom-scrollbar-container > div"
  );
  scrollDivs.forEach((value, key) => {
    value.querySelector(".scroll-indicator").style.backgroundColor =
      "#FFFFFF00";

    value.addEventListener("click", () => {
      scrollDivs.forEach((value, key) => {
        value.classList.toggle("scaled", false);
        value.querySelector(".scroll-indicator").style.backgroundColor =
          "#FFFFFF00";
      });
      value.querySelector(".scroll-indicator").style.backgroundColor =
        "#FFFFFFFF";

      const target = document.querySelector(
        `.content-container > div[data-part-name="${value.children[1].textContent}"]`
      );
      target.scrollIntoView({ behavior: "smooth" }); // smooth scroll
      // or

      value.classList.toggle("scaled");
    });

    let contentDiv = document.querySelector(".content-container");

    contentDiv.addEventListener("scroll", () => {
      // Example: how far it's scrolled from the top
      //console.log("Scroll position:", contentDiv.scrollTop);

      let scrollIndicators = document.querySelectorAll(
        ".custom-scrollbar-container > div"
      );
      scrollIndicators = Array.from(scrollIndicators);
      let lastScrollIndicator = scrollIndicators.pop(-1);
      //let lastElement = scrollIndicators.pop();
      scrollIndicators.forEach((value, key) => {
        let title = value.querySelector(".scroll-title").textContent;
        let content = document.querySelector(`[data-part-name="${title}"]`);
        let offset =
          content.getBoundingClientRect().top -
          content.parentElement.getBoundingClientRect().top;
        //console.log(title, content, offset);
        let top = -offset / content.getBoundingClientRect().height;
        top = Math.min(1, Math.max(top, 0));

        if (window.matchMedia("(max-aspect-ratio: 4/3)").matches) {
          value.querySelector(".scroll-indicator").style.left =
            top * 100.0 + "%";
        }
        if (window.matchMedia("(min-aspect-ratio: 4/3)").matches) {
          value.querySelector(".scroll-indicator").style.top =
            top * 100.0 + "%";
        }
        console.log("heyyyyyy");
      });

      [lastScrollIndicator].forEach((value, key) => {
        let title = value.querySelector(".scroll-title").textContent;
        let content = document.querySelector(`[data-part-name="${title}"]`);
        let offset =content.parentElement.getBoundingClientRect().bottom - (content.getBoundingClientRect().top + content.parentElement.getBoundingClientRect().height)
        let top = offset / (content.getBoundingClientRect().height - content.parentElement.getBoundingClientRect().height);
        top = Math.min(1, Math.max(top, 0));

        if (window.matchMedia("(max-aspect-ratio: 4/3)").matches) {
          value.querySelector(".scroll-indicator").style.left =
            top * 100.0 + "%";
        }
        if (window.matchMedia("(min-aspect-ratio: 4/3)").matches) {
          value.querySelector(".scroll-indicator").style.top =
            top * 100.0 + "%";
        }
      });

      document
        .querySelectorAll(".content-container > div")
        .forEach((value, key) => {
          let offset =
            value.getBoundingClientRect().top -
            value.parentElement.getBoundingClientRect().top;
          //console.log(title, content, offset);
          let top = -offset / value.getBoundingClientRect().height;

          let scrollElements = document.querySelectorAll(
            ".custom-scrollbar-container > div"
          );
          scrollElements.forEach((value2, key) => {
            if (value2.children[1].textContent === value.dataset.partName) {
              let scrollElement = value2;
              scrollElement.classList.toggle("scaled", false);
              scrollElement.querySelector(
                ".scroll-indicator"
              ).style.backgroundColor = "#FFFFFF00";
              if (top > 0 && top < 1) {
                scrollElement.classList.toggle("scaled", true);
                scrollElement.querySelector(
                  ".scroll-indicator"
                ).style.backgroundColor = "#FFFFFFFF";
              }
            }
          });
        });
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  var expanded = true;
  let searchbar = document.querySelector("#search-bar");
  if (searchbar) {
    searchbar.addEventListener("click", () => {
      if (expanded) {
        searchbar.style.width = "200px";
        let hole = document.querySelector("#svg-hole");
        let svg = document.querySelector("svg");
        if (hole) {
          svg.style.height = "100%";
          hole.style.width = "150%";
          hole.style.x = "-25%";
          hole.style.height = "150%";
          hole.style.y = "-25%";
        }
      } else {
        searchbar.style.width = "50px";
      }
      expanded = !expanded;
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
  setTimeout(() => {
    console.log("rendered");
    let hole = document.querySelector("#svg-hole");
    console.log(hole);
    if (hole) {
      let svg = document.querySelector("svg");
      svg.style.viewBox = "0 0";
      console.log("executed");
      hole.style.width = "150%";
      hole.style.x = "-25%";
      hole.style.y = "-25%";
      hole.style.height = "150%";
    }
  }, 1);
  // OR to set attributes directly:
  window.addEventListener("resize", () => {
    let width = window.innerWidth;
    let height = window.innerHeight;
    let hole = document.querySelector("#svg-hole");
    if (hole) {
      hole.style.width = width * 1.5;
      hole.style.x = -width * 0.25;
      hole.style.height = height * 1.5;
      hole.style.y = -height * 0.25;
    }
  });
});
