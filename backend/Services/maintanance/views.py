
# # from django.shortcuts import render, redirect
# # from core.models import HostelRoom, InventoryForm, Student, Hostels
# # from django.db.models import Q

# # def room_inventory_list(request):
# #     hostel_filter = request.GET.get('hostel')
# #     student_filter = request.GET.get('student')

# #     rooms = HostelRoom.objects.select_related('hostel')
# #     if hostel_filter:
# #         rooms = rooms.filter(hostel__name=hostel_filter)

# #     # Corrected 'hostel_room' instead of 'room'
# #     inventory_qs = InventoryForm.objects.select_related('hostel_room', 'filled_by_student')
# #     if student_filter:
# #         inventory_qs = inventory_qs.filter(filled_by_student__enrollment_no=student_filter)

# #     # Map InventoryForms by hostel_room ID
# #     inventory_map = {inv.hostel_room_id: inv for inv in inventory_qs}

# #     # Combine rooms with their inventory forms
# #     room_list = []
# #     for room in rooms:
# #         inv = inventory_map.get(room.id)
# #         room_list.append({
# #             'room': room,
# #             'inventory': inv
# #         })

# #     context = {
# #         'room_list': room_list,
# #         'hostels': Hostels.objects.all(),
# #         'students': Student.objects.all(),
# #     }
# #     return render(request, 'maintainnence/room_inventory_list.html', context)



# from django.shortcuts import get_object_or_404
# from core.models import InventoryForm
# from django.http import HttpResponse

# def edit_inventory_form(request, pk):
#     inventory = get_object_or_404(InventoryForm, pk=pk)
#     return HttpResponse(f"Editing Inventory Form for Room: {inventory.hostel_room}")


# from django.core.paginator import Paginator
# from django.shortcuts import render, redirect
# from core.models import HostelRoom, InventoryForm, Student, Hostels
# from django.db.models import Q

# def room_inventory_list(request):
#     hostel_filter = request.GET.get('hostel')
#     filled_filter = request.GET.get('filled')
#     allow_edit_filter = request.GET.get('allow_edit')
#     search_query = request.GET.get('search', '').strip()

#     rooms = HostelRoom.objects.select_related('hostel')
#     if hostel_filter:
#         rooms = rooms.filter(hostel__name=hostel_filter)

#     inventory_qs = InventoryForm.objects.select_related('hostel_room', 'filled_by_student')

#     # Apply filled status filter
#     if filled_filter == 'filled':
#         inventory_qs = inventory_qs.exclude(filled_by_student=None)
#     elif filled_filter == 'not_filled':
#         inventory_qs = inventory_qs.filter(filled_by_student=None)

#     # Apply allow_edit filter
#     if allow_edit_filter == 'true':
#         inventory_qs = inventory_qs.filter(allow_edit=True)
#     elif allow_edit_filter == 'false':
#         inventory_qs = inventory_qs.filter(allow_edit=False)

#     # Map inventory by room ID
#     inventory_map = {inv.hostel_room_id: inv for inv in inventory_qs}

#     # Combine room and inventory data
#     room_list = []
#     for room in rooms:
#         inv = inventory_map.get(room.id)
#         if search_query:
#             student_name = inv.filled_by_student.name if inv and inv.filled_by_student else ''
#             if (search_query.lower() not in str(room.room_number).lower()
#                 and search_query.lower() not in student_name.lower()):
#                 continue
#         room_list.append({'room': room, 'inventory': inv})

#     # Pagination
#     paginator = Paginator(room_list, 10)  # 10 per page
#     page_number = request.GET.get('page')
#     page_obj = paginator.get_page(page_number)

#     context = {
#         'page_obj': page_obj,
#         'hostels': Hostels.objects.all(),
#         'request': request,
#     }
#     return render(request, 'maintainnence/room_inventory_list.html', context)


