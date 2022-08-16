function slider({slide, nextArrow, prevArrow, currentCounter, totalCounter, wrapper, field, container}){
  // Slider
  const slides = document.querySelectorAll(slide),
    next = document.querySelector(nextArrow),
    prev = document.querySelector(prevArrow),
    current = document.querySelector(currentCounter),
    total = document.querySelector(totalCounter),
    slidesWrapper = document.querySelector(wrapper),
    slidesField = document.querySelector(field),
    width = window.getComputedStyle(slidesWrapper).width,
    slider = document.querySelector(container);

  let slideIndex = 1;
  let offset = 0;

  // ---------***************************----------
  //               CAROUSEL SLIDER
  // ---------***************************----------

  if(slides.length < 10){
    total.textContent = `0${slides.length}`;
    current.textContent = `0${slideIndex}`;
  }
  else{
    total.textContent = slides.length;
    current.textContent = slideIndex;
  }

  function currentText(){
    if(slides.length < 10){
      current.textContent = `0${slideIndex}`;
    }
    else{
      current.textContent = slideIndex;
    }
  }

  slidesField.style.width = 100 * slides.length + "%";
  slidesField.style.display = "flex";
  slidesField.style.transition = ".5s ease all";
  slidesWrapper.style.overflow = "hidden";

  slides.forEach(slide => {
    slide.style.width = width;
  });

  const indicators = document.createElement("ol");
  const dots = [];
  indicators.classList.add("carousel-indicators");
  slider.append(indicators);

  for(let i = 0; i < slides.length; i++){
    const dot = document.createElement("li");
    dot.setAttribute("data-slide-to", i + 1);
    dot.classList.add("carousel-dot");
    if(i == 0){dot.style.opacity = 1;}
    indicators.append(dot);
    dots.push(dot);
  }

  function deleteNotDigits(str){
    return parseInt(str.replace(/\D/g, "."));
  }

  next.addEventListener("click", () => {
    if(offset == deleteNotDigits(width) * (slides.length - 1)){
      offset = 0;
    }
    else{
      offset += deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;

    if(slideIndex == slides.length){
      slideIndex = 1;
    }
    else{
      slideIndex++;
    }
    currentText();

    dots.forEach(dot => dot.style.opacity = ".5");
    dots[slideIndex - 1].style.opacity = 1;
  });

  prev.addEventListener("click", () => {
    if(offset == 0){
      offset = deleteNotDigits(width) * (slides.length - 1);
    }
    else{
      offset -= deleteNotDigits(width);
    }
    slidesField.style.transform = `translateX(-${offset}px)`;
    
    if(slideIndex == 1){
      slideIndex = slides.length;
    }
    else{
      slideIndex--;
    }
    currentText();

    dots.forEach(dot => dot.style.opacity = ".5");
    dots[slideIndex - 1].style.opacity = 1;
  });

  dots.forEach(dot => {
    dot.addEventListener("click", (evn) => {
      const slideTo = evn.target.getAttribute("data-slide-to");
      slideIndex = slideTo;
      offset = deleteNotDigits(width) * (slideTo - 1);
      slidesField.style.transform = `translateX(-${offset}px)`;
      currentText();
      dots.forEach(dot => dot.style.opacity = ".5");
      dots[slideIndex - 1].style.opacity = 1;
    });
  });

  // ---------***************************----------
  //               EASY SLIDER
  // ---------***************************----------

  // if(slides.length < 10){
  //   total.textContent = `0${slides.length}`;
  // }
  // else{
  //   total.textContent = slides.length;
  // }
  
  // showSlides(slideIndex);
  
  // function showSlides(ind){
  //   if(ind > slides.length){
  //     slideIndex = 1;
  //   }
  //   if(ind < 1){
  //     slideIndex = slides.length;
  //   }
  //   slides.forEach(item => item.style.display = "none");
  //   slides[slideIndex - 1].style.display = "block";

  //   if(slides.length < 10){
  //     current.textContent = `0${slideIndex}`;
  //   }
  //   else{
  //     current.textContent = slideIndex;
  //   }
  // }

  // function plusSlides(ind){
  //   showSlides(slideIndex += ind);
  // }

  // prev.addEventListener("click", () => {
  //   plusSlides(-1);
  // });
  // next.addEventListener("click", () => {
  //   plusSlides(1);
  // });
}

export default slider;