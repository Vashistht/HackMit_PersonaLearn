from bisect import bisect_left
from flask import Flask 
from youtube_transcript_api import YouTubeTranscriptApi
from flask import request
from yt_gpt_integration import YtRec

app = Flask(__name__)

# Constants

TRANSCRIPT_PADDING = 10 # in seconds

# Helper Methods

def trivial_extract_confusion_timestamps(comprehension_points):
    """The most trivial extraction for confusing timestamps from comprehension points.
        Filters by points with comprehension less than -0.5."""
    return [point["timestamp"] for point in comprehension_points if point["comprehension"] < -0.5]


def transform(dict_list):
    """Transform the list of dictionaries by converting its topics to keywords."""
    for obj in dict_list:
        obj["topics"] = [keyword.strip() for keyword in obj["topics"].replace("\n", "").split("The topic is") if keyword.strip() != ""]


# API Methods

def find_supplemental_materials_from_transcripts(transcripts: list[str]):
    """Given a list of transcript texts, use the YouTube recommendation to find relevant supplemental materials."""
    supplemental_materials = []
    for excerpt in transcripts:
        yt_rec = YtRec(excerpt)
        yt_dicts = yt_rec.final_dict()
        transform(yt_dicts)
        supplemental_materials.extend(yt_dicts)

    return supplemental_materials


# API Routes

@app.route("/recommend", methods=["POST"])
def transcript_data():
    data = request.json
    video_id = data['videoId']
    comprehension_points = data['comprehensionPoints']
    transcript = YouTubeTranscriptApi.get_transcript(video_id)
    confusion_timestamps = trivial_extract_confusion_timestamps(comprehension_points)

    confusing_transcripts = []

    for timestamp in confusion_timestamps:
        # Get start and end times
        start_time = max(timestamp - TRANSCRIPT_PADDING, 0)
        
        last_transcript_element = transcript[len(transcript) - 1]
        transcript_end_time = last_transcript_element["start"] + last_transcript_element["duration"]
        end_time = min(timestamp + TRANSCRIPT_PADDING, transcript_end_time)

        # Get transcript's start index
        transcript_section_start_index = bisect_left(transcript, start_time, key=lambda element: element["start"])
        
        # Guard against the start_index not being found
        if transcript_section_start_index == len(transcript) or transcript[transcript_section_start_index]["start"] != start_time:
            # Then there are no elements to the left which have a smaller start time.
            # If that's the case, there are two options: include this and right elements if the first element's end
            # is less than the end_time; otherwise, don't append anything because no transcript exists for the confusing
            # section
            first_segment_end = transcript[0]["start"] + transcript[0]["duration"]
            if first_segment_end < end_time:
                transcript_section_start_index = 0
            else:
                continue

        # Find transcript's end index
        transcript_section_end_index = len(transcript) - 1 # last element by default
        for i in range(transcript_section_start_index, transcript_section_end_index):
            # Either we've passed the start or it's contained in this segment
            transcript_segment = transcript[i]
            if transcript_segment["start"] > end_time:
                transcript_section_end_index = i - 1
                break
            elif transcript_segment["start"] + transcript_segment["duration"] > end_time:
                transcript_section_end_index = i
                break

        # Extract and append confusing transcript section text
        confusing_transcript_segments = transcript[transcript_section_start_index:transcript_section_end_index]
        confusing_section_text = [transcript["text"] for transcript in confusing_transcript_segments].join(" ")
        confusing_transcripts.append(confusing_section_text)

    # Search for supplemental materials
    return find_supplemental_materials_from_transcripts(confusing_transcripts)


if __name__ == "__main__":
    app.run(port=3000)