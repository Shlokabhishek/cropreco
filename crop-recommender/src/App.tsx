import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "./state/store";
import { logout } from "./state/slices/authSlice";
import { useLanguage } from "./i18n/LanguageContext";
import Login from "./components/Auth/Login";
import CropRecommendations from "./components/CropRecommendations/CropRecommendations";
import CropsToAvoid from "./components/CropsToAvoid/CropsToAvoid";
import FarmerProfile from "./components/FarmerProfile/FarmerProfile";
import WeatherTrends from "./components/WeatherTrends/WeatherTrends";
import PriceAnalysis from "./components/PriceAnalysis/PriceAnalysis";
import LanguageSelector from "./components/LanguageSelector/LanguageSelector";
import { useCropRecommendation } from "./hooks/useCropRecommendation";

function App() {
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
	const user = useSelector((state: RootState) => state.auth.user);
	const dispatch = useDispatch();
	const [showLoginModal, setShowLoginModal] = useState(false);
	const { t, formatMessage } = useLanguage();
	const { cropsToAvoid, status } = useCropRecommendation();

	const handleProfileClick = () => {
		if (isAuthenticated) {
			dispatch(logout());
		} else {
			setShowLoginModal(true);
		}
	};

	const welcomeMessage = isAuthenticated && user
		? formatMessage("welcomeUser", { name: user.name })
		: t.welcome;

	return (
		<div className="container">
			<header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
				<div>
					<h1 style={{ margin: 0 }}>{t.appTitle}</h1>
					<p style={{ margin: "0.25rem 0 0", color: "#475569" }}>
						{welcomeMessage}
					</p>
				</div>
				<div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
					<LanguageSelector />
					<button 
						onClick={handleProfileClick}
						style={{
							background: isAuthenticated ? "#22c55e" : "#3b82f6",
							color: "white",
							border: "none",
							borderRadius: "8px",
							padding: "10px 20px",
							fontSize: "16px",
							fontWeight: "600",
							cursor: "pointer",
							transition: "all 0.3s ease",
							display: "flex",
							alignItems: "center",
							gap: "8px"
						}}
						onMouseOver={(e) => {
							e.currentTarget.style.opacity = "0.9";
							e.currentTarget.style.transform = "translateY(-2px)";
						}}
						onMouseOut={(e) => {
							e.currentTarget.style.opacity = "1";
							e.currentTarget.style.transform = "translateY(0)";
						}}
					>
						<span style={{ fontSize: "20px" }}>👤</span>
						{isAuthenticated ? t.logout : t.login}
					</button>
				</div>
			</header>

			<div className="grid two">
				<FarmerProfile />
				<WeatherTrends />
				<CropRecommendations />
				<CropsToAvoid cropsToAvoid={cropsToAvoid} isLoading={status === "loading"} />
				<PriceAnalysis />
			</div>

			{showLoginModal && !isAuthenticated && (
				<div 
					style={{
						position: "fixed",
						top: 0,
						left: 0,
						right: 0,
						bottom: 0,
						backgroundColor: "rgba(0, 0, 0, 0.5)",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						zIndex: 1000
					}}
					onClick={() => setShowLoginModal(false)}
				>
					<div onClick={(e) => e.stopPropagation()}>
						<Login />
					</div>
				</div>
			)}
		</div>
	);
}

export default App;