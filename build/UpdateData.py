from SimplecastApi import Simplecast
from AirTableApi import AirTable
from pathlib import Path
import json
import datetime
import sys
import os

#Return the rankings information for a specific game
def getRankInfo(rankings, epNum):
        rankNum = 1
        index = 0
        for rank in rankings:
                info = rank["fields"]
                if index > 0 and info["IG Score"] < rankings[index - 1]["fields"]["IG Score"]:
                        rankNum = index + 1
                if epNum == info["Episode"]:
                        return [info,rankNum]
                index += 1
        return None

#Sort JSON for comparison
def ordered(obj):
    if isinstance(obj, dict):
        return sorted((k, ordered(v)) for k, v in obj.items())
    if isinstance(obj, list):
        return sorted(ordered(x) for x in obj)
    else:
        return obj

#Return image information
def getImg(dir, title):
        expected = title.replace(" ","")
        for f in os.scandir(dir):
                if f.is_file():
                        print("Yoooooo")

#Program Start
dataPath = "src/Database/data.json"

#Gather Simplecast Data
podID = sys.argv[1]
podKey = sys.argv[2]
episodes = Simplecast(podID,podKey)

#Gather AirTable Data
airTableKey = sys.argv[3]
rankings = AirTable(airTableKey,"Ratings","IG Score")

#Tether Information together
for episode in episodes.data:
        if episode["type"] == "full":
                season = episode["season"]["number"]
                number = episode["number"]
                rankInfo = getRankInfo(rankings.data,str(season) + "-" + str(number))
                episode["Ranking Info"] = rankInfo[0]
                episode["Rank"] = rankInfo[1]

#Write data to file
file = Path(dataPath)
file.write_text(json.dumps(episodes.data, indent=4, sort_keys=True))
