from django.shortcuts import render, get_object_or_404, redirect
from django.contrib import messages
from django.contrib.auth.decorators import login_required
from core.models import HostelRoom, Student



# from django.shortcuts import render, get_object_or_404, redirect
# from django.contrib import messages
# from django.contrib.auth.decorators import login_required
# from core.models import HostelRoom, Student

# @login_required
# def assign_room_view(request, room_id):
#     room = get_object_or_404(HostelRoom, id=room_id)
#     assigned_students = Student.objects.filter(room=room)  # Assuming 'room' is the field in Student model
#     capacity = room.capacity

#     # Pre-fill the dropdowns with assigned students or empty values
#     dropdown_data = list(assigned_students) + [None] * (capacity - len(assigned_students))
#     all_students = Student.objects.all()

#     # Create a range list for the dropdowns
#     range_list = list(range(capacity))

#     if request.method == 'POST':
#         selected_ids = []
#         warning_students = []

#         for i in range(capacity):
#             student_id = request.POST.get(f'student_{i}')
#             if student_id:
#                 student = get_object_or_404(Student, id=student_id)
#                 if student.room and student.room != room:  # Check if student already has a room
#                     warning_students.append(student)
#                 selected_ids.append(student)

#         if warning_students and request.POST.get('confirm') != 'CONFIRM':
#             warning_names = ", ".join([s.name for s in warning_students])
#             messages.warning(request, f"Warning: {warning_names} already assigned to other rooms. Type 'CONFIRM' to proceed.")
#             return render(request, 'allocation/assign_room.html', {
#                 'room': room,
#                 'capacity': capacity,
#                 'dropdown_data': dropdown_data,
#                 'all_students': all_students,
#                 'confirm_required': True,
#                 'range_list': range_list,
#             })

#         # Clear previous room assignments
#         Student.objects.filter(room=room).update(room=None)

#         # Assign new students
#         for student in selected_ids:
#             student.room = room  # Assign the room to the student
#             student.save()

#         messages.success(request, "Room successfully assigned.")
#         return redirect('room_management')

#     return render(request, 'allocation/assign_room.html', {
#         'room': room,
#         'capacity': capacity,
#         'dropdown_data': dropdown_data,
#         'all_students': all_students,
#         'confirm_required': False,
#         'range_list': range_list,
#     })


@login_required
def assign_room_view(request, room_id):
    room = get_object_or_404(HostelRoom, id=room_id)
    assigned_students = list(Student.objects.filter(room=room))
    capacity = room.capacity
    all_students = Student.objects.all()

    # Prepare list of (index, student or None)
    dropdown_data = []
    for i in range(capacity):
        dropdown_data.append((i, assigned_students[i] if i < len(assigned_students) else None))

    if request.method == 'POST':
        selected_ids = []
        warning_students = []

        for i in range(capacity):
            student_id = request.POST.get(f'student_{i}')
            if student_id:
                student = get_object_or_404(Student, id=student_id)
                if student.room and student.room != room:
                    warning_students.append(student)
                selected_ids.append(student)

        if warning_students and request.POST.get('confirm') != 'CONFIRM':
            warning_names = ", ".join([s.name for s in warning_students])
            messages.warning(request, f"Warning: {warning_names} already assigned. Type 'CONFIRM' to proceed.")
            return render(request, 'allocation/assign_room.html', {
                'room': room,
                'dropdown_data': dropdown_data,
                'all_students': all_students,
                'confirm_required': True,
            })

        # Clear existing assignments
        Student.objects.filter(room=room).update(room=None)

        # Assign new students
        for student in selected_ids:
            student.room = room
            student.save()

        messages.success(request, "Room successfully assigned.")
        return redirect('room_management')

    return render(request, 'allocation/assign_room.html', {
        'room': room,
        'dropdown_data': dropdown_data,
        'all_students': all_students,
        'confirm_required': False,
    })




