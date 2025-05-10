from django.urls import path
from .views import inventory_list_view, save_allow_edit, inventory_edit_view, student_inventory_form_view

app_name = 'maintenance'

urlpatterns = [
    path('inventory/', inventory_list_view, name='inventory-list'),
    path('inventory/save/', save_allow_edit, name='inventory-save'),
    # path('inventory/<int:pk>/edit/', inventory_edit_placeholder, name='inventory-edit'),
    path('inventory/<int:pk>/edit/', inventory_edit_view, name='inventory-edit'),
# Placeholderfrom .views import student_inventory_form_view

    path('student/inventory-form/', student_inventory_form_view, name='student-inventory-form'),

]
