import json
import requests

class Simplecast:
    def __init__(self,podId,podKey):
        #Simplecast API info
        header = {'authorization' : 'Bearer ' + podKey}
        episodeGetUrl = "https://api.simplecast.com/podcasts/" + podId + "/episodes"
        
        #Sending API request
        requests.auth = header
        response = requests.get(episodeGetUrl).json()
        episodes = self.gatherData(response,header)
        self.data = sorted(episodes,key=lambda k: k['published_at'])

    def gatherData(self,response,header):
        data = self.disperse([],response['collection'])
        while response['pages']['next'] != None:
            url = response["pages"]["next"]["href"]
            requests.auth = header
            response = requests.get(url).json()
            data = self.disperse(data,response['collection'])
        
        return data
    
    def disperse(self,data,episodes):
        for episode in episodes:
            data.append(episode)
        
        return data
