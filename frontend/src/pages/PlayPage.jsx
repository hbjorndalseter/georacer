import { useEffect } from 'react';
import Map from '../components/Map';

export default function PlayPage() {

    const mapId = 1; // Bruker map 1 i denne omgang

    return (
        <div className="w-screen h-screen bg-[#1b325e] justify-center items-center flex flex-col">
            <Map mapId={mapId} />
        </div>
    )
}