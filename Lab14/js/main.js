import '../css/style.css'

document.querySelector('#app').innerHTML = `
  <div class="top-panel">
    <button class="wave" id="downloadBtn">Скачать PDF</button>
  </div>

  <div class="resume">
    <div class="left">
      <div class="avatar wave" id="avatarBox" contenteditable="true" data-id="avatar">КК</div>
      <input type="file" id="photoInput" accept="image/*">
      <button class="wave mini-btn" id="deletePhotoBtn">Убрать фото</button>

      <div class="block wave">
        <h2>Контакты</h2>
        <p contenteditable="true" data-id="phone">+7 978 875 46 32</p>
        <p contenteditable="true" data-id="email">kirushkachar@mail.ru</p>
        <p contenteditable="true" data-id="city">Новосибирск</p>
      </div>

      <div class="block wave">
        <h2>Навыки</h2>
        <div class="skills" id="skillsList">
          <span class="wave" contenteditable="true" data-id="skill1">C</span>
          <span class="wave" contenteditable="true" data-id="skill2">Go</span>
          <span class="wave" contenteditable="true" data-id="skill3">Python</span>
          <span class="wave" contenteditable="true" data-id="skill4">HTML</span>
          <span class="wave" contenteditable="true" data-id="skill5">CSS</span>
          <span class="wave" contenteditable="true" data-id="skill6">JavaScript</span>
          <span class="wave" contenteditable="true" data-id="skill7">Git</span>
        </div>
        <button class="wave mini-btn" id="addSkillBtn">Добавить навык</button>
        <button class="wave mini-btn" id="removeSkillBtn">Убрать навык</button>
      </div>

      <div class="block wave">
        <h2>Языки</h2>
        <div id="langsList">
          <p contenteditable="true" data-id="lang1">Русский</p>
          <p contenteditable="true" data-id="lang2">Английский</p>
          <p contenteditable="true" data-id="lang3">Немецкий</p>
        </div>
        <button class="wave mini-btn" id="addLangBtn">Добавить язык</button>
        <button class="wave mini-btn" id="removeLangBtn">Убрать язык</button>
      </div>
    </div>

    <div class="right">
      <h1 class="wave" contenteditable="true" data-id="name">Кирилл Качар</h1>
      <p class="profession wave" contenteditable="true" data-id="job">Очень начинающий frontend-разработчик</p>

      <div class="block wave">
        <h2>О себе</h2>
        <p contenteditable="true" data-id="about">
          Обучаюсь на лучшем направлении в мире, да что там в мире, в России!!!
          Осваиваю основы программирования и алгоритмов.
          Учусь создавать сайты на HTML, CSS и JavaScript. Интересуюсь веб-разработкой,
          стараюсь улучшать свои навыки и делать проекты аккуратно.
          Имею целых 11 классов образования в школе!!!
        </p>
      </div>

      <div class="block wave">
        <h2>Образование</h2>
        <div class="info wave">
          <h3 contenteditable="true" data-id="univer">Университет</h3>
          <p class="small" contenteditable="true" data-id="faculty1">СибГУТИ</p>
          <p class="verysmall" contenteditable="true" data-id="faculty2">Кафедра ПОСМС</p>
          <p contenteditable="true" data-id="years">2025 — 2029</p>
        </div>
      </div>

      <div class="block wave">
        <h2>Опыт</h2>
        <div class="info wave">
          <h3 contenteditable="true" data-id="expTitle">Учебные проекты</h3>
          <p class="small" contenteditable="true" data-id="expDate">2023 — сейчас</p>
          <p contenteditable="true" data-id="expText1">
            Верстал простые страницы, работал со стилями, добавлял интерактивность через JavaScript.
          </p>
          <p contenteditable="true" data-id="expText2">
            Создавал 3д и 2д видеоигры на движке Unity 3D
          </p>
        </div>
      </div>

      <div class="block wave">
        <h2>Дополнительно</h2>
        <ul>
          <li contenteditable="true" data-id="extra1">Умею работать с Visual Studio Code</li>
          <li contenteditable="true" data-id="extra2">Знаю основы С, Python, GO</li>
          <li contenteditable="true" data-id="extra3">Готов развиваться в программировании и телекоммуникациях</li>
        </ul>
      </div>
    </div>
  </div>
`