# def save_allow_edit(request):
#     if request.method == 'POST':
#         for key, value in request.POST.items():
#             if key.startswith('allow_edit_'):
#                 inv_id = key.split('_')[2]
#                 try:
#                     inv = InventoryForm.objects.get(id=inv_id)
#                     inv.allow_edit = value == 'on'
#                     inv.save()
#                 except InventoryForm.DoesNotExist:
#                     pass
#     return redirect('room_inventory_list')





from django.shortcuts import render, redirect
from core.models import InventoryForm, Hostels, HostelRoom
from django.core.paginator import Paginator
from django.db.models import Q

def inventory_list_view(request):
    # Search and filters
    search_query = request.GET.get('search', '')
    hostel_filter = request.GET.get('hostel', '')
    form_status = request.GET.get('form_status', 'all')

    inventory_forms = InventoryForm.objects.select_related('hostel_room__hostel')

    if search_query:
        inventory_forms = inventory_forms.filter(hostel_room__room_number__icontains=search_query)

    if hostel_filter:
        inventory_forms = inventory_forms.filter(hostel_room__hostel__id=hostel_filter)

    if form_status == 'filled':
        inventory_forms = inventory_forms.exclude(filled_by_student__isnull=True)
    elif form_status == 'unfilled':
        inventory_forms = inventory_forms.filter(filled_by_student__isnull=True)

    # Pagination
    paginator = Paginator(inventory_forms.order_by('hostel_room__hostel__name', 'hostel_room__room_number'), 10)
    page_number = request.GET.get('page')
    page_obj = paginator.get_page(page_number)

    hostels = Hostels.objects.all()

    context = {
        'inventory_forms': page_obj,
        'hostels': hostels,
        'search_query': search_query,
        'selected_hostel': hostel_filter,
        'form_status': form_status,
        'page_obj': page_obj,
    }
    return render(request, 'maintainence/inventory_list.html', context)


# def save_allow_edit(request):
#     if request.method == 'POST':
#         for key, value in request.POST.items():
#             if key.startswith('allow_edit_'):
#                 form_id = key.split('_')[2]
#                 allow_edit = value == 'on'
#                 InventoryForm.objects.filter(pk=form_id).update(allow_edit=allow_edit)
#         return redirect('inventory-list')

def save_allow_edit(request):
    if request.method == 'POST':
        form_ids = InventoryForm.objects.values_list('id', flat=True)
        for form_id in form_ids:
            checkbox_name = f'allow_edit_{form_id}'
            allow_edit = checkbox_name in request.POST  # True if checked, False if not
            InventoryForm.objects.filter(pk=form_id).update(allow_edit=allow_edit)
        return redirect('maintenance:inventory-list')


from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import render, redirect, get_object_or_404
from core.models import InventoryForm

@csrf_exempt
def inventory_edit_view(request, pk):
    form = get_object_or_404(InventoryForm.objects.select_related('hostel_room__hostel', 'filled_by_student'), pk=pk)

    # Dynamically find all inventory field bases from *_s fields
    inventory_fields = sorted(set(
        field.name[:-2] for field in InventoryForm._meta.fields if field.name.endswith('_s')
    ))

    inventory_items = []
    for field in inventory_fields:
        s_value = getattr(form, f'{field}_s', None)
        c_value = getattr(form, f'{field}_c', None)
        inventory_items.append({
            'label': field.replace('_', ' ').capitalize(),
            's_value': s_value,
            'c_value': c_value,
            'c_name': f'{field}_c',
        })

    if request.method == 'POST':
        for field in inventory_fields:
            posted_value = request.POST.get(f'{field}_c')
            if posted_value == 'True':
                setattr(form, f'{field}_c', True)
            elif posted_value == 'False':
                setattr(form, f'{field}_c', False)
        form.save()
        return redirect('maintenance:inventory-list')

    return render(request, 'maintainence/inventory_edit.html', {
        'form': form,
        'inventory_items': inventory_items
    })



# from django.views.decorators.csrf import csrf_exempt

