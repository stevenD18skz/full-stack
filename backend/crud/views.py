from rest_framework import viewsets
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404


#importacion obras
from .models import Work
from .models import Task
from .models import TaskProgress
from .serializers import WorkSerializer
from .serializers import TaskSerializer
from .serializers import TaskProgressSerializer



class WorkViewSet(viewsets.ModelViewSet):
    queryset = Work.objects.all()
    serializer_class = WorkSerializer
    permission_classes = [
        #permissions.IsAuthenticated,
        #permissions.IsAdminOrReadOnly,
    ]

    # Acción personalizada para filtrar por director
    @action(detail=True, methods=['get'])
    def filtrar_por_director(self, request, id_manager_work):
        # Filtrar obras por ID del director
        obras_filtradas = Work.objects.filter(id_manager_work=id_manager_work)

        # Serializar las obras filtradas
        serializer = WorkSerializer(obras_filtradas, many=True)

        # Devolver la respuesta con las obras filtradas
        return Response(serializer.data)



class chageEstateWork(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def put(self, request):
        identificador = request.data.get('id')
        action = request.data.get('action')  # 'inhabilitar' o 'habilitar'

        work = get_object_or_404(Work, id=identificador)

        if action == 'inhabilitar':
            work.enabled_work = False
        elif action == 'habilitar':
            work.enabled_work = True
        else:
            raise ValueError(f"Acción inválida: {action}")


        work.save()
        serializer = WorkSerializer(Work.objects.all(), many=True)#comprobar bien que debe debolver
        return Response({
            "mensaje": f"la obra {work.name_work} ha sido {action}do correctamente.",
            "resultados": serializer.data
        }, status=status.HTTP_200_OK)








class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [
        #permissions.IsAuthenticated,
        #permissions.IsAdminOrReadOnly,
    ]




class filtroTareasProObra(APIView):
    def get(self, request, *args, **kwargs):

        id_de_obra = request.GET.get('obra')


        director_usuarios = Task.objects.filter(id_work=id_de_obra)

        serializer = TaskSerializer(director_usuarios, many=True)  # Serialize for multiple users
        return Response(data={"contador": len(serializer.data), "results": serializer.data}, status=status.HTTP_200_OK)




class chageEstateTask(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def put(self, request):
        identificador = request.data.get('id')
        action = request.data.get('action')  # 'inhabilitar' o 'habilitar'

        task = get_object_or_404(Task, id=identificador)

        if action == 'inhabilitar':
            task.task_enabled = False
        elif action == 'habilitar':
            task.task_enabled = True
        else:
            raise ValueError(f"Acción inválida: {action}")


        task.save()
        serializer = TaskSerializer(Task.objects.all(), many=True)#comprobar bien que debe debolver
        return Response({
            "mensaje": f"la tarea {task.task_name} ha sido {action}do correctamente.",
            "resultados": serializer.data
        }, status=status.HTTP_200_OK)










class TaskProgressViewSet(viewsets.ModelViewSet): 
    queryset = TaskProgress.objects.all()
    serializer_class = TaskProgressSerializer
    permission_classes = [
        #permissions.IsAuthenticated,
        #permissions.IsAdminOrReadOnly,
    ]
    

"""
    # Método para crear un nuevo objeto
    def create(self, request):
        # Validar y deserializar los datos de la solicitud
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        # Guardar el nuevo objeto en la base de datos
        self.perform_create(serializer)

        # Serializar el objeto recién creado
        serializer = self.get_serializer(serializer.instance)

        # Devolver la respuesta con el objeto serializado
        return Response(serializer.data)

    # Método para actualizar un objeto existente
    def update(self, request, pk=None):
        # Obtener el objeto con el ID especificado
        obj = self.get_object()

        # Validar y deserializar los datos de la solicitud
        serializer = self.get_serializer(instance=obj, data=request.data)
        serializer.is_valid(raise_exception=True)

        # Actualizar el objeto en la base de datos
        self.perform_update(serializer)

        # Serializar el objeto actualizado
        serializer = self.get_serializer(serializer.instance)

        # Devolver la respuesta con el objeto actualizado
        return Response(serializer.data)
        """