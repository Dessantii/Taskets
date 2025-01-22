// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, InputText, InputTextarea, Dropdown } from 'primereact';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import './task.css';

function Tasks() {
    const API_URL = 'http://127.0.0.1:5000/add_other_task'

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
    const [saveToApi, setSaveToApi] = useState(true); // Define que, por padrão, será salvo na API


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

        const isValidDate = (dateString) => /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(dateString);

        if (!isValidDate(startDate) || !isValidDate(endDate)) {
            setMessage('Formato de data inválido. Use AAAA-MM-DDTHH:MM.');
            return;
        }

        try {
            if (saveToApi) {
                // Envia para a API
                await axios.post(API_URL, newTaskData, { headers: { 'Content-Type': 'application/json' } });
                setMessage('Tarefa criada com sucesso na API!');
            } else {
                // Salva apenas localmente
                const updatedTasks = [...tasks, newTaskData];
                setTasks(updatedTasks);
                localStorage.setItem('tasks', JSON.stringify(updatedTasks));
                setMessage('Tarefa criada localmente!');
            }

            setTitle('');
            setDescription('');
            setStartDate('');
            setEndDate('');
            setPriority('medium');
            setNotificationTime(15);
            setLocation('');
            setParticipants('');
        } catch (error) {
            console.error(error);
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
                <p className={`message ${message.includes('sucesso') ? 'success' : 'error'}`}>
                    {message}
                </p>
            )}
            <form onSubmit={handleSubmit} className="task-form">
                <div className="form-group">
                    <label htmlFor="title">Título:</label>
                    <InputText
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Ex: Comprar mantimentos"
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description">Descrição:</label>
                    <InputTextarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Descreva a tarefa"
                        rows={3}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="startDate">Data de Início:</label>
                    <InputText
                        type="datetime-local"
                        id="startDate"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="endDate">Data de Término:</label>
                    <InputText
                        type="datetime-local"
                        id="endDate"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="priority">Prioridade:</label>
                    <Dropdown
                        id="priority"
                        value={priority}
                        options={priorityOptions}
                        onChange={(e) => setPriority(e.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="notificationTime">Notificar em (minutos antes):</label>
                    <InputText
                        type="number"
                        id="notificationTime"
                        value={notificationTime}
                        onChange={(e) => setNotificationTime(e.target.value)}
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">Local:</label>
                    <InputText
                        id="location"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        placeholder="Ex: Sala de Reuniões"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="participants">Convidados (e-mails):</label>
                    <InputText
                        id="participants"
                        value={participants}
                        onChange={(e) => setParticipants(e.target.value)}
                        placeholder="Ex: joao@email.com, maria@email.com"

                    />
                    <p></p>
                    <div className="form-group">
                        <label htmlFor="saveToApi">Gravar no Google Calendar?</label>
                        <Dropdown
                            id="saveToApi"
                            value={saveToApi}
                            options={[
                                { label: 'Sim', value: true },
                                { label: 'Não', value: false }
                            ]}
                            onChange={(e) => setSaveToApi(e.value)}
                        />
                    </div>

                </div>
                <div className="form-actions">
                    <Button type="submit" label="Salvar Tarefa" className="p-button-success" />
                </div>
            </form>
        </div>
    );
}

export default Tasks;
