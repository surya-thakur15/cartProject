let openSortModalButton = document.getElementById('sort-modal-button');
let modalSort = document.getElementById('sort-modal-container');
let closeSortModalButton = document.getElementById('sort-modal-close');

openSortModalButton.onclick = function() {
  modalSort.style.display = "block";
}

closeSortModalButton.onclick = function() {
  modalSort.style.display = "none";
}


let openFilterModalButton = document.getElementById('filter-modal-button');
let modalFilter = document.getElementById('filter-modal-container');
let closeFilterModalButton = document.getElementById('filter-modal-close');

openFilterModalButton.onclick = function() {
  modalFilter.style.display = "block";
}

closeFilterModalButton.onclick = function() {
  modalFilter.style.display = "none";
}


function getMinRange(event){
  event.target.value=Math.min(event.target.value,event.target.parentNode.childNodes[5].value-1);
          let value = (event.target.value/parseInt(event.target.max))*100
          console.log(Math.trunc(value), `jnjnb`)
          var children = event.target.parentNode.childNodes[1].childNodes;
          children[1].style.width=value+'%';
          children[5].style.left=value+'%';
          children[7].style.left=value+'%';children[11].style.left=value+'%';
          children[11].childNodes[1].innerHTML=event.target.value;
}

function getMaxRange(event){
  event.target.value=Math.max(event.target.value,event.target.parentNode.childNodes[3].value-(-1));
          let value = (event.target.value/parseInt(event.target.max))*100
          console.log(Math.trunc(value), `rererb`)
          var children = event.target.parentNode.childNodes[1].childNodes;
          children[3].style.width=(100-value)+'%';
          children[5].style.right=(100-value)+'%';
          children[9].style.left=value+'%';children[13].style.left=value+'%';
          children[13].childNodes[1].innerHTML=event.target.value;
}




