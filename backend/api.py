import openai as novaai
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

api_key = os.getenv("API_KEY")

novaai.api_base = 'https://api.nova-oss.com/v1'
novaai.api_key = api_key

app = Flask(__name__)
CORS(app)

@app.route('/generate-response', methods=['POST'])
def generate_response():
    try:
        # Get the user's prompt from the request
        user_input = request.json['prompt']

        # Use the OpenAI GPT-3.5-turbo model to generate a response
        response = novaai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "user", "content": user_input}
            ]
        )

        ans = response['choices'][0]['message']['content']

        return jsonify({'response': ans})
    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)