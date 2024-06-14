from rest_framework import serializers
from .models import Work
from .models import Task
from .models import TaskProgress


class WorkSerializer(serializers.ModelSerializer):
    name_director = serializers.SerializerMethodField()
    user_names = serializers.SerializerMethodField()

    class Meta:
        model = Work
        fields = '__all__'

    def get_name_director(self, obj):
        # Asumiendo que obj.director es una instancia del modelo Director
        return obj.id_manager_work.first_name if obj.id_manager_work else None
    
    def get_user_names(self, obj):
        # Obtenemos los nombres de los usuarios asociados a este trabajo (Work)
        return [user.first_name for user in obj.id_user_work.all()]



class TaskSerializer(serializers.ModelSerializer):
    name_capataz = serializers.SerializerMethodField()
    name_status  = serializers.SerializerMethodField()
    user_names = serializers.SerializerMethodField()

    class Meta:
        model = Task
        fields = '__all__'

    def get_name_capataz(self, obj):
        # Asumiendo que obj.director es una instancia del modelo Director
        return obj.id_foreman.first_name if obj.id_foreman else None

    def get_name_status(self, obj):
        return obj.get_task_status_display()
    
    def get_user_names(self, obj):
        # Obtenemos los nombres de los usuarios asociados a este trabajo (Work)
        return [user.first_name for user in obj.id_workers.all()]



class TaskProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = TaskProgress
        fields = '__all__'




