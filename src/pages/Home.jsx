// eslint-disable-next-line no-unused-vars
import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import './Home.css';

const Home = () => {
  // Dados para o gráfico de barras
  const barData = [
    { name: "Jan", value: 40 },
    { name: "Feb", value: 30 },
    { name: "Mar", value: 20 },
    { name: "Apr", value: 27 },
    { name: "May", value: 35 },
  ];




  // Dados para o gráfico de pizza
  const pieData = [
    { name: "Concluído", value: 70 },
    { name: "Restante", value: 30 },
  ];

  // Cores para o gráfico de pizza
  const COLORS = ["#4f46e5", "#a6a6a6"];

  return (
    <div className="home">
      {/* Cabeçalho */}
      <header className="home-header">
        <h1>Taskets</h1>
        <p>Aqui data resumida</p>
      </header>

      {/* Seção de Widgets */}
      <div className="widgets">
        <div className="widget">
          <h2>Próximas Tarefas</h2>
          <p>Tarefas próximas de vencer</p>
        </div>
        <div className="widget">
          <h2>Tarefas</h2>
          <p>Tarefas atuais</p>
        </div>
        <div className="widget">
          <h2>Metas</h2>
          <p>Progresso de metas</p>
          {/* Gráfico de pizza */}

          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} dataKey="value" innerRadius={30} outerRadius={60} fill="#8884d8" label>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
      />


      <h2>
        Próximas Tarefas <i className="fas fa-calendar-alt"></i>
      </h2>


      {/* Seção de Progresso */}
      <div className="progress-section">
        <h2>Prospecção</h2>
        <div className="chart">
          {/* Gráfico de barras */}
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#4f46e5" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Home;
