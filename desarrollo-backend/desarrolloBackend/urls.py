from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from paginaDeInicio.views import UsuarioViewSet, LoginView, buscar_usuarios, inhabilitar_usuario, habilitar_usuario, createUserView


from crud.views import ObraViewSet




router = routers.DefaultRouter()
router.register('api/users', UsuarioViewSet, 'nombra_urls_usuarios')
router.register('api/obras', ObraViewSet)


urlpatterns = [
  path('admin/', admin.site.urls),
  path('', include(router.urls)),

  #Urls del Usuario
  path('api/users/<int:pk>/name/', UsuarioViewSet.as_view({'get': 'get_name'})),
  path('login/', LoginView.as_view()),

  #URLS DEL CRUD
  path('crear-usuario/', createUserView.as_view()),
  path('api/usuarios/buscar/', buscar_usuarios.as_view()),
  #update
  path('inhabilitar/', inhabilitar_usuario.as_view()),
  path('habilitar/', habilitar_usuario.as_view()),


  #Urls de las obras
  path('api/obras/por-director/{id_director}/', ObraViewSet.as_view({'get': 'filtrar_por_director'})),

  #URLS DEL CRUD
  #create
  #read
  #update
  #delete
]