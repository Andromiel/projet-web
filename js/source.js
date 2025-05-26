document.addEventListener("DOMContentLoaded", () => {
  let containers = document.querySelectorAll(".content-container > div");

  let scrollbar = document.getElementsByClassName(
    "custom-scrollbar-container"
  )[0];
  let contentTemplate = scrollbar.querySelector("div");
  scrollbar.replaceChildren();
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
      //let lastElement = scrollIndicators.pop();
      scrollIndicators.forEach((value, key) => {
        let title = value.querySelector(".scroll-title").textContent;
        let content = document.querySelector(`[data-part-name="${title}"]`);
        let offset =
          content.getBoundingClientRect().top -
          content.parentElement.getBoundingClientRect().top;
        //console.log(title, content, offset);
        let top =
          -offset / content.parentElement.getBoundingClientRect().height;
        top = Math.min(1, Math.max(top, 0));

        value.querySelector(".scroll-indicator").style.top = top * 100.0 + "%";
      });

      

      document
        .querySelectorAll(".content-container > div")
        .forEach((value, key) => {
          let offset =
            value.getBoundingClientRect().top -
            value.parentElement.getBoundingClientRect().top;
          //console.log(title, content, offset);
          let top =
            -offset / value.parentElement.getBoundingClientRect().height;

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
