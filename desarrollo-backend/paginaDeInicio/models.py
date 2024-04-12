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

    tipo_identificacion = models.CharField(max_length=2, choices=(
        ('CC', 'Cédula de Ciudadanía'),
        ('CE', 'Cédula de Extranjería'),
        ('PA', 'Pasaporte'),
    ))
    nro_identificacion = models.CharField(max_length=20)


    genero = models.CharField(max_length=1, choices=(
        ('F', 'Female'),
        ('M', 'Male'),
        ('H', 'Helicopteer'),
    ))
    
    direccion = models.CharField(max_length=255)
    celular = models.CharField(max_length=15)
    

    rol = models.ForeignKey(Rol, on_delete=models.CASCADE)
    groups = models.ManyToManyField(Group, related_name='usuario_set')  # Agrega related_name
    user_permissions = models.ManyToManyField(Permission, related_name='usuario_set')  # Agrega related_name
    

    def get_full_name(self):
        return f"nombre: {self.first_name}: Apellido: {self.last_name}"
    
