from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import Group, Permission


class Rol(models.Model):
    nombre = models.CharField(max_length=255)
    descripcion = models.TextField()

    def str(self):
        return self.nombre


class Usuario(AbstractUser):
    fotografia = models.ImageField(upload_to='usuarios/imagenes/', blank=True, null=True)

    TIPO_IDENTIFICACION_CHOICES = (
        ('CC', 'Cédula de Ciudadanía'),
        ('CE', 'Cédula de Extranjería'),
        ('PA', 'Pasaporte'),
    )
    tipo_identificacion = models.CharField(max_length=2, choices=TIPO_IDENTIFICACION_CHOICES)
    nro_identificacion = models.CharField(max_length=20)
    apellidos = models.CharField(max_length=255)
    nombres = models.CharField(max_length=255)


    GENERO_CHOICES = (
        ('F', 'Female'),
        ('M', 'Male'),
        ('H', 'Helicopteer'),
    )
    genero = models.CharField(max_length=1, choices=GENERO_CHOICES)
    direccion = models.CharField(max_length=255)
    celular = models.CharField(max_length=15)
    rol = models.ForeignKey(Rol, on_delete=models.CASCADE)


    groups = models.ManyToManyField(Group, related_name='usuario_set')  # Agrega related_name
    user_permissions = models.ManyToManyField(Permission, related_name='usuario_set')  # Agrega related_name
    
    
    """
    esta funcinon viene por defecto desde AbstractUser, pero aqui
    se esta sobreescribiendo el metodo
    """
    def get_full_name(self):
        # Tu lógica personalizada para obtener el nombre completo
        return f"nombre: {self.apellidos}: Apellido: {self.nombres}"
    
    