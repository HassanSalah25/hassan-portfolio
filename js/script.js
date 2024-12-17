const IMAGES = [
    {
      img: "https://picsum.photos/id/27/600/600",
      title: "The Sea",
    },
    {
      img: "https://picsum.photos/id/58/600/600",
      title: "Lighthouse",
    },
    {
      img: "https://picsum.photos/id/96/600/600",
      title: "Bike by a shed",
    },
    {
      img: "https://picsum.photos/id/85/600/600",
      title: "Tractor in a field",
    },
    {
      img: "https://picsum.photos/id/129/600/600",
      title: "On a bench",
    },
    {
      img: "https://picsum.photos/id/211/600/600",
      title: "Boat",
    },
    {
      img: "https://picsum.photos/id/301/600/600",
      title: "Autumn leaves",
    },
    {
      img: "https://picsum.photos/id/389/600/600",
      title: "Climbing Stairs",
    },
    {
      img: "https://picsum.photos/id/505/600/600",
      title: "Sunset",
    }
  ]
  
  // selectors
  const galleryMainImg = document.getElementById("gallery-main-img");
  const galleryThumbsEl = document.getElementById("gallery-thumbs");
  const slider = document.getElementById("slider");
  const sliderButtons = document.querySelectorAll("[btn-slider]");
  const dialogEl = document.getElementById('slider-dialog');
  const dialogBtnOpen = document.getElementById('gallery-main-img');
  const dialogBtnClose = document.getElementById('btn-dialog-close');
  
  // settings
  const animationTime = 320;
  
  // function - render thumbnails
  function renderThumbs() {
    galleryThumbsEl.innerHTML = "";
  
    IMAGES.forEach((el, index) => {
      // Create and append the thumbnail button
      const btn = document.createElement("button");
      btn.type = "button";
      const img = document.createElement("img");
      img.src = el.img;
      img.alt = el.title;
      btn.append(img);
      galleryThumbsEl.append(btn);
  
      // Set up the thumbnail click event to open the slideshow
      btn.addEventListener("click", () => openSlideShow(index));
    });
  }
  
  // add thumbmnails to page
  renderThumbs();
  
  // function - click outside dialog
  function handleDialogClickOutside(event) {
      if (event.target === dialogEl) {
          dialogEl.close();
      }
  }
  // function - open slideshow at specified image 
  function openSlideShow(startImg = 0) {
    // Ensure the `startImg` index is within bounds
    if (startImg < 0 || startImg >= IMAGES.length) return;
  
    slider.innerHTML = "";
  
    // Reorder the IMAGES array to start from the specified image
    const reorderedImages = [
      ...IMAGES.slice(startImg),
      ...IMAGES.slice(0, startImg) 
    ];
  
    // add images to slideshow
    reorderedImages.forEach(el => {
      const d = document.createElement("div");
      d.dataset.title = el.title;
      const img = document.createElement("img");
      img.src = el.img;
      img.alt = el.title;
      d.append(img);
      slider.append(d);
    });
  
    // Open the slideshow dialog
    dialogEl.showModal();
    // add the eventhandler to close the dialog when clicking outside
    dialogEl.addEventListener("click", handleDialogClickOutside);
  }
  
  // event handlers
  dialogBtnOpen.addEventListener('click', openSlideShow);
  dialogBtnClose.addEventListener('click', () => dialogEl.close());
  dialogEl.addEventListener('close', () => dialogEl.removeEventListener('click', handleDialogClickOutside));
  
  /* SLIDER */
  /* slider code adapted from https://codepen.io/cbolson/pen/vYoZQme*/
  
  // slider navigation 
  function slideShowControls(){
    sliderButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        // disable all buttons during the animation
        sliderButtons.forEach(button => button.disabled = true);
  
        const isNext = btn.getAttribute("btn-slider") === "next";
        const el = isNext ? slider.querySelector("div:first-child") : slider.querySelector("div:last-child");
        const animationClass = isNext ? "slider-next" : "slider-prev";
  
        // move element immediately for "prev"
        if (!isNext) slider.prepend(el); 
  
        el.classList.add(animationClass);
        requestAnimationFrame(() => {
          setTimeout(() => { /* yes, I know that this would be better using transitionEnd but I was having issue when trying to use the "prev" button */
            // move element after animation for "next"
            if (isNext) slider.append(el); 
  
            // remove class
            el.classList.remove(animationClass);
  
            // re-enable the buttons
            sliderButtons.forEach(button => button.disabled = false);
          }, isNext ? animationTime : 1); // delay for each direction
        });
      });
    });
  }
  slideShowControls();