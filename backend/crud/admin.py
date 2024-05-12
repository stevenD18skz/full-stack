from django.contrib import admin
from .models import Work, Task, TaskProgress


admin.site.register(Work)
admin.site.register(Task)
admin.site.register(TaskProgress)