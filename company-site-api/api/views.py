from django.shortcuts import render
from rest_framework import viewsets, generics
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from .models import Apartment, ApartmentImage, Information, FaultReport, FaultReportImage
from companysite.serializers import ApartmentSerializer, ApartmentImageSerializer, InformationSerializer, FaultReportSerializer
from rest_framework.decorators import action
from rest_framework.parsers import MultiPartParser, FormParser


class ApartmentViewSet(viewsets.ModelViewSet):
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer
    permission_classes = [AllowAny]

    @action(detail=True, methods=['post'], parser_classes=[MultiPartParser, FormParser])
    def upload_images(self, request, pk=None):
        apartment = self.get_object()
        files = request.FILES.getlist('images')
        # Process the files
        for file in files:
            ApartmentImage.objects.create(apartment=apartment, image=file)
        return Response({"status": "images uploaded"})


class ApartmentImageViewSet(viewsets.ModelViewSet):
    queryset = ApartmentImage.objects.all()
    serializer_class = ApartmentImageSerializer


class InformationViewSet(viewsets.ModelViewSet):
    queryset = Information.objects.all().order_by("-created_at")
    serializer_class = InformationSerializer
    permission_classes = [AllowAny]


class FaultReportCreateView(viewsets.ModelViewSet):
    queryset = FaultReport.objects.all()
    serializer_class = FaultReportSerializer
    permission_classes = [AllowAny]
    http_method_names = ['post']

