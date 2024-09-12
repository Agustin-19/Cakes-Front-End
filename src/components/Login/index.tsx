"use client"
import { useUser } from '@/context/UserContext';
import { FormEvent, useState } from 'react';

const LoginForm: React.FC = () => {
    const { login, isLoading, error } = useUser();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        await login(email, password);
    };



    return (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-4">
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold text-center mb-6">Iniciar sesión</h2>

                {error && (
                    <p className="text-red-500 text-sm text-center mb-4">{error}</p>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Correo electrónico
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Ingresa tu correo electrónico"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Contraseña
                        </label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full p-3 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            placeholder="Ingresa tu contraseña"
                            required
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center btn-reina "
                            disabled={isLoading}
                        >
                            {isLoading ? 'Buscando usuario...' : 'Iniciar sesión'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default LoginForm;
