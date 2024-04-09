from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

#Importacion de Vistas
from paginaDeInicio.views import UsuarioViewSet



router = routers.DefaultRouter()
router.register('api/users', UsuarioViewSet)


urlpatterns = [
  path('admin/', admin.site.urls),

  #Urls del LogIn
  path('', include(router.urls)),
  path('api/users/<int:pk>/name/', UsuarioViewSet.as_view({'get': 'get_name'})),
]
