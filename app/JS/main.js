// DOM Selectors
const DOMSelectors = {
  itemSearchForm: document.querySelector(".form"),
  itemSearchValue: document.querySelector(".name"),
  itemcontainer: document.querySelector(".itemcontainer"),
  h1: document.querySelector(".heading"),
  h2: document.querySelector("#subhead"),
  resetbutton: document.querySelector(".resetbutton"),
};

// Function to create cards for each book
function cardCreator(book) {
  const cardElement = document.createElement("div");
  cardElement.classList.add("card", "bg-white", "border", "border-gray-300", "rounded-lg", "p-4", "shadow-md", "transition-transform", "duration-200", "ease-in-out", "hover:scale-105", "hover:shadow-lg", "w-72");
  cardElement.innerHTML = `
    <h2 tabindex="0" class="itemname text-xl font-semibold">${book.title || "No title available"}</h2>
    <p tabindex="0" class="author">Author: ${book.author_name?.join(", ") || "Unknown"}</p>
    <p tabindex="0" class="first-publish">First Published: ${book.first_publish_year || "Unknown"}</p>
    <div class="dropdownMenu mt-4">
      <details>
        <summary class="font-semibold cursor-pointer">More Information</summary>
        <p tabindex="0" class="subject">Subjects: ${book.subject?.join(", ") || "No subjects available"}</p>
        <p tabindex="0" class="isbn">ISBN: ${book.isbn?.join(", ") || "No ISBN available"}</p>
      </details>
    </div>`;
  DOMSelectors.itemcontainer.appendChild(cardElement);
}

// Function to fetch books based on the search query
async function getBooks(query = "") {
  try {
    const response = await fetch(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);
    if (!response.ok) {
      throw new Error("Error fetching books.");
    }
    const data = await response.json();
    const books = data.docs.slice(0, 10); // Get first 10 books
    DOMSelectors.itemcontainer.innerHTML = ""; // Clear previous results
    books.forEach((book) => cardCreator(book)); // Create cards for each book
    DOMSelectors.h1.innerHTML = books.length ? "Search Results" : "No books found.";
  } catch (error) {
    console.error(error);
    DOMSelectors.h1.innerHTML = "Error fetching book data.";
  }
}

// Event listener for form submission (search)
DOMSelectors.itemSearchForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const input = DOMSelectors.itemSearchValue.value.trim();
  if (input) {
    getBooks(input); // Fetch books based on search input
  } else {
    DOMSelectors.h1.innerHTML = "Please enter a search term.";
  }
});

// Event listener for reset button
DOMSelectors.resetbutton.addEventListener("click", function () {
  DOMSelectors.h1.innerHTML = "Welcome to the Book API!";
  DOMSelectors.itemcontainer.innerHTML = ""; // Clear results
  DOMSelectors.itemSearchValue.value = ""; // Reset search input
});
