import React from 'react';
import { planFeatures } from '../data/planFeatures';
import { pricingPlans } from '../data/pricingPlans';

interface FeaturesTableProps {
  highlightedPlan?: string | null;
}

export function FeaturesTable({ highlightedPlan }: FeaturesTableProps) {
  return (
    <div className="mt-16 overflow-x-auto features-table">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-zinc-800">
            <th className="py-4 px-6 text-left text-zinc-400 font-normal"></th>
            {pricingPlans.map((plan) => (
              <th 
                key={plan.title} 
                className={`py-4 px-6 text-left transition-colors ${
                  highlightedPlan === plan.title ? 'bg-zinc-800' : ''
                }`}
              >
                <span className="font-semibold text-white">{plan.title}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {planFeatures.map((section) => (
            <React.Fragment key={section.category}>
              <tr>
                <td
                  colSpan={pricingPlans.length + 1}
                  className="py-4 px-6 text-sm font-semibold uppercase tracking-wider text-zinc-400 bg-zinc-900/50"
                >
                  {section.category}
                </td>
              </tr>
              {section.features.map((feature) => (
                <tr key={feature.name} className="border-b border-zinc-800/50">
                  <td className="py-4 px-6 text-zinc-400">{feature.name}</td>
                  {pricingPlans.map((plan) => (
                    <td 
                      key={plan.title} 
                      className={`py-4 px-6 ${
                        feature.values[plan.title] === 'Yes' || 
                        feature.values[plan.title].includes('Waived') ? 
                        'text-emerald-400' : 'text-white'
                      } ${
                        highlightedPlan === plan.title ? 'bg-zinc-800' : ''
                      }`}
                    >
                      {feature.values[plan.title]}
                    </td>
                  ))}
                </tr>
              ))}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
}