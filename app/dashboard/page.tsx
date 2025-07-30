"use client";

import { getFavoriteLocations } from "@/api/locationApi";
import LocationCardList from "@/components/providers/LocationCardList";
import { useAuth } from "@/hooks/useAuth";
import { Location } from "@/types/location";
import { useEffect, useState } from "react";

const DashboardUser = () => {
    const { user } = useAuth();
    const [favoriteLocations, setFavoriteLocations] = useState<Location[]>([]);
    const fetchFavoriteLocations = async () => {
        try {
            const response = await getFavoriteLocations({
                page: 1,
                limit: 9999999,
                userId: user?.id
            });
            response.data?.reverse();
            setFavoriteLocations(response.data?.slice(-2) || []);
        } catch (err) {
            console.error("Error fetching locations:", err);
        }
    };

    useEffect(() => {
        fetchFavoriteLocations();
    }, [user?.id]);

    return (
            <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto mt-[70px]">
                <h2 className="text-2xl font-semibold mb-4">Your Latest Favorites</h2>
                <div className="flex flex-col">
                    <LocationCardList locations={favoriteLocations} refetch={fetchFavoriteLocations} className="sm:grid-cols-2" />
                </div>
            </div>
    );
};

export default DashboardUser;
