"use client"
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { fetchUser } from '../server/fetchUser';
import Cookies from 'js-cookie';

interface UserContextType {
    user: string | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isLoading: boolean;
    error: string | null;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    // Leer el token de las cookies cuando se monta el componente
    useEffect(() => {
        const token = Cookies.get('token');
        setUser(token || null);
    }, []);

    const login = async (email: string, password: string) => {
        setIsLoading(true);
        setError(null);
        try {
            const result = await fetchUser(email, password);

            const token = result.token || null;
            setUser(token);
            // Guardar el token en la cookie
            Cookies.set('token', token || '', { expires: 1 }); // La cookie expira en 1 dia

        } catch {
            setError('Error de conexión');
        }

        setIsLoading(false);
    };

    const logout = () => {
        setUser(null);
        // Eliminar la cookie
        Cookies.remove('token');
    };

    return (
        <UserContext.Provider value={{ user, login, logout, isLoading, error }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
