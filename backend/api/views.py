from django.shortcuts import render
from django.http import JsonResponse
from django.db import connection

from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import *

import json
import requests

import sys
sys.path.insert(1, '../engine')
from engine.engine import Engine

engine = Engine(5) # Initialize recommendation engine

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
        'key': '582e096040d14978ba146b8fee3f7e5b'
    }
    payload = {
        'key': '582e096040d14978ba146b8fee3f7e5b', 
        'dates': '2014-01-01,2020-11-14',
        'ordering': '-rating-count',
        'platforms': '18,1,4',
        'page': 1
    }
    MAX_PAGE_COUNT = 30
    gameCounter = 0
    for pageCounter in range(1, MAX_PAGE_COUNT + 1):
        payload['page'] = pageCounter
        r = requests.get('https://api.rawg.io/api/games', payload)
        for game in r.json()["results"]:
            gameCounter += 1
            hasSteam = False
            hasPS4 = False
            hasXboxOne = False
            gamePriceSteam = 0.0
            gamePricePS4 = 0.0
            gameId = game["id"]
            gameName = game["name"]
            r2 = requests.get('https://api.rawg.io/api/games/%s' % str(gameId))
            gameDeveloper = r2.json()["developers"][0]["name"] if len(r2.json()["developers"]) > 0 else ""

            platformsList = r2.json()["platforms"]
            storesList = r2.json()["stores"]

            for i in range(len(platformsList)):
                platformInfo = platformsList[i]["platform"]
                if platformInfo["id"] == 4:
                    for j in range(len(storesList)):
                        if storesList[j]["store"]["name"] == "Steam":
                            hasSteam = True
                            steamUrl = storesList[j]["url"]
                            steamUrlList = steamUrl.strip().split("/")
                            if "app" in steamUrlList:
                                steamId = steamUrl.strip().split("/")[steamUrl.strip().split("/").index("app") + 1]
                            else:
                                steamId = steamUrlList[-2]
                            g = Game(name=gameName, developer=gameDeveloper, steamId=steamId)
                            g.save()
                            break
                    if not hasSteam:
                        steamId = 0
                        g = Game(name=gameName, developer=gameDeveloper, steamId=0)
                        g.save()

            print(str(gameCounter) + ": " + gameName + " (SteamId: " + str(steamId) + ")")

            i = 0
            for i in range(len(platformsList)):
                platformInfo = platformsList[i]["platform"]

                # If platform is PC
                if platformInfo["id"] == 4:
                    for j in range(len(storesList)):
                        if storesList[j]["store"]["name"] == "Steam":
                            steamUrl = storesList[j]["url"]
                            steamUrlList = steamUrl.strip().split("/")
                            if "app" in steamUrlList:
                                steamId = steamUrl.strip().split("/")[steamUrl.strip().split("/").index("app") + 1]
                            else:
                                steamId = steamUrlList[-2]
                            rSteam = requests.get('https://store.steampowered.com/api/appdetails?appids=%s' % str(steamId))
                            if rSteam.status_code == 200 and rSteam.json()[steamId]["success"] == True:
                                gamePriceSteam = rSteam.json()[steamId]["data"]["price_overview"]["final"] / 100 if "price_overview" in rSteam.json()[steamId]["data"] else 0.0
                                print("    Steam price: " + str(gamePriceSteam))
                                g_p = Game_Platform(game=g, price=gamePriceSteam, platform="PC")
                                g_p.save()
                            else:
                                g_p = Game_Platform(game=g, price=0.0, platform="PC")
                                g_p.save()
                                print("    Steam: Status code not 200")
                    if not hasSteam:
                        g_p = Game_Platform(game=g, price=0.0, platform="PC")
                        g_p.save()
                        print("    Does not have Steam version")

                # If platform is PS4
                elif platformInfo["id"] == 18:
                    for j in range(len(storesList)):
                        if storesList[j]["store"]["name"] == "PlayStation Store":
                            hasPS4 = True
                            psUrl = storesList[j]["url"]
                            psId = psUrl.strip().split("/")[psUrl.strip().split("/").index("product") + 1]
                            rPS4 = requests.get('https://store.playstation.com/store/api/chihiro/00_09_000/container/US/en/999/%s' % str(psId))
                            if rPS4.status_code == 200:
                                if "default_sku" in rPS4.json():
                                    gamePricePS4 = rPS4.json()["default_sku"]["price"] / 100
                                elif "links" in rPS4.json() and len(rPS4.json()["links"]) > 0 and "default_sku" in rPS4.json()["links"][0]:
                                    gamePricePS4 = rPS4.json()["links"][0]["default_sku"]["price"] / 100
                                print("    PS4 price: " + str(gamePricePS4))
                                g_p = Game_Platform(game=g, price=gamePricePS4, platform="PS4")
                                g_p.save()
                            else:
                                g_p = Game_Platform(game=g, price=0.0, platform="PS4")
                                g_p.save()
                                print("    PS4: Status code not 200")
                        
                # If platform is Xbox One
                elif platformInfo["id"] == 1:
                    hasXboxOne = True
            
            # Set Xbox One platform price
            if hasXboxOne:
                if hasPS4:
                    print("    Xbox One price: " + str(gamePricePS4))
                    g_p = Game_Platform(game=g, price=gamePricePS4, platform="Xbox One")
                    g_p.save()
                elif hasSteam:
                    print("    Xbox One price: " + str(gamePriceSteam))
                    g_p = Game_Platform(game=g, price=gamePriceSteam, platform="Xbox One")
                    g_p.save()
                else:
                    print("    Xbox One price: 0.0")
                    g_p = Game_Platform(game=g, price=0.0, platform="Xbox One")
                    g_p.save()
            for genre in game["genres"]:
                # print("    Genre: " + genre["name"])
                gen = Game_Genre(game=g, genre_name=genre["name"])
                gen.save()

    return Response("Parse complete")

