from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404

from django.contrib.auth import login, authenticate
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import AuthenticationFailed


from .models import Usuario
from .serializers import UsuarioSerializer, UsuarioSerializerCreate
from rest_framework import status



"""
VISTA PARA EL EL MODELO "USUARIO"
"""
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



"""
LOGICA PARA EL PERMISO DEPENDIENTE DEL ROL DEL USUARIO
"""
class GerentePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.rol.nombre == 'Gerente':
            return True
        return False


"""
VISTA PARA LA PETICION POST DEL LOGIN
"""
class LoginView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []


    def post(self, request):
        try:
            usuario = request.data.get('username')
            password = request.data.get('password')

            primer_usuario = Usuario.objects.get(username=usuario, password=password)
            serializer = UsuarioSerializer(primer_usuario)
            return Response(serializer.data)

        except Exception as e:
            print(f"An unexpected error occurred: {e}")
            return Response({'error': 'Ha ocurrido un error inesperado.'}, status=500)




class buscar_usuarios(APIView):
    permission_classes = [AllowAny]


    def get_queryset(self):
        nombre = self.request.GET.get('nombre', '')
        return Usuario.objects.filter(first_name__icontains=nombre).only('id', 'first_name', 'last_name')  # Seleccionar solo los campos específicos

    def get(self, request):
        usuarios = self.get_queryset()
        serializer = UsuarioSerializer(usuarios, many=True)
        return Response(serializer.data)
    




"""
VISTA PARA EL UPDATE DEL USUARIO
"""
class updateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []


    def post(self, request):
        pass







"""
VISTA PARA EL CREAR USUARIO
"""
class createUserView(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        serializer = UsuarioSerializerCreate(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Se crea el usuario y se guarda en la base de datos
        usuario = serializer.save()

        # Se puede devolver información adicional en la respuesta
        return Response({
            "usuario": UsuarioSerializerCreate(usuario).data
        })
    




"""
VISTA PARA ELIMINAR USUARIO
"""
class inhabilitar_usuario(APIView):
    permission_classes = [AllowAny]  
    authentication_classes = [] 

    def post(self, request):
        # Suponiendo que pasas el nombre de usuario en el cuerpo de la solicitud
        username = request.data.get('username')

        # Buscar el usuario en la base de datos
        usuario = get_object_or_404(Usuario, username=username)

        # Inhabilitar el usuario
        usuario.is_active = False

        usuario.save()

        return Response({"mensaje": f"El usuario {username} ha sido eliminado correctamente."},
                        status=status.HTTP_200_OK)
    


class habilitar_usuario(APIView):
    permission_classes = [AllowAny]  
    authentication_classes = [] 

    def post(self, request):
        # Suponiendo que pasas el nombre de usuario en el cuerpo de la solicitud
        username = request.data.get('username')

        # Buscar el usuario en la base de datos
        usuario = get_object_or_404(Usuario, username=username)

        # Habilitar el usuario
        usuario.is_active = True

        usuario.save()

        return Response({"mensaje": f"El usuario {username} ha sido eliminado correctamente."},
                        status=status.HTTP_200_OK)