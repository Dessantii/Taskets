import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { ColorPicker } from 'primereact/colorpicker';
import { Button } from 'primereact/button';
import EmojiPicker from 'emoji-picker-react';
import './GoalForm.css';



const GoalForm = ({ onGoalSubmit }) => {
  const [goal, setGoal] = useState({
    name: '',
    category: '',
    target: '',
    deadline: null,
    notificationType: '',
    emoji: '', // Inicialmente vazio
    color: '#000000', // Cor inicial
    
  });

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const categories = [
    { label: 'Dinheiro guardado', value: 'money' },
    { label: 'Algo para comprar', value: 'purchase' },
    { label: 'Peso que quer alcançar', value: 'weight' },
    { label: 'Algo que queira estudar', value: 'study' },
    { label: 'Personalizado', value: 'custom' },
    
  ];


  const notificationOptions = [
    { label: 'Diária', value: 'daily' },
    { label: 'Mensal', value: 'monthly' },
    { label: 'Antes do prazo', value: 'beforeDeadline' },
  ];

  const handleEmojiClick = (event, emojiObject) => {
    setGoal(prevGoal => ({
      ...prevGoal,
      emoji: emojiObject.emoji, // Armazena o emoji corretamente
    }));
    setShowEmojiPicker(false); // Fecha o emoji picker após seleção
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validação simples
    if (!goal.name || !goal.category || !goal.target || !goal.deadline) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    // Verificar e garantir que target seja um número válido
    const parsedTarget = parseFloat(goal.target.replace(/[^\d.-]/g, '').trim());
    if (isNaN(parsedTarget)) {
      alert('Por favor, insira um valor válido para o objetivo final.');
      return;
    }
    

    // Garantir que a cor e o emoji sejam sempre válidos
    const updatedGoal = {
      ...goal,
      target: parsedTarget, // Atualiza o target com o valor correto
      emoji: goal.emoji || '',  // Se não houver emoji selecionado, usa string vazia
    };

    console.log('Meta cadastrada:', updatedGoal); // Verifique o valor final da meta

    // Envia a meta para o componente pai (App.js)
    onGoalSubmit(updatedGoal);

    // Limpeza do formulário
    setGoal({
      name: '',
      category: '',
      target: '',
      deadline: null,
      notificationType: '',
      emoji: '', // Resetar emoji
      color: '#000000', // Resetar cor
    });
  };

  return (
    <div className="goal-form">
      <h2>Cadastro de Metas</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="name">Nome da Meta</label>
          <InputText
            id="name"
            value={goal.name}
            onChange={(e) => setGoal({ ...goal, name: e.target.value })}
            placeholder="Ex.: Comprar uma bicicleta"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="category">Categoria</label>
          <Dropdown
            id="category"
            value={goal.category}
            options={categories}
            onChange={(e) => setGoal({ ...goal, category: e.value })}
            placeholder="Selecione a categoria"
          />
        </div>

        <div className="form-field">
          <label htmlFor="target">Objetivo Final</label>
          <InputText
            id="target"
            value={goal.target}
            onChange={(e) => setGoal({ ...goal, target: e.target.value })}
            placeholder="Ex.: R$ 1000, 70kg"
          />
        </div>

        <div className="form-field">
          <label htmlFor="deadline">Prazo Final</label>
          <Calendar
            id="deadline"
            value={goal.deadline}
            onChange={(e) => setGoal({ ...goal, deadline: e.value })}
            showIcon
            dateFormat="dd/mm/yy"
          />
        </div>

        <div className="form-field">
          <label htmlFor="notificationType">Notificações</label>
          <Dropdown
            id="notificationType"
            value={goal.notificationType}
            options={notificationOptions}
            onChange={(e) => setGoal({ ...goal, notificationType: e.value })}
            placeholder="Tipo de notificação"
          />
          {goal.notificationType === 'daily' && (
            <div className="form-field">
              <label htmlFor="notificationTime">Horário</label>
              <Calendar
                id="notificationTime"
                value={goal.notificationTime}
                onChange={(e) => setGoal({ ...goal, notificationTime: e.value })}
                timeOnly
                showIcon
                hourFormat="24"
              />
            </div>
          )}
        </div>

        <div className="form-field">
          <label htmlFor="color">Cor</label>
          <ColorPicker
            id="color"
            value={goal.color}
            onChange={(e) => setGoal({ ...goal, color: e.value })}
          />
        </div>

        <div className="form-field">
          <label htmlFor="emoji">Emoji</label>
          <div className="emoji-picker-container">
            <InputText
              id="emoji"
              value={goal.emoji}
              placeholder="Selecione um emoji"
              readOnly
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
            {goal.emoji && !showEmojiPicker && (
              <span style={{ fontSize: '2rem' }}>{goal.emoji}</span>
            )}
            {showEmojiPicker && (
              <div className="emoji-picker-popup">
                <EmojiPicker onEmojiClick={handleEmojiClick} />
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <Button label="Salvar Meta" icon="pi pi-check" type="submit" />
          <Button label="Cancelar" icon="pi pi-times" className="p-button-secondary" />
        </div>
      </form>
    </div>
  );
};

export default GoalForm;