# @csrf_exempt
# def inventory_edit_view(request, pk):
#     form = InventoryForm.objects.select_related('hostel_room__hostel', 'filled_by_student').get(pk=pk)

#     inventory_fields = [
#         'bed', 'chair', 'table', 'lamp', 'fan', 'mattress', 'pillow', 'blanket',
#         'curtains', 'wardrobe', 'mirror', 'bookshelf', 'drawer', 'dustbin', 'bulb', 'switch', 'socket'
#     ]

#     inventory_items = []
#     for field in inventory_fields:
#         s_value = getattr(form, f'{field}_s', None)
#         c_value = getattr(form, f'{field}_c', None)
#         inventory_items.append({
#             'label': field.replace('_', ' ').capitalize(),
#             's_value': s_value,
#             'c_value': c_value,
#             'c_name': f'{field}_c',
#         })

#     if request.method == 'POST':
#         for field in inventory_fields:
#             posted_value = request.POST.get(f'{field}_c')
#             if posted_value == 'True':
#                 setattr(form, f'{field}_c', True)
#             elif posted_value == 'False':
#                 setattr(form, f'{field}_c', False)
#         form.save()
#         return redirect('maintenance:inventory-list')

#     return render(request, 'maintainence/inventory_edit.html', {
        
#         'form': form,
#         'inventory_items': inventory_items
#     })





# -----------------------------------student inventory form-----------------------



from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden
from core.models import InventoryForm, Student
from django.contrib import messages

# @login_required
# def student_inventory_form_view(request):
#     try:
#         student = Student.objects.select_related('room').get(user=request.user)
#     except Student.DoesNotExist:
#         return HttpResponseForbidden("Only students can access this form.")

#     try:
#         inventory_form = InventoryForm.objects.get(hostel_room=student.room)
#     except InventoryForm.DoesNotExist:
#         return HttpResponseForbidden("No inventory form found for your assigned room.")

#     # Check allow_edit
#     if not inventory_form.allow_edit:
#         return render(request, 'maintainence/student_inventory_locked.html', {
            
#             'filled_by': inventory_form.filled_by_student
#         })

#     # Check if already submitted by this student or another
#     if inventory_form.filled_by_student and inventory_form.filled_by_student != request.user:
#         return render(request, 'maintainence/student_inventory_locked.html', {
#             'filled_by': inventory_form.filled_by_student
#         })

#     if request.method == 'POST':
#         bool_fields = [field.name for field in InventoryForm._meta.fields if field.name.endswith('_c')]
#         for field in bool_fields:
#             value = request.POST.get(field)
#             setattr(inventory_form, field, value == 'good')
#         inventory_form.filled_by_student = request.user
#         inventory_form.save()
#         messages.success(request, "Inventory form submitted successfully.")
#         return redirect('student-inventory-form')

#     context = {
#         'form': inventory_form,
#     }
#     return render(request, 'maintainence/student_inventory_form.html', context)






# @login_required
# def student_inventory_form_view(request):
#     try:
#         student = Student.objects.select_related('room').get(user=request.user)
#     except Student.DoesNotExist:
#         return HttpResponseForbidden("Only students can access this form.")

#     try:
#         inventory_form = InventoryForm.objects.get(hostel_room=student.room)
#     except InventoryForm.DoesNotExist:
#         return HttpResponseForbidden("No inventory form found for your assigned room.")

#     if not inventory_form.allow_edit:
#         return render(request, 'maintainence/student_inventory_locked.html', {
#             'filled_by': inventory_form.filled_by_student
#         })

#     if inventory_form.filled_by_student and inventory_form.filled_by_student != request.user:
#         return render(request, 'maintainence/student_inventory_locked.html', {
#             'filled_by': inventory_form.filled_by_student
#         })

#     # Prepare data manually
#     condition_fields = []
#     for field in InventoryForm._meta.fields:
#         if field.name.endswith('_s'):
#             base = field.name[:-2]
#             source_value = getattr(inventory_form, field.name)
#             current_field = f"{base}_c"
#             current_value = getattr(inventory_form, current_field)
#             condition_fields.append({
#                 'label': base.replace('_', ' ').capitalize(),
#                 'source_value': 'Good' if source_value else 'Bad',
#                 'current_name': current_field,
#                 'current_value': current_value
#             })
            
    

