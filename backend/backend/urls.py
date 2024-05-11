from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from paginaDeInicio.views import UsuarioViewSet, LoginView, buscar_usuarios, chageEstateUser, createUserView, updateView


from crud.views import WorkViewSet


from django.conf import settings
from django.conf.urls.static import static

#ola laura 
#ola satanas


router = routers.DefaultRouter()
router.register('users', UsuarioViewSet)
router.register('works', WorkViewSet)


urlpatterns = [
  path('admin/', admin.site.urls),
  path('', include(router.urls)),


  #path('usuarios/', UsuarioViewSet.as_view({'get': 'list', 'post': 'create'}), name='usuarios-list'),
  #path('usuarios/<int:pk>/', UsuarioViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='usuarios-detail'),




  #Urls del Usuario
  path('users/<int:pk>/name/', UsuarioViewSet.as_view({'get': 'get_name'})),
  path('login/', LoginView.as_view()),

  #URLS DEL CRUD
  #create
  path('users/create/', createUserView.as_view()),
  #read
  path('users/serch/',  buscar_usuarios.as_view()),
  #update
  path('users/update/', updateView.as_view()),
  #delete
  path('users/change/', chageEstateUser.as_view()),







  #Urls de las obras
  path('api/obras/por-director/{id_director}/', WorkViewSet.as_view({'get': 'filtrar_por_director'})),

  #URLS DEL CRUD
  #create
  #read
  #updateS
  #delete
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)