from rest_framework import serializers
from .models import Obra

class ObraSerializer(serializers.ModelSerializer):
    #nombre = serializers.CharField(source='get_full_name', read_only=True)
    #id_director = serializers.SlugRelatedField(read_only=True, slug_field='first_name')
    #id_tarea = serializers.SlugRelatedField(read_only=True, slug_field='Tarea')
    #id_usuarios = serializers.SlugRelatedField(read_only=True, slug_field='first_name')
   
    class Meta:
        model = Obra
        fields = '__all__'