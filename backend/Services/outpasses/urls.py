from django.urls import path
from .views import create_outpass,outpass_success,warden_outpass_view, history_outpass_view, guard_outpass_view, mark_out_outpass, mark_in_outpass, guard_markin_view
from django.views.generic import TemplateView


urlpatterns = [
    path('outpass/history/', history_outpass_view, name='outpass_history'),
    path('request/', create_outpass, name='outpass_request'),
    path('already-exists/', TemplateView.as_view(template_name='outpasses/already_exists.html'), name='outpass_already_exists'),
    # path('request/', create_outpass, name='create_outpass'),
    path('success/', outpass_success, name='outpass_success'),
    path('warden/outpasses/', warden_outpass_view, name='warden_outpass_view'),
    path('guard/outpasses/', guard_outpass_view, name='guard_outpass_list'),
    path('guard/outpass/<int:outpass_id>/markout/', mark_out_outpass, name='mark_out_outpass'),
    path('guard/markin/', guard_markin_view, name='guard_markin_list'),
    path('guard/outpass/<int:outpass_id>/markin/', mark_in_outpass, name='mark_in_outpass'),
]
