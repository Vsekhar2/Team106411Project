import mysql.connector
import numpy as np


def connectDatabase():
    db = mysql.connector.connect(
        host='localhost',
        database='gre',
        user='root',
        password=''
    )
    return db

def importGameData(db):
    cursor = db.cursor()
    cursor.execute("SELECT * FROM game")

    games = []

    for row in cursor:
        games.append(row)    

    cursor.close()

    return np.array(games)

def makeRecommendation(userGames):
    pass

def main():
    # Main method is for testing purposes only
    db = connectDatabase()
    games = importGameData(db)

if __name__ == "__main__":main()
