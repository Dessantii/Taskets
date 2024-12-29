import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, InputText, InputTextarea, Dropdown } from 'primereact';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import './App.css';
import './AppStyles.css';

function App() {
  const API_URL = 'http://127.0.0.1:5000/add_other_task'; // URL da sua API

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [priority, setPriority] = useState('medium');
  const [notificationTime, setNotificationTime] = useState(15);
  const [location, setLocation] = useState(''); // Novo campo
  const [participants, setParticipants] = useState(''); // Novo campo
  const [message, setMessage] = useState('');
  const [tasks, setTasks] = useState([]); // Estado para armazenar as tarefas

  // Carregar tarefas do localStorage quando a página for carregada
  useEffect(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newTaskData = {
      title,
      description,
      startDate,
      endDate,
      priority,
      notificationTime: parseInt(notificationTime, 10),
      location,
      participants: participants.split(',').map((p) => p.trim()), // Converter para array
    };

    try {
      const response = await axios.post(API_URL, newTaskData);
      setMessage('Tarefa criada com sucesso!');

      // Atualizar o estado de tarefas e salvar no localStorage
      const updatedTasks = [...tasks, newTaskData];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));

      // Limpar os campos do formulário
      setTitle('');
      setDescription('');
      setStartDate('');
      setEndDate('');
      setPriority('medium');
      setNotificationTime(15);
      setLocation('');
      setParticipants('');

      console.log(response);
    } catch (error) {
      console.error('Erro ao criar tarefa:', error);
      setMessage('Erro ao criar a tarefa. Verifique os dados.');
    }
  };

  const priorityOptions = [
    { label: 'Alta', value: 'high' },
    { label: 'Média', value: 'medium' },
    { label: 'Baixa', value: 'low' },
  ];
  let autocomplete;
let selectedPlace;

function initAutocomplete() {
  const input = document.getElementById('location-input');
  
  // Inicializa o Autocomplete
  autocomplete = new google.maps.places.Autocomplete(input, {
    types: ['geocode'], // Pode ser alterado para "establishment" para locais específicos
  });

  // Quando o usuário seleciona um local
  autocomplete.addListener('place_changed', () => {
    const place = autocomplete.getPlace();

    if (place.geometry) {
      selectedPlace = {
        name: place.name,
        address: place.formatted_address,
        location: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
      };

      console.log('Local selecionado:', selectedPlace);
      // Enviar os dados para o backend ou usá-los como necessário
    } else {
      alert('Por favor, selecione um local válido.');
    }
  });
}

// Certifique-se de inicializar o Autocomplete após o script do Google Maps carregar
window.initAutocomplete = initAutocomplete;


  return (
    <div className="App container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-indigo-600 mb-4">Taskets</h1>

      {message && (
        <p className={`text-center text-white font-semibold p-2 rounded mb-4 ${message.includes('sucesso') ? 'bg-green-500' : 'bg-red-500'}`}>
          {message}
        </p>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-4">
        {/* Campos existentes */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="title" className="font-semibold">Título:</label>
          <InputText
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-inputtext w-full border-gray-300"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="description" className="font-semibold">Descrição:</label>
          <InputTextarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="p-inputtextarea w-full border-gray-300"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="startDate" className="font-semibold">Data de Início:</label>
          <InputText
            type="datetime-local"
            id="startDate"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="p-inputtext w-full border-gray-300"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="endDate" className="font-semibold">Data de Término:</label>
          <InputText
            type="datetime-local"
            id="endDate"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="p-inputtext w-full border-gray-300"
            required
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="priority" className="font-semibold">Prioridade:</label>
          <Dropdown
            id="priority"
            value={priority}
            options={priorityOptions}
            onChange={(e) => setPriority(e.value)}
            className="p-dropdown w-full"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="notificationTime" className="font-semibold">Tempo de Notificação (minutos):</label>
          <InputText
            type="number"
            id="notificationTime"
            value={notificationTime}
            onChange={(e) => setNotificationTime(e.target.value)}
            className="p-inputtext w-full border-gray-300"
            required
          />
        </div>
        {/* Novos Campos */}
        <div className="flex flex-col space-y-2">
          <label htmlFor="location" className="font-semibold">Local:</label>
          <InputText
            id="location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="p-inputtext w-full border-gray-300"
          />
        </div>
        <div className="flex flex-col space-y-2">
          <label htmlFor="participants" className="font-semibold">Convidados (e-mails separados por vírgula):</label>
          <InputText
            id="participants"
            value={participants}
            onChange={(e) => setParticipants(e.target.value)}
            className="p-inputtext w-full border-gray-300"
          />
        </div>
        
        <div className="flex justify-center mt-4">
          <p className="text-sm text-gray-500"></p>
          <Button type="submit" label="Adicionar Tarefa" className="p-button-rounded p-button-success" />
        </div>
      </form>

      {/* Lista de Tarefas Criadas */}
      <div className="task-list mt-6">
        <h2 className="text-2xl font-semibold">Tarefas Criadas</h2>
        <ul className="space-y-4">
          {tasks.map((task, index) => (
            <li key={index} className="border p-4 rounded-md shadow-sm">
              <h3 className="text-xl font-semibold">{task.title}</h3>
              <p><strong>Descrição:</strong> {task.description}</p>
              <p><strong>Data de Início:</strong> {task.startDate}</p>
              <p><strong>Data de Término:</strong> {task.endDate}</p>
              <p><strong>Prioridade:</strong> {task.priority}</p>
              <p><strong>Notificação em:</strong> {task.notificationTime} minutos</p>
              <p><strong>Local:</strong> {task.location}</p>
              <p><strong>Convidados:</strong> {task.participants?.join(', ')}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
