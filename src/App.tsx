import {Routes, Route} from "react-router-dom";
import {MainLayout} from "@layouts/";
import {useSvgSprite} from '@hooks/';
import {useEffect, useState} from "react";
import {Vehicle, Part} from "@/types";
import {NotFound} from "@/pages";

export default function App() {
  useSvgSprite();

  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [parts, setParts] = useState<Part[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const [vehiclesRes, partsRes] = await Promise.all([
          fetch('/data/vehicles.json', {signal: controller.signal}),
          fetch('/data/parts.json', {signal: controller.signal}),
        ]);

        if (!vehiclesRes.ok || !partsRes.ok) {
          throw new Error('Помилка завантаження даних сервера');
        }

        const vehiclesData: Vehicle[] = await vehiclesRes.json();
        const partsData: Part[] = await partsRes.json();

        setVehicles(vehiclesData);
        setParts(partsData);
      } catch (e: unknown) {
        if (e instanceof DOMException && e.name === 'AbortError') return;
        console.error('Failed to fetch data:', e);
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <Routes>
      <Route element={<MainLayout vehicles={vehicles} parts={parts}/>}>
        <Route path="/" element={<div>Головна сторінка</div>}/>
        <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
  );
}
