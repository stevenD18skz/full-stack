# Generated by Django 5.0.4 on 2024-04-14 00:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('paginaDeInicio', '0006_delete_task'),
    ]

    operations = [
        migrations.AlterField(
            model_name='usuario',
            name='genero',
            field=models.CharField(choices=[('F', 'Female'), ('M', 'Male'), ('B', 'Helicopteer')], max_length=1),
        ),
    ]