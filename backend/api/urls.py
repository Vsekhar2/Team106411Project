from django.urls import path
from . import views

urlpatterns = [
	path('', views.apiOverview, name="api-overview"),
	path('user-insert/', views.userInsert, name="user-insert"),
	# TODO: api address for other operations
	path('user-delete/', views.userDelete, name="user-delete"),
	path('user-update/', views.userUpdate, name="user-update"),
	path('user-query/', views.userQuery, name="user-query"),
	# TODO: api address for other operations

]
