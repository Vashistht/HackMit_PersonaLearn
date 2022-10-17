from flask_restful import Api, Resource, reqparse
import deepl
#from sympy import re
import config

auth_key = config.deepl_auth_key
translator = deepl.Translator(auth_key)

savedText = "Saved text here"
savedTranslation = "Saved translation here"

class deepLApi(Resource):
    def get(self):
        return {
            "text": savedText,
            "translation": savedTranslation,
            "message": "Success"
        }

    def post(self, input):
        # input should be an object that contains the text to be translated,
        # original language (or None), and target language
        
        # note, the post req from frontend needs to match the strings here (e.g. 'type and 'message')

        request_text = input['text']
        request_target_lang = input['target_lang']
        #request_origin_lang = input['origin_lang']
        
        print(input)
        print(request_text)
        print(request_target_lang)

        return_translation = translator.translate_text(request_text, target_lang=request_target_lang)
        response = {
            "text": request_text,
            "target_lang": request_target_lang,
            "translation": return_translation.text
        }

        return response

