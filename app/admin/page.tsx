"use client"
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAdmin, logoutUser } from '@/lib/authHelper';

function AdminPage() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const verifyAdmin = async () => {
            const isAdminUser = await isAdmin();

            if (!isAdminUser) {
                setError('You are not authorized to access this page.');
                setLoading(false);
                logoutUser();
                router.push('/');
                return;
            }

            setLoading(false);
        };

        verifyAdmin();
    }, [router]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Welcome to the Admin Page</h1>
            <p>This page is only accessible to tsetsen.</p>
        </div>
    );
}

export default AdminPage;
