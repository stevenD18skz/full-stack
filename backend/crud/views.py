from rest_framework import viewsets
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from django.shortcuts import get_object_or_404
from rest_framework.pagination import PageNumberPagination
from django.db.models import Count
from django.db.models import Avg
from rest_framework.decorators import api_view


#importacion obras
from .models import Work
from .models import Task
from .models import TaskProgress
from .serializers import WorkSerializer
from .serializers import TaskSerializer
from .serializers import TaskProgressSerializer


class MiPaginador(PageNumberPagination):
    page_size = 25



class WorkViewSet(viewsets.ModelViewSet):
    queryset = Work.objects.all()
    serializer_class = WorkSerializer
    permission_classes = [
        #permissions.IsAuthenticated,
        #permissions.IsAdminOrReadOnly,
    ]
    pagination_class = MiPaginador

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



class filtredWorkUserRol(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def get(self, request):
        print(request.GET)
        identificador = request.GET.get('id_obra')
        role = request.GET.get('role')  # 'inhabilitar' o 'habilitar'

        work = get_object_or_404(Work, id=identificador)


        serializer = WorkSerializer(work)#comprobar bien que debe debolver
        return Response({
            "mensaje": f"la obra {work.name_work} ha sido ====== correctamente.",
            "resultados": serializer.data
        }, status=status.HTTP_200_OK)












class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [
        #permissions.IsAuthenticated,
        #permissions.IsAdminOrReadOnly,
    ]
    pagination_class = MiPaginador




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
    pagination_class = MiPaginador




class filtroProgressPorTasks(APIView):
    def get(self, request, *args, **kwargs):

        id_de_obra = request.GET.get('tarea')


        director_usuarios = TaskProgress.objects.filter(id_work=id_de_obra)

        serializer = TaskProgressSerializer(director_usuarios, many=True)  # Serialize for multiple users
        return Response(data={"contador": len(serializer.data), "results": serializer.data}, status=status.HTTP_200_OK)




class chageEstateProgress(APIView):
    permission_classes = [AllowAny]
    authentication_classes = []

    def put(self, request):
        identificador = request.data.get('id')
        action = request.data.get('action')  # 'inhabilitar' o 'habilitar'

        pro = get_object_or_404(TaskProgress, id=identificador)

        if action == 'inhabilitar':
            pro.inspection = False
        elif action == 'habilitar':
            pro.inspection = True
        else:
            raise ValueError(f"Acción inválida: {action}")


        pro.save()
        serializer = TaskProgressSerializer(TaskProgress.objects.all(), many=True)#comprobar bien que debe debolver
        return Response({
            "mensaje": f"el objeto {action}do correctamente.",
            "resultados": serializer.data
        }, status=status.HTTP_200_OK)
    

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

class WorkLocationView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Obtener datos de ubicaciones y contar obras por ubicación
        location_counts = Work.objects.values('location_work').annotate(count=Count('id')).order_by('location_work')

        # Preparar datos en formato adecuado para la respuesta JSON
        data = {
            'labels': [loc['location_work'] for loc in location_counts],
            'data': [loc['count'] for loc in location_counts]
        }

        return Response(data)
    
class WorkTypeReportView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Obtener datos de tipos de obra y contar obras por tipo
        type_counts = Work.objects.values('type_work').annotate(count=Count('id')).order_by('type_work')

        # Preparar datos en formato adecuado para la respuesta JSON
        data = {
            'labels': [entry['type_work'] for entry in type_counts],
            'data': [entry['count'] for entry in type_counts]
        }

        return Response(data)
    
class WorkEnabledReportView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Obtener datos de estado de habilitación de obras y contar obras por estado
        enabled_counts = Work.objects.values('enabled_work').annotate(count=Count('id')).order_by('enabled_work')

        # Preparar datos en formato adecuado para la respuesta JSON
        data = {
            'labels': ['Habilitada' if entry['enabled_work'] else 'Inhabilitada' for entry in enabled_counts],
            'data': [entry['count'] for entry in enabled_counts]
        }

        return Response(data)
    
class TaskTypeReportView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Obtener datos de tipo de tarea y contar tareas por tipo
        type_counts = Task.objects.values('task_type').annotate(count=Count('id')).order_by('task_type')

        # Preparar datos en formato adecuado para la respuesta JSON
        data = {
            'labels': [entry['task_type'] for entry in type_counts],
            'data': [entry['count'] for entry in type_counts]
        }

        return Response(data)
    
class TaskStatusReportView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Obtener datos de estado de tareas y contar tareas por estado
        status_counts = Task.objects.values('task_status').annotate(count=Count('id')).order_by('task_status')

        # Mapear los valores numéricos de task_status a sus etiquetas correspondientes
        status_labels = {0: 'Pendiente', 1: 'En progreso', 2: 'Completada'}
        data = {
            'labels': [status_labels[entry['task_status']] for entry in status_counts],
            'data': [entry['count'] for entry in status_counts]
        }

        return Response(data)
    
class TaskEnabledReportView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Obtener datos de estado de habilitación de tareas y contar tareas por estado
        enabled_counts = Task.objects.values('task_enabled').annotate(count=Count('id')).order_by('task_enabled')

        # Preparar datos en formato adecuado para la respuesta JSON
        data = {
            'labels': ['Habilitada' if entry['task_enabled'] else 'Inhabilitada' for entry in enabled_counts],
            'data': [entry['count'] for entry in enabled_counts]
        }

        return Response(data)
    
class TaskProgressReportView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Obtener datos de progreso de tareas y calcular el promedio de avance por tarea
        progress_data = TaskProgress.objects.values('task_progress_id_task__task_name').annotate(avg_progress=Avg('task_progress')).order_by('task_progress_id_task__task_name')

        # Preparar datos en formato adecuado para la respuesta JSON
        data = {
            'labels': [entry['task_progress_id_task__task_name'] for entry in progress_data],
            'data': [entry['avg_progress'] for entry in progress_data]
        }

        return Response(data)
    
class TaskProgressEnabledReportView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Obtener datos de estado de habilitación de avances de tareas y contar por estado
        enabled_counts = TaskProgress.objects.values('task_progress_id_task__task_enabled').annotate(count=Count('id')).order_by('task_progress_id_task__task_enabled')

        # Preparar datos en formato adecuado para la respuesta JSON
        data = {
            'labels': ['Habilitada' if entry['task_progress_id_task__task_enabled'] else 'Inhabilitada' for entry in enabled_counts],
            'data': [entry['count'] for entry in enabled_counts]
        }

        return Response(data)

class TaskProgressCreateView(generics.CreateAPIView):
    queryset = TaskProgress.objects.all()
    serializer_class = TaskProgressSerializer

class TaskProgressUpdateView(generics.UpdateAPIView):
    queryset = TaskProgress.objects.all()
    serializer_class = TaskProgressSerializer