#     if request.method == 'POST':
#         for field in condition_fields:
#             value = request.POST.get(field['current_name'])
#             setattr(inventory_form, field['current_name'], value == 'good')
#         # inventory_form.filled_by_student = request.user
#         inventory_form.filled_by_student = student

#         inventory_form.save()
#         messages.success(request, "Inventory form submitted successfully.")
#         return redirect('maintenance:student-inventory-form')

#     return render(request, 'maintainence/student_inventory_form.html', {
#         'form': inventory_form,
#         'condition_fields': condition_fields,
#     })



# from django.contrib.auth.decorators import login_required
# from django.shortcuts import render, redirect
# from django.contrib import messages
# from django.http import HttpResponseForbidden
# from core.models import Student, InventoryForm

# @login_required
# def student_inventory_form_view(request):
#     try:
#         student = Student.objects.select_related('room').get(user=request.user)
#     except Student.DoesNotExist:
#         return HttpResponseForbidden("Only students can access this form.")

#     try:
#         inventory_form = InventoryForm.objects.get(hostel_room=student.room)
#     except InventoryForm.DoesNotExist:
#         return HttpResponseForbidden("No inventory form found for your assigned room.")

#     # 🚫 If allow_edit is False, lock the form
#     if not inventory_form.allow_edit:
#         return render(request, 'maintainence/student_inventory_locked.html', {
#             'filled_by': inventory_form.filled_by_student
#         })

#     # ✅ Prepare table fields
#     condition_fields = []
#     for field in InventoryForm._meta.fields:
#         if field.name.endswith('_s'):
#             base = field.name[:-2]
#             source_value = getattr(inventory_form, field.name)
#             current_field = f"{base}_c"
#             current_value = getattr(inventory_form, current_field)
#             condition_fields.append({
#                 'label': base.replace('_', ' ').capitalize(),
#                 'source_value': 'Good' if source_value else 'Bad',
#                 'current_name': current_field,
#                 'current_value': current_value
#             })

#     if request.method == 'POST':
#         for field in condition_fields:
#             value = request.POST.get(field['current_name'])
#             setattr(inventory_form, field['current_name'], value == 'good')

#         inventory_form.filled_by_student = student
#         inventory_form.allow_edit = False  # 🔒 Lock form after submission
#         inventory_form.save()

#         messages.success(request, "Inventory form submitted successfully.")
#         return redirect('maintenance:student-inventory-form')

#     return render(request, 'maintainence/student_inventory_form.html', {
#         'form': inventory_form,
#         'condition_fields': condition_fields,
#     })



from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect
from django.contrib import messages
from django.http import HttpResponseForbidden
from core.models import Student, InventoryForm

@login_required
def student_inventory_form_view(request):
    try:
        student = Student.objects.select_related('room').get(user=request.user)
    except Student.DoesNotExist:
        return HttpResponseForbidden("Only students can access this form.")

    try:
        inventory_form = InventoryForm.objects.get(hostel_room=student.room)
    except InventoryForm.DoesNotExist:
        return HttpResponseForbidden("No inventory form found for your assigned room.")

    if not inventory_form.allow_edit:
        return render(request, 'maintainence/student_inventory_locked.html', {
            'filled_by': inventory_form.filled_by_student,
            'active_page': 'Inventory Form',
        })


    # Only include _s fields for student input
    condition_fields = []
    for field in InventoryForm._meta.fields:
        if field.name.endswith('_s'):
            label = field.name[:-2].replace('_', ' ').capitalize()
            current_value = getattr(inventory_form, field.name)
            condition_fields.append({
                'label': label,
                'name': field.name,
                'value': current_value
            })

    if request.method == 'POST':
        for field in condition_fields:
            value = request.POST.get(field['name'])
            setattr(inventory_form, field['name'], value == 'good')

        inventory_form.filled_by_student = student
        inventory_form.allow_edit = False
        inventory_form.save()

        messages.success(request, "Inventory form submitted successfully.")
        return redirect('maintenance:student-inventory-form')

    return render(request, 'maintainence/student_inventory_form.html', {
    'form': inventory_form,
    'condition_fields': condition_fields,
    'active_page': 'Inventory Form',
    })




