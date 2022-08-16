function clas(){
  // Class
  class MenuCard{
    constructor(srcimg, altimg, title, descr, price, parentSelector, ...classes){
      this.srcimg = srcimg;
      this.altimg = altimg;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.parent = document.querySelector(parentSelector);
      this.classes = classes;
      this.transfer = 10250;
      this.changeUzs();
    }

    changeUzs(){
      this.price *= this.transfer;
    }

    render(){
      const element = document.createElement("div");

      if(this.classes.length === 0){
        this.element = "menu__item";
        element.classList.add(this.element);
      }
      else{
        this.classes.forEach(className => element.classList.add(className));
      }

      element.innerHTML = `
        <img src=${this.srcimg} alt=${this.altimg} />
        <h3 class="menu__item-subtitle">${this.title}</h3>
        <div class="menu__item-descr">${this.descr}</div>
        <div class="menu__item-divider"></div>
        <div class="menu__item-price">
          <div class="menu__item-cost">Price:</div>
          <div class="menu__item-total"><span>${this.price}</span> Uzs/month</div>
        </div>
      `;

      this.parent.append(element);
    }
  }

  // Osonroq yo'li
  axios.get("http://localhost:3000/menu").then(data => {
    data.data.forEach(({srcimg, altimg, title, descr, price}) => {
      new MenuCard(srcimg, altimg, title, descr, price, ".menu .container").render();
    });
  });

  // // Biroz qiyinroq yo'li
  // async function getRecource(url){
  //   const res = await fetch(url);

  //   return await res.json();
  // }

  // getRecource("http://localhost:3000/menu").then(data => {
  //   data.forEach(({srcimg, altimg, title, descr, price}) => {
  //     new MenuCard(srcimg, altimg, title, descr, price, ".menu .container").render();
  //   });
  // });

  // new MenuCard(
  //   "images/tabs/1.png",
  //   "vegy",
  //   'Plan "Usual"',
  //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque aliquid molestiae, sit eveniet, tempora ipsum quaerat recusandae sapiente doloremque corporis dolores quas consectetur ut labore distinctio libero reiciendis harum sequi?",
  //   10,
  //   ".menu .container"
  // ).render();

  // new MenuCard(
  //   "images/tabs/2.jpg",
  //   "elite",
  //   'Plan “Premium”',
  //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque aliquid molestiae, sit eveniet, tempora ipsum quaerat recusandae sapiente doloremque corporis dolores quas consectetur ut labore distinctio libero reiciendis harum sequi?",
  //   15,
  //   ".menu .container",
  //   "menu__item"
  // ).render();

  // new MenuCard(
  //   "images/tabs/3.jpg",
  //   "post",
  //   'Plan "VIP"',
  //   "Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque aliquid molestiae, sit eveniet, tempora ipsum quaerat recusandae sapiente doloremque corporis dolores quas consectetur ut labore distinctio libero reiciendis harum sequi?",
  //   20,
  //   ".menu .container",
  //   "menu__item"
  // ).render();
}

export default clas;