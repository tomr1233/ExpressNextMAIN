export interface PlanFeature {
    category: string;
    features: {
      name: string;
      values: Record<string, string | number>;
    }[];
  }
  
  export const planFeatures: PlanFeature[] = [
    {
      category: 'Pricing',
      features: [
        {
          name: 'Service Type',
          values: {
            'Standard': 'Self/Basic Service',
            'Standard 50': 'Self/Basic Service',
            'Pro': 'Full Service',
            'Pro 50': 'VIP Service'
          }
        },
        {
          name: 'Onboarding Services',
          values: {
            'Standard': '$0',
            'Standard 50': '$0',
            'Pro': 'Waived for Launch',
            'Pro 50': 'Waived for Launch'
          }
        },
        {
          name: 'Monthly',
          values: {
            'Standard': '$40',
            'Standard 50': '$200',
            'Pro': '$600',
            'Pro 50': '$6000'
          }
        },
        {
          name: 'Yearly',
          values: {
            'Standard': '$420',
            'Standard 50': '$2,160',
            'Pro': '6,000',
            'Pro 50': '$60,000'
          }
        }
      ]
    },
    {
      category: 'VPC',
      features: [
        {
          name: 'Exclusive VPC',
          values: {
            'Standard': 'No',
            'Standard 50': 'No',
            'Pro': 'No',
            'Pro 50': 'Yes'
          }
        }
      ]
    },
    {
      category: 'Support',
      features: [
        {
          name: 'Support Team',
          values: {
            'Standard': 'No',
            'Standard 50': 'Associates',
            'Pro': 'Senior',
            'Pro 50': 'Senior'
          }
        },
        {
          name: 'Onboarding Hours',
          values: {
            'Standard': '0',
            'Standard 50': '2',
            'Pro': '4',
            'Pro 50': '20'
          }
        },
        {
          name: 'Monthly Hours',
          values: {
            'Standard': '0',
            'Standard 50': '1',
            'Pro': '2',
            'Pro 50': '20'
          }
        }
      ]
    },
    {
      category: 'Usage',
      features: [
        {
          name: 'Monthly Executions',
          values: {
            'Standard': '50',
            'Standard 50': '1,000',
            'Pro': '2,000',
            'Pro 50': '500,000'
          }
        },
        {
          name: 'Total Live Crews',
          values: {
            'Standard': '1',
            'Standard 50': '5',
            'Pro': '10',
            'Pro 50': '100'
          }
        },
        {
          name: '# Seats',
          values: {
            'Standard': '1',
            'Standard 50': 'Unlimited',
            'Pro': 'Unlimited',
            'Pro 50': 'Unlimited'
          }
        }
      ]
    }
  ];