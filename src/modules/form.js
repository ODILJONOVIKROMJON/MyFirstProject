import {openModal, closeModal} from "./modal";
import {postData} from "../server/server";

function form(fromSelector ,modalTimerId){
  // Forms
  const forms = document.querySelectorAll(fromSelector);

  forms.forEach(form => {
    bindPostData(form);
  });

  const msg = {
    loading: "images/spinner.svg",
    success: "Thank's submitting for our form",
    failure: "Something went wrong"
  };

  function bindPostData(form){
    form.addEventListener("submit", evn => {
      evn.preventDefault();

      const statusMessage = document.createElement("img");
      statusMessage.src = msg.loading;
      statusMessage.style.cssText = `
        display: block;
        margin: 0 auto;
      `;
      form.insertAdjacentElement("afterend", statusMessage);

      const formData = new FormData(form);
      const json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/request", json)
        .then((data) => {
          showThanksModal(msg.success);
          statusMessage.remove();
        })
        .catch(() => {
          showThanksModal(msg.failure);
        })
        .finally(() => {
          form.reset();
        });

      // request.send(json);
      // request.addEventListener("load", () => {
      //   if(request.status === 200){
      //     console.log(request.response);
      //     showThanksModal(msg.success);
      //     form.reset();
      //     setTimeout(() => {
      //       statusMessage.remove();
      //     }, 2000);
      //   }
      //   else{
      //     showThanksModal(msg.failure);
      //   }
      // });
    });
  }

  // Dynamic styling
  function showThanksModal(message){
    const prevModalDialog = document.querySelector(".modal__dialog");
    prevModalDialog.classList.add("hide");
    openModal(".modal", modalTimerId);

    const thanksModal = document.createElement("div");
    thanksModal.classList.add("modal__dialog");
    thanksModal.innerHTML = `
      <div class="modal__content">
        <div data-close class="modal__close">&times;</div>
        <div class="modal__title">${message}</div>
      </div>
    `;   
    document.querySelector(".modal").append(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      prevModalDialog.classList.add("show");
      prevModalDialog.classList.remove("hide");
      closeModal(".modal");
    }, 3500);
  }

  // fetch("https://jsonplaceholder.typicode.com/posts", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({name : "Ikromjon"}),
  // })
  //   .then((response) => response.json())
  //   .then((json) => console.log(json));

  // fetch("http://localhost:3000/menu").then(data => data.json()).then(res => console.log(res)); 
}

export default form;