import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, InputText, InputTextarea, Dropdown } from 'primereact';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import './TasksStyles.css';

function Tasks() {
    const API_URL = 'http://127.0.0.1:5000/add_other_task';

    const [title, setTitle] = useState('');
     const [description, setDescription] = useState('');
     const [startDate, setStartDate] = useState('');
     const [endDate, setEndDate] = useState('');
     const [priority, setPriority] = useState('medium');
     const [notificationTime, setNotificationTime] = useState(15);
     const [location, setLocation] = useState('');
     const [participants, setParticipants] = useState('');
     const [message, setMessage] = useState('');
     const [tasks, setTasks] = useState([]);
     const [theme, setTheme] = useState('light');

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
      participants: participants.split(',').map((p) => p.trim()),
    };

    try {
      const response = await axios.post(API_URL, newTaskData);
      setMessage('Tarefa criada com sucesso!');

      const updatedTasks = [...tasks, newTaskData];
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks));

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

    return (
      
      <div className="tasks-container">
        {message && (
                    <p
                      className={`text-center text-white font-semibold p-2 rounded mb-4 ${message.includes('sucesso') ? 'bg-green-500' : 'bg-red-500'}`}
                    >
                      {message}
                    </p>
                  )}
                  <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
                    {/* Campo de título */}
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="title" className="font-semibold text-lg">Título:</label>
                      <InputText
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="p-inputtext w-full border-gray-300 p-3 rounded-md"
                        required
                      />
                    </div>
        
                    {/* Campo de descrição */}
                    <div className="flex flex-col space-y-2">
                      <label htmlFor="description" className="font-semibold text-lg">Descrição:</label>
                      <InputTextarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        className="p-inputtextarea w-full border-gray-300 p-3 rounded-md"
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
        
        
        
                    <div className="flex justify-center mt-6">
                      <Button type="submit" label="Adicionar Tarefa" className="p-button-rounded p-button-success" />
                    </div>
        
                  </form>
        
                  
                </div>
    );
}

export default Tasks;