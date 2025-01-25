export interface FormField {
  id: string;
  type: 'text' | 'email' | 'password' | 'select' | 'checkbox' | 'radio' | 'date';
  label: string;
  placeholder?: string;
  required: boolean;
  options?: string[]; // For select and radio
  validation?: {
    minLength?: number;
    maxLength?: number;
    pattern?: string;
  };
}

export interface FormDesign {
  id: string;
  name: string;
  fields: FormField[];
  theme: {
    backgroundColor: string;
    textColor: string;
    buttonColor: string;
    fontFamily: string;
    fontSize: string;
    buttonStyle: 'rounded' | 'outlined' | 'filled';
  };
}