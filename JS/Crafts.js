document.addEventListener("DOMContentLoaded", function() {
  console.log("Page is ready!");

  // Fetch JSON file
  fetch("/Data/origami.json")
    .then(response => response.json())
    .then(data => {
      const container = document.getElementById("carfts-container");

      // Generating cards
      const cardsHTML = data.map(item => `
        <div id="${item.Card_id}" class="col-lg-4 card-link"">
            <div class="cards">
            <div class="row g-0 align-items-center">
                <div class="col-auto">
                <div class="cards-image m-2">
                    <img src="${item.Crad_image}" class="img-fluid" alt="Thumbnail">
                </div>
                </div>
                <div class="col">
                <div class="card-body">
                    <h5 class="card-title mb-1">${item.Crad_Title}</h5>
                </div>
                </div>
            </div>
            </div>
        </div>
      `).join("");

      container.innerHTML = cardsHTML;



      // Save id in local storage

      const allCards = document.querySelectorAll(".card-link");
      allCards.forEach(card => {
        card.addEventListener("click", () => {
          const cardId = card.id;
          localStorage.setItem("selectedCardId", cardId);
          window.location.href = "/Action/craftspage.html";
        });
      });

      
    })
    .catch(error => {
      console.error("Error:", error);
    });
});
