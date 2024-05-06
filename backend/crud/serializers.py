from rest_framework import serializers
from .models import Work
from .models import Task
from .models import TaskProgress

class WorkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Work
        fields = '__all__'


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = '__all__'


class TaskProgressSerializer(serializers.ModelSerializer):
    #progress_status = serializers.SerializerMethodField()

    #def get_progress_status(self, obj):
        #if obj.task_progress >= 75:
            #return "Avanzado"
        #elif obj.task_progress >= 50:
            #return "En progreso"
        #else:
            #return "Iniciado"
    class Meta:
        model = TaskProgress
        fields = '__all__' 




