from rest_framework import serializers
from .models import Video


class VideoSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    video_url = serializers.SerializerMethodField()
    preview_url = serializers.SerializerMethodField()

    class Meta:
        model = Video
        fields = (
            'id',
            'title',
            'description',
            'video_file',
            'video_url',
            'preview_image',
            'preview_url',
            'author',
            'created_at',
            'updated_at',
        )
        read_only_fields = ('author', 'created_at', 'updated_at')

    def get_video_url(self, obj):
        request = self.context.get('request')
        if obj.video_file and request:
            return request.build_absolute_uri(obj.video_file.url)
        return None

    def get_preview_url(self, obj):
        request = self.context.get('request')
        if obj.preview_image and request:
            return request.build_absolute_uri(obj.preview_image.url)
        return None