# ----------------------------------allocation by applying----------------------------------------

# from rest_framework import generics, permissions, status
# from rest_framework.views import APIView
# from rest_framework.response import Response
# from core.models import RoomChangeRequest, Student
# from core.serializers import RoomChangeRequestSerializer
# from django.shortcuts import get_object_or_404

# # 1. Student creates request
# class RoomChangeRequestCreateView(generics.CreateAPIView):
#     serializer_class = RoomChangeRequestSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def perform_create(self, serializer):
#         student = self.request.user.student  # Assuming user is linked to student
#         serializer.save(requested_by=student)

# # 2. Requested_with confirms or rejects
# class RoomChangeRequestRespondView(APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def patch(self, request, pk):
#         student = request.user.student
#         instance = get_object_or_404(RoomChangeRequest, pk=pk)

#         if instance.rejected or instance.approved:
#             return Response({'detail': 'Request is already resolved.'}, status=400)

#         if instance.requested_with != student:
#             return Response({'detail': 'You are not authorized to act on this request.'}, status=403)

#         action = request.data.get('action')
#         if action == 'accept':
#             instance.approved_for_apply = True
#             instance.save()
#             return Response({'detail': 'Request confirmed by student.'})
#         elif action == 'reject':
#             instance.rejected = True
#             instance.save()
#             return Response({'detail': 'Request rejected by student.'})
#         else:
#             return Response({'detail': 'Invalid action.'}, status=400)

# # 3. Warden views all pending requests
# class WardenRoomChangeRequestListView(generics.ListAPIView):
#     serializer_class = RoomChangeRequestSerializer
#     permission_classes = [permissions.IsAuthenticated]

#     def get_queryset(self):
#         user = self.request.user
#         if not hasattr(user, 'hostel_management'):
#             return RoomChangeRequest.objects.none()
#         return RoomChangeRequest.objects.filter(approved_for_apply=True, approved=False, rejected=False)

# # 4. Warden accepts or rejects
# class WardenApproveRoomChangeView(APIView):
#     permission_classes = [permissions.IsAuthenticated]

#     def patch(self, request, pk):
#         user = request.user
#         if not hasattr(user, 'hostel_management'):
#             return Response({'detail': 'You are not authorized.'}, status=403)

#         instance = get_object_or_404(RoomChangeRequest, pk=pk)
#         if instance.rejected or instance.approved or not instance.approved_for_apply:
#             return Response({'detail': 'Invalid state to approve/reject.'}, status=400)

#         action = request.data.get('action')
#         if action == 'approve':
#             # Swap rooms or assign new room
#             if instance.request_type == 'swap':
#                 temp_room = instance.requested_by.room
#                 instance.requested_by.room = instance.requested_with.room
#                 instance.requested_with.room = temp_room
#                 instance.requested_by.save()
#                 instance.requested_with.save()
#             elif instance.request_type == 'change':
#                 instance.requested_by.room = instance.room
#                 instance.requested_by.save()
#                 if instance.requested_with:
#                     instance.requested_with.room = instance.room
#                     instance.requested_with.save()

#             instance.approved = True
#             instance.approved_by = user.hostel_management
#             instance.save()
#             return Response({'detail': 'Request approved.'})

#         elif action == 'reject':
#             instance.rejected = True
#             instance.save()
#             return Response({'detail': 'Request rejected by warden.'})
#         else:
#             return Response({'detail': 'Invalid action.'}, status=400)









from django.shortcuts import render, redirect, get_object_or_404
from .forms import RoomChangeRequestForm
from core.models import RoomChangeRequest, Student, Hostel_Management
from django.contrib.auth.decorators import login_required

@login_required


