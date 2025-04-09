from rest_framework import serializers
from api.models import Apartment, ApartmentImage, Information, FaultReport, FaultReportImage


class ApartmentImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ApartmentImage
        fields = ["id", "image", "is_thumbnail"]


class ApartmentSerializer(serializers.ModelSerializer):
    images = ApartmentImageSerializer(many=True, read_only=True)
    uploaded_images = serializers.ListField(
        child=serializers.ImageField(allow_empty_file=False, use_url=False),
        write_only=True
    )

    class Meta:
        model = Apartment
        fields = "__all__"

    def create(self, validated_data):
        uploaded_images = validated_data.pop("uploaded_images")
        product = Apartment.objects.create(**validated_data)

        for image in uploaded_images:
            ApartmentImage.objects.create(product=product, image=image)

        return product


class InformationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Information
        fields = "__all__"


class FaultReportImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FaultReportImage
        fields = ['image']


class FaultReportSerializer(serializers.ModelSerializer):
    images = FaultReportImageSerializer(many=True, required=False)

    class Meta:
        model = FaultReport
        fields = ['id', 'address', 'category', 'classification', 'name', 'email', 'phone', 'title', 'description', 'images']

    def create(self, validated_data):
        # Extract images separately
        images_data = self.context['request'].FILES.getlist('images')
        fault_report = FaultReport.objects.create(**validated_data)

        # Save images
        for image in images_data:
            FaultReportImage.objects.create(fault_report=fault_report, image=image)

        return fault_report
