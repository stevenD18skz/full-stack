from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from paginaDeInicio.views import UsuarioViewSet, LoginView, buscar_usuarios, chageEstateUser, createUserView, updateView, serchName

from crud.views import WorkViewSet

from django.conf import settings
from django.conf.urls.static import static


router = routers.DefaultRouter()
router.register('users', UsuarioViewSet)
router.register('works', WorkViewSet)


urlpatterns = [
  path('admin/', admin.site.urls),
  path('', include(router.urls)),

  #path('usuarios/', UsuarioViewSet.as_view({'get': 'list', 'post': 'create'}), name='usuarios-list'),
  #path('usuarios/<int:pk>/', UsuarioViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='usuarios-detail'),
  path('users/<int:pk>/name/', UsuarioViewSet.as_view({'get': 'get_name'})),
  path('usersAc/nombre/', UsuarioViewSet.as_view({'get': 'get_by_email'})),
  path('crud/users/name/', serchName.as_view()),


  



  #Urls del Usuario
  path('login/', LoginView.as_view()),



  #URLS DEL CRUD
  #create
  path('crud/users/create/', createUserView.as_view()),
  #read
  path('crud/users/serch/',  buscar_usuarios.as_view()),
  #update
  path('crud/users/update/', updateView.as_view()),
  #delete
  path('crud/users/change/', chageEstateUser.as_view()),

  
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)