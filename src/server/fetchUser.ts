const API = process.env.NEXT_PUBLIC_API_URL;

interface LoginResponse {
    success: boolean;
    token?: string;
    message?: string;
}

export const fetchUser = async (email: string, password: string): Promise<LoginResponse> => {
    // const body = { email, password }

    // console.log(JSON.stringify(body));

    try {
        const response = await fetch(`${API}/auth/signin`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({email, password}),
        });

        if (!response.ok) {
            throw new Error("Invalid credentials");
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};
