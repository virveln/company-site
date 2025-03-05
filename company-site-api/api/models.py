from django.db import models

class Apartment(models.Model):
    is_available = models.BooleanField(default=True, verbose_name='Tillgänglig')
    title = models.CharField(max_length=255, verbose_name='Titel')
    address = models.CharField(max_length=255, verbose_name='Adress, ev lgh')
    area = models.CharField(max_length=255, verbose_name='Område')
    city = models.CharField(max_length=255, verbose_name='Stad')
    rent = models.IntegerField(verbose_name='Hyra')
    rooms = models.PositiveIntegerField(verbose_name='Rok')
    square_meter = models.PositiveIntegerField(verbose_name='Kvm')
    floor_level = models.PositiveIntegerField(verbose_name='Våning')
    access = models.CharField(max_length=255, verbose_name='Datum för tillträde')

    #Amenities
    has_parking = models.BooleanField(default=False, verbose_name='Finns parkering')
    has_balcony = models.BooleanField(default=False, verbose_name='Finns balkong')
    pet_friendly = models.BooleanField(default=False, verbose_name='Djurvänlig')
    description = models.TextField(verbose_name='Beskrivning')
    general_info = models.TextField(verbose_name='Allmän info')
    included = models.TextField(verbose_name='Ingår i hyran')
    environment = models.TextField(verbose_name='Omgivning')

    def __str__(self):
        return self.title


class ApartmentImage(models.Model):
    def get_upload_to(instance, filename):
        return f'apartments/{instance.apartment.id}/{filename}'

    apartment = models.ForeignKey(Apartment, on_delete=models.CASCADE, related_name="images")
    image = models.ImageField(upload_to=get_upload_to)
    #image = models.ImageField(upload_to="apartment_images/")
    #thumbnail = models.ImageField(default=False, upload_to=get_upload_to)
    is_thumbnail = models.BooleanField(default=False)

    def __str__(self):
        return f"Image for {self.apartment.title}"
