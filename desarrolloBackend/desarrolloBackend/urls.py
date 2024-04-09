from django.contrib import admin
from rest_framework import routers
from django.urls import path, include
from paginaDeInicio.views import UsuarioViewSet


router = routers.DefaultRouter()
router.register('api/users', UsuarioViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include(router.urls)),
]