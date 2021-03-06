from rest_framework.decorators import api_view
from rest_framework.response import Response

from .utils import get_news_by_category
from .serializers import NewsSerializer


@api_view(['GET'])
def get_news(request, category):
    news = get_news_by_category(category, '1d')
    serializer = NewsSerializer(news, many=True)
    return Response(serializer.data)