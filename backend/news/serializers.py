from rest_framework import serializers


class NewsSerializer(serializers.Serializer):
    title = serializers.CharField(max_length=500)
    desc = serializers.CharField(max_length=2000)
    date = serializers.CharField(max_length=50)
    datetime = serializers.CharField(max_length=50)
    link = serializers.CharField(max_length=500)
    img = serializers.CharField(max_length=500)
    img_path = serializers.CharField(max_length=500)
    media = serializers.CharField(max_length=500)
    site = serializers.CharField(max_length=500)