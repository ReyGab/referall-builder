import {  createAsyncThunk } from "@reduxjs/toolkit";
import { createAppSlice } from "../../app/createAppSlice";
import { IReferral, IReferralSliceState } from "../../interfaces/referalls.interface";

export const postReferralApi = createAsyncThunk<IReferral, IReferral>('referral/add', async (newReferral) => {
  const response = await fetch("http://localhost:9092/referrals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newReferral),
  });
   if (!response.ok) {
      throw new Error('Failed to add referrals');
    }

    return (await response.json()) as IReferral;
})

export const updateReferralApi = createAsyncThunk<IReferral, IReferral>('referral/add', async (updatedReferral) => {
  const response = await fetch(`http://localhost:9092/referrals/${updatedReferral.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedReferral),
  });
   if (!response.ok) {
      throw new Error('Failed to add referrals');
    }

    return (await response.json()) as IReferral;
})

const initialState: IReferralSliceState = {
  referralInfo: [],
  status: "idle",
} 

export const referralSlice = createAppSlice({
  name: 'referral',
  initialState,
    reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postReferralApi.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(postReferralApi.fulfilled, (state, action) => {
        state.status = 'idle';
        state.referralInfo = [...state.referralInfo, action.payload];
      })
      .addCase(updateReferralApi.fulfilled, (state, action) => {
        const index = state.referralInfo.findIndex(
          (r) => r.id === action.payload.id
        );
        if (index !== -1) state.referralInfo[index] = action.payload;
      })
      .addCase(postReferralApi.rejected, (state) => {
        state.status = 'failed';
      });
  },
  selectors: {
    selectedReferralInfo: state => state.referralInfo,
    selectedStatus: state => state.status,
  },
});

export const { selectedReferralInfo, selectedStatus } = referralSlice.selectors
