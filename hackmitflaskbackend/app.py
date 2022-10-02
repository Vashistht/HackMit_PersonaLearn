from tracemalloc import start
from flask import Flask 
from youtube_transcript_api import YouTubeTranscriptApi
from flask import request,jsonify
from yt_gpt_integration import YtRec

app = Flask(__name__)

@app.route("/")
def index():
    return "Hello world!"

@app.route("/parameter", methods=["POST"])
# input data
# [11.59, 120, 150 , 180 , 240 , 500]
# all data is in seconds  


def transcript_data():
    data = request.json
    print(data)
    link = data['videoId']
    comprehensionPoints = data['comprehensionPoints']
    obj = YouTubeTranscriptApi.get_transcript(link)
    global_text = [] # this is an array from all the portions of text user doesn't understand 
    # assume this is sorted
    #arr = [85, 160]
    #arr=[120]

    arr = [x["timestamp"] for x in comprehensionPoints if x["comprehension"]<-0.5]

    lower_bound = 60  
    upper_bound = 60 

    marker = 0
    for i in arr:

        time = i
        text = ""
        print(global_text)
        #print(obj[marker]["start"])
        # while(obj[marker]["start"]>=time and marker-1>=0):
        #     marker-=1 

        while(obj[marker]["start"]<time): 
            marker = marker+1 
        
        if(marker-1>=0 and time-obj[marker-1]["start"]<=lower_bound):
            if(text==""):
                text=obj[marker-1]["text"]
            else:
                text=" "+ obj[marker-1]["text"]

        if(text=="" and obj[marker]["start"]-time<=upper_bound):
            text = obj[marker]["text"]
        else:
            if(obj[marker]["start"]-time<=upper_bound): 
                text = text+" "+obj[marker]["text"]

        if(marker+1<len(obj)):
            if(obj[marker]["start"]-time<=upper_bound):
                text = text+" "+obj[marker]["text"]
        
        if(text not in global_text):
            global_text.append(text)

    supplemental_materials = []
    for excerpt in global_text:
        yt_rec = YtRec(excerpt)
        yt_dict = yt_rec.final_dict()
        supplemental_materials.append(yt_dict)

    return supplemental_materials

if __name__ == "__main__":
    app.run()