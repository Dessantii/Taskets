// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import './taskreport.css';

function TasksReport() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    return (
        <div className="tasks-report-container">
            <h2 className="text-2xl font-semibold">Relatório de Tarefas</h2>
            {tasks.length === 0 ? (
                <p>Nenhuma tarefa registrada.</p>
            ) : (
                <ul className="task-report-list space-y-4">
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
            )}
        </div>
    );
}

export default TasksReport;
