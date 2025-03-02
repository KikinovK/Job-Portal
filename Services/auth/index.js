
export const register_me = async (formData, locale) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/register${locale ? `?lng=${locale}` : ''}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in register (service) => ', error);
    }
}

export const login_me = async (formData, locale) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/login${locale ? `?lng=${locale}` : ''}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in login (service) => ', error);
    }
}



export const forget_password = async (formData, locale) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/auth/forgetPassword${locale ? `?lng=${locale}` : ''}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
        const data = res.json();
        return data;
    } catch (error) {
        console.log('error in forget Password (service) => ', error);
    }
}
