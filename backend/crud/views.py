from rest_framework import viewsets
from rest_framework import generics
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import action


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

    # Permisos para la vista
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

    # Método para obtener un objeto específico
    def retrieve(self, request, pk=None):
        # Obtener el objeto con el ID especificado
        obj = self.get_object()

        # Serializar el objeto
        serializer = self.get_serializer(obj)

        # Devolver la respuesta con el objeto serializado
        return Response(serializer.data)

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


    # Método para deshabilitar un objeto existente
    def disable(self, request, pk=None):
        # Obtener el objeto con la clave primaria especificada
        obj = self.get_object()

        # Verificar si el usuario tiene permisos para deshabilitar el objeto
        # (Agregar verificación de permisos aquí si es necesario)

        # Deshabilitar el objeto
        obj.is_active = False
        obj.save()

        # Devolver una respuesta JSON con un mensaje que confirma la deshabilitación
        return Response({
        "mensaje": f"La tarea {obj.nombre} ha sido deshabilitada correctamente.",
        }, status=status.HTTP_200_OK)



class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    # Permisos para la vista
    permission_classes = [
        #permissions.IsAuthenticated,
        #permissions.IsAdminOrReadOnly,
    ]

    # Método para obtener un objeto específico
    def retrieve(self, request, pk=None):
        # Obtener el objeto con el ID especificado
        obj = self.get_object()

        # Serializar el objeto
        serializer = self.get_serializer(obj)

        # Devolver la respuesta con el objeto serializado
        return Response(serializer.data)

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

    # Método para deshabilitar un objeto existente
    def disable(self, request, pk=None):

        # Obtener el objeto con la clave primaria especificada
        obj = self.get_object()

        # Verificar si el usuario tiene permisos para deshabilitar el objeto
        # (Agregar verificación de permisos aquí si es necesario)

        # Deshabilitar el objeto
        obj.is_active = False
        obj.save()

        # Devolver una respuesta JSON con un mensaje que confirma la deshabilitación
        return Response({
        "mensaje": f"La tarea {obj.nombre} ha sido deshabilitada correctamente.",
        }, status=status.HTTP_200_OK)



class TaskProgressViewSet(viewsets.ModelViewSet):
    queryset = TaskProgress.objects.all()
    serializer_class = TaskProgressSerializer

    # Permisos para la vista
    permission_classes = [
        #permissions.IsAuthenticated,
        #permissions.IsAdminOrReadOnly,
    ]

    # Método para obtener un objeto específico
    def retrieve(self, request, pk=None):
        # Obtener el objeto con el ID especificado
        obj = self.get_object()

        # Serializar el objeto
        serializer = self.get_serializer(obj)

        # Devolver la respuesta con el objeto serializado
        return Response(serializer.data)

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
    
    # Método para deshabilitar un objeto existente
    def disable(self, request, pk=None):

        # Obtener el objeto con la clave primaria especificada
        obj = self.get_object()

        # Verificar si el usuario tiene permisos para deshabilitar el objeto
        # (Agregar verificación de permisos aquí si es necesario)

        # Deshabilitar el objeto
        obj.is_active = False
        obj.save()

        # Devolver una respuesta JSON con un mensaje que confirma la deshabilitación
        return Response({
        "mensaje": f"La tarea {obj.nombre} ha sido deshabilitada correctamente.",
        }, status=status.HTTP_200_OK)