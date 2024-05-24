from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static



#vistas de los usuarios
from paginaDeInicio.views import UsuarioViewSet
from paginaDeInicio.views import serchName
from paginaDeInicio.views import LoginView
from paginaDeInicio.views import buscar_usuarios
from paginaDeInicio.views import filtroProRol
from paginaDeInicio.views import createUserView
from paginaDeInicio.views import updateView
from paginaDeInicio.views import chageEstateUser

from paginaDeInicio.views import RoleViewSet



#vistas de las obras
from crud.views import WorkViewSet
from crud.views import chageEstateWork
from crud.views import filtredWorkUserRol



#vistas de las tareas
from crud.views import TaskViewSet
from crud.views import filtroTareasProObra
from crud.views import chageEstateTask


#avance
from crud.views import TaskProgressViewSet
from crud.views import filtroProgressPorTasks
from crud.views import chageEstateProgress






router = routers.DefaultRouter()
router.register('roles', RoleViewSet)
router.register('users', UsuarioViewSet)
router.register('works', WorkViewSet)
router.register('tasks', TaskViewSet)
router.register('progress', TaskProgressViewSet)


urlpatterns = [
  path('admin/', admin.site.urls),
  path('', include(router.urls)),

  #path('usuarios/', UsuarioViewSet.as_view({'get': 'list', 'post': 'create'}), name='usuarios-list'),
  #path('usuarios/<int:pk>/', UsuarioViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='usuarios-detail'),
  #path('users/<int:pk>/name/', UsuarioViewSet.as_view({'get': 'get_name'})),
  #path('usersAc/nombre/', UsuarioViewSet.as_view({'get': 'get_by_email'})),
  #path('crud/users/name/', serchName.as_view()),


  

  #Urls del Usuario
  path('login/', LoginView.as_view()),

  #URLS DEL CRUD
  #create
  path('crud/users/create/', createUserView.as_view()),
  #read
  path('crud/users/serch/',  buscar_usuarios.as_view()),
  path('crud/users/filtroPorRol/',  filtroProRol.as_view()),
  #update
  path('crud/users/update/', updateView.as_view()),
  #delete
  path('crud/users/change/', chageEstateUser.as_view()),



  ###### Urls de las obras #############################
  #URLS DEL CRUD
  #create
  #path('crud/users/create/', createUserView.as_view()),
  #read
  #path('crud/users/serch/',  buscar_usuarios.as_view()),
  path('crud/works/filtredWorkUserRol/',  filtredWorkUserRol.as_view()),
  #update
  #path('crud/users/update/', updateView.as_view()),
  #delete
  path('crud/works/change/', chageEstateWork.as_view()),


  ###### Urls de las tareas #############################
  #URLS DEL CRUD
  #create
  #path('crud/users/create/', createUserView.as_view()),
  #read
  #path('crud/users/serch/',  buscar_usuarios.as_view()),
  path('crud/tasks/filtroObra/',  filtroTareasProObra.as_view()),
  #update
  #path('crud/users/update/', updateView.as_view()),
  #delete
  path('crud/tasks/change/', chageEstateTask.as_view()),



  ###### Urls de las tareas #############################
  #URLS DEL CRUD
  #create
  #path('crud/users/create/', createUserView.as_view()),
  #read
  #path('crud/users/serch/',  buscar_usuarios.as_view()),
  path('crud/progress/filtroTarea',  filtroProgressPorTasks.as_view()),
  #update
  #path('crud/users/update/', updateView.as_view()),
  #delete
  path('crud/progress/change/', chageEstateProgress.as_view()),

  
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)