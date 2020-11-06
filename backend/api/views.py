from django.shortcuts import render
from django.http import JsonResponse
from django.db import connection

from rest_framework.decorators import api_view
from rest_framework.response import Response

import json

# Create your views here.

@api_view(['GET'])
def apiOverview(request):
    api_urls = {
        'Project Name': 'Game Recommendation System',
        'Course': 'CS 411',
        'Semester:': 'Fall 2020',
        'Team Members:': ['wpan11', 'scho93', 'blakeel2', 'vsekhar2']
    }
    print("GET request received from React.")
    return Response(api_urls)

@api_view(['POST'])
def userInsert(request):
    data = json.loads(request.body)
    name = data['Name']
    age = data['Age']
    userId = data['UserId']
    cursor = connection.cursor()
    rawSql = "INSERT INTO user(name, age) VALUES('%s', %s)" % (name, age)
    cursor.execute(rawSql)
    return Response("User data received, sending from Django REST Framework.")

# TODO: Update, Delete, Query for Users
@api_view(['POST'])
def userDelete(request):
    data = json.loads(request.body)
    myName = data['Name']
    age = data['Age']
    userId = data['UserId']
    cursor = connection.cursor()
    cursor.execute('DELETE FROM user WHERE name = %s', [myName])
    return Response("User Delete")

@api_view(['POST'])
def userUpdate(request):
    data = json.loads(request.body)
    myName = data['Name']
    myAge = data['Age']
    userId = data['UserId']
    cursor = connection.cursor()
    cursor.execute("UPDATE user SET name = %s, age = %s WHERE id = %s", [myName, myAge, userId])
    return Response("Update Row")

@api_view(['POST'])
def userQuery(request):
    data = json.loads(request.body)
    userId = data['UserId']
    cursor = connection.cursor()
    cursor.execute("SELECT name, age FROM user WHERE id = %s", [userId])
    row = cursor.fetchone()
    return Response(row)

@api_view(['POST'])
def gameInsert(request):
    data = json.loads(request.body)
    name = data['Name']
    price = data['Price']
    platform = data['Platform']
    developer = data['Developer']
    cursor = connection.cursor()
    cursor.execute("INSERT INTO game(name, price, platform, developer) VALUES(%s, %s, %s, %s)", [name, price, platform, developer])
    return Response("Game inserted")

@api_view(['POST'])
def gameUpdate(request):
    data = json.loads(request.body)
    gameId = data['GameId']
    name = data['Name']
    price = data['Price']
    platform = data['Platform']
    developer = data['Developer']
    cursor = connection.cursor()
    cursor.execute("UPDATE game SET name = %s, price = %s, platform = %s, developer = %s WHERE id = %s", [name, price, platform, developer, gameId])
    return Response("Update Row")

@api_view(['POST'])
def gameQuery(request):
    data = json.loads(request.body)
    gameId = data['GameId']
    cursor = connection.cursor()
    cursor.execute("SELECT name, price, platform, developer FROM game WHERE id = %s", [gameId])
    row = cursor.fetchone()
    return Response(row)