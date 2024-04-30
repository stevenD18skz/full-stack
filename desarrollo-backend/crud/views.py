from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action

#importacion obras
from .models import Obra
from .serializers import ObraSerializer



class ObraViewSet(viewsets.ModelViewSet):
    queryset = Obra.objects.all()
    serializer_class = ObraSerializer

    # Permisos para la vista
    permission_classes = [
        #permissions.IsAuthenticated,
        #permissions.IsAdminOrReadOnly,
    ]

    @action(detail=True, methods=['get'])
    def filtrar_por_director(self, request, id_director):
        # Filtrar obras por ID del director
        obras_filtradas = Obra.objects.filter(id_director=id_director)

        # Serializar las obras filtradas
        serializer = ObraSerializer(obras_filtradas, many=True)

        # Devolver la respuesta con las obras filtradas
        return Response(serializer.data)

