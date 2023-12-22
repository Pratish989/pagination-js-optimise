const previousButton = document.getElementById("previous-button");
const nextButton = document.getElementById("next-button");
const pageButton = document.getElementById("page-button");
const pageItems = document.getElementById("pagination-items");
let totalItems = 120;
const resetArray = (start, stop, step) => {
  pageItems.innerHTML = "";
  let ul = document.createElement("ul");
  return Array.from({ length: (stop - start) / step + 1 }, (i, index) => {
    let li = document.createElement("li");
    li.innerHTML = "";
    li.textContent = `Item ${start + index * step}`;
    ul.appendChild(li);
    pageItems.appendChild(ul);
  });
};

let currentPage = 1;
let itemsPerPage = 10;
let totalPages = Math.ceil(totalItems / itemsPerPage);

const renderButton = (item) => {
  const button = document.createElement("button");
  button.className = "button-class";
  button.innerHTML = item;
  button.setAttribute("id", item);
  pageButton.appendChild(button);
};

Array.from({ length: totalPages }, (i, k) => renderButton(k + 1)); // this renders button and appends it w.r.t totalPages

const arrayPage = (pageNo) => {
  currentPage = pageNo;
  handleButtons(currentPage);
  handleActivePageNumber(currentPage);
  startindex = (pageNo - 1) * itemsPerPage;
  endindex = pageNo * itemsPerPage;
  arr = resetArray(startindex + 1, endindex, 1);
};

const handleButtons = (pageIndex) => {
  previousButton.disabled = currentPage === 1;
  nextButton.disabled = currentPage === totalPages;
};

const handleActivePageNumber = () => {
  document.querySelectorAll(".button-class").forEach((button) => {
    button.classList.remove("active");
    const pageIndex = Number(button.getAttribute("id"));
    if (pageIndex == currentPage) {
      button.classList.add("active");
    }
  });
};

window.addEventListener("load", () => {
  handleButtons();
  handleActivePageNumber();
  arrayPage(currentPage);
  previousButton.addEventListener("click", () => {
    arrayPage(currentPage > 1 ? currentPage - 1 : currentPage);
  });
  nextButton.addEventListener("click", () => {
    arrayPage(currentPage < totalPages ? currentPage + 1 : currentPage);
  });
  document.querySelectorAll(".button-class").forEach((button) => {
    const pgindex = Number(button.getAttribute("id"));
    if (pgindex) {
      button.addEventListener("click", () => {
        arrayPage(pgindex);
      });
    }
  });
});
