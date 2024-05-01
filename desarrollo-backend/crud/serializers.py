from rest_framework import serializers
from .models import Obra
from .models import Tareas

class ObraSerializer(serializers.ModelSerializer):
    #nombre = serializers.CharField(source='get_full_name', read_only=True)
    #id_director = serializers.SlugRelatedField(read_only=True, slug_field='first_name')
    #id_tarea = serializers.SlugRelatedField(read_only=True, slug_field='Tarea')
    #id_usuarios = serializers.SlugRelatedField(read_only=True, slug_field='first_name')
   
    class Meta:
        model = Obra
        fields = '__all__'


class TareasSerializer(serializers.ModelSerializer):
    #nombre_obra = serializers.CharField(source='id_obra.nombre', read_only=True)
    #nombre_capataz = serializers.CharField(source='id_capataz.first_name', read_only=True)
    #trabajadores_asignados = serializers.ManyRelatedField(source='id_trabajadores', read_only=True)

    class Meta:
        model = Tareas
        fields = '__all__'




# serializador, vista de tareas