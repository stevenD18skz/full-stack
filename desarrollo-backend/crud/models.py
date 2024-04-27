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
    id_director = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='obras_dirigidas')  # Relacion con Director

    # Descripción de la obra
    descripcion = models.CharField(max_length=500)

    # Clave foránea para la tarea asociada a la obra
    #id_tarea = models.ForeignKey("tarea", on_delete=models.CASCADE, null=True, blank=True)

    # Clave foránea para los usuarios asignados a la obra
    id_usuarios = models.ManyToManyField(Usuario, related_name='obras_asignadas')  # Relacion con Usuario

    # Estado de avance de la obra (de 0 a 100%)
    estado_de_obra = models.FloatField()

    # Indica si la obra está habilitada
    habilitado = models.BooleanField(default=True)



    
    

