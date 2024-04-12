from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from paginaDeInicio.views import UsuarioViewSet, LoginView, buscar_usuarios, inhabilitar_usuario, habilitar_usuario



router = routers.DefaultRouter()
router.register('api/users', UsuarioViewSet, 'nombra_urls_usuarios')

urlpatterns = [
  path('admin/', admin.site.urls),

  #Urls del LogIn
  path('', include(router.urls)),
  path('api/users/<int:pk>/name/', UsuarioViewSet.as_view({'get': 'get_name'})),
  path('login/', LoginView.as_view(), name='login_view'),
  path('api/usuarios/buscar/', buscar_usuarios.as_view()),
  path('inhabilitar/', inhabilitar_usuario.as_view()),
  path('habilitar/', habilitar_usuario.as_view()),
]