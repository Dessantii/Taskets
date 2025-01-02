// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { ProgressBar } from 'primereact/progressbar';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import './GoalReport.css';

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
    // Atualiza a lista filtrada quando as metas ou a categoria selecionada mudam
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
            const targetValue = parseFloat(goal.targetValue) || 0; // Use 0 como valor default se for NaN
            const currentValue = parseFloat(goal.currentValue) || 0; // Use 0 como valor default se for NaN
            
            // Calcular o progresso com verificação
            const progress = Math.min(100, (currentValue / targetValue) * 100);

            // Verificar e formatar a data do prazo
            const deadline = goal.deadline ? new Date(goal.deadline).toLocaleDateString() : 'Sem prazo';

            return (
              <div key={goal.id || index} className="goal-card" style={{ borderColor: goal.color }}>
                <h3>
                  {goal.emoji} {goal.name}
                </h3>
                <p>Categoria: {categories.find((c) => c.value === goal.category)?.label || 'N/A'}</p>
                <p>Prazo: {deadline}</p>
                <ProgressBar value={progress} color={goal.color} />
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
