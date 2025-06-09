from rest_framework import serializers
from .models import Admin

class AdminIdSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admin
        fields = ['id']  # Only serialize the 'id'
