from flask import Flask, request, send_from_directory, render_template, redirect, url_for
from flask_restful import Api, Resource, reqparse
from api.testApi import testApi
from api.deepLApi import deepLApi
#from google.cloud import vision
import io
from pymongo import MongoClient
import matplotlib.pyplot as plt
import json

app = Flask(__name__, static_url_path='',static_folder='../Frontend/public')
api = Api(app)
deepL = deepLApi


@app.route('/', defaults={'path':''}, methods=['GET','POST'])
def index(path):
    response_body = {
        "name": "Sample",
        "info": "Hello World!"
    }

    #return send_from_directory(app.static_folder, 'index.html')
    #return redirect(url_for('test'))
    return response_body

@app.route('/test')
def test():
    return {"message": "This is a test site."}

@app.route('/translate', methods=['GET','POST'])
def translate():
    # request = ?
    # response = deepLApi.post(request)
    sample = {
        "text": "According to all known laws of aviation, there is no way a bee should be able to fly.",
        "target_lang": "ES"
    }

    return deepL.get(deepL)

@app.route('/graph', methods=['GET','POST'])
def graph():
    # input = comprehension points
    """
    {
        videoId: string,
        comprehensionPoints: Array<{
        comprehension: number, // -1 to 1 with 0 being neutral
        timestamp: number      // in seconds
        }>
    }
    
    response = []
    input = request.json['comprehensionPoints']
    for i in input:
        response.append({'x': i.timestamp, 'y': i.comprehension})
    """


    response = []
    for i in range(10):
        response.append({'x': i, 'y': i})

    #fig, ax = plt.subplots()

    #ax.plot(xAxis,yAxis, color='maroon', marker='o')

    #graph = mpld3.fig_to_html(fig)
    return {'points': response}

# Taken from Google Cloud Vision API's sample code
# path = File path to image
# def detect_text(path):
#     """Detects text in the file."""
#     client = vision.ImageAnnotatorClient()

#     with io.open(path, 'rb') as image_file:
#         content = image_file.read()

#     image = vision.Image(content=content)

#     response = client.text_detection(image=image)
#     texts = response.text_annotations
#     print('Texts:')

#     for text in texts:
#         print('\n"{}"'.format(text.description))

#         vertices = (['({},{})'.format(vertex.x, vertex.y)
#                     for vertex in text.bounding_poly.vertices])

#         print('bounds: {}'.format(','.join(vertices)))

#     if response.error.message:
#         raise Exception(
#             '{}\nFor more info on error messages, check: '
#             'https://cloud.google.com/apis/design/errors'.format(
#                 response.error.message))

# # api.add_resource(testApi,'/flask/hello')
api.add_resource(deepLApi,'/saved')