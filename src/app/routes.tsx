import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { HomePage } from "./components/HomePage";
import { PredictPage } from "./components/PredictPage";
import { MapPage } from "./components/MapPage";
import { HistoryPage } from "./components/HistoryPage";
import { ProfilePage } from "./components/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: HomePage },
      { path: "predict", Component: PredictPage },
      { path: "map", Component: MapPage },
      { path: "history", Component: HistoryPage },
      { path: "profile", Component: ProfilePage },
    ],
  },
]);
