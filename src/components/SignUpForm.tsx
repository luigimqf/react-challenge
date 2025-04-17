/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { z } from 'zod';
import { Input } from './Input';
import { normalizePhone } from '@/utils/number';

interface IUser {
  name: string;
  email: string;
  phone: string;
  password:string;
  confirmPassword: string;
}

const schema = z.object({
  name: z.string().min(1, 'Campo obrigatório'),
  email: z.string().email('Email inválido').min(1, 'Campo obrigatório'),
  phone: z.string().min(15, 'Telefone Inválido').regex(/^\(\d{2}\) \d{5}-\d{4}$/, 'Telefone precisa estar no formato: (99) 99999-9999'),
  password: z.string().min(6, 'Senha deve conter no minimo 6 letras').min(1, 'Campo obrigatório'),
  confirmPassword: z.string().min(1, 'Campo obrigatório'),
});

export const SignUpForm: React.FC = () => {
  const [formData, setFormData] = useState<IUser>({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    const newValue = name === 'phone' ? normalizePhone(value) : value;

    if(name)
    setFormData({ ...formData, [name]: newValue });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      schema.parse(formData);
      setSubmitted(true);
      setErrors({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
      })
    } catch (err) {
      const newErrors: any = {};
      if (err instanceof z.ZodError) {
        err.errors.forEach((error) => {
          newErrors[error.path[0]] = error.message;
        });
      }
      setErrors(newErrors);
    }
  };

  return (
      <div className="w-full text-zinc-900  flex flex-col justify-center items-center gap-8 max-w-md bg-white shadow-lg rounded-xl p-8">
        <h2 className="text-2xl font-mono font-semibold mb-6 text-center">Registro de usuário</h2>
        <form onSubmit={handleSubmit} className="space-y-4 w-3/4 flex flex-col gap-6">
          <Input 
            name='name'
            label='Nome:'
            value={formData.name}
            placeholder='Some Name'
            onChange={handleChange}
            error={errors.name}
          />
          <Input 
            name='email'
            label='Email:'
            type='email'
            value={formData.email}
            placeholder='some@email.com'
            onChange={handleChange}
            error={errors.email}
          />
          <Input 
            name='phone'
            label='Telefone:'
            value={formData.phone}
            placeholder='(00) 00000-0000'
            onChange={handleChange}
            error={errors.password}
          />

          <Input 
            name='password'
            label='Senha:'
            type='password'
            value={formData.password}
            placeholder='****'
            onChange={handleChange}
            error={errors.password}
          />
          <Input 
            name='confirmPassword'
            label='Confirmar Senha:'
            type='password'
            value={formData.confirmPassword}
            placeholder='*****'
            onChange={handleChange}
            error={errors.confirmPassword}
          />
          <button
            type="submit"
            className="w-full h-10 bg-blue-600 text-white font-medium py-2 rounded-md hover:bg-blue-700 transition"
          >
            Registrar
          </button>
        </form>

        {submitted && (
          <p className="mt-4 text-green-600 text-center font-semibold">
            Registrado com sucesso!
          </p>
        )}
      </div>
  );
};