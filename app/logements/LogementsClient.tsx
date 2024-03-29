"use client";
import React, { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation';
import Container from '../components/Container';
import Heading from '../components/Heading';
import { SafeListing, SafeUser } from '../types'
import axios from 'axios';
import toast from 'react-hot-toast';
import ListingCard from '../components/listings/ListingCard';

interface LogementsClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}

const LogementsClient: React.FC<LogementsClientProps> = ({ listings, currentUser }) => {

    const router = useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
            .then(() => {
                toast.success("Logement supprimé")
                router.refresh();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error);
            })
            .finally(() => {
                setDeletingId('');
            })
    }, [router])

    return (
        <Container>
            <Heading
                title='Mes logements'
                subtitle="Liste de mes logements"
            />
            <div className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:gris-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
            ">
                {listings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        actionId={listing.id}
                        onAction={onCancel}
                        disabled={deletingId === listing.id}
                        actionLabel="Supprimer le logement"
                        currentUser={currentUser}
                    />
                ))}
            </div>
        </Container>
    )
}

export default LogementsClient;