export interface IReferral {
      id: string,
      givenName: string,
      surName: string,
      email: string,
      phone: string,
      homeName: string,
      street: string,
      suburb: string,
      state: string,
      postCode: string,
      country: string
}

export interface IReferralSliceState {
  referralInfo: IReferral[] 
  status: "idle" | "loading" | "failed"
}

export interface IListReferralProps { 
  setEditingReferral: (referral: IReferral | null) => void
}


export interface ICreateReferralProps {
  referralToEdit: IReferral | null
  clearEditing: () => void
}