import {  createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice"
import { IReferral, IReferralSliceState } from "../../interfaces/referalls.interface";


const initialState: IReferralSliceState = {
  referralInfo: [],
  status: "idle",
}

export const getReferralsApi = createAsyncThunk<IReferral[]>('referral/get', async () => {
  const response = await fetch(`http://localhost:9092/referrals`);
  console.log(response, 'response');
   if (!response.ok) {
      throw new Error('Failed to fetch referrals');
    }

    return (await response.json()) as IReferral[];
})

export const deleteReferralApi = createAsyncThunk<IReferral, string>('referral/delete', async (id) => {
  const response = await fetch(`http://localhost:9092/referrals/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    }
  });
  console.log(response, 'response');
   if (!response.ok) {
      throw new Error('Failed to delete referrals');
    }

    return { id } as IReferral;
})

export const referralSlice = createAppSlice({
  name: 'referral',
  initialState,
    reducers: {
    getReferralsInfo: (state, action) => {
      state.referralInfo = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getReferralsApi.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getReferralsApi.fulfilled, (state, action) => {
        state.status = 'idle';
        state.referralInfo = action.payload;
      })
      .addCase(getReferralsApi.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(deleteReferralApi.fulfilled, (state, action) => {
      state.referralInfo = state.referralInfo.filter(
        referral => referral.id !== action.payload.id
      );
      });
  },
  selectors: {
    selectedReferralInfo: state => state.referralInfo,
    selectedStatus: state => state.status,
  },
});

export const { selectedReferralInfo, selectedStatus } = referralSlice.selectors
