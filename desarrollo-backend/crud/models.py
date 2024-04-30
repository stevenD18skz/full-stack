from django.db import models
from paginaDeInicio.models import Usuario



class Obra(models.Model):
    # Clave primaria
    id = models.AutoField(primary_key=True)

    # Nombre de la obra
    nombre = models.CharField(max_length=500)

    # Ubicación de la obra
    ubicacion = models.CharField(max_length=500)

    # Tipo de obra
    tipo = models.CharField(max_length=500)

    # Clave foránea para el director de la obra
    id_director = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name='obras_dirigidas')

    # Descripción de la obra
    descripcion = models.CharField(max_length=500)

    # Clave foránea para la tarea asociada a la obra
    #id_tareas = models.ForeignKey("tarea", on_delete=models.CASCADE, null=True, blank=True)

    # Clave foránea para los usuarios asignados a la obra
    id_usuarios = models.ManyToManyField(Usuario, related_name='obras_asignadas')

    # Estado de avance de la obra (de 0 a 100%)
    estado_de_obra = models.FloatField()

    # Indica si la obra está habilitada
    habilitado = models.BooleanField(default=True)






class Tareas(models.Model):
    # Clave primaria
    id = models.AutoField(primary_key=True)

    # Nombre de la tarea
    nombre = models.CharField(max_length=500)

    # Descripción de la tarea
    descripcion = models.CharField(max_length=700)

    # Clave foránea para id de Obra
    id_obra = models.ForeignKey(Obra, on_delete=models.CASCADE, related_name="tareas_obra") 

    # Clave foránea para id de Trabajadores
    id_trabajadores = models.ManyToManyField(Usuario, related_name="tareas_asignadas")
    
    # Clave foránea para id de Avances 
    #id_avances = models.ForeignKey("Avance-tarea", on_delete=models.CASCADE, null=True, blank=True)

    # Tipo de tarea
    tipo = models.CharField(max_length=500)

    # Fecha de asignación de la Tarea
    fecha_asignacion = models.DateField()

    # Fecha de finalización de la Tarea
    fecha_finalizacion = models.DateField()

    # Estado de la tarea (0: Pendiente, 1: En progreso, 2: Completada) 
    estado_tarea = models.IntegerField(choices=((0, "Pendiente"), (1, "En progreso"), (2, "Completada")))

    # Clave foránea para id de Capataz
    id_capataz = models.OneToOneField(Usuario, on_delete=models.CASCADE, related_name="tareas_como_capataz")

    # Indica si la tarea está habilitada
    is_active = models.BooleanField(default=True)

    
    

