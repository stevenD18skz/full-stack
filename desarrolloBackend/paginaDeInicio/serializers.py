from rest_framework import serializers
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    rol = serializers.SlugRelatedField(read_only=True, slug_field='nombre')

    class Meta:
        model = Usuario
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'fotografia', 'tipo_identificacion', 'nro_identificacion', 'apellidos', 'nombres', 'genero', 'direccion', 'celular', 'rol')


class UsuarioSerializer(serializers.ModelSerializer):
    nombre = serializers.CharField(source='get_full_name', read_only=True)
    rol = serializers.SlugRelatedField(read_only=True, slug_field='nombre')
   
    class Meta:
        model = Usuario
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'fotografia', 'tipo_identificacion', 'nro_identificacion', 'apellidos', 'nombres', 'genero', 'direccion', 'celular', 'rol', 'nombre')
