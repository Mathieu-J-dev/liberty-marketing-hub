
import React from 'react';

const stats = [
  {
    value: '267+',
    label: 'Utilisateurs Actifs'
  },
  {
    value: '€7400',
    label: 'Commissions Générées'
  },
  {
    value: '70+',
    label: "Programmes d'Affiliation"
  },
  {
    value: '24/7',
    label: 'Support Client'
  }
];

const Stats = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-6">
              <div className="text-3xl md:text-4xl font-bold text-liberty-blue mb-2">{stat.value}</div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
