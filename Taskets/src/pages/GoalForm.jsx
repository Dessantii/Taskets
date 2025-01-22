/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { ColorPicker } from 'primereact/colorpicker';
import { Button } from 'primereact/button';
import EmojiPicker from 'emoji-picker-react';
import './goalform.css';

const GoalForm = ({ onGoalSubmit }) => {
  const [goal, setGoal] = useState({
    name: '',
    category: '',
    target: '',
    deadline: null,
    notificationType: '',
    emoji: '', // Inicialmente vazio
    color: '#000000', // Cor padrão
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

  const handleEmojiClick = (emojiObject) => {
    setGoal((prevGoal) => ({
      ...prevGoal,
      emoji: emojiObject.emoji || '', // Atualiza o emoji
    }));
    setShowEmojiPicker(false); // Fecha o picker de emoji
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

    // Atualiza a meta com os valores finais
    const updatedGoal = {
      ...goal,
      target: parsedTarget,
      emoji: goal.emoji || '📋', // Usa emoji padrão se não selecionado
      color: goal.color || '#000000', // Usa cor padrão se não selecionada
    };

    console.log('Meta cadastrada:', updatedGoal); // Verifica no console

    // Envia a meta para o componente pai
    onGoalSubmit(updatedGoal);

    // Limpa o formulário
    setGoal({
      name: '',
      category: '',
      target: '',
      deadline: null,
      notificationType: '',
      emoji: '', // Reseta o emoji
      color: '#000000', // Reseta a cor
    });
  };

  return (
    <div className="goal-form">
      <h2>Cadastro de Metas</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="goal-name">Nome da Meta</label>
          <InputText
            id="goal-name"
            value={goal.name}
            onChange={(e) => setGoal({ ...goal, name: e.target.value })}
            placeholder="Ex.: Comprar uma bicicleta"
            required
          />
        </div>

        <div className="form-field">
          <label htmlFor="goal-category">Categoria</label>
          <Dropdown
            id="goal-category"
            value={goal.category}
            options={categories}
            onChange={(e) => setGoal({ ...goal, category: e.value })}
            placeholder="Selecione a categoria"
          />
        </div>

        <div className="form-field">
          <label htmlFor="goal-target">Objetivo Final</label>
          <InputText
            id="goal-target"
            value={goal.target}
            onChange={(e) => setGoal({ ...goal, target: e.target.value })}
            placeholder="Ex.: R$ 1000, 70kg"
          />
        </div>

        <div className="form-field">
          <label htmlFor="goal-deadline">Prazo Final</label>
          <Calendar
            id="goal-deadline"
            value={goal.deadline}
            onChange={(e) => setGoal({ ...goal, deadline: e.value })}
            showIcon
            dateFormat="dd/mm/yy"
          />
        </div>

        <div className="form-field">
          <label htmlFor="goal-notification">Notificações</label>
          <Dropdown
            id="goal-notification"
            value={goal.notificationType}
            options={notificationOptions}
            onChange={(e) => setGoal({ ...goal, notificationType: e.value })}
            placeholder="Tipo de notificação"
          />
        </div>

        <div className="form-field">
          <label htmlFor="goal-color">Cor</label>
          <ColorPicker
            id="goal-color"
            value={goal.color}
            onChange={(e) => setGoal({ ...goal, color: e.value })}
          />
        </div>

        <div className="form-field">
          <label htmlFor="goal-emoji">Emoji</label>
          <div className="emoji-picker-container">
            <InputText
              id="goal-emoji"
              value={goal.emoji}
              placeholder="Selecione um emoji"
              readOnly
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            />
            <span style={{ fontSize: '2rem', marginLeft: '10px' }}>
              {goal.emoji || '📋'}
            </span>
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
