# Backend для видеоплатформы Neon Blade

Бэкенд разработан на Django и Django REST Framework.  
Он отвечает за регистрацию пользователей, JWT-авторизацию, загрузку и просмотр видеоконтента.

## Используемые технологии

- Python
- Django
- Django REST Framework
- Simple JWT
- SQLite для разработки
- Django CORS Headers
- Pillow

## Установка и запуск

```bash
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python3 manage.py migrate
python3 manage.py runserver