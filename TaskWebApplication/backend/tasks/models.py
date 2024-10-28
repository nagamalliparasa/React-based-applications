from django.db import models



class CustomUser(models.Model):
    userid = models.AutoField(primary_key=True)  # Automatically created unique ID
    username = models.CharField(max_length=100)
    email = models.EmailField(unique=True)  # Ensure email is unique
    password = models.CharField(max_length=100)  # Store hashed password (you will hash this manually)

    def __str__(self):
        return self.email


class Task(models.Model):
    email = models.ForeignKey(CustomUser, on_delete=models.CASCADE, to_field='email')  # Make user nullable temporarily or assign a default value
    title = models.CharField(max_length=255)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    created_at=models.DateTimeField(auto_now_add=True)
    updated_at=models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return self.title
