
import "../css/style.css" assert { type: "css" };


const form = DOMSelectors.itemSearchForm;

function cardCreator(card) {
  DOMSelectors.itemcontainer.innerHTML = "";
  const cardElement = document.createElement("div");
  cardElement.classList.add("card");
  cardElement.innerHTML = `
      <img src="${card.iconUrls.medium}" class="itemicon" alt="Picture of ${card.name}">
      <h2 tabindex="0" class="itemname">${card.name}</h2>
      <div class="dropdownMenu">
        <details>
          <summary>
            Information
          </summary>
          <p tabindex="0" class="description">Description: "${card.description || 'No description available'}"</p>
          <p tabindex="0" class="itemtyperarity">Rarity: ${card.rarity}</p>
          <p tabindex="0" class="elixirCost">Elixir Cost: ${card.elixirCost || 'N/A'}</p>
          <p tabindex="0" class="arena">Arena: ${card.arena || 'Any'}</p>
      </div>`;
  DOMSelectors.itemcontainer.appendChild(cardElement);
  cardElement.classList.add(`${card.rarity.toLowerCase()}`);
  cardElement.id = `${card.name.replace(/\s+/g, "-").toLowerCase()}`;
}

async function getClashRoyaleCards() {
  try {
    const response = await fetch(`https://proxy.royaleapi.dev/v1/cards`, {
      headers: {
        Authorization: "Bearer YOUR_API_KEY_HERE",
      },
    });
    const data = await response.json();
    const cards = data.items;
    cards.forEach((card) => cardCreator(card));
    if (!response.ok) {
      throw new Error(data.error.message);
    }
  } catch (error) {
    console.error(error);
    DOMSelectors.h1.innerHTML = "Error fetching Clash Royale cards.";
  }
}

async function cardSearch(input) {
  try {
    const response = await fetch(
      `https://proxy.royaleapi.dev/v1/cards`,
      {
        headers: {
          Authorization: "Bearer YOUR_API_KEY_HERE",
        },
      }
    );
    const data = await response.json();
    const card = data.items.find((c) => c.name.toLowerCase() === input.toLowerCase());
    if (!card) {
      throw new Error("Card not found");
    }
    DOMSelectors.h1.innerHTML = "Clash Royale API";
    DOMSelectors.itemcontainer.innerHTML = "";
    cardCreator(card);
  } catch (error) {
    console.error(error);
    DOMSelectors.h1.innerHTML =
      "Your card wasn't found. Maybe you spelt it wrong?";
    DOMSelectors.h2.innerHTML = "";
  }
}

getClashRoyaleCards();

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const input = DOMSelectors.itemSearchValue.value;
  cardSearch(input);
});

DOMSelectors.resetbutton.addEventListener("click", function (event) {
  event.preventDefault();
  DOMSelectors.h1.innerHTML = "Clash Royale API";
  DOMSelectors.itemcontainer.innerHTML = "";
  DOMSelectors.itemSearchValue.value = "";
  DOMSelectors.h2.innerHTML = "Now showing all cards";
  getClashRoyaleCards();
});