function saveEditableItems() {
  let editableItems = document.querySelectorAll('[contenteditable="true"]')

  editableItems.forEach(function (item) {
    let id = item.dataset.id
    let savedText = localStorage.getItem(id)

    if (savedText) {
      item.innerText = savedText
    }

    item.addEventListener('input', function () {
      localStorage.setItem(id, item.innerText)

      item.classList.remove('changed')
      void item.offsetWidth
      item.classList.add('changed')
    })
  })
}

saveEditableItems()

document.querySelector('#downloadBtn').addEventListener('click', function () {
  window.print()
})

document.querySelector('#addSkillBtn').addEventListener('click', function () {
  let skillsList = document.querySelector('#skillsList')
  let skill = document.createElement('span')

  skill.className = 'wave'
  skill.contentEditable = 'true'
  skill.dataset.id = 'skill' + Date.now()
  skill.innerText = 'Новый навык'

  skillsList.appendChild(skill)
  localStorage.setItem('skillsHtml', skillsList.innerHTML)

  saveEditableItems()
  addWave(skill)
})

document.querySelector('#removeSkillBtn').addEventListener('click', function () {
  let skills = document.querySelectorAll('#skillsList span')

  if (skills.length > 0) {
    skills[skills.length - 1].remove()
    localStorage.setItem('skillsHtml', document.querySelector('#skillsList').innerHTML)
  }
})

document.querySelector('#addLangBtn').addEventListener('click', function () {
  let langsList = document.querySelector('#langsList')
  let lang = document.createElement('p')

  lang.contentEditable = 'true'
  lang.dataset.id = 'lang' + Date.now()
  lang.innerText = 'Новый язык'

  langsList.appendChild(lang)
  localStorage.setItem('langsHtml', langsList.innerHTML)

  saveEditableItems()
})

document.querySelector('#removeLangBtn').addEventListener('click', function () {
  let langs = document.querySelectorAll('#langsList p')

  if (langs.length > 0) {
    langs[langs.length - 1].remove()
    localStorage.setItem('langsHtml', document.querySelector('#langsList').innerHTML)
  }
})

let savedSkills = localStorage.getItem('skillsHtml')
let savedLangs = localStorage.getItem('langsHtml')

if (savedSkills) {
  document.querySelector('#skillsList').innerHTML = savedSkills
}

if (savedLangs) {
  document.querySelector('#langsList').innerHTML = savedLangs
}

let savedPhoto = localStorage.getItem('photo')
let avatarBox = document.querySelector('#avatarBox')

if (savedPhoto) {
  avatarBox.innerHTML = '<img src="' + savedPhoto + '" alt="Фото">'
  avatarBox.contentEditable = 'false'
}

document.querySelector('#photoInput').addEventListener('change', function () {
  let file = this.files[0]

  if (!file) {
    return
  }

  let reader = new FileReader()

  reader.onload = function () {
    localStorage.setItem('photo', reader.result)
    avatarBox.innerHTML = '<img src="' + reader.result + '" alt="Фото">'
    avatarBox.contentEditable = 'false'
  }

  reader.readAsDataURL(file)
})

document.querySelector('#deletePhotoBtn').addEventListener('click', function () {
  localStorage.removeItem('photo')
  avatarBox.innerText = 'КК'
  avatarBox.contentEditable = 'true'
})

function addWave(item) {
  item.addEventListener('click', function (event) {
    let oldRipple = item.querySelector('.ripple')

    if (oldRipple) {
      oldRipple.remove()
    }

    let ripple = document.createElement('span')
    let size = Math.max(item.offsetWidth, item.offsetHeight)
    let rect = item.getBoundingClientRect()

    ripple.className = 'ripple'
    ripple.style.width = size + 'px'
    ripple.style.height = size + 'px'
    ripple.style.left = event.clientX - rect.left - size / 2 + 'px'
    ripple.style.top = event.clientY - rect.top - size / 2 + 'px'

    item.appendChild(ripple)

    setTimeout(function () {
      ripple.remove()
    }, 600)
  })
}

let waveItems = document.querySelectorAll('.wave, button')

waveItems.forEach(function (item) {
  addWave(item)
})