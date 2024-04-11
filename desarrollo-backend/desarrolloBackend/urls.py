from django.contrib import admin
from django.urls import path, include
from rest_framework import routers

from paginaDeInicio.views import UsuarioViewSet, TaskView, LoginView, buscar_usuarios



router = routers.DefaultRouter()
router.register('api/users', UsuarioViewSet, 'nombra_urls_usuarios')
router.register('api/task',  TaskView,       'nombra_urls_task')

urlpatterns = [
  path('admin/', admin.site.urls),

  #Urls del LogIn
  path('', include(router.urls)),
  path('api/users/<int:pk>/name/', UsuarioViewSet.as_view({'get': 'get_name'})),
  path('login/', LoginView.as_view(), name='login_view'),
  path('api/usuarios/buscar/', buscar_usuarios.as_view()),
]