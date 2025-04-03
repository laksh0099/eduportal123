import Home from "./components/Home.jsx";
import Edit from "./components/Edit.jsx";
import New from "./components/New.jsx";

const AppRoutes = [
    {
        index: true,
        element: <Home />
    },
    {
        path: "/edit",
        element: <Edit />
    },
    {
        path: "/new",
        element: <New />
    }
];

export default AppRoutes;