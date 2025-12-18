import { Route, Routes } from "react-router-dom";

import RootLayout from "./root-layout";
import HomePage from "./pages/home-page";
import ExplorePage from "./pages/explore-page";

export type AppRoute = "/" | "/explore";

export default function App() {
    return (
        <>
            <Routes>
                <Route element={<RootLayout />}>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/explore" element={<ExplorePage />} />
                </Route>
            </Routes>
        </>
    );
}
