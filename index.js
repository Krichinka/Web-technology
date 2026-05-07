function getCharacterCard(character) {
  return `
    <div class="col-sm-12 col-md-6 col-lg-4 mb-4">
      <div class="card h-100">
        <img 
          src="${character.thumbnail}" 
          class="card-img-top"
          style="height: 320px; object-fit: cover;"
          alt="${character.name}"
        >

        <div class="card-body">
          <h5 class="card-title">${character.name}</h5>
          <button 
            type="button"
            class="btn btn-secondary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#character-${character.id}">
            Подробнее
          </button>
        </div>
      </div>
    </div>
  `;
}

function getCharacterModal(character) {
  return `
    <div class="modal fade" id="character-${character.id}" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${character.name}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
          </div>

          <div class="modal-body">
            <img 
              src="${character.thumbnail}" 
              class="img-fluid mb-3"
              alt="${character.name}"
            >
            <h5>Описание:</h5>
            <p>${character.description || "Описание отсутствует"}</p>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary btn-sm" data-bs-dismiss="modal">
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

function fetchCharacters() {
  return fetch("https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json")
    .then(response => response.json())
    .then(data => {
      return data.map((hero, index) => ({
        id: index,
        name: hero.name,
        thumbnail: hero.images.md,
        description: hero.biography.fullName || "Описание отсутствует"
      }));
    });
}

function getCharacterCards(characters) {
  return characters.map(character => getCharacterCard(character));
}

function getCharacterModals(characters) {
  return characters.map(character => getCharacterModal(character));
}