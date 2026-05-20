import { useEffect, useState } from 'react'
import axios from 'axios'
import logoImg from './assets/logo.png'
import './App.css'

const API_URL = 'http://192.168.31.188:8000/api'

function App() {
  const [videos, setVideos] = useState([])
  const [selectedVideo, setSelectedVideo] = useState(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [token, setToken] = useState(localStorage.getItem('accessToken') || '')
  const [currentUser, setCurrentUser] = useState(localStorage.getItem('username') || '')

  const [authMode, setAuthMode] = useState('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState('')
  const [authSuccess, setAuthSuccess] = useState('')

  const [uploadTitle, setUploadTitle] = useState('')
  const [uploadDescription, setUploadDescription] = useState('')
  const [uploadFile, setUploadFile] = useState(null)
  const [previewFile, setPreviewFile] = useState(null)
  const [uploadError, setUploadError] = useState('')
  const [uploadSuccess, setUploadSuccess] = useState('')

  function loadVideos() {
    setLoading(true)
    setError('')

    axios
      .get(`${API_URL}/videos/`)
      .then((response) => {
        setVideos(response.data)
        setLoading(false)
      })
      .catch(() => {
        setError('Не удалось загрузить видео. Проверь, запущен ли Django-сервер.')
        setLoading(false)
      })
  }

  useEffect(() => {
    loadVideos()
  }, [])

  function handleRegister(event) {
    event.preventDefault()
    setAuthError('')
    setAuthSuccess('')

    if (!username.trim() || !password.trim()) {
      setAuthError('Введи логин и пароль.')
      return
    }

    axios
      .post(`${API_URL}/users/register/`, {
        username,
        password,
      })
      .then(() => {
        setAuthSuccess('Регистрация успешна. Теперь можно войти.')
        setAuthMode('login')
        setPassword('')
      })
      .catch(() => {
        setAuthError('Не удалось зарегистрироваться. Возможно, такой логин уже занят.')
      })
  }

  function handleLogin(event) {
    event.preventDefault()
    setAuthError('')
    setAuthSuccess('')

    if (!username.trim() || !password.trim()) {
      setAuthError('Введи логин и пароль.')
      return
    }

    axios
      .post(`${API_URL}/users/login/`, {
        username,
        password,
      })
      .then((response) => {
        localStorage.setItem('accessToken', response.data.access)
        localStorage.setItem('username', username)

        setToken(response.data.access)
        setCurrentUser(username)

        setUsername('')
        setPassword('')
      })
      .catch(() => {
        setAuthError('Не удалось войти. Проверь логин и пароль.')
      })
  }

  function handleLogout() {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('username')
    setToken('')
    setCurrentUser('')
  }

  function handleUpload(event) {
    event.preventDefault()
    setUploadError('')
    setUploadSuccess('')

    if (!uploadTitle.trim() || !uploadFile) {
      setUploadError('Укажи название и выбери видеофайл.')
      return
    }

    const formData = new FormData()
    formData.append('title', uploadTitle)
    formData.append('description', uploadDescription)
    formData.append('video_file', uploadFile)

    if (previewFile) {
      formData.append('preview_image', previewFile)
    }

    axios
      .post(`${API_URL}/videos/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(() => {
        setUploadTitle('')
        setUploadDescription('')
        setUploadFile(null)
        setPreviewFile(null)
        setUploadSuccess('Видео успешно загружено.')
        event.target.reset()
        loadVideos()
      })
      .catch(() => {
        setUploadError('Не удалось загрузить видео. Возможно, токен устарел — выйди и войди снова.')
      })
  }

  function handleDelete(videoId) {
    const isConfirmed = window.confirm('Удалить это видео?')

    if (!isConfirmed) {
      return
    }

    axios
      .delete(`${API_URL}/videos/${videoId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setSelectedVideo(null)
        loadVideos()
      })
      .catch(() => {
        alert('Не удалось удалить видео. Удалять может только автор.')
      })
  }

  return (
    <div className="app">
      <header className="header">
        <a className="logo" href="#">
          <img src={logoImg} alt="Neon Blade" />
          <span>Neon Blade</span>
        </a>

        <nav className="nav">
          <a href="#videos">Видео</a>
          <a href="#stream">Стримы</a>
          <a href="#about">О платформе</a>
        </nav>

        {token ? (
          <button className="login-button" onClick={handleLogout}>
            Выйти
          </button>
        ) : (
          <a className="login-button" href="#auth">
            Вход
          </a>
        )}
      </header>

      <main>
        <section className="hero">
          <div className="hero-glow"></div>

          <img className="hero-logo" src={logoImg} alt="Neon Blade" />

          <p className="hero-label">Видеоплатформа чемпионата</p>
          <h1>NEON BLADE MEDIA</h1>

          <p className="hero-text">
            Смотри записи боёв, загружай видео и следи за цифровой ареной турнира.
          </p>

          <div className="hero-actions">
            <a href="#videos" className="primary-button">
              Смотреть видео
            </a>

            <a href={token ? '#upload' : '#auth'} className="secondary-button">
              Загрузить запись
            </a>
          </div>
        </section>

        {!token && (
          <section className="form-section" id="auth">
            <form
              className="panel-form"
              onSubmit={authMode === 'login' ? handleLogin : handleRegister}
            >
              <h2>{authMode === 'login' ? 'Вход' : 'Регистрация'}</h2>

              <p>
                {authMode === 'login'
                  ? 'Войди, чтобы загружать свои записи боёв.'
                  : 'Создай аккаунт, чтобы добавлять свои видео.'}
              </p>

              <input
                type="text"
                placeholder="Логин"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />

              <input
                type="password"
                placeholder="Пароль"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />

              {authError && <span className="form-error">{authError}</span>}
              {authSuccess && <span className="form-success">{authSuccess}</span>}

              <button type="submit">
                {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
              </button>

              <button
                type="button"
                className="switch-auth-button"
                onClick={() => {
                  setAuthError('')
                  setAuthSuccess('')
                  setAuthMode(authMode === 'login' ? 'register' : 'login')
                }}
              >
                {authMode === 'login'
                  ? 'Нет аккаунта? Зарегистрироваться'
                  : 'Уже есть аккаунт? Войти'}
              </button>
            </form>
          </section>
        )}

        {token && (
          <section className="form-section" id="upload">
            <form className="panel-form" onSubmit={handleUpload}>
              <h2>Загрузить запись</h2>

              <p>
                Аккаунт: <b>{currentUser}</b>. Добавь видео боя, и оно появится в списке ниже.
              </p>

              <input
                type="text"
                placeholder="Название видео"
                value={uploadTitle}
                onChange={(event) => setUploadTitle(event.target.value)}
              />

              <textarea
                placeholder="Описание"
                value={uploadDescription}
                onChange={(event) => setUploadDescription(event.target.value)}
              />

              <label className="file-label">
                Видео:
                <input
                  type="file"
                  accept="video/*"
                  onChange={(event) => setUploadFile(event.target.files[0])}
                />
              </label>

              <label className="file-label">
                Превью-картинка:
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) => setPreviewFile(event.target.files[0])}
                />
              </label>

              {uploadError && <span className="form-error">{uploadError}</span>}
              {uploadSuccess && <span className="form-success">{uploadSuccess}</span>}

              <button type="submit">Загрузить видео</button>
            </form>
          </section>
        )}

        <section className="videos-section" id="videos">
          <div className="section-heading">
            <div>
              <h2>Видео</h2>
              <p>Материалы, загруженные через Django API</p>
            </div>

            <span className="count">{videos.length} видео</span>
          </div>

          {loading && <p className="status">Загрузка видео...</p>}
          {error && <p className="status error">{error}</p>}

          {!loading && !error && videos.length === 0 && (
            <p className="status">Видео пока нет. Добавь первое видео.</p>
          )}

          <div className="video-grid">
            {videos.map((video) => (
              <article className="video-card" key={video.id}>
                <div className="video-preview">
                  {video.preview_url ? (
                    <img src={video.preview_url} alt={video.title} />
                  ) : (
                    <div className="preview-placeholder">
                      <span>▶</span>
                    </div>
                  )}
                </div>

                <div className="video-info">
                  <h3>{video.title}</h3>
                  <p>{video.description || 'Описание отсутствует'}</p>

                  <div className="video-meta">
                    <span>Автор: {video.author}</span>
                    <span>ID: {video.id}</span>
                  </div>

                  <div className="card-actions">
                    <button onClick={() => setSelectedVideo(video)}>
                      Смотреть
                    </button>

                    {token && currentUser === video.author && (
                      <button
                        className="delete-button"
                        onClick={() => handleDelete(video.id)}
                      >
                        Удалить
                      </button>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="about-section" id="about">
          <h2>О платформе</h2>

          <p>
            Neon Blade Media — тестовая видеоплатформа для просмотра и загрузки
            записей боёв. Фронтенд сделан на React, бэкенд работает на Django REST API.
          </p>
        </section>
      </main>

      {selectedVideo && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => setSelectedVideo(null)}>
              ×
            </button>

            <h2>{selectedVideo.title}</h2>
            <p>{selectedVideo.description || 'Описание отсутствует'}</p>

            <video
              controls
              src={selectedVideo.video_url}
              poster={selectedVideo.preview_url || ''}
            ></video>

            <div className="modal-meta">
              <span>Автор: {selectedVideo.author}</span>
              <span>Видео #{selectedVideo.id}</span>
            </div>

            {token && currentUser === selectedVideo.author && (
              <button
                className="modal-delete-button"
                onClick={() => handleDelete(selectedVideo.id)}
              >
                Удалить видео
              </button>
            )}
          </div>
        </div>
      )}

      <footer className="footer">
        <span>Контакты</span>
        <span>О нас</span>
        <span>Правила</span>
        <span>Пользовательское соглашение</span>
      </footer>
    </div>
  )
}

export default App