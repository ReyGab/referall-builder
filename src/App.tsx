import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import { CreateReferral } from "./features/create-referral/CreateReferral";
import { ListReferral } from "./features/list-referral/ListReferral";
import { useState } from "react";
import { IReferral } from "./interfaces/referalls.interface";

export const App = () => {
  const [editingReferral, setEditingReferral] = useState<IReferral | null>(null);
  console.log(editingReferral, 'editingReferral');
  return (
    <div className="App">
      <div className="App-header">
        <Box sx={{ p: 2 }}>
          <Grid container spacing={8}>
            {/* Pass editingReferral to CreateReferral */}
            <CreateReferral
              referralToEdit={editingReferral}
              clearEditing={() => setEditingReferral(null)}
            />
            {/* Pass setEditingReferral to ListReferral */}
            <ListReferral setEditingReferral={setEditingReferral} />
          </Grid>
        </Box>
      </div>
    </div>
  );
};
