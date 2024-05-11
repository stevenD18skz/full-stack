from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404

from django.contrib.auth import login, authenticate
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import AuthenticationFailed


from .models import User
from .serializers import UsuarioSerializer, UsuarioSerializerCreate
from rest_framework import status



"""
VISTA PARA EL EL MODELO "USUARIO"
"""
class UsuarioViewSet(viewsets.ModelViewSet):
   queryset = User.objects.all()
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

class GerentePermission(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.user.role_user.name_role == 'Gerente':
            return True
        return False
"""

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

            primer_usuario = User.objects.get(username=usuario, password=password)
            serializer = UsuarioSerializer(primer_usuario)
            return Response(serializer.data)

        except Exception as e:
            print(f"An unexpected error occurred: {e}")
            return Response({'error': 'Ha ocurrido un error inesperado.'}, status=500)




class buscar_usuarios(APIView):
    permission_classes = [AllowAny]


    def get_queryset(self):
        nombre = self.request.GET.get('nombre', '')
        return User.objects.filter(first_name__icontains=nombre).only('id', 'first_name', 'last_name')  # Seleccionar solo los campos específicos

    def get(self, request):
        usuarios = self.get_queryset()
        serializer = UsuarioSerializer(usuarios, many=True)
        return Response(serializer.data)







"""
VISTA PARA EL CREAR USUARIO
"""
class createUserView(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)

        contra = "password123"
        request.data["password"] = contra

        serializer = UsuarioSerializerCreate(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Se crea el usuario y se guarda en la base de datos
        usuario = serializer.save()

        # Se puede devolver información adicional en la respuesta
        return Response({
            "usuario": UsuarioSerializerCreate(usuario).data
        })
    


    




"""
VISTA PARA EL UPDATE DEL USUARIO
"""
class updateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    

    def get(self, request):
        print(f"{'*'*80}{request.data.get('email')}{'*'*80}")
        user = User.objects.get(email=request.data.get('email'))
        return Response({
            "usuario": UsuarioSerializerCreate(user).data}, 
            status=status.HTTP_200_OK
        )





    def post(self, request):
        try:
            user = User.objects.get(email=request.data.get('email'))
            print(f"\n\n\n\n============={user}\n\n\n")
            user.username = request.data.get('username')
            print(f"\n\n\n\n============={user}\n\n\n")
            return Response({
                "usuario": UsuarioSerializerCreate(user).data}, 
                status=status.HTTP_200_OK
            )

        except:
            return Response(
                status=status.HTTP_404_NOT_FOUND
            )
        
        

       






"""
VISTA PARA ELIMINAR USUARIO
"""
class chageEstateUser(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def post(self, request):
        # Suponiendo que pasas el nombre de usuario y la acción en el cuerpo de la solicitud
        username = request.data.get('username')
        action = request.data.get('action')  # 'inhabilitar' o 'habilitar'

        # Buscar el usuario en la base de datos
        usuario = get_object_or_404(User, username=username)

        if action == 'inhabilitar':
            usuario.is_active = False
        elif action == 'habilitar':
            usuario.is_active = True
        else:
            raise ValueError(f"Acción inválida: {action}")

        usuario.save()

        serializer = UsuarioSerializer(User.objects.all(), many=True)
        return Response({
            "mensaje": f"El usuario {username} ha sido {action}do correctamente.",
            "resultados": serializer.data
        }, status=status.HTTP_200_OK)
