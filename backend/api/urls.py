from django.urls import path
from . import views

urlpatterns = [
	path('', views.apiOverview, name="api-overview"),
	path('game-populate/', views.gamePopulate, name="game-populate"),
	path('get-gamelist/', views.getGameList, name="get-gamelist"),
	path('put-experience/', views.putExperience, name="put-experience"),
    path('user-recommendations/', views.userRecommendations, name="user-recommendations"),
	path('user-insert/', views.userInsert, name="user-insert"),
	path('user-delete/', views.userDelete, name="user-delete"),
	path('user-update/', views.userUpdate, name="user-update"),
	path('user-query/', views.userQuery, name="user-query"),
	path('game-insert/', views.gameInsert, name="game-insert"),
	path('game-update/', views.gameUpdate, name="game-update"),
	path('game-query/', views.gameQuery, name="game-query"),
	path('experience-insert/', views.experienceInsert, name="experience-insert"),
	path('experience-delete/', views.experienceDelete, name="experience-delete"),
	path('experience-update/', views.experienceUpdate, name="experience-update"),
	path('experience-query/', views.experienceQuery, name="experience-query"),
	# TODO: api address for other operations
]
