var models = [
  {
    name: "Bmw 418d",
    image: "img/bmw.jpg",
    link: "http://www.arabalar.com.tr/bmw/4-serisi/2018/418d-2-0-gran-coupe",
  },
  {
    name: "Mazda CX-3",
    image: "img/mazda.jpg",
    link: "http://www.arabalar.com.tr/mazda/cx-3/2017/1-5-sky-d-motion",
  },
  {
    name: "Volvo S60",
    image: "img/volvo.jpg",
    link: "http://www.arabalar.com.tr/volvo/s60/2018/1-5-t3-advance",
  },
  {
    name: "Skoda Superb",
    image: "img/skoda.jpg",
    link: "http://www.arabalar.com.tr/skoda/superb/2018/1-4-tsi-active",
  },
  {
    name: "Honda Civic",
    image: "img/honda.jpg",
    link: "http://www.arabalar.com.tr/honda/civic/2018/1-6-elegance",
  },
  {
    name: "Ford Mustang 4.6 GT",
    image: "img/mustang.jpg",
    link: "http://www.arabalar.com.tr/ford/mustang/2014/4-6-gt",
  },
  {
    name: "Audi A8 L 3.0 TDI",
    image: "img/audia8.jpg",
    link: "http://www.arabalar.com.tr/audi/a8/2017/l-3-0-tdi",
  },
];

let index = 1;
let leftButton = document.querySelector(".fa-arrow-circle-left");
let rightButton = document.querySelector(".fa-arrow-circle-right");

showSlide();
init();

leftButton.addEventListener("click", () => {
  index++;
  showSlide();
});

rightButton.addEventListener("click", () => {
  index--;
  showSlide();
});

function init() {
  let prev;
  interval = setInterval(() => {
    for (let i of document.querySelectorAll("[name=slide]")) {
      if (i.checked & (i.value == "Təsadufi")) {
        do {
          index = Math.floor(Math.random() * models.length);
        } while (prev == index);
        prev = index;
      }
    }

    console.log(index);
    index++;
    showSlide();
  }, 1000);
}

function showSlide() {
  if (index == models.length) {
    index = 0;
  } else if (index == 0) {
    index = models.length - 1;
  }
  let img = document.querySelector(".card-img-top");
  let title = document.querySelector(".card-title");
  let link = document.querySelector(".card-link");
  img.setAttribute("src", models[index].image);
  img.setAttribute("alt", models[index].name);
  title.innerText = models[index].name;
  link.href = models[index].link;
}

document.querySelectorAll(".fa-2x").forEach((item) => {
  item.addEventListener("mouseenter", () => clearInterval(interval));
  item.addEventListener("mouseleave", init);
});