@api_view(['GET'])
def getGameList(request):
    cursor = connection.cursor()
    cursor.execute("SELECT id, name FROM game")
    rows = cursor.fetchall()
    retList = []
    for row in rows:
        retList.append(row)
    return Response(retList)

@api_view(['POST'])
def putExperience(request):
    data = json.loads(request.body)
    name = data['Name']
    age = data['Age']
    experienceList = data['ExperienceList']
    print(data)
    newUser = User(name=name, age=age)
    newUser.save()

    userId = newUser.pk

    for exp in experienceList:
        gameId = exp['currGameId']
        gameRating = exp['currRating']
        cursor = connection.cursor()
        rawSql = "INSERT INTO experience(user_id, game_id, rating) VALUES(%s, %s, %s)" % (userId, gameId, gameRating)
        cursor.execute(rawSql)
    return Response("Put Experience Complete")

@api_view(['POST'])
def userRecommendations(request):
    data = json.loads(request.body)
    userId = data['UserId']

    cursor = connection.cursor()
    cursor.execute("SELECT game_id, rating FROM experience WHERE user_id = %s", [userId])

    gameIds = []
    ratings = []

    for row in cursor:
        gameIds.append(row[0]) 
        ratings.append(row[1])

    recommendedGames = engine.getRecommendations(gameIds, ratings)
    return Response(recommendedGames)

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

@api_view(['POST'])
def experienceInsert(request):
    data = json.loads(request.body)
    myUserId = data['UserId']
    myGameID = data['GameId']
    myRatings = data['Ratings']
    cursor = connection.cursor()
    cursor.execute("INSERT INTO experience(user_id, game_id, rating) VALUES(%s, %s, %s)", [myUserId, myGameID, myRatings])
    return Response("EXPERIENCE INSERT")

@api_view(['POST'])
def experienceDelete(request):
    data = json.loads(request.body)
    myUserId = data['UserId']
    myGameID = data['GameId']
    myRatings = data['Ratings']
    cursor = connection.cursor()
    cursor.execute("Delete from experience where user_id = %s AND game_id = %s", [myUserId, myGameID])
    return Response("EXPERIENCE DELETE")

@api_view(['POST'])
def experienceUpdate(request):
    data = json.loads(request.body)
    myUserId = data['UserId']
    myGameID = data['GameId']
    myRatings = data['Ratings']
    cursor = connection.cursor()
    cursor.execute("Update experience SET rating = %s WHERE user_id = %s AND game_id = %s", [myRatings, myUserId, myGameID])
    return Response("EXPERIENCE Update")
    
@api_view(['POST'])
def experienceQuery(request):
    data = json.loads(request.body)
    myUserId = data['UserId']
    myGameID = data['GameId']
    cursor = connection.cursor()
    cursor.execute("Select rating FROM experience where user_id = %s AND game_id = %s", [myUserId, myGameID])
    row = cursor.fetchone()
    return Response(row)
