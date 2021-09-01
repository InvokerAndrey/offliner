from rest_framework.decorators import api_view
from rest_framework.response import Response

import os
import requests
import json


@api_view(['GET'])
def get_weather(request):

    latitude = request.query_params.get('latitude')
    longitude = request.query_params.get('longitude')

    # Ubuntu: nano .profiles
    API_KEY = os.environ.get('OFFLINER_WEATHER_API_KEY')
    if latitude and longitude:
        url = f'http://api.openweathermap.org/data/2.5/weather?lat={latitude}&lon={longitude}&appid={API_KEY}'
    else:
        url = f'http://api.openweathermap.org/data/2.5/weather?q=London&appid={API_KEY}'

    weather_data = json.loads(requests.get(url).text)

    response = {
        'city': weather_data['name'],
        'country': weather_data['sys']['country'],
        'temperature': round(weather_data['main']['temp'] - 273.15),    # from Kelvin to Celcius
        'description': weather_data['weather'][0]['description'],
    }
    return Response(response)