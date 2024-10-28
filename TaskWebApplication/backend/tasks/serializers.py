from rest_framework import serializers
from .models import CustomUser,Task

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = ['userid', 'username', 'email', 'password']  # Password will be hashed manually in the view

class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ['id','email','title','description','completed']