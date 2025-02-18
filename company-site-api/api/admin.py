from django.contrib import admin
from django.utils.html import format_html
from .models import Apartment, ApartmentImage

# Inline model for ApartmentImage
class ApartmentImageInline(admin.TabularInline):  # Or use admin.StackedInline for a vertical layout
    model = ApartmentImage
    extra = 1  # Allows adding multiple images
    fields = ('image_preview', 'image', 'is_thumbnail')
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="70" style="border-radius:5px;" />', obj.image.url)
        return "No Image"
    image_preview.short_description = "Preview"

# Custom Admin for Apartment
@admin.register(Apartment)
class ApartmentAdmin(admin.ModelAdmin):
    list_display = ('title', 'city', 'rent', 'rooms', 'square_meter', 'is_available')
    list_filter = ('city', 'is_available', 'has_parking', 'has_balcony', 'pet_friendly')
    search_fields = ('title', 'address', 'city', 'description')
    inlines = [ApartmentImageInline]  # Allows adding images in Apartment admin

# Register ApartmentImage (optional, to manage images separately)
@admin.register(ApartmentImage)
class ApartmentImageAdmin(admin.ModelAdmin):
    list_display = ('apartment', 'image_preview', 'is_thumbnail')
    list_filter = ('apartment',)
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="100" height="70" style="border-radius:5px;" />', obj.image.url)
        return "No Image"
    image_preview.short_description = "Preview"
