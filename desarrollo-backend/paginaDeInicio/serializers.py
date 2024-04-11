from rest_framework import serializers
from .models import Usuario, Task
from django.contrib.auth import authenticate
from django.contrib.auth.models import User


class UsuarioSerializer(serializers.ModelSerializer):
    #nombre = serializers.CharField(source='get_full_name', read_only=True)
    rol = serializers.SlugRelatedField(read_only=True, slug_field='nombre')
   
    class Meta:
        model = Usuario
        fields = '__all__'


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'title', 'descripcion', 'done')
