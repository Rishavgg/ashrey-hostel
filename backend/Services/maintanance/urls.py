from django.urls import path
from .views import inventory_list_view, save_allow_edit, inventory_edit_view, student_inventory_form_view,complaint_view, active_complaints_view, past_complaints_view, mark_complaint_solved

app_name = 'maintenance'

urlpatterns = [
    path('caretaker_dashboard/inventory/', inventory_list_view, name='inventory-list'),
    path('caretaker_dashboard/inventory/save/', save_allow_edit, name='inventory-save'),
    # path('inventory/<int:pk>/edit/', inventory_edit_placeholder, name='inventory-edit'),
    path('caretaker_dashboard/inventory/<int:pk>/edit/', inventory_edit_view, name='inventory-edit'),
# Placeholderfrom .views import student_inventory_form_view
    path('caretaker_dashboard/active-complaints/', active_complaints_view, name='active_complaints'),
    path('complaints/<int:complaint_id>/solve/', mark_complaint_solved, name='mark-complaint-solved'),


    path('caretaker_dashboard/past_complaints/', past_complaints_view, name='past_complaints'),

    path('student_dashboard/inventory-form/', student_inventory_form_view, name='student-inventory-form'),

    path('student_dashboard/complaint/', complaint_view, name='complaint'),


]