from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.decorators import login_required
from core.models import Student
from .forms import ComplaintForm
from core.models import Complaint

@login_required
def complaint_view(request):
    try:
        student = Student.objects.get(user=request.user)
    except Student.DoesNotExist:
        return redirect('accounts:login')  # or show a forbidden page

    if request.method == 'POST':
        form = ComplaintForm(request.POST)
        if form.is_valid():
            complaint = form.save(commit=False)
            complaint.student = student
            complaint.save()
            return redirect('maintenance:complaint')
    else:
        form = ComplaintForm()

    unresolved_complaints = Complaint.objects.filter(student=student, resolved=False)

    return render(request, 'maintainence/student_complaint.html', {
        'form': form,
        'unresolved_complaints': unresolved_complaints,
        'active_page': 'Complaint',
    })




# _____________________________________coplaint view_____________
# views.py in maintenance app
from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from core.models import Student, HostelRoom
from core.models import Complaint
from django.core.exceptions import PermissionDenied


@login_required
def active_complaints_view(request):
    # Uncomment this if caretaker role enforcement is needed
    # if not hasattr(request.user, 'caretaker'):
    #     raise PermissionDenied("Only caretakers can access this page.")

    unresolved_complaints = Complaint.objects.filter(resolved=False).select_related('student__room__hostel')

    complaint_data = []
    for complaint in unresolved_complaints:
        student = complaint.student
        room = student.room  # Corrected field
        inventory_items = room.inventory_items.all() if hasattr(room, 'inventory_items') else []

        complaint_data.append({
            'student': student,
            'room': room,
            'complaint': complaint,
            'inventory_items': inventory_items,
        })

    return render(request, 'maintainence/active_complaints.html', {
        'complaint_data': complaint_data,
        'active_page': 'Active Complaints',
    })
    



from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from core.models import Complaint
from django.contrib import messages

@login_required
def active_complaints(request):
    complaints = Complaint.objects.filter(resolved=False).order_by('-created_at')
    return render(request, 'accounts/active_complaints.html', {
        'complaints': complaints,
        'active_page': 'Active Complaints',  # For sidebar highlighting
    })





# ------------------------------past complaints-----------------------------------

from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from core.models import Complaint

@login_required
def past_complaints_view(request):
    # Optionally restrict access to caretakers
    # if not hasattr(request.user, 'caretaker'):
    #     raise PermissionDenied("Only caretakers can access this page.")

    resolved_complaints = Complaint.objects.filter(resolved=True).select_related('student__room__hostel')

    complaint_data = []
    for complaint in resolved_complaints:
        student = complaint.student
        room = student.room
        inventory_items = room.inventory_items.all() if hasattr(room, 'inventory_items') else []

        complaint_data.append({
            'student': student,
            'room': room,
            'complaint': complaint,
            'inventory_items': inventory_items,
        })

    return render(request, 'maintainence/past_complaints.html', {
        'complaint_data': complaint_data,
        'active_page': 'Past Complaints',
    })


# -------------------------


from django.shortcuts import get_object_or_404
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from django.shortcuts import redirect
from core.models import Complaint  # Adjust if your model name is different

@login_required
def mark_complaint_solved(request, complaint_id):
    if request.method == 'POST':
        complaint = get_object_or_404(Complaint, id=complaint_id)
        complaint.resolved = True
        complaint.save()
        messages.success(request, "Complaint marked as solved.")
    return redirect('active-complaints')  # Use the correct name from your urls
