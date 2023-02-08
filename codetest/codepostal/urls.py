from django.urls import path, include
from codepostal import views
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


urlpatterns = [
    path("", views.code, name="code"),
]
urlpatterns += staticfiles_urlpatterns()