def submit_request_view(request):
    student = get_object_or_404(Student, user=request.user)

    if request.method == 'POST':
        form = RoomChangeRequestForm(request.POST, student=student)
        if form.is_valid():
            obj = form.save(commit=False)
            obj.requested_by = student  # Assign before any use

            if obj.request_type == 'swap':
                if obj.requested_with and obj.requested_by == obj.requested_with:
                    form.add_error('requested_with', 'You cannot swap with yourself.')
                    return render(request, 'allocation/submit_request.html', {'form': form})

                obj.priority_total = obj.requested_by.priority_score + obj.requested_with.priority_score
                obj.save()
                return redirect('allocation:request_submitted')

            else:  # request_type == "change"
                if not obj.room:
                    form.add_error('room', 'Room is required for room change.')
                    return render(request, 'allocation/submit_request.html', {'form': form})

                if obj.room.capacity == 1:
                    obj.approved_for_apply = True
                    obj.priority_total = obj.requested_by.priority_score
                else:
                    if not obj.requested_with:
                        form.add_error('requested_with', 'Double room change needs another student.')
                        return render(request, 'allocation/submit_request.html', {'form': form})

                    obj.priority_total = obj.requested_by.priority_score + obj.requested_with.priority_score

                obj.save()
                return redirect('allocation:request_submitted')
    else:
        form = RoomChangeRequestForm(student=student)

    return render(request, 'allocation/submit_request.html', {'form': form})


from django.contrib.auth.decorators import login_required
from django.shortcuts import render, redirect, get_object_or_404
from core.models import RoomChangeRequest, Student

@login_required
def view_received_requests(request):
    student = get_object_or_404(Student, user=request.user)

    received_requests = RoomChangeRequest.objects.filter(
        requested_with=student,
        approved_for_apply=False,
        rejected=False
    )

    already_accepted = RoomChangeRequest.objects.filter(
        requested_with=student,
        approved_for_apply=True,
        rejected=False
    ).exists()

    if request.method == 'POST' and not already_accepted:
        req_id = request.POST.get('request_id')
        chosen_request = get_object_or_404(RoomChangeRequest, id=req_id, requested_with=student)
        chosen_request.approved_for_apply = True
        chosen_request.save()

        # Reject all other pending requests for this student
        RoomChangeRequest.objects.filter(
            requested_with=student,
            approved_for_apply=False,
            rejected=False
        ).exclude(id=chosen_request.id).update(rejected=True)

        return redirect('allocation:request_confirmed')

    return render(request, 'allocation/received_requests.html', {
        'received_requests': received_requests,
        'already_accepted': already_accepted,
    })




@login_required
def confirm_request_view(request, request_id):
    student = get_object_or_404(Student, user=request.user)
    req = get_object_or_404(RoomChangeRequest, id=request_id)

    if req.requested_with != student or req.approved_for_apply or req.rejected:
        return render(request, 'allocation/invalid.html')

    if request.method == 'POST':
        if 'accept' in request.POST:
            req.approved_for_apply = True
        else:
            req.rejected = True
        req.save()
        return redirect('allocation:request_confirmed')

    return render(request, 'allocation/confirm_request.html', {'request_obj': req})


@login_required
def warden_dashboard(request):
    staff = get_object_or_404(Hostel_Management, user=request.user)

    if staff.role not in ['warden', 'chief_warden']:
        return render(request, 'allocation/invalid.html')

    requests = RoomChangeRequest.objects.filter(approved_for_apply=True, approved=False, rejected=False)

    if request.method == 'POST':
        req_id = request.POST.get('request_id')
        action = request.POST.get('action')
        req = get_object_or_404(RoomChangeRequest, id=req_id)

        if action == 'approve':
            req.approved = True
            req.approved_by = staff

            # Swap logic
            if req.request_type == 'swap':
                s1_room = req.requested_by.room
                s2_room = req.requested_with.room
                req.requested_by.room = s2_room
                req.requested_with.room = s1_room
                req.requested_by.save()
                req.requested_with.save()
            else:
                if req.room.capacity == 1:
                    req.requested_by.room = req.room
                    req.requested_by.save()
                else:
                    req.requested_by.room = req.room
                    req.requested_with.room = req.room
                    req.requested_by.save()
                    req.requested_with.save()

            req.save()
        elif action == 'reject':
            req.rejected = True
            req.save()

        return redirect('allocation:warden_dashboard')

    return render(request, 'allocation/warden_dashboard.html', {'requests': requests})




























