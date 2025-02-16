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
  cardElement.classList.add(
    "card",
    "border-b-gray-30","border-b-2", "border-solid", "rounded-t-lg", "w-full", "h-40", "object-cover", "mb-4",
    "shadow-[0_4px_6px_rgba(0,0,0,0.1)]",
    "w-[calc(25%_-_2rem)]",
    "bg-[white]",
    "transition-all",
    "duration-[0.3s]",
    "ease-[ease-in-out]",
    "p-4",
    "rounded-xl",
    "border-2",
    "border-solid",
    "hover:translate-y-[-5px]",
    "hover:shadow-[0_6px_12px_rgba(0,0,0,0.1)]",
    "bg-white",
    "border",
    "border-gray-300",
    "rounded-lg",
    "p-4",
    "shadow-md",
    "transition-transform",
    "duration-300",
    "ease-in-out",
    "hover:scale-105",
    "hover:shadow-lg",
    "w-80");

  cardElement.innerHTML = `
    
    <h3 tabindex="0" class="itemname text-xl font-semibold text-indigo-700">${book.title || "No title available"}</h3>
    <p tabindex="0" class="author text-gray-700">Author(s): ${book.author_name?.join(", ") || "Unknown"}</p>
    <p tabindex="0" class="first-publish text-gray-600">First Published: ${book.first_publish_year || "Unknown"}</p>
    <div class="dropdownMenu mt-4">
      <details>
        <summary class="font-semibold cursor-pointer text-indigo-500">More Information</summary>
        <p tabindex="0" class="subject text-sm text-gray-600">Subjects: ${book.subject?.join(", ") || "No subjects available"}</p>
      </details>
    </div>
  `;

  DOMSelectors.itemcontainer.appendChild(cardElement);
}

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
  console.log('hello'); 
  DOMSelectors.h1.innerHTML = "BOOK API";
  DOMSelectors.itemcontainer.innerHTML = '';
  DOMSelectors.itemSearchValue.value = '';
});

