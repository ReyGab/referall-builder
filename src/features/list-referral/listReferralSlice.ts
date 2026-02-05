import { createAppSlice } from "../../app/createAppSlice"
import { IReferral, IReferralSliceState } from "../../interfaces/referalls.interface";


const initialState: IReferralSliceState = {
  referralInfo: [],
  status: "idle",
}

export const referralSlice = createAppSlice({
  name: 'referral',
  initialState,
  reducers: (create) => ({
    getReferralsApi: create.asyncThunk(
      async (_, { rejectWithValue }) => {
        const response = await fetch(`http://localhost:9092/referrals`);
        if (!response.ok) {
          return rejectWithValue('Failed to fetch referrals');
        }
        return (await response.json()) as IReferral[];
      },
      {
        pending: (state) => {
          state.status = 'loading';
        },
        fulfilled: (state, action) => {
          state.status = 'idle';
          state.referralInfo = action.payload;
        },
        rejected: (state) => {
          state.status = 'failed';
        },
      }
    ),
    deleteReferralApi: create.asyncThunk(
      async (id: string) => {
          const response = await fetch(`http://localhost:9092/referrals/${id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          }
        });
        if (!response.ok) {
            throw new Error('Failed to delete referrals');
          }

        return { id } as IReferral;
      },
      {
        fulfilled: (state, action) => {
          state.referralInfo = state.referralInfo.filter(
            r => r.id !== action.payload.id
          );
        },
      }
    )
  }),
  // extraReducers: (builder) => {
  //   builder
  //     .addCase(getReferralsApi.pending, (state) => {
  //       state.status = 'loading';
  //     })
  //     .addCase(getReferralsApi.fulfilled, (state, action) => {
  //       state.status = 'idle';
  //       state.referralInfo = action.payload;
  //     })
  //     .addCase(getReferralsApi.rejected, (state) => {
  //       state.status = 'failed';
  //     })
  //     .addCase(deleteReferralApi.fulfilled, (state, action) => {
  //     state.referralInfo = state.referralInfo.filter(
  //       referral => referral.id !== action.payload.id
  //     );
  //     });
  // },
  selectors: {
    selectedReferralInfo: state => state.referralInfo,
    selectedStatus: state => state.status,
  },
});

export const { selectedReferralInfo, selectedStatus } = referralSlice.selectors

export const { getReferralsApi, deleteReferralApi } = referralSlice.actions;
