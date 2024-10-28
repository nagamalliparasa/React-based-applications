from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import CustomUser
from .serializers import UserSerializer
from django.contrib.auth.hashers import make_password, check_password  # For password hashing
from django.http import HttpResponse


def home(request):
    return HttpResponse("This is Home Page")

@api_view(['POST'])
def register_user(request):
    # Check if email already exists
    print("New request occured")
    print(request.method)
    print(request.data)
    if CustomUser.objects.filter(email=request.data['email']).exists():
        return Response({'error': 'Email already exists'}, status=400)

    # Hash the password
    hashed_password = make_password(request.data['password'])
    user = CustomUser.objects.create(
        username=request.data['username'],
        email=request.data['email'],
        password=hashed_password
    )
    # print(user)
    user.save()

    # print(request)
    return Response({'message': 'User created'}, status=201)

@api_view(['POST'])
def login_user(request):
    print(request.data)
    # Find user by email
    user = get_object_or_404(CustomUser, email=request.data['email'])
    
    # Check the password
    if check_password(request.data['password'], user.password):
        return Response({'message': 'Login successful', 'username':user.username}, status=200)
    else:
        return Response({'error': 'Invalid credentials'}, status=400)

    
    # return Response({"message":"Logged"},status=200)



# About the tasks

# from rest_framework import viewsets
# from .models import Task
# from .serializers import TaskSerializer

# class TaskViewSet(viewsets.ModelViewSet):
#     serializer_class=TaskSerializer
#     queryset=Task.objects.all()

#     def get(self,request):
#         user_email=request.data.get('email')

#         if not user_email:
#             return Task.objects.none()  # If no email provided, return an empty queryset
#         try:
#             user = CustomUser.objects.get(email=user_email)
#             return Task.objects.filter(user=user)
#         except CustomUser.DoesNotExist:
#             return Task.objects.none()
    
from rest_framework import viewsets
from .models import Task
from .serializers import TaskSerializer
from rest_framework.decorators import api_view
from django.http import HttpResponseRedirect
from django.shortcuts import redirect

@api_view(['POST'])
def TaskList(request):
    print(dir(request))
    print(request.user)
    # print(request.query_params.get('email'))
    print(request.data)
    # email=request.body['email']
    # print(email)
    if not request.data['email']:
        return Response({'message':"Please Login"},status=400) 
    tasks=Task.objects.filter(email=request.data['email'])
    serializer=TaskSerializer(tasks,many=True)
    return Response(serializer.data,status=200)


@api_view(['POST'])
def addTask(request):
    print(request.data)
    custom_user=CustomUser.objects.get(email=request.data['email'])
    task = Task.objects.create(
        email=custom_user,
        title=request.data['title'],
        description=request.data['description'],
        completed=request.data['completed']
    )
    print(task)
    task.save()
    print("task Occured")
    # print("Task Saved Successfully...")
    tasks=Task.objects.filter(email=request.data['email'])
    serializer=TaskSerializer(tasks,many=True)
    
    return Response(serializer.data,status=200)


@api_view(['POST'])
def updateTask(request):
    custom_user=CustomUser.objects.get(email=request.data['email'])
    task=get_object_or_404(Task,id=request.data['id'])
    task.email=custom_user
    task.title=request.data['title']
    task.description=request.data['description']
    task.completed=request.data['completed']
    task.save()


    tasks=Task.objects.filter(email=request.data['email'])
    serializer=TaskSerializer(tasks,many=True)
    
    return Response(serializer.data,status=200)

    
@api_view(['DELETE'])
def delete_task(request,task_id):
    try:
        task=Task.objects.get(id=task_id)
        task.delete()
        return Response({"message":'Task deleted Successfully'},status=200)
    except Task.DoesNotExist:
        return Response({"Error":"Task Does not Exist"},status=404)
    














# class TaskViewset(viewsets.ViewSet):
#     def list(self,request):
#         user_email=request.query_params.get('email')
#         if not user_email:
#             return Response({'error': 'Email is required to fetch tasks'}, status=status.HTTP_400_BAD_REQUEST)

#         try:
#             user = CustomUser.objects.get(email=user_email)
#         except CustomUser.DoesNotExist:
#             return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

#         tasks = Task.objects.filter(user=user)  # Filter tasks for this user
#         serializer = TaskSerializer(tasks, many=True)
#         return Response(serializer.data)
    
    
#     def retrieve(self,request,pk=None):
#         id=pk

#         if id is not None:
#             queryset=Task.objects.get(id=id)
#             serializer_class=TaskSerializer(queryset,many=True)
#             return Response(serializer_class.data)
    
#     def update(self,request,pk=None):
#         id=pk
#         queryset=Task.objects.get(pk=id)
#         serializer_class=TaskSerializer(queryset,data=request.data)
#         if serializer_class.is_valid():
#             serializer_class.save()
#             return Response({"msg":"Data Uploaded successfully"})
        
#         return Response(serializer_class.errors, status=400)

#     def destroy(self,request,pk=None):
#         id=pk
#         queryset=Task.objects.get(pk=id)
#         queryset.delete()
#         return Response("Data deleted")
        
#     def create(self,request):
#         serializer=TaskSerializer(data=request.data)
#         if(serializer.is_valid()):
#             serializer.save()
#             return Response({"Msg":"Data Saved Successfully"})
#         return Response(serializer.errors,status=400)
    
