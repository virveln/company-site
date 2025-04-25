from django.db import models
from django.utils import timezone
from django.core.exceptions import ValidationError
import uuid


def generate_unique_apartment_id():
    return str(uuid.uuid4().int)[:8]


class Apartment(models.Model):
    id = models.CharField(
        primary_key=True,
        default=generate_unique_apartment_id,
        editable=False,
        max_length=8,
        unique=True,
    )

    is_available = models.BooleanField(default=True, verbose_name='Tillgänglig')
    title = models.CharField(max_length=255, verbose_name='Titel')
    address = models.CharField(max_length=255, verbose_name='Adress, ev lgh')
    area = models.CharField(max_length=255, verbose_name='Område')
    city = models.CharField(max_length=255, verbose_name='Stad')
    rent = models.IntegerField(verbose_name='Hyra')
    rooms = models.PositiveIntegerField(verbose_name='Rok')
    square_meter = models.PositiveIntegerField(verbose_name='Kvm')
    floor_level = models.PositiveIntegerField(verbose_name='Våning')
    #access = models.CharField(max_length=255, verbose_name='Tillträde')
    #access_date = models.DateField(blank=True, null=True, verbose_name='Tillträdesdatum')
    #access_note = models.CharField(max_length=255, blank=True, null=True, verbose_name='Tillträdesinformation')
    access_date = models.DateField(verbose_name='Tillträde (Datum)', null=True, blank=True)
    access_note = models.CharField(max_length=255, verbose_name='Tillträde (Text)', null=True, blank=True, choices=[('enligt_överenskommelse', 'Enligt överenskommelse')])

    #Amenities
    has_parking = models.BooleanField(default=False, verbose_name='Finns parkering')
    has_balcony = models.BooleanField(default=False, verbose_name='Finns balkong')
    pet_friendly = models.BooleanField(default=False, verbose_name='Djurvänlig')
    included = models.TextField(help_text="Ange objekt separerade med ny rad [ Enter ]", verbose_name='Ingår i hyran')
    general_info = models.TextField(verbose_name='Om hyresrätten')
    environment = models.TextField(verbose_name='Omgivning')
    description = models.TextField(verbose_name='Beskrivning')

    class Meta:
        verbose_name = 'Lägenhet'
        verbose_name_plural = 'Lägenheter'

    def __str__(self):
        return f"{self.id} - {self.title}"

    def get_included_list(self):
        return self.included.split("\n") if self.included else []

    def clean(self):
        # Custom validation to ensure either `access_date` or `access_string` is set, but not both.
        if self.access_date and self.access_note:
            raise ValidationError('Välj antingen datum eller texten "Enligt överenskommelse".')

        if not self.access_date and not self.access_note:
            raise ValidationError('Du måste välja antingen ett datum eller texten "Enligt överenskommelse".')


class ApartmentImage(models.Model):
    def get_upload_to(instance, filename):
        apartment_id = instance.apartment.id if instance.apartment_id else 'temp'
        return f'apartments/{apartment_id}/{filename}'

    apartment = models.ForeignKey(Apartment, blank=True, on_delete=models.CASCADE, related_name="images", verbose_name='Lägenhet bilder')
    image = models.ImageField(upload_to=get_upload_to, verbose_name='Bilder')
    #image = models.ImageField(upload_to="apartment_images/")
    #thumbnail = models.ImageField(default=False, upload_to=get_upload_to)
    is_thumbnail = models.BooleanField(default=False, verbose_name='Är miniatyrbild')

    class Meta:
        verbose_name = 'Lägenhet bild'
        verbose_name_plural = 'Lägenhet bilder'

    def __str__(self):
        return self.image.name if self.image else "Ingen bild"

    def clean(self):
        """Ensure each apartment has exactly one image marked as a thumbnail."""
        if not self.apartment_id:  # apartment is not saved yet
            return  # Skip validation until apartment exists in DB

        existing_thumbnails = ApartmentImage.objects.filter(
            apartment=self.apartment, is_thumbnail=True
        ).exclude(id=self.id)

        if self.is_thumbnail and existing_thumbnails.exists():
            raise ValidationError("Det kan bara finnas 1 miniatyrbild per lägenhet.")

        #if not self.is_thumbnail and not existing_thumbnails.exists():
            #raise ValidationError("Varje lägenhet måste ha exakt en 1 miniatyrbild.")

    def save(self, *args, **kwargs):
        self.clean()  # Run validation before saving
        super().save(*args, **kwargs)


class Information(models.Model):
    is_showing = models.BooleanField(default=True, verbose_name='Ska visas')
    title = models.CharField(max_length=255, verbose_name='Titel')
    description = models.TextField(verbose_name='Beskrivning')
    image = models.ImageField(upload_to="info_images/", blank=True, null=True, verbose_name='Valfri bild')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Skapad')

    class Meta:
        verbose_name = 'Informations uppdatering'
        verbose_name_plural = 'Informations uppdateringar'

    def __str__(self):
        return self.title


def generate_unique_fault_id():
    return str(uuid.uuid4().int)[:8]


class FaultReport(models.Model):
    id = models.CharField(
        primary_key=True,
        default=generate_unique_fault_id,
        editable=False,
        max_length=8,
        unique=True,
    )

    STATUS_CHOICES = [
        ('pending', 'Inkommande'),
        ('in_progress', 'Pågående'),
        ('resolved', 'Fixad'),
        ('closed', 'Avslutad'),
    ]

    address = models.CharField(max_length=255, verbose_name='Adress')
    category = models.CharField(max_length=100, verbose_name='Kategori')
    classification = models.CharField(max_length=100, verbose_name='Klassificering')
    name = models.CharField(max_length=255, verbose_name='Namn')
    email = models.EmailField()
    phone = models.CharField(max_length=20, verbose_name='Tel nr')
    title = models.CharField(max_length=255, verbose_name='Titel')
    description = models.TextField(verbose_name='Beskrivning')
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Skapad')

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    resolution_notes = models.TextField(blank=True, null=True, verbose_name='Anteckning')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Uppdaterad')
    resolved_at = models.DateTimeField(blank=True, null=True, verbose_name='Fixad')

    class Meta:
        verbose_name = 'Felanmälan'
        verbose_name_plural = 'Felanmälningar'

    def save(self, *args, **kwargs):
        # Automatically set resolved_at when status is set to "resolved"
        if self.status == 'resolved' and not self.resolved_at:
            self.resolved_at = timezone.now()
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.id} - {self.category} - {self.classification} - {self.address} - {self.title}"


class FaultReportImage(models.Model):
    fault_report = models.ForeignKey(FaultReport, on_delete=models.CASCADE, related_name="images", verbose_name='Felanmälan bilder')
    image = models.ImageField(upload_to="fault_report_images/", verbose_name='Bild')

    class Meta:
        verbose_name = 'Felanmälan bild'
        verbose_name_plural = 'Felanmälan bilder'

    def __str__(self):
        return self.image.name if self.image else "Ingen bild"
