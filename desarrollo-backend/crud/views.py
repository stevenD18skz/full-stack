from django.shortcuts import render

# Create your views here.
from rest_framework import viewsets
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

