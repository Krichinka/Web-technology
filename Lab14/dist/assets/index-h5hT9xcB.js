(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))n(a);new MutationObserver(a=>{for(const l of a)if(l.type==="childList")for(const o of l.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function i(a){const l={};return a.integrity&&(l.integrity=a.integrity),a.referrerPolicy&&(l.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?l.credentials="include":a.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function n(a){if(a.ep)return;a.ep=!0;const l=i(a);fetch(a.href,l)}})();document.querySelector("#app").innerHTML=`
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
`;function s(){document.querySelectorAll('[contenteditable="true"]').forEach(function(e){let i=e.dataset.id,n=localStorage.getItem(i);n&&(e.innerText=n),e.addEventListener("input",function(){localStorage.setItem(i,e.innerText),e.classList.remove("changed"),e.offsetWidth,e.classList.add("changed")})})}s();document.querySelector("#downloadBtn").addEventListener("click",function(){window.print()});document.querySelector("#addSkillBtn").addEventListener("click",function(){let t=document.querySelector("#skillsList"),e=document.createElement("span");e.className="wave",e.contentEditable="true",e.dataset.id="skill"+Date.now(),e.innerText="Новый навык",t.appendChild(e),localStorage.setItem("skillsHtml",t.innerHTML),s(),p(e)});document.querySelector("#removeSkillBtn").addEventListener("click",function(){let t=document.querySelectorAll("#skillsList span");t.length>0&&(t[t.length-1].remove(),localStorage.setItem("skillsHtml",document.querySelector("#skillsList").innerHTML))});document.querySelector("#addLangBtn").addEventListener("click",function(){let t=document.querySelector("#langsList"),e=document.createElement("p");e.contentEditable="true",e.dataset.id="lang"+Date.now(),e.innerText="Новый язык",t.appendChild(e),localStorage.setItem("langsHtml",t.innerHTML),s()});document.querySelector("#removeLangBtn").addEventListener("click",function(){let t=document.querySelectorAll("#langsList p");t.length>0&&(t[t.length-1].remove(),localStorage.setItem("langsHtml",document.querySelector("#langsList").innerHTML))});let c=localStorage.getItem("skillsHtml"),r=localStorage.getItem("langsHtml");c&&(document.querySelector("#skillsList").innerHTML=c);r&&(document.querySelector("#langsList").innerHTML=r);let u=localStorage.getItem("photo"),d=document.querySelector("#avatarBox");u&&(d.innerHTML='<img src="'+u+'" alt="Фото">',d.contentEditable="false");document.querySelector("#photoInput").addEventListener("change",function(){let t=this.files[0];if(!t)return;let e=new FileReader;e.onload=function(){localStorage.setItem("photo",e.result),d.innerHTML='<img src="'+e.result+'" alt="Фото">',d.contentEditable="false"},e.readAsDataURL(t)});document.querySelector("#deletePhotoBtn").addEventListener("click",function(){localStorage.removeItem("photo"),d.innerText="КК",d.contentEditable="true"});function p(t){t.addEventListener("click",function(e){let i=t.querySelector(".ripple");i&&i.remove();let n=document.createElement("span"),a=Math.max(t.offsetWidth,t.offsetHeight),l=t.getBoundingClientRect();n.className="ripple",n.style.width=a+"px",n.style.height=a+"px",n.style.left=e.clientX-l.left-a/2+"px",n.style.top=e.clientY-l.top-a/2+"px",t.appendChild(n),setTimeout(function(){n.remove()},600)})}let v=document.querySelectorAll(".wave, button");v.forEach(function(t){p(t)});
