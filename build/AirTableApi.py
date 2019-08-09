import requests

class AirTable:
    def __init__(self,key,table,sortBy):
        request = "https://api.airtable.com/v0/appDCLBXIkefciEz4/" + table + "?api_key=" + key
        response = requests.get(request).json()['records']
        self.data = sorted(response,key=lambda k: k['fields'][sortBy],reverse=True)