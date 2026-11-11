import { Routes, Route } from "react-router-dom";
import { MainLayout } from "@layouts/";
import { useSvgSprite } from '@hooks/';
import { NotFound } from "@/pages";

export default function App() {
  useSvgSprite();

  return (
    <Routes>
      {/* Жодних пропсів vehicles та parts! Лейаут самостійно розбереться з даними */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<div>Головна сторінка</div>} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
