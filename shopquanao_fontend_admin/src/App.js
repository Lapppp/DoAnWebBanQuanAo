<<<<<<< HEAD
// Import libraries and components
=======
>>>>>>> 1995ee8b2c36df87f41783e7ce5774a8b3ee5100
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DefaultLayout from "./Layout/DefaultLayout";

//import AdminLayout from "./Layout/AdminLayout"; // Import AdminLayout
//import { publicAdminRoutes, priveRoutes, publicClientRoutes } from "./Routes";
import { publicAdminRoutes } from "./Routes";



function App() {  

  return (
    <Router>
      <div className="wrapper">
        <Routes>
          {/* Route for Admin pages */}
          <Route
            path="/admin/*"
            element={
              <DefaultLayout>
                <Routes>
                  {publicAdminRoutes.map((route, index) => (
                    <Route
                      key={index}
                      path={route.path}
                      element={<route.Compoment />}
                    />
                  ))}
                </Routes>
              </DefaultLayout>
            }
          />

         
        </Routes>
      </div>
    </Router>


  );
}

export default App;