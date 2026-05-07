async function start() {
  const characterCardBox = document.getElementById("character-card-box");
  const characterModalBox = document.getElementById("character-modal-box");

  const characters = await fetchCharacters();

  if (!characters.length) {
    characterCardBox.innerHTML = `
      <div class="alert alert-danger" role="alert">
        Не удалось загрузить персонажей. Попробуйте обновить страницу позже.
      </div>
    `;
    return;
  }

  const characterCards = getCharacterCards(characters);
  const characterModals = getCharacterModals(characters);

  characterCardBox.innerHTML = characterCards.join("");
  characterModalBox.innerHTML = characterModals.join("");
}