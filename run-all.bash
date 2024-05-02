
#!/bin/bash

# Navega al directorio del backend
cd backend

# Inicia el servidor Django
python manage.py runserver

# Navega al directorio del frontend
cd desarrollo-frontend

# Inicia el servidor de desarrollo React
npm run dev
