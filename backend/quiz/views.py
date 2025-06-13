import random
import requests
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

# Cache the full list on first import
API_URL = 'https://countriesnow.space/api/v0.1/countries/capital'
_raw = requests.get(API_URL, timeout=5).json().get('data', [])

# Build a lookup by country name
COUNTRY_MAP = {c['name']: c['capital'] for c in _raw}

@api_view(['GET'])
def get_country(request):
    """
    Returns a random country not in the `exclude` query param.
    exclude=France,Spain,India
    """
    exclude = request.query_params.get('exclude', '')
    excluded = set(name.strip() for name in exclude.split(',') if name.strip())
    choices = [c for c in COUNTRY_MAP.keys() if c not in excluded]

    if not choices:
        return Response(
            {'message': 'All done! Reset history to start again.'},
            status=status.HTTP_200_OK
        )

    country = random.choice(choices)
    return Response({'country': country}, status=status.HTTP_200_OK)


@api_view(['POST'])
def check_answer(request):
    """
    Expects JSON { country: "France", answer: "Paris" }
    """
    data = request.data
    country = data.get('country')
    answer = (data.get('answer') or '').strip().lower()

    if country not in COUNTRY_MAP:
        return Response(
            {'error': 'Invalid country.'},
            status=status.HTTP_400_BAD_REQUEST
        )

    correct = COUNTRY_MAP[country].strip().lower()
    if answer == correct:
        return Response({'correct': True}, status=status.HTTP_200_OK)
    else:
        return Response(
            {'correct': False, 'correct_answer': COUNTRY_MAP[country]},
            status=status.HTTP_200_OK
        )
