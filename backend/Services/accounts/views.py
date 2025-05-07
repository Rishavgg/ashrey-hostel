from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib import messages
from .forms import CustomUserForm
from core.models import Hostel_Management  # adjust to actual model name

def user_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user is not None:
                login(request, user)
                # Redirect to a dashboard based on role
                if user.role == 'student':
                    return redirect('student_dashboard')
                elif user.role == 'warden':
                    return redirect('warden_dashboard')
                elif user.role == 'chief_warden':
                    return redirect('chief_warden_dashboard')
                elif user.role == 'caretaker':
                    return redirect('caretaker_dashboard')
                elif user.role == 'guard':
                    return redirect('guard_dashboard')
            else:
                messages.error(request, 'Invalid credentials')
        else:
            messages.error(request, 'Invalid form submission')
    else:
        form = AuthenticationForm()
    return render(request, 'accounts/login.html', {'form': form})


from django.shortcuts import render
from django.contrib.auth.decorators import login_required

@login_required
def warden_dashboard(request):
    return render(request, 'accounts/warden_dashboard.html')

@login_required
def student_dashboard(request):
    return render(request, 'accounts/student_dashboard.html')

@login_required
def chief_warden_dashboard(request):
    return render(request, 'accounts/chief_warden_dashboard.html')

@login_required
def caretaker_dashboard(request):
    return render(request, 'accounts/caretaker_dashboard.html')

@login_required
def guard_dashboard(request):
    return render(request, 'accounts/guard_dashboard.html')


from django.contrib.auth import logout
from django.shortcuts import redirect

def user_logout(request):
    logout(request)
    return redirect('login')




# --------------------------user creation hostel HostelManagement---------------------------------


def register_user(request):
    if request.method == 'POST':
        form = CustomUserForm(request.POST)
        if form.is_valid():
            user = form.save()
            # Create related model data based on role
            role = user.role

            if role in ['warden', 'chief_warden', 'caretaker', 'guard']:
                Hostel_Management.objects.create(user=user)  # Add any other required fields

            return redirect('user_success')  # Or a dashboard or confirmation
    else:
        form = CustomUserForm()

    return render(request, 'accounts/register_user.html', {'form': form})


from django.http import HttpResponse

def user_success(request):
    return HttpResponse("User created successfully.")



# ___________________________________________________view for creating student__________________________

from django.shortcuts import render, redirect
from django.contrib import messages
from accounts.forms import StudentUserCreationForm

def register_student(request):
    if request.method == 'POST':
        form = StudentUserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, "Student account created successfully.")
            return redirect('student-register')  # Or another success page
        else:
            messages.error(request, "There was an error in the form. Please correct it.")
    else:
        form = StudentUserCreationForm()
    
    return render(request, 'accounts/registerstudent.html', {'form': form})



# ___________________________________________________view for creating hostel management__________________________



# from django.shortcuts import render, redirect
# from django.contrib import messages
# from accounts.forms import HostelManagerUserCreationForm

# def register_hostel_manager(request):
#     if request.method == 'POST':
#         form = HostelManagerUserCreationForm(request.POST)
#         if form.is_valid():
#             form.save()
#             messages.success(request, "Hostel manager account created successfully.")
#             return redirect('hostel-manager-register')  # or another page
#         else:
#             messages.error(request, "There was an error in the form. Please correct it.")
#     else:
#         form = HostelManagerUserCreationForm()

#     return render(request, 'accounts/register_hostel_manager.html', {'form': form})



from django.shortcuts import render, redirect
from django.contrib import messages
from accounts.forms import HostelManagerUserCreationForm

def register_hostel_manager(request):
    if request.method == 'POST':
        form = HostelManagerUserCreationForm(request.POST)
        if form.is_valid():
            # Save the form to create the CustomUser object
            user = form.save(commit=False)

            # Set the user as staff
            user.is_staff = True

            # Save the user object with staff status
            user.save()

            messages.success(request, "Hostel manager account created successfully.")
            return redirect('hostel-manager-register')  # or another page
        else:
            messages.error(request, "There was an error in the form. Please correct it.")
    else:
        form = HostelManagerUserCreationForm()

    return render(request, 'accounts/register_hostel_manager.html', {'form': form})




# from django.shortcuts import render, redirect
# from django.contrib import messages
# from accounts.forms import HostelManagerUserCreationForm
# from core.models import Hostel_Management  # adjust import to your actual app
# from django.db import transaction

# @transaction.atomic
# def register_hostel_manager(request):
#     if request.method == 'POST':
#         form = HostelManagerUserCreationForm(request.POST)
#         if form.is_valid():
#             user = form.save(commit=False)
#             user.role = 'warden'  # Or dynamically assign from form
#             user.is_staff = True
#             user.set_password(form.cleaned_data["password"])
#             user.save()

