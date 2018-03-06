const triggers = document.querySelectorAll('input[type="radio"] ~ span');
const radio = document.querySelectorAll('input[type="radio"]');
const highlight = document.createElement("span");
highlight.classList.add("highlight");
document.body.append(highlight);

function highlightLink (e) {
  let linkCoords;
  if (this !== window) {
    linkCoords = this.getBoundingClientRect();
    radio.forEach(a => {
      a.checked = false;
      if (a.value === e.target.innerHTML) {
        a.checked = true;
      }
      
    })
  } else {
    if (radio[0].checked) linkCoords = triggers[0].getBoundingClientRect();
    if (radio[1].checked) linkCoords = triggers[1].getBoundingClientRect();
  }
  const coords = {
    width: linkCoords.width,
    height: linkCoords.height,
    top: linkCoords.top + window.scrollY,
    left: linkCoords.left + window.scrollX
  }
  highlight.style.width = `${coords.width}px`;
  highlight.style.height = `${coords.height}px`;
  highlight.style.transform = `translate(${coords.left}px, ${coords.top}px)`;
}
/*$('.anchor-scrolls').on('click', function(e){
  e.currentTarget.hash = '';
  console.log(e)
  //evt.preventDefault(); //prevents hash from being append to the url
});*/

triggers.forEach(a => a.addEventListener("click", highlightLink));
window.addEventListener('resize', highlightLink);
highlightLink();
