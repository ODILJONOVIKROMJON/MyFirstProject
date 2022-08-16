function loader(){
  // Loader
  const loader = document.querySelector(".loader");
  setTimeout(() =>{
    loader.style.opacity ="0";
    setTimeout(() => {
      loader.style.display = "none";
    }, 700);
  }, 1800);
}

export default loader;