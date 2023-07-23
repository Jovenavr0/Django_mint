from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    pass
    

class Task(models.Model):
    title = models.CharField('Название', max_length=50)
    task = models.TextField('Описание')
    
    def str(self):
        return self.title

    class Meta:
        verbose_name = "Задача"
        verbose_name_plural = "Задачи"