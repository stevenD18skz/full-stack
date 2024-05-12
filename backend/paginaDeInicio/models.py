from django.contrib.auth.models import AbstractUser
from django.db import models
from django.contrib.auth.models import Group, Permission



class Role(models.Model):
    name_role = models.CharField(max_length=255)
    description_role = models.TextField()

    def str(self):
        return self.description_role



class User(AbstractUser):
    doc_type_user = models.CharField(max_length=2, choices=(
        ('CC', 'Cédula de Ciudadanía'),
        ('CE', 'Cédula de Extranjería'),
        ('PA', 'Pasaporte'),
    ))
    doc_number_user = models.CharField(max_length=20)
    gender_user = models.CharField(max_length=1, choices=(
        ('F', 'Femenino'),
        ('M', 'Masculino')))
    address_user = models.CharField(max_length=255)
    phone_user = models.CharField(max_length=15)
    role_user = models.ForeignKey(Role, on_delete=models.CASCADE)
    groups = models.ManyToManyField(Group, related_name='usuario_set')
    user_permissions = models.ManyToManyField(Permission, related_name='usuario_set')  
    

    def str(self):
        return self.first_name


    def get_full_name(self):
        return f"nombre: {self.first_name}: Apellido: {self.last_name}"