from rest_framework import serializers
from api.models import Apartment, ApartmentImage


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

