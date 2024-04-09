from django.shortcuts import render
from .models import Usuario
from .serializers import UsuarioSerializer
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response



class GerentePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        #if request.user.rol.nombre == 'Gerente':
        #    return True
        return False



class UsuarioViewSet(viewsets.ModelViewSet):
  queryset = Usuario.objects.all()
  serializer_class = UsuarioSerializer
  permission_classes = []

  @action(detail=True, methods=['get'])
  def get_name(self, request, pk=None):
    usuario = self.get_object()
    nombre = usuario.get_full_name()  # Suponiendo que get_full_name devuelve el nombre
    return Response(nombre)  # Devuelve el nombre envuelto en una respuesta DRF

