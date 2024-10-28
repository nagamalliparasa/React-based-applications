from django.urls import path,include
from .views import login_user,register_user,home
from rest_framework.routers import DefaultRouter

from .views import *
router = DefaultRouter()
# router.register(r'tasks', TaskViewset,basename='task')

urlpatterns = [
    path("", home, name="home"),
    path('register/',register_user,name="register"),
    path('login/',login_user,name="login"),
    path('',include(router.urls)),
    path('tasks-list/',TaskList,name="tasklist"),
    path('add-task/',addTask,name='add-task'),
    path('update-task/',updateTask,name='update-task'),
    path('tasks/<int:task_id>/delete/', delete_task, name='delete_task')
]
