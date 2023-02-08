from django.db import models


class Commune(models.Model):
    nom = models.CharField(max_length=255)
    code = models.CharField(max_length=10)
