from rest_framework import serializers
from .models import Usuario


class UsuarioSerializer(serializers.ModelSerializer):
    #nombre = serializers.CharField(source='get_full_name', read_only=True)
    rol = serializers.SlugRelatedField(read_only=True, slug_field='nombre')
   
    class Meta:
        model = Usuario
        fields = '__all__'



class UsuarioSerializerCreate(serializers.ModelSerializer):
    class Meta:
        model = Usuario
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password', 'fotografia', 'tipo_identificacion', 'nro_identificacion', 'genero', 'direccion', 'celular', 'rol')
