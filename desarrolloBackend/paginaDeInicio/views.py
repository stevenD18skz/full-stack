from django.contrib.auth import authenticate

from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view
from rest_framework.decorators import action

from .models import *
from .serializers import *



@api_view(['POST'])
def login(request):
   return Response({})

@api_view(['POST'])
def register(request):
   return Response({})



class GerentePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.rol.nombre == 'Gerente':
            return True
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



class TaskView(viewsets.ModelViewSet):
   serializer_class = TaskSerializer
   queryset = Task.objects.all()