# # allocation/views.py

# from django.shortcuts import render, redirect, get_object_or_404
# from .forms import RoomChangeRequestForm
# from core.models import RoomChangeRequest, Student, Hostel_Management
# from django.contrib.auth.decorators import login_required

# @login_required
# def submit_request_view(request):
#     student = get_object_or_404(Student, user=request.user)

#     if request.method == 'POST':
#         form = RoomChangeRequestForm(request.POST, student=student)
#         if form.is_valid():
#             obj = form.save(commit=False)
#             obj.requested_by = student

#             # Logic based on request type
#             if obj.request_type == 'swap':
#                 if obj.requested_by == obj.requested_with:
#                     form.add_error('requested_with', 'You cannot swap with yourself.')
#                 else:
#                     obj.priority_total = obj.requested_by.priority_score + obj.requested_with.priority_score
#                     obj.save()
#                     return redirect('allocation:request_submitted')
#             else:  # change room
#                 if obj.room.capacity == 1:
#                     obj.approved_for_apply = True
#                     obj.priority_total = obj.requested_by.priority_score
#                 else:
#                     if not obj.requested_with:
#                         form.add_error('requested_with', 'Double room change needs another student.')
#                         return render(request, 'allocation/submit_request.html', {'form': form})
#                     obj.priority_total = obj.requested_by.priority_score + obj.requested_with.priority_score
#                 obj.save()
#                 return redirect('allocation:request_submitted')
#     else:
#         form = RoomChangeRequestForm(student=student)

#     return render(request, 'allocation/submit_request.html', {'form': form})





# @login_required
# def confirm_request_view(request, request_id):
#     student = get_object_or_404(Student, user=request.user)
#     req = get_object_or_404(RoomChangeRequest, id=request_id)

#     if req.requested_with != student or req.approved_for_apply or req.rejected:
#         return render(request, 'allocation/invalid.html')

#     if request.method == 'POST':
#         if 'accept' in request.POST:
#             req.approved_for_apply = True
#         else:
#             req.rejected = True
#         req.save()
#         return redirect('allocation:request_confirmed')

#     return render(request, 'allocation/confirm_request.html', {'request_obj': req})


# @login_required
# def warden_dashboard(request):
#     staff = get_object_or_404(Hostel_Management, user=request.user)

#     if staff.role not in ['warden', 'chief_warden']:
#         return render(request, 'allocation/invalid.html')

#     requests = RoomChangeRequest.objects.filter(approved_for_apply=True, approved=False, rejected=False)

#     if request.method == 'POST':
#         req_id = request.POST.get('request_id')
#         action = request.POST.get('action')
#         req = get_object_or_404(RoomChangeRequest, id=req_id)

#         if action == 'approve':
#             req.approved = True
#             req.approved_by = staff

#             # Swap logic
#             if req.request_type == 'swap':
#                 s1_room = req.requested_by.room
#                 s2_room = req.requested_with.room
#                 req.requested_by.room = s2_room
#                 req.requested_with.room = s1_room
#                 req.requested_by.save()
#                 req.requested_with.save()
#             else:
#                 if req.room.capacity == 1:
#                     req.requested_by.room = req.room
#                     req.requested_by.save()
#                 else:
#                     req.requested_by.room = req.room
#                     req.requested_with.room = req.room
#                     req.requested_by.save()
#                     req.requested_with.save()

#             req.save()
#         elif action == 'reject':
#             req.rejected = True
#             req.save()

#         return redirect('allocation:warden_dashboard')

#     return render(request, 'allocation/warden_dashboard.html', {'requests': requests})
