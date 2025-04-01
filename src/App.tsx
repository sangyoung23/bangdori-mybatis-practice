import { Navigate, Route, Routes } from 'react-router-dom'
import Loader from 'components/Elements/Loader/Loader'
import Login from 'components/Pages/Login/Login'
import Home from 'components/Pages/Home/Home'
import Map from 'components/KakaoMap/Map'
import ProdRegistration from 'components/Pages/ProdRegistration/ProdRegistration'
import BarRegistration from 'components/Pages/BarRegistration/BarRegistration'
import RentRegistration from 'components/Pages/RentRegistration/RentRegistration'

const App = () => {
    return (
        <>
            <Loader />
            <Routes>
                <Route path="/" element={<Navigate to="/login" />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/map" element={<Map />} />
                <Route
                    path="/product/registration"
                    element={<ProdRegistration />}
                />
                <Route
                    path="/bargain/registration"
                    element={<BarRegistration />}
                />
                <Route
                    path="/rent/registration"
                    element={<RentRegistration />}
                />
            </Routes>
        </>
    )
}

export default App
