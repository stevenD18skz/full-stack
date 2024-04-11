"""
VISTAS V1
"""

from django.contrib.auth import authenticate

from rest_framework.authtoken.models import Token
from rest_framework.response import Response
from rest_framework import viewsets, permissions
from rest_framework.decorators import api_view
from rest_framework.decorators import action

from django.contrib.auth import authenticate, login
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework import status
from datetime import timezone
from rest_framework.exceptions import AuthenticationFailed  # Import added
from rest_framework.permissions import AllowAny

from .models import Usuario, Rol, Task
from .serializers import UsuarioSerializer, TaskSerializer



class LoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []


    def post(self, request):

        try:
            usuario = request.data.get('nombre')
            password = request.data.get('contrasena')

            primer_usuario = Usuario.objects.get(username=usuario)
            serializer = UsuarioSerializer(primer_usuario)
            return Response(serializer.data)

        except Exception as e:  # Catch more general exceptions
            # Log the error for debugging and potential improvements
            print(f"An unexpected error occurred: {e}")
            return Response({'error': 'Ha ocurrido un error inesperado.'}, status=500)




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
    print(self.queryset)
    usuario = self.get_object()
    nombre = usuario.get_full_name()  # Suponiendo que get_full_name devuelve el nombre
    return Response(nombre)  # Devuelve el nombre envuelto en una respuesta DRF



class TaskView(viewsets.ModelViewSet):
   serializer_class = TaskSerializer
   queryset = Task.objects.all()


