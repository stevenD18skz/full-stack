from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from django.db.models import Count

from django.contrib.auth import login, authenticate
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.pagination import PageNumberPagination


from .models import User
from .models import Role
from .serializers import UsuarioSerializer, UsuarioSerializerCreate
from .serializers import RoleSerializer
from rest_framework import status



class RoleViewSet(viewsets.ModelViewSet):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer
    permission_classes = []
   



"""
VISTA GENERAL PARA EL EL MODELO "USUARIO"
"""

class MiPaginador(PageNumberPagination):
    page_size = 25



class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsuarioSerializer
    permission_classes = []
    pagination_class = MiPaginador
   
    @action(detail=True, methods=['get'])
    def get_name(self, request, pk=None):
        usuario = self.get_object()
        nombre = usuario.get_full_name()
        return Response(nombre)
    #http://127.0.0.1:8000/users/3/name/
    #si solo basta con el id
    

    @action(detail=True, methods=['get'])
    def get_by_email(self, request, pk=None):
        print(f"{'*'*80}")
        print(request.GET)
        email = request.GET.get('email')
        usuario = User.objects.get(email=email)
        nombre = usuario.get_full_name()
        return Response(nombre)
    #http://127.0.0.1:8000/usersAc/nombre/?email=brayanss2018@gmail.com
    #si se busca con otro atributo



class serchName(APIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    authentication_classes = []


    def get(self, request):
        usuario = User.objects.get(id=request.GET.get('id_bus'))
        nombre = usuario.get_full_name()
        return Response(nombre)

#http://127.0.0.1:8000/crud/users/name/?id_bus=1





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

            usuario = User.objects.get(username=usuario, password=password)
            return Response(UsuarioSerializer(usuario).data)

        except Exception as e:
            print(f"An unexpected error occurred: {e}")
            return Response({'error': 'Ha ocurrido un error inesperado.'}, status=500)







"""
VISTA PARA EL READ USUARIO
"""
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
        print(request.data["role_user"])
        passWord = "password123"
        request.data["password"] = passWord

        serializer = UsuarioSerializerCreate(data=request.data)
        serializer.is_valid(raise_exception=True)

        usuario = serializer.save()
        return Response({
            "usuario": UsuarioSerializerCreate(usuario).data},
            status=status.HTTP_201_CREATED
        )








"""
VISTA PARA EL UPDATE DEL USUARIO
"""
class updateView(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []
    

    def get(self, request):
        print(f"{'+'*80}")
        print(request.GET.get('email'))
        user = User.objects.get(email=request.GET.get('email'))
        return Response({
            "usuario": UsuarioSerializerCreate(user).data}, 
            status=status.HTTP_200_OK
        )


    def put(self, request):
        try:
            print(request.data)
            user = User.objects.get(username=request.data.get('username'))
            user.username = request.data.get('username')
            user.first_name = request.data.get('first_name')
            user.last_name = request.data.get('last_name')
            user.email = request.data.get('email')
            user.doc_type_user = request.data.get('doc_type_user')
            user.doc_number_user = request.data.get('doc_number_user')
            user.gender_user = request.data.get('gender_user')
            user.address_user = request.data.get('address_user')
            user.phone_user = request.data.get('phone_user')
            #user.role_user = int(int(request.data.get('role_user')))
            user.save()


            return Response(
                status=status.HTTP_202_ACCEPTED
            )

        except Exception as e:
            print(e)
            return Response(
                status=status.HTTP_303_SEE_OTHER
            )








"""
VISTA PARA ELIMINAR USUARIO
"""
class chageEstateUser(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def put(self, request):
        identificador = request.data.get('id')
        action = request.data.get('action')  # 'inhabilitar' o 'habilitar'

        usuario = get_object_or_404(User, id=identificador)

        if action == 'inhabilitar':
            usuario.is_active = False
        elif action == 'habilitar':
            usuario.is_active = True
        else:
            raise ValueError(f"Acción inválida: {action}")


        usuario.save()
        serializer = UsuarioSerializer(User.objects.all(), many=True)#comprobar bien que debe debolver
        return Response({
            "mensaje": f"El usuario {usuario.username} ha sido {action}do correctamente.",
            "resultados": serializer.data
        }, status=status.HTTP_200_OK)







class filtroProRol(APIView):
    def get(self, request, *args, **kwargs):

        rol_name = request.GET.get('roleBusqueda')


        if rol_name == "Director de obra":
            director_usuarios = User.objects.filter(role_user=2)

        elif rol_name == "Capataz":
            director_usuarios = User.objects.filter(role_user=3)

        elif rol_name == "Peon":
            director_usuarios = User.objects.filter(role_user=4)

        elif rol_name == "Ayudante de albañil":
            director_usuarios = User.objects.filter(role_user=5)

        elif rol_name == "trabajadores":
            director_usuarios = User.objects.filter(role_user__in=[4, 5])

        else:
           return Response( status=status.HTTP_403_FORBIDDEN)

        serializer = UsuarioSerializerCreate(director_usuarios, many=True)  # Serialize for multiple users
        return Response(serializer.data, status=status.HTTP_200_OK)


class UsuariosPorRolView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Agrupar usuarios por rol y contar cuántos usuarios hay en cada rol
        roles = User.objects.values('role_user__name_role').annotate(count=Count('id')).order_by('role_user__name_role')
        return Response(roles)
    
class UsuariosPorGeneroView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        generos = User.objects.values('gender_user').annotate(count=Count('id')).order_by('gender_user')
        return Response(generos)
    
class UsuariosPorEstadoView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        estados = User.objects.values('is_active').annotate(count=Count('id')).order_by('is_active')
        return Response(estados)
    
