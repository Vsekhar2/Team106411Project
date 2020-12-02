import mysql.connector
import numpy as np
import numpy.linalg as la

class Engine:
    """Recommendation engine class for games using k-nearest neighbors algorithm

    Attributes:
        k: The k to use in k-nearest neighbors
        gamesList: List of games in the game table stored as a 3-tuple (id, developer, name).
        uniqueGenresList: List of all unique game genres.
        uniqueDevelopersList: List of all unique game developers.
    """ 

    def __init__(self, k):
        self.k = k

        connectDatabase()
        self.gamesList = getGamesList()
        self.uniqueGenresList = getUniqueGenresList()
        self.uniqueDevelopersList = getUniqueDevelopersList()

    def getGenreBinaryVector(self, gameId):
        """Computes the genre binary vector of game with gameId."""
        
        cursor = db.cursor()
        cursor.execute("""SELECT genre_name FROM game_genre 
                          JOIN game ON game_genre.game_id = game.id
                          WHERE game.id = %s""" % (gameId))

        gameGenres = []

        for row in cursor:
            gameGenres.append(row[0])

        cursor.close()
        
        return binary(gameGenres, self.uniqueGenresList)

    def getDeveloperBinaryVector(self, gameId):
        """Computes the developer binary vector of game with gameId."""

        cursor = db.cursor()
        cursor.execute("""SELECT developer FROM game
                          WHERE game.id = %s""" % (gameId))

        gameDeveloper = cursor.fetchone()[0]

        cursor.close()

        return binary(gameDeveloper, self.uniqueDevelopersList)

    def kNearestNeighbors(self, userGameIds, userGameGenresVector, userGameDevelopersVector):
        """Computes the k most similar games to game with gameId using the k-nearest neighbors algorithm."""

        distances = []

        for idx, game in enumerate(self.gamesList):
            if int(game[0]) in userGameIds:
                # Skip game if user has played it before.
                continue

            gameGenreVector = self.getGenreBinaryVector(game[0])
            gameDeveloperVector = self.getDeveloperBinaryVector(game[0])

            genreDistance = cosineDistance(userGameGenresVector, gameGenreVector)
            developerDistance = cosineDistance(userGameDevelopersVector, gameDeveloperVector)

            dist = genreDistance + developerDistance # Compute weighted distance.

            distances.append((dist, game[3], game[2])) # Insert tuple of distance calculation, steamId, and game name.

        distances.sort(key=lambda tup: tup[0]) # Sort array based on distance.
        recommendedIds = [(x[1], x[2]) for x in distances] # Extract only the steamId and game name.

        return recommendedIds[:self.k] # Return the k steamIds and game names with smallest distances.

    def getRecommendations(self, userGameIds, userRatings):
        """Gets the recommended games for a user.
            
            Args:
                userGameIds: List of gameIds from the experience table.
                userRatings: List of ratings for the gameIds from the experience table.
            Returns:
                The list of recommended games.
        """

        if not userGameIds:
            # Return no recommendations if list of userGameIds is empyty.
            return []

        # Sort userGameIds and userRatings based on userRatings in decreasing order.
        userGameIds, userRatings = (np.array(i) for i in zip(*sorted(zip(userGameIds, userRatings), reverse=True)))

        # Vector storing genres and developers information of user's high rated games.
        userGameGenresVector = np.zeros(len(self.uniqueGenresList))
        userGameDevelopersVector = np.zeros(len(self.uniqueDevelopersList))

        # Use the k highest rated games to compute user vectors for genre and developer.
        for i in range(min(self.k, len(userGameIds))):
            genreBinaryVector = self.getGenreBinaryVector(userGameIds[i])
            developerBinaryVector = self.getDeveloperBinaryVector(userGameIds[i])
            
            userGameGenresVector += 0.1 * userRatings[i] * genreBinaryVector # Compute weighted genres vector
            userGameDevelopersVector += 0.1 * userRatings[i] * developerBinaryVector # Compute weighted developers vector

        return self.kNearestNeighbors(userGameIds, userGameGenresVector, userGameDevelopersVector)
        

def connectDatabase():
    """Connects to the MySQL database."""

    global db

    db = mysql.connector.connect(
        host='localhost',
        database='gre',
        user='root',
        password=''
    )

def getGamesList():
    """Gets list of games from the game table."""

    cursor = db.cursor()
    cursor.execute("SELECT * FROM game")

    gamesList = []

    for row in cursor:
        gamesList.append(row)    

    cursor.close()

    return np.array(gamesList)

def getUniqueGenresList():
    """Gets list of unique genres from the game_genre table."""

    cursor = db.cursor()
    cursor.execute("SELECT genre_name FROM game_genre")

    uniqueGenresList = []

    for row in cursor:
        if row[0] not in uniqueGenresList:
            uniqueGenresList.append(row[0])

    cursor.close()

    return np.array(uniqueGenresList)

def getUniqueDevelopersList():
    """Gets list of unique developers from the game table."""

    cursor = db.cursor()
    cursor.execute("SELECT developer FROM game")

    uniqueDevelopersList = []

    for row in cursor:
        if row[0] not in uniqueDevelopersList:
            uniqueDevelopersList.append(row[0])

    cursor.close()

    return np.array(uniqueDevelopersList)

def binary(gameAttributeList, uniqueAttributeList):
    """Computes the binary vector.

    Args:
        gameAttributeList: The list of features for an attribute
        uniqueAttributeList: The list of all possible featurs for an attribute
    Returns:
        A binary vector where 1 indicates the game has the feature and 0 indicates the game doesn't have the feature.
    """

    binaryList = np.zeros(len(uniqueAttributeList))

    for idx, val in enumerate(uniqueAttributeList):
        if val in gameAttributeList:
            binaryList[idx] = 1
        else:
            binaryList[idx] = 0

    return binaryList

def cosineDistance(u, v):
    """Computes the cosine Distance between two vectors u and v."""

    if (la.norm(u) * la.norm(v) == 0):
        # Prevent division by 0 and return maximum distance
        return 1

    return 1 - np.dot(u, v) / (la.norm(u) * la.norm(v))

def main():
    # Main method is for testing purposes only

    engine = Engine(5)
    print(engine.getRecommendations([487], [10])) # Try FIFA 20.
    print(engine.getRecommendations([487, 81], [10, 10])) # Try FIFA 20 and Call of Duty: WWII.
    print(engine.getRecommendations([487, 81], [5, 10])) # Try FIFA 20 and Call of Duty: WWII with low rating for FIFA 20.
    print(engine.getRecommendations([487, 81, 565], [10, 10, 10])) # Try FIFA 20, Call of Duty: WWII, and Need for Speed Heat.

if __name__ == "__main__":main()
