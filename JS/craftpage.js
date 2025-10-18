fetch("/Data/origami.json")
  .then(response => response.json())
  .then(data => {
    const selectedId = localStorage.getItem("selectedCardId");

    // ID match karwana
    const selectedItem = data.find(item => item.Card_id == selectedId);

    if (selectedItem) {
      console.log("Selected Item:", selectedItem);

      // ab HTML update karo
      document.getElementById("title").innerText = selectedItem.Crad_Title;
      document.getElementById("image").src = selectedItem.Crad_image;
      document.getElementById("description").innerText = selectedItem.Crad_Content;
    } else {
      console.error("No matching card found!");
    }
  });
