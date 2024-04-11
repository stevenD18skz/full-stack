from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

#Importacion de Vistas
from paginaDeInicio.views import *


router = routers.DefaultRouter()
router.register('api/users', UsuarioViewSet, 'nombra_urls_usuarios')
router.register('api/task',  TaskView,       'nombra_urls_task')

#olaaa ci

urlpatterns = [
  path('admin/', admin.site.urls),

  #Urls del LogIn
  path('', include(router.urls)),
  path('api/users/<int:pk>/name/', UsuarioViewSet.as_view({'get': 'get_name'})),
]