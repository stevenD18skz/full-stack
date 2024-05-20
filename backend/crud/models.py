from django.db import models
from paginaDeInicio.models import User


class Work(models.Model):
    # Clave primaria
    id = models.AutoField(primary_key=True)

    # Nombre de la obra
    name_work = models.CharField(max_length=500)

    # Ubicación de la obra
    location_work = models.CharField(max_length=500)

    # Tipo de obra
    type_work = models.CharField(max_length=500)

    # Clave foránea para el director de la obra
    id_manager_work = models.ForeignKey(User, on_delete=models.CASCADE, related_name='obras_dirigidas')

    # Descripción de la obra
    description_work = models.CharField(max_length=500)
    
    # Clave foránea para los usuarios asignados a la obra
    id_user_work = models.ManyToManyField(User, related_name='obras_asignadas')

    # Estado de avance de la obra (de 0 a 100%)
    work_status = models.FloatField(default=0)

    # Indica si la obra está habilitada
    enabled_work = models.BooleanField(default=True)


    def str(self):
        return self.name_work
    








class Task(models.Model):
    # Clave primaria
    id = models.AutoField(primary_key=True)

    # Nombre de la tarea
    task_name = models.CharField(max_length=500)

    # Descripción de la tarea
    task_description = models.CharField(max_length=700)

    # Clave foránea para id de Obra
    id_work = models.ForeignKey(Work, on_delete=models.CASCADE, related_name="tareas_obra") 

    # Clave foránea para id de Trabajadores
    id_workers = models.ManyToManyField(User, related_name="tareas_asignadas")

    # Tipo de tarea
    task_type = models.CharField(max_length=500)

    # Fecha de asignación de la Tarea
    task_assignment_date = models.DateField()

    # Fecha de finalización de la Tarea
    task_finish_date = models.DateField()

    # Estado de la tarea (0: Pendiente, 1: En progreso, 2: Completada) 
    task_status = models.IntegerField(choices=((0, "Pendiente"), (1, "En progreso"), (2, "Completada")))

    # Clave foránea para id de Capataz
    id_foreman = models.ForeignKey(User, on_delete=models.CASCADE, related_name="tareas_como_capataz")

    # Indica si la tarea está habilitada
    task_enabled = models.BooleanField(default=True)











class TaskProgress(models.Model):
    # Clave primaria
    id = models.AutoField(primary_key=True)

    # Descripción del del avance realizado
    task_progress_description = models.CharField(max_length=700)

    # Necesidades para continuar con la tarea
    task_progress_id_task = models.ForeignKey(Task, on_delete=models.CASCADE, related_name="avances_con_tareas")

    # Porcentaje de avance de la tarea 
    task_progress = models.FloatField()

    # Fotografías que documentan el progreso 
    progress_photos = models.ImageField(upload_to='imagenes/', blank=True, null=True)

    # Necesidades para continuar con la tarea
    task_progress_needs = models.CharField(max_length=500)

    # Revision
    inspection = models.BooleanField(default=False)

    # Clave foránea para id_multimedi_avance
    

    # Fecha en que se registra el progreso
    #date_recorded = models.DateTimeField(auto_now_add=True)
    
    
    

