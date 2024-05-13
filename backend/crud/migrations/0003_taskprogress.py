# Generated by Django 5.0.4 on 2024-05-11 16:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('crud', '0002_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='TaskProgress',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('task_progress_description', models.CharField(max_length=700)),
                ('task_progress', models.FloatField()),
                ('progress_photos', models.ImageField(blank=True, null=True, upload_to='imagenes/')),
                ('task_progress_needs', models.CharField(max_length=500)),
                ('inspection', models.BooleanField(default=False)),
            ],
        ),
    ]