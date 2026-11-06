import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@layouts/";
import { useSvgSprite } from '@hooks/';
import { useEffect, useState } from "react";
import { Vehicle } from "@/types";

export default function App() {
  // Інжект спрайту
  useSvgSprite();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);

  useEffect(() => {
    // Controller для скасування запиту, якщо компонент розмонтувався
    const controller = new AbortController();

    const fetchVehicles = async () => {
      try {
        const res = await fetch('/data/vehicles.json', {
          signal: controller.signal,
        });

        if (!res.ok) {
          throw new Error(`Помилка сервера: ${res.status} ${res.statusText}`);
        }

        const data: Vehicle[] = await res.json();
        setVehicles(data);
      } catch (e: unknown) {
        if (e instanceof DOMException && e.name === 'AbortError') return;
        console.error('Failed to fetch vehicles:', e);
      }
    };

    fetchVehicles();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Routes>
      {/* Передаємо у MainLayout тільки vehicles */}
      <Route element={<MainLayout vehicles={vehicles}  />}>
        <Route path="/" element={<div>Головна</div>}/>
      </Route>
    </Routes>
  );
}
