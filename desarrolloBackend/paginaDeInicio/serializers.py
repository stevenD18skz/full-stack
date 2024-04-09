from rest_framework import serializers
from .models import Usuario

class UsuarioSerializer(serializers.ModelSerializer):
    rol = serializers.SlugRelatedField(read_only=True, slug_field='nombre')

    class Meta:
        model = Usuario
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'fotografia', 'tipo_identificacion', 'nro_identificacion', 'apellidos', 'nombres', 'genero', 'direccion', 'celular', 'rol')
