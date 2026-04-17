import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import AppShell from "./components/AppShell";
import initialItems from "./data/items";
import AddItem from "./pages/AddItem";
import About from "./pages/About";
import ClaimItem from "./pages/ClaimItem";
import ClaimStatus from "./pages/ClaimStatus";
import OwnerClaims from "./pages/OwnerClaims";
import ViewItems from "./pages/ViewItems";

function App() {
  const [items, setItems] = useState(initialItems);
  const [claims, setClaims] = useState([]);

  const handleAddItem = (newItem) => {
    setItems((currentItems) => [newItem, ...currentItems]);
  };

  const handleSubmitClaim = (claimData) => {
    const newClaim = {
      id: Date.now(),
      item_id: claimData.item_id,
      user_name: claimData.user_name,
      user_description: claimData.user_description,
      status: "PENDING",
      meeting_location: "",
      meeting_time: "",
    };

    setClaims((currentClaims) => [newClaim, ...currentClaims]);
    return newClaim;
  };

  const handleApproveClaim = (claimId, meetingData) => {
    setClaims((currentClaims) =>
      currentClaims.map((claim) => {
        if (claim.id !== claimId) {
          return claim;
        }

        return {
          ...claim,
          status: "APPROVED",
          meeting_location: meetingData.meeting_location,
          meeting_time: meetingData.meeting_time,
        };
      })
    );
  };

  const pendingClaimsCount = claims.filter((claim) => claim.status === "PENDING").length;

  return (
    <AppShell pendingClaimsCount={pendingClaimsCount}>
      <Routes>
        <Route path="/" element={<ViewItems items={items} claims={claims} />} />
        <Route path="/add-item" element={<AddItem onAddItem={handleAddItem} />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/claim/:itemId"
          element={<ClaimItem items={items} onSubmitClaim={handleSubmitClaim} />}
        />
        <Route
          path="/owner-claims"
          element={<OwnerClaims claims={claims} items={items} onApproveClaim={handleApproveClaim} />}
        />
        <Route path="/my-claim/:claimId" element={<ClaimStatus claims={claims} items={items} />} />
      </Routes>
    </AppShell>
  );
}

export default App;
