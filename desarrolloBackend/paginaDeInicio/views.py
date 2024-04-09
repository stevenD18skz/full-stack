from django.shortcuts import render
from .models import Usuario
from .serializers import UsuarioSerializer
from rest_framework import viewsets, permissions



class GerentePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        #if request.user.rol.nombre == 'Gerente':
        #    return True
        return False


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = []#esta parte esta vacia mientras se gestiona la seguridad de la pagina

