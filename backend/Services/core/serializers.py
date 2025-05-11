from rest_framework import serializers
from core.models import RoomChangeRequest, Student, HostelRoom

class RoomChangeRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomChangeRequest
        fields = '__all__'
        read_only_fields = ['approved_for_apply', 'approved', 'rejected', 'priority_total', 'approved_by']

    def create(self, validated_data):
        requested_by = validated_data['requested_by']
        requested_with = validated_data.get('requested_with', None)

        # Calculate priority_total
        if requested_with:
            validated_data['priority_total'] = requested_by.priority_score + requested_with.priority_score
        else:
            validated_data['priority_total'] = requested_by.priority_score

        return super().create(validated_data)
