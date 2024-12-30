from flask import Flask, jsonify, request, redirect, url_for
from datetime import datetime
from google.oauth2.credentials import Credentials
from googleapiclient.discovery import build
from google_auth_oauthlib.flow import InstalledAppFlow
import os
import requests
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

SCOPES = ['https://www.googleapis.com/auth/calendar']
CLIENT_SECRETS_FILE = 'client_secret.json'

def create_service():
    creds = None
    if os.path.exists('token.json'):
        creds = Credentials.from_authorized_user_file('token.json', SCOPES)

    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(requests.Request())
            with open('token.json', 'w') as token:
                token.write(creds.to_json())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(CLIENT_SECRETS_FILE, SCOPES)
            creds = flow.run_local_server(port=5000)
            with open('token.json', 'w') as token:
                token.write(creds.to_json())

    return build('calendar', 'v3', credentials=creds)

def create_event(title, description, start_date, end_date, priority, notification_time, location=None, attendees=None):
    priority_colors = {
        "high": "11",
        "medium": "5",
        "low": "10",
    }
    color_id = priority_colors.get(priority, "7")
    reminders = {
        'useDefault': False,
        'overrides': [
            {
                'method': 'popup',
                'minutes': notification_time
            }
        ]
    }
    try:
        start_date_obj = datetime.strptime(start_date, '%Y-%m-%dT%H:%M')
        end_date_obj = datetime.strptime(end_date, '%Y-%m-%dT%H:%M')
        start_date_str = start_date_obj.isoformat()
        end_date_str = end_date_obj.isoformat()
    except ValueError:
        return jsonify({"success": False, "error": "Formato de data inválido. Use AAAA-MM-DDTHH:MM."}), 400

    service = create_service()
    event = {
        'summary': title,
        'description': description,
        'start': {
            'dateTime': start_date_str,
            'timeZone': 'America/Sao_Paulo',
        },
        'end': {
            'dateTime': end_date_str,
            'timeZone': 'America/Sao_Paulo',
        },
        'colorId': color_id,
        'reminders': reminders,
    }

    if location:
        event['location'] = location

    if attendees:
        event['attendees'] = [{'email': email} for email in attendees]

    try:
        event_result = service.events().insert(calendarId='primary', body=event).execute()
        return jsonify({"success": True, "event": event_result})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/add_other_task', methods=['POST'])
def add_other_task():
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    start_date = data.get('startDate')
    end_date = data.get('endDate')
    priority = data.get('priority')
    notification_time = data.get('notificationTime')
    location = data.get('location')
    attendees = data.get('attendees')

    if not title or not start_date or not end_date or not priority or notification_time is None:
        return jsonify({"success": False, "error": "Dados incompletos."}), 400

    try:
        event = create_event(title, description, start_date, end_date, priority, notification_time, location, attendees)
        return event
    except Exception as e:
        print("Erro ao criar o evento:", e)
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/update_tasks/<event_id>', methods=['PUT'])
def update_tasks(event_id):
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    start_date = data.get('startDate')
    end_date = data.get('endDate')
    priority = data.get('priority')
    notification_time = data.get('notificationTime')

    if not title or not start_date or not end_date or not priority or notification_time is None:
        return jsonify({"success": False, "error": "Dados incompletos."}), 400

    try:
        event = update_event(event_id, title, description, start_date, end_date, priority, notification_time)
        return event
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

def update_event(event_id, title, description, start_date, end_date, priority, notification_time):
    priority_colors = {
        "high": "11",
        "medium": "5",
        "low": "10",
    }
    color_id = priority_colors.get(priority, "7")
    reminders = {
        'useDefault': False,
        'overrides': [
            {
                'method': 'popup',
                'minutes': notification_time
            }
        ]
    }
    try:
        start_date_obj = datetime.strptime(start_date, '%Y-%m-%dT%H:%M')
        end_date_obj = datetime.strptime(end_date, '%Y-%m-%dT%H:%M')
        start_date_str = start_date_obj.isoformat()
        end_date_str = end_date_obj.isoformat()
    except ValueError:
        return jsonify({"success": False, "error": "Formato de data inválido. Use AAAA-MM-DDTHH:MM."}), 400

    service = create_service()
    event = {
        'summary': title,
        'description': description,
        'start': {
            'dateTime': start_date_str,
            'timeZone': 'America/Sao_Paulo',
        },
        'end': {
            'dateTime': end_date_str,
            'timeZone': 'America/Sao_Paulo',
        },
        'colorId': color_id,
        'reminders': reminders,
    }

    try:
        updated_event = service.events().update(calendarId='primary', eventId=event_id, body=event).execute()
        return jsonify({"success": True, "event": updated_event})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/add_goal', methods=['POST'])
def add_goal():
    data = request.get_json()
    title = data.get('title')
    deadline = data.get('deadline')
    progress = data.get('progress', 0)

    if not title or not deadline:
        return jsonify({"success": False, "error": "Dados incompletos."}), 400

    # Simulação de armazenamento de metas (exemplo usando um arquivo JSON local)
    try:
        goals = []
        if os.path.exists('goals.json'):
            with open('goals.json', 'r') as file:
                goals = json.load(file)
        goals.append({"title": title, "deadline": deadline, "progress": progress})
        with open('goals.json', 'w') as file:
            json.dump(goals, file)
        return jsonify({"success": True, "message": "Meta adicionada com sucesso."})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/list_goals', methods=['GET'])
def list_goals():
    try:
        if os.path.exists('goals.json'):
            with open('goals.json', 'r') as file:
                goals = json.load(file)
            return jsonify({"success": True, "goals": goals})
        return jsonify({"success": True, "goals": []})
    except Exception as e:
        return jsonify({"success": False, "error": str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if email == 'test@example.com' and password == 'password123':  # Simulação de login
        return jsonify({"success": True, "message": "Login bem-sucedido."})
    return jsonify({"success": False, "error": "Credenciais inválidas."}), 401

@app.after_request
def after_request(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:5173'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
