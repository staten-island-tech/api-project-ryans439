const DOMSelectors = {
  itemSearchForm: document.querySelector(".form"),
  itemSearchValue: document.querySelector(".name"),
  itemcontainer: document.querySelector(".itemcontainer"),
  h1: document.querySelector(".heading"),
  h2: document.querySelector("#subhead"),
  resetbutton: document.querySelector(".resetbutton"),
};

function cardCreator(book) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.innerHTML = `
    <h2 tabindex="0" class="itemname">${book.title || "No title available"}</h2>
    <p tabindex="0" class="author">Author: ${book.author_name?.join(", ") || "Unknown"}</p>
    <p tabindex="0" class="first-publish">First Published: ${book.first_publish_year || "Unknown"}</p>
    <div class="dropdownMenu">
      <details>
        <summary>More Information</summary>
        <p tabindex="0" class="subject">Subjects: ${book.subject?.join(", ") || "No subjects available"}</p>
        <p tabindex="0" class="isbn">ISBN: ${book.isbn?.join(", ") || "No ISBN available"}</p>
      </details>
    </div>`;
  DOMSelectors.itemcontainer.appendChild(cardElement);
}

// Function to fetch and display books
async function getBooks(query = "") {
  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error("Error fetching books.");
    }
    const data = await response.json();
    const books = data.docs.slice(0, 10);
    DOMSelectors.itemcontainer.innerHTML = "";
    books.forEach((book) => cardCreator(book));
    DOMSelectors.h1.innerHTML = books.length ? "Search Results" : "No books found.";
  } catch (error) {
    console.error(error);
    DOMSelectors.h1.innerHTML = "Error fetching book data.";
  }
}

DOMSelectors.itemSearchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const input = DOMSelectors.itemSearchValue.value.trim();
  if (input) {
    getBooks(input);
  } else {
    DOMSelectors.h1.innerHTML = "Please enter a search term.";
  }
});


DOMSelectors.resetbutton.addEventListener("click", function () {
  DOMSelectors.h1.innerHTML = "Welcome to the Book API!";
  DOMSelectors.itemcontainer.innerHTML = "";
  DOMSelectors.itemSearchValue.value = "";
});
