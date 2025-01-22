// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'primereact/progressbar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import './goalreport.css';

const GoalReport = ({ goals, onNewEntry }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [filteredGoals, setFilteredGoals] = useState(goals || []);

  const categories = [
    { label: 'Todas', value: null },
    { label: 'Dinheiro guardado', value: 'money' },
    { label: 'Algo para comprar', value: 'purchase' },
    { label: 'Peso que quer alcançar', value: 'weight' },
    { label: 'Algo que queira estudar', value: 'study' },
    { label: 'Personalizado', value: 'custom' },
  ];

  useEffect(() => {
    // Atualiza as metas filtradas
    console.log('Metas recebidas:', goals); // Verificar se as metas têm a propriedade 'color'
    if (selectedCategory) {
      setFilteredGoals(goals.filter((goal) => goal.category === selectedCategory));
    } else {
      setFilteredGoals(goals);
    }
  }, [goals, selectedCategory]);

  const handleFilterChange = (e) => {
    setSelectedCategory(e.value);
  };

  return (
    <div className="goal-report">
      <h1>Relatório de Metas</h1>
      <div className="filter-section">
        <Dropdown
          value={selectedCategory}
          options={categories}
          onChange={handleFilterChange}
          placeholder="Selecione uma categoria"
          className="category-dropdown"
        />
      </div>

      <div className="goal-list">
        {filteredGoals.length > 0 ? (
          filteredGoals.map((goal, index) => {
            const targetValue = parseFloat(goal.target) || 0;
            const currentValue = parseFloat(goal.currentValue) || 0;

            const progress = targetValue > 0 ? Math.min(100, (currentValue / targetValue) * 100) : 0;
            const deadline = goal.deadline ? new Date(goal.deadline).toLocaleDateString('pt-BR') : 'Sem prazo';
            const color = goal.color || '#cccccc';
            const emoji = goal.emoji || '🎯';

            return (
              <div
                key={goal.id || index}
                className="goal-card"
                style={{
                  borderColor: color,
                  backgroundColor: `${color}20`, // Fundo com transparência
                }}
              >
                <h3>
                  {emoji} {goal.name || 'Meta sem nome'}
                </h3>
                <p>Categoria: {categories.find((c) => c.value === goal.category)?.label || 'Não especificada'}</p>
                <p>Prazo: {deadline}</p>
                <ProgressBar value={progress} className="custom-progress-bar" />
                <p>
                  Progresso: {currentValue}/{targetValue}
                </p>
                <Button
                  label="Novo Lançamento"
                  icon="pi pi-plus"
                  onClick={() => onNewEntry(goal)}
                  className="new-entry-button"
                />
              </div>
            );
          })
        ) : (
          <p className="no-goals">Nenhuma meta encontrada.</p>
        )}
      </div>
    </div>
  );
};

export default GoalReport;
