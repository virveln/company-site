from django.urls import path
from rest_framework import routers
from django.conf.urls import include
from .views import ApartmentViewSet, ApartmentImageViewSet, InformationViewSet, FaultReportCreateView

router = routers.DefaultRouter()
router.register(r'apartments', ApartmentViewSet)
router.register(r'apartment-images', ApartmentImageViewSet)
router.register(r'information', InformationViewSet)
router.register(r'fault-reports', FaultReportCreateView, basename='faultreport')

urlpatterns = [
    path('', include(router.urls)),
]
