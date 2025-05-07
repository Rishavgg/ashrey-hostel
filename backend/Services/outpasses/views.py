from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from core.models import Outpass, Student
from .forms import OutpassForm
from django.core.exceptions import PermissionDenied


# -------------------------- create outpass--------------------

# @login_required
# def create_outpass(request):
#     try:
#         student = Student.objects.get(user=request.user)
#     except Student.DoesNotExist:
#         raise PermissionDenied("Only students can request an outpass.")

#     if request.method == 'POST':
#         form = OutpassForm(request.POST)
#         if form.is_valid():
#             outpass = form.save(commit=False)
#             outpass.student = student
#             outpass.save()
#             return redirect('outpass_success')  # Or any confirmation page
#     else:
#         form = OutpassForm()

#     return render(request, 'outpasses/outpass_form.html', {'form': form})



from django.contrib.auth.decorators import login_required
from django.core.exceptions import PermissionDenied
from django.shortcuts import render, redirect
from django.contrib import messages
from core.models import Student, Outpass
from .forms import OutpassForm

@login_required
def create_outpass(request):
    try:
        student = Student.objects.get(user=request.user)
    except Student.DoesNotExist:
        raise PermissionDenied("Only students can request an outpass.")

    # ❗ Check for active outpass
    has_active = Outpass.objects.filter(
        student=student,
        rejected=False,
        markin=False
    ).exists()

    if has_active:
        messages.error(request, "You already have an active outpass.")
        return redirect('outpass_already_exists')  # Or render a warning page

    if request.method == 'POST':
        form = OutpassForm(request.POST)
        if form.is_valid():
            outpass = form.save(commit=False)
            outpass.student = student
            outpass.save()
            return redirect('outpass_success')  # Confirmation page or home
    else:
        form = OutpassForm()

    return render(request, 'outpasses/outpass_form.html', {'form': form})



# -------------------------- create outpass--------------------



from django.http import HttpResponse

def outpass_success(request):
    return HttpResponse("Outpass request submitted successfully.")




# --------------------------warden approval of passes--------------------





from django.contrib.auth.decorators import login_required
from django.shortcuts import render, get_object_or_404, redirect
from django.core.exceptions import PermissionDenied
from core.models import Outpass, Hostel_Management, Student

# @login_required
# def warden_outpass_view(request):
#     try:
#         warden = Hostel_Management.objects.get(user=request.user, role='warden')
#     except Hostel_Management.DoesNotExist:
#         raise PermissionDenied("Only wardens can access this view.")

#     # Get all outpasses for students from this warden's hostel
#     outpasses = Outpass.objects.filter(
#         student__room__hostel=warden.hostel
#     ).select_related('student', 'student__room')

#     if request.method == 'POST':
#         action = request.POST.get('action')
#         outpass_id = request.POST.get('outpass_id')

#         outpass = get_object_or_404(Outpass, id=outpass_id)

#         if action == 'accept':
#             outpass.approvedcheck = True
#             outpass.rejected = False
#             outpass.approved_by = warden
#             outpass.save()
#         elif action == 'reject':
#             outpass.rejected = True
#             outpass.approvedcheck = False
#             outpass.approved_by = None
#             outpass.save()

#         return redirect('warden_outpass_view')  # Reload page to reflect changes

#     return render(request, 'outpasses/warden_outpass_list.html', {'outpasses': outpasses})


# ---------------------------------------show only passes who needs approval------------



# @login_required
# def warden_outpass_view(request):
#     try:
#         warden = Hostel_Management.objects.get(user=request.user, role='warden')
#     except Hostel_Management.DoesNotExist:
#         raise PermissionDenied("Only wardens can access this view.")

#     # Show only pending outpasses: not approved, not rejected
#     outpasses = Outpass.objects.filter(
#         student__room__hostel=warden.hostel,
#         approvedcheck=False,
#         rejected=False
#     ).select_related('student', 'student__room')

#     if request.method == 'POST':
#         action = request.POST.get('action')
#         outpass_id = request.POST.get('outpass_id')
#         outpass = get_object_or_404(Outpass, id=outpass_id)

#         if action == 'accept':
#             outpass.approvedcheck = True
#             outpass.rejected = False
#             outpass.approved_by = warden
#             outpass.save()
#         elif action == 'reject':
#             outpass.rejected = True
#             outpass.approvedcheck = False
#             outpass.approved_by = None
#             outpass.save()

#         return redirect('warden_outpass_view')

#     return render(request, 'outpasses/warden_outpass_list.html', {'outpasses': outpasses})



# ---------------------------------------fill in approved by as well------------



@login_required
def warden_outpass_view(request):
    try:
        warden = Hostel_Management.objects.get(user=request.user, role='warden')
    except Hostel_Management.DoesNotExist:
        raise PermissionDenied("Only wardens can access this view.")

    # Show only unhandled (pending) outpasses
    outpasses = Outpass.objects.filter(
        student__room__hostel=warden.hostel,
        approvedcheck=False,
        rejected=False
    ).select_related('student', 'student__room')

    if request.method == 'POST':
        action = request.POST.get('action')
        outpass_id = request.POST.get('outpass_id')
        outpass = get_object_or_404(Outpass, id=outpass_id)

        if action == 'accept':
            outpass.approvedcheck = True
            outpass.rejected = False
            outpass.approved_by = warden
        elif action == 'reject':
            outpass.rejected = True
            outpass.approvedcheck = False
            outpass.approved_by = warden  # still assign for record-keeping
        outpass.save()

        return redirect('warden_outpass_view')

    return render(request, 'outpasses/warden_outpass_list.html', {'outpasses': outpasses})





# ------------------------------outpass history page--------------------------

from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from core.models import Outpass
from django.db.models import Q  


@login_required
def history_outpass_view(request):
    outpasses = Outpass.objects.filter(
        models.Q(markin=True) | models.Q(rejected=True)
    ).select_related('student', 'student__room').order_by('-start_date')

    return render(request, 'outpasses/outpass_history.html', {'outpasses': outpasses})
