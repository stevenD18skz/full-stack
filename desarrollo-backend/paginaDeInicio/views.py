from rest_framework.response import Response
from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny

from .models import Usuario, Task
from .serializers import UsuarioSerializer, TaskSerializer


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
    def get(self, request):
        nombre = request.GET.get('nombre', '')
        primer_usuario = Usuario.objects.get(first_name=nombre)
        serializer = UsuarioSerializer(primer_usuario)
        return Response(serializer.data)
        
    


        return Response({'saludo': 'ola'}, status=200)
    """


    """
    nombre = request.GET.get('nombre', '')
    correo = request.GET.get('correo', '')

    # Se realiza la consulta a la base de datos
    usuarios = Usuario.objects.filter(nombre__icontains=nombre, correo__icontains=correo)

    # Se serializan los datos para la respuesta
    serializer = UsuarioSerializer(usuarios, many=True)
    return Response(serializer.data)
    """






class TaskView(viewsets.ModelViewSet):
   serializer_class = TaskSerializer
   queryset = Task.objects.all()