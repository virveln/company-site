from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .views import ApartmentViewSet, ApartmentImageViewSet

router = routers.DefaultRouter()
router.register(r'apartments', ApartmentViewSet)
router.register(r'apartment-images', ApartmentImageViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
