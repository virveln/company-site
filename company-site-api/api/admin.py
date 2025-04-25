from nested_admin import NestedModelAdmin, NestedTabularInline
from django.contrib import admin
from django.utils.html import format_html
from django.urls import path
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Apartment, ApartmentImage, Information, FaultReport, FaultReportImage
from django.contrib.auth.models import Group

admin.site.unregister(Group)

admin.site.site_header = "Bostadsportalen adminpanel"
admin.site.site_title = "Min admin"
admin.site.index_title = "Välkommen till adminpanelen"


class ApartmentImageInline(NestedTabularInline):
    class Media:
        js = ('api/js/image_modal.js', 'api/js/image_delete.js',)
        css = {
            'all': ('api/css/custom.css',)
        }

    model = ApartmentImage
    extra = 0
    fields = ('image_preview', 'image', 'is_thumbnail',)
    readonly_fields = ('image_preview', )

    def image_preview(self, obj):
        if obj.image:
            return format_html("""
                        <img src="{}" width="auto" height="100" style="object-fit:contain; cursor:pointer;" onclick="openImageModal('{}')" />
                    """, obj.image.url, obj.image.url)
        #return "Ingen bild"
        return format_html('<div data-image-preview>Ingen bild</div>')
    image_preview.short_description = "Förhandsvisning"


@admin.register(Apartment)
class ApartmentAdmin(NestedModelAdmin):
    class Media:
        js = ('api/js/unsaved_changes_warning.js',)
        css = {
            'all': ('api/css/custom.css',)
        }

    fieldsets = (
        ('Fakta', {
            'fields': ('is_available', 'title', 'address', 'city', 'area', 'rent', 'rooms', 'square_meter', 'floor_level' ),
        }),
        ('Tillträde - Välj ett datum eller texten "Enligt överenskommelse"', {
            'fields': (('access_date', 'access_note'),),
        }),
        ('Ingår', {
            'fields': ('has_parking', 'has_balcony', 'pet_friendly','included', ),
        }),
        ('Beskrivningar', {
            'fields': ('general_info', 'environment', 'description'),
        }),
    )

    list_display = ('id', 'title', 'city', 'rent', 'rooms', 'square_meter', 'display_access', 'is_available')
    list_filter = ('is_available', 'city', 'rent', 'rooms', 'square_meter', 'access_date', 'access_note')
    search_fields = ('id', 'title', 'address', 'city', 'rent', 'rooms', 'square_meter', 'access_date', 'access_note')
    inlines = [ApartmentImageInline]  # Allows adding images in Apartment admin

    def display_access(self, obj):
        if obj.access_note:
            return obj.get_access_note_display()
        elif obj.access_date:
            return obj.access_date.strftime('%Y-%m-%d')
        return "-"

    display_access.short_description = "Tillträde"

    def get_inline_instances(self, request, obj=None):
        """Dynamically update the inline title based on the FaultReport title."""
        inline_instances = super().get_inline_instances(request, obj)
        if obj:
            for inline in inline_instances:
                if isinstance(inline, ApartmentImageInline):
                    inline.verbose_name_plural = f"Bilder för lägenhet - '{obj.title}'"
        return inline_instances

    def get_urls(self):
        urls = super().get_urls()
        custom_urls = [
            path('delete-image/<int:pk>/', self.admin_site.admin_view(self.delete_image), name='delete_apartment_image'),
        ]
        return custom_urls + urls

    def delete_image(self, request, pk):
        image = get_object_or_404(ApartmentImage, pk=pk)
        image.delete()
        return JsonResponse({'success': True})


@admin.register(Information)
class InformationAdmin(admin.ModelAdmin):
    class Media:
        js = ('api/js/image_preview.js', 'api/js/unsaved_changes_warning.js', 'api/js/image_delete.js',)
        css = {
            'all': ('api/css/custom.css',)
        }

    def image_preview(self, obj):
        if obj.image:
            return format_html('<img src="{}" data-image-preview style="width: 100px; height: auto;" />', obj.image.url)
        #return "Ingen bild"
        return format_html('<div data-image-preview>Ingen bild</div>')
    image_preview.short_description = 'Förhandsvisning'

    list_display = ('title', 'image_preview', 'is_showing', 'created_at')
    readonly_fields = ['created_at']


class FaultReportImageInline(admin.TabularInline):  # Or use admin.StackedInline for a vertical layout
    class Media:
        js = ('api/js/image_modal.js',)

    model = FaultReportImage
    extra = 0
    can_delete = False
    max_num = 0
    fields = ('image_preview', 'image')
    readonly_fields = ('image_preview', 'image')

    def image_preview(self, obj):
        if obj.image:
            #return format_html('<img src="{}" data-image-preview style="width: 100px; height: auto;" />', obj.image.url)
            return format_html("""
                                   <img src="{}" width="auto" height="100" style="object-fit:contain; cursor:pointer;" onclick="openImageModal('{}')" />
                               """, obj.image.url, obj.image.url)
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
