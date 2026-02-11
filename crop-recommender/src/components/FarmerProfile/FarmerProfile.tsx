import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../state/store";
import { updateProfile } from "../../state/slices/userSlice";
import { clearRecommendations } from "../../state/slices/cropSlice";
import { useLanguage } from "../../i18n/LanguageContext";
import Card from "../shared/Card";
import Input from "../shared/Input";
import Button from "../shared/Button";
import { INDIAN_STATES, SOIL_TYPES, SEASONS } from "../../services/constants";
import "./FarmerProfile.css";

const FarmerProfile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.user.profile);
  const { t } = useLanguage();

  const handleLocationChange = (location: string) => {
    dispatch(updateProfile({ location }));
    if (location) {
      dispatch(updateProfile({
        coordinates: { lat: 28.7041, lon: 77.1025 }
      }));
    }
  };

  const handleSave = () => {
    // Clear recommendations to trigger re-fetch
    dispatch(clearRecommendations());
  };

  return (
    <Card title={`👤 ${t.farmerProfile}`}>
      <div className="profile__fields">
        <Input
          label={t.location}
          value={profile.location}
          onChange={handleLocationChange}
          placeholder={t.locationPlaceholder}
        />

        <div className="profile__select-wrapper">
          <label className="profile__label">{t.stateRequired}</label>
          <select
            className="profile__select"
            value={profile.state}
            onChange={(e) => dispatch(updateProfile({ state: e.target.value }))}
          >
            {INDIAN_STATES.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div className="profile__select-wrapper">
          <label className="profile__label">{t.soilTypeRequired}</label>
          <select
            className="profile__select"
            value={profile.soilType}
            onChange={(e) => dispatch(updateProfile({ soilType: e.target.value }))}
          >
            {SOIL_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="profile__select-wrapper">
          <label className="profile__label">{t.season}</label>
          <select
            className="profile__select"
            value={profile.season || ""}
            onChange={(e) => dispatch(updateProfile({ season: e.target.value || undefined }))}
          >
            <option value="">{t.allSeasons}</option>
            {SEASONS.map((season) => (
              <option key={season} value={season}>
                {season}
              </option>
            ))}
          </select>
        </div>

        <Input
          label={t.farmSize}
          type="number"
          value={profile.acreage}
          onChange={(v) => dispatch(updateProfile({ acreage: parseFloat(v) || 0 }))}
          placeholder={t.farmSizePlaceholder}
        />

        <Input
          label={t.budgetRequired}
          type="number"
          value={profile.budget}
          onChange={(v) => dispatch(updateProfile({ budget: parseFloat(v) || 0 }))}
          placeholder={t.budgetPlaceholder}
        />

        <div className="profile__checkbox-wrapper">
          <label className="profile__checkbox-label">
            <input
              type="checkbox"
              checked={profile.multipleCrops}
              onChange={(e) => dispatch(updateProfile({ multipleCrops: e.target.checked }))}
              className="profile__checkbox"
            />
            <span>I want to grow multiple crops on the same land</span>
          </label>
          {profile.multipleCrops && (
            <p className="profile__checkbox-hint">
              💡 We'll recommend crops that can be grown together (intercropping) or in sequence (crop rotation) to maximize land utilization and profitability.
            </p>
          )}
        </div>

        <div className="profile__actions">
          <Button label={t.saveProfile} onClick={handleSave} />
        </div>
      </div>
    </Card>
  );
};

export default FarmerProfile;