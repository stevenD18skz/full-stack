from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

#importacion obras
from .models import Work
from .serializers import ObraSerializer



class ObraViewSet(viewsets.ModelViewSet):
    queryset = Work.objects.all()
    serializer_class = ObraSerializer

    # Permisos para la vista
    permission_classes = [
        #permissions.IsAuthenticated,
        #permissions.IsAdminOrReadOnly,
    ]

    @action(detail=True, methods=['get'])
    def filtrar_por_director(self, request, id_manager_work):
        # Filtrar obras por ID del director
        obras_filtradas = Work.objects.filter(id_manager_work=id_manager_work)

        # Serializar las obras filtradas
        serializer = ObraSerializer(obras_filtradas, many=True)

        # Devolver la respuesta con las obras filtradas
        return Response(serializer.data)

