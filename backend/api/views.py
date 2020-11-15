from django.shortcuts import render
from django.http import JsonResponse
from django.db import connection

from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import *

import json
import requests

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

@api_view(['GET'])
def gamePopulate(request):
    keyPayload = {
        'key': '9e03d751249b478aa0cad2bf1d6d9214'
    }
    payload = {
        'key': '9e03d751249b478aa0cad2bf1d6d9214', 
        'dates': '2020-01-01,2020-11-14',
        'ordering': '-rating-count',
        'platforms': '18,1,4,7'
    }
    r = requests.get('https://api.rawg.io/api/games', params = payload)
    MAX_COUNT = 10
    gameCounter = 0
    for game in r.json()["results"]:
        if gameCounter >= MAX_COUNT:
            break
        hasSteam = False
        hasPS4 = False
        hasXboxOne = False
        gamePriceSteam = 0.0
        gamePricePS4 = 0.0
        gameId = game["id"]
        gameName = game["name"]
        print(gameName)
        r2 = requests.get('https://api.rawg.io/api/games/%s' % str(gameId), params = keyPayload)
        gameDeveloper = r2.json()["developers"][0]["name"]
        platformsList = r2.json()["platforms"]
        storesList = r2.json()["stores"]

        for i in range(len(platformsList)):
            platformInfo = platformsList[i]["platform"]

            # If platform is PC
            if platformInfo["id"] == 4:
                for j in range(len(storesList)):
                    if storesList[j]["store"]["name"] == "Steam":
                        hasSteam = True
                        steamUrl = storesList[j]["url"]
                        steamId = steamUrl.strip().split("/")[steamUrl.strip().split("/").index("app") + 1]
                        rSteam = requests.get('https://store.steampowered.com/api/appdetails?appids=%s' % str(steamId))
                        if rSteam.status_code == 200:
                            gamePriceSteam = rSteam.json()[steamId]["data"]["price_overview"]["final"] / 100 if "price_overview" in rSteam.json()[steamId]["data"] else 0.0
                            print("Steam price: " + str(gamePriceSteam))
                            # g = Game(name=gameName, price=gamePriceSteam, platform="PC", developer=gameDeveloper)
                            # g.save()
                        else:
                            # g = Game(name=gameName, price=0.0, platform="PC", developer=gameDeveloper)
                            # g.save()
                            print("Status code not 200")
                if not hasSteam:
                    # g = Game(name=gameName, price=0.0, platform="PC", developer=gameDeveloper)
                    # g.save()
                    print("Does not have Steam version")

            # If platform is PS4
            elif platformInfo["id"] == 18:
                for j in range(len(storesList)):
                    if storesList[j]["store"]["name"] == "PlayStation Store":
                        hasPS4 = True
                        psUrl = storesList[j]["url"]
                        psId = psUrl.strip().split("/")[psUrl.strip().split("/").index("product") + 1]
                        rPS4 = requests.get('https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/999/%s' % str(psId))
                        if rPS4.status_code == 200:
                            gamePricePS4 = rPS4.json()["default_sku"]["price"] / 100
                            print("PS4 price: " + str(gamePricePS4))
                            # g = Game(name=gameName, price=gamePricePS4, platform="PS4", developer=gameDeveloper)
                            # g.save()
                        else:
                            # g = Game(name=gameName, price=0.0, platform="PS4", developer=gameDeveloper)
                            # g.save()
                            print("Status code not 200")
                    
            # If platform is Xbox One
            elif platformInfo["id"] == 1:
                hasXboxOne = True
        
        # Set Xbox One platform price
        if hasXboxOne:
            if hasPS4:
                print("Xbox One price: " + str(gamePricePS4))
                # g = Game(name=gameName, price=gamePricePS4, platform="Xbox One", developer=gameDeveloper)
                # g.save()
            elif hasSteam:
                print("Xbox One price: " + str(gamePriceSteam))
                # g = Game(name=gameName, price=gamePriceSteam, platform="Xbox One", developer=gameDeveloper)
                # g.save()
            else:
                print("Xbox One price: 0.0")
                # g = Game(name=gameName, price=0.0, platform="Xbox One", developer=gameDeveloper)
                # g.save()

        gameCounter += 1
    return Response("Parse complete")

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

# def findGamePlatforms(platformList):
#     hasPC = False
#     hasPS4 = False
#     hasXboxOne = False
#     hasNS = False
#     for i in range(len(platformList)):
#         platformInfo = platformList[i]["platform"]
#         if (platformInfo["id"] == 4):
#             hasPC = True
#         elif (platformInfo["id"] == 18):
#             hasPS4 = True
#         elif (platformInfo["id"] == 1):
#             hasXboxOne = True
#         elif (platformInfo["id"] == 7):
#             hasNS = True
#     return hasPC * 8 + hasPS4 * 4 + hasXboxOne * 2 + hasNS * 1