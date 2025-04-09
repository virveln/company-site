from django.contrib import admin
from django.utils.html import format_html
from .models import Apartment, ApartmentImage, Information, FaultReport, FaultReportImage
from django.contrib.auth.models import Group

admin.site.unregister(Group)

admin.site.site_header = "Bostadsportalen adminpanel"
admin.site.site_title = "Min admin"
admin.site.index_title = "Välkommen till adminpanelen"


# Inline model for ApartmentImage
class ApartmentImageInline(admin.TabularInline):  # Or use admin.StackedInline for a vertical layout
    model = ApartmentImage
    extra = 1  # Allows adding multiple images
    fields = ('image_preview', 'image', 'is_thumbnail')
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="auto" height="70" style="border-radius:5px;" />', obj.image.url)
        return "Ingen bild"
    image_preview.short_description = "Förhandsvisning"


# Custom Admin for Apartment
@admin.register(Apartment)
class ApartmentAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'city', 'rent', 'rooms', 'square_meter', 'access', 'is_available')
    list_filter = ('is_available', 'city', 'rent', 'rooms', 'square_meter', 'access')
    search_fields = ('id', 'title', 'address', 'city', 'rent', 'rooms', 'square_meter')
    inlines = [ApartmentImageInline]  # Allows adding images in Apartment admin

    def get_inline_instances(self, request, obj=None):
        """Dynamically update the inline title based on the FaultReport title."""
        inline_instances = super().get_inline_instances(request, obj)
        if obj:
            for inline in inline_instances:
                if isinstance(inline, ApartmentImageInline):
                    inline.verbose_name_plural = f"Bilder för lägenhet - '{obj.title}'"
        return inline_instances

# Register ApartmentImage (optional, to manage images separately)
"""@admin.register(ApartmentImage)
class ApartmentImageAdmin(admin.ModelAdmin):
    list_display = ('apartment', 'image_preview', 'is_thumbnail')
    list_filter = ('apartment',)
    readonly_fields = ('image_preview',)

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="auto" height="70" style="border-radius:5px;" />', obj.image.url)
        return "Ingen bild"
    image_preview.short_description = "Förhandsvisning"
"""

@admin.register(Information)
class InformationAdmin(admin.ModelAdmin):
    list_display = ('title', 'created_at')
    search_fields = ('title',)
    #list_filter = ('created_at',)


#class FaultReportImageInline(admin.TabularInline):
 #   model = FaultReportImage
  #  extra = 1

class FaultReportImageInline(admin.TabularInline):  # Or use admin.StackedInline for a vertical layout
    model = FaultReportImage
    extra = 0
    can_delete = False
    max_num = 0
    fields = ('image_preview', 'image')
    readonly_fields = ('image_preview', 'image')

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" width="auto" height="70" style="border-radius:5px;" />', obj.image.url)
        return "Ingen bild"
    image_preview.short_description = "Förhandsvisning"


@admin.register(FaultReport)
class FaultReportAdmin(admin.ModelAdmin):
    readonly_fields = ("id", "address", "category", "classification", "name", "email", "phone",
                       "title", "description", "created_at", "updated_at", "resolved_at")

    fieldsets = (
        ('Status', {
            'fields': ('status', 'resolution_notes'),
        }),
        ('Tidsstämplar', {
            'fields': ('created_at', 'updated_at', 'resolved_at'),
        }),
        ('Felanmälan', {
            'fields': ('id', 'name', 'email', 'phone'),
        }),
        (None, {
            'fields': ('category', 'classification', 'address', 'title', 'description'),
        }),
    )

    list_display = ('id', 'status', 'category', 'classification', 'address', 'title', 'created_at')
    search_fields = ('id', 'title', 'name', 'email')
    list_filter = ('status', 'category', 'classification', 'address', 'created_at',)
    ordering = ("-created_at",)
    inlines = [FaultReportImageInline]

    def get_inline_instances(self, request, obj=None):
        """Dynamically update the inline title based on the FaultReport title."""
        inline_instances = super().get_inline_instances(request, obj)
        if obj:
            for inline in inline_instances:
                if isinstance(inline, FaultReportImageInline):
                    inline.verbose_name_plural = f"Bilder för felanmälan - '{obj.id}'"
        return inline_instances