#             # Create linked Hostel_Management record
#             Hostel_Management.objects.create(
#                 user=user,
#                 name=form.cleaned_data.get('name'),
#                 email=form.cleaned_data.get('email'),
#                 ph_number=form.cleaned_data.get('ph_number'),
#                 role=user.role,
#                 hostel=form.cleaned_data.get('hostel')  # Ensure the form has this
#             )

#             messages.success(request, "Hostel manager registered successfully.")
#             return redirect('hostel-manager-register')
#         else:
#             messages.error(request, "Please correct the errors below.")
#     else:
#         form = HostelManagerUserCreationForm()

#     return render(request, 'accounts/register_hostel_manager.html', {'form': form})



# -----------bulk upload -----------------



import openpyxl
from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from django.contrib import messages
from django.http import HttpResponse
from accounts.models import CustomUser
from core.models import Student
from django.core.exceptions import ValidationError
from django.db import transaction, IntegrityError
import tempfile

def bulk_upload_students(request):
    if request.method == 'POST' and request.FILES.get('file'):
        file = request.FILES['file']
        wb = openpyxl.load_workbook(file)
        sheet = wb.active

        headers = [cell.value for cell in sheet[1]]
        failed_rows = []

        for row in sheet.iter_rows(min_row=2, values_only=True):
            data = dict(zip(headers, row))
            try:
                with transaction.atomic():
                    user = CustomUser.objects.create_user(
                        username=data['username'],
                        password=data['password'],
                        email=data['email'],
                        role='student',
                    )
                    Student.objects.create(
                        user=user,
                        name=data['name'],
                        enroll_number=int(data['enroll_number']),
                        email=data['email'],
                        student_contact=int(data['student_contact']),
                        parent_contact1=int(data['parent_contact1']),
                        parent_contact2=int(data['parent_contact2']),
                        cg=float(data['cg']),
                        admn_year=int(data['admn_year']),
                    )
            except Exception as e:
                # Delete user if already created
                if 'user' in locals() and user.pk:
                    user.delete()
                error_data = list(row) + [str(e)]
                failed_rows.append(error_data)

        if failed_rows:
            # Create a new workbook with error report
            output_wb = openpyxl.Workbook()
            output_ws = output_wb.active
            output_ws.append(headers + ['error'])

            for row in failed_rows:
                output_ws.append(row)

            with tempfile.NamedTemporaryFile(suffix='.xlsx', delete=False) as tmp:
                output_wb.save(tmp.name)
                tmp.seek(0)
                response = HttpResponse(tmp.read(), content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
                response['Content-Disposition'] = 'attachment; filename=failed_uploads.xlsx'
                return response

        messages.success(request, "Bulk student upload completed successfully.")
        return render(request, 'accounts/bulk_upload.html')

    return render(request, 'accounts/bulk_upload.html')





# -------------------------edit student----------------------------




from django.shortcuts import render, get_object_or_404, redirect
from django.contrib.auth.decorators import login_required
from django.contrib import messages
from core.models import Student
from accounts.forms import StudentEditForm  # You’ll need to create this form
from django.db.models import Q
from django.core.paginator import Paginator

@login_required
def edit_student(request, student_id):
    student = get_object_or_404(Student, id=student_id)

    if request.method == 'POST':
        form = StudentEditForm(request.POST, instance=student)
        if form.is_valid():
            form.save()
            messages.success(request, 'Student details updated successfully.')
            return redirect('search-students')
    else:
        form = StudentEditForm(instance=student)

    return render(request, 'accounts/edit_student.html', {'form': form, 'student': student})




# -------------------------search bar----------------------------



@login_required
def search_students(request):
    
    # if not request.user.is_staff:
    #     messages.error(request, "You do not have permission to access this page.")
    #     return redirect('login')
    
    if not request.user.is_staff:
        messages.error(request, f"Access denied for user '{request.user.username}'. Staff privileges are required.")
        return redirect('login')

    query = request.GET.get('q', '')
    student_list = Student.objects.all()

    if query:
        student_list = student_list.filter(
            Q(name__icontains=query) |
            Q(enroll_number__icontains=query) |
            Q(email__icontains=query)
        )

    paginator = Paginator(student_list.order_by('name'), 10)
    page_number = request.GET.get('page')
    students = paginator.get_page(page_number)

    return render(request, 'accounts/search_students.html', {
        'students': students,
        'query': query,
    })



# # @login_required
# def search_students(request):
#     # if not request.user.is_staff:
#     #     return redirect('login')  # or show an error page

#     query = request.GET.get('q', '')
#     student_list = Student.objects.none()

#     if query:
#         student_list = Student.objects.filter(
#             Q(name__icontains=query) |
#             Q(enroll_number__icontains=query) |
#             Q(email__icontains=query)
#         ).order_by('name')

#     # Pagination setup: 10 students per page
#     paginator = Paginator(student_list, 10)
#     page_number = request.GET.get('page')
#     students = paginator.get_page(page_number)

#     return render(request, 'accounts/search_students.html', {
#         'students': students,
#         'query': query,
#     })
