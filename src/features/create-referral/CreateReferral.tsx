import type { JSX } from "react"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import Grid from "@mui/material/Grid2"
import Box from "@mui/material/Box"
import { Button } from "@mui/material"
import { Formik, Form } from "formik"
import FormikTextField from "../../common/FormikTextField/index"
import { postReferralApi, updateReferralApi } from "./createReferralSlice"
import { getReferralsApi } from "../list-referral/listReferralSlice"
import { useAppDispatch } from "../../app/hooks"
import { IReferral, ICreateReferralProps } from "../../interfaces/referalls.interface"
import { INITIAL_STATE, CREATE_REFERRAL, UPDATE_REFERRAL } from "./constant"
import { v4 as uuidv4 } from "uuid"
import styles from "./CreateReferral.module.css"



export const CreateReferral = ({
  referralToEdit,
  clearEditing,
}: ICreateReferralProps): JSX.Element => {
  const dispatch = useAppDispatch()

  const initialValues = referralToEdit ?? INITIAL_STATE

  const buttonName = referralToEdit ? UPDATE_REFERRAL : CREATE_REFERRAL

  const renderAddressDetails = () => {
    return (
      <div>
        <Typography
          align="left"
          variant="subtitle1"
          sx={{ fontWeight: 700, color: "#b4b4b4" }}
        >
          ADDRESS
        </Typography>
        <Divider />
        <Grid
          container
          spacing={4}
          sx={{
            textAlign: "left",
          }}
        >
          <Grid size={{ xs: 6, sm: 6, md: 6 }}>
            <Typography variant="caption" color="text.secondary">
              HOME NAME OR #
            </Typography>
            <FormikTextField name="homeName" />
          </Grid>

          <Grid size={{ xs: 6, sm: 6, md: 6 }}>
            <Typography variant="caption" color="text.secondary">
              STREET
            </Typography>
            <FormikTextField name="street" />
          </Grid>
          <Grid size={{ xs: 6, sm: 6, md: 6 }}>
            <Typography variant="caption" color="text.secondary">
              SUBURB
            </Typography>
            <FormikTextField name="suburb" />
          </Grid>
          <Grid size={{ xs: 6, sm: 6, md: 6 }}>
            <Typography variant="caption" color="text.secondary">
              STATE
            </Typography>
            <FormikTextField name="state" />
          </Grid>
          <Grid size={{ xs: 6, sm: 6, md: 6 }}>
            <Typography variant="caption" color="text.secondary">
              POSTCODE
            </Typography>
            <FormikTextField name="postCode" />
          </Grid>
          <Grid size={{ xs: 6, sm: 6, md: 6 }}>
            <Typography variant="caption" color="text.secondary">
              COUNTRY
            </Typography>
            <FormikTextField name="country" />
          </Grid>
        </Grid>
      </div>
    )
  }

  const renderPersonalDetails = () => {
    return (
      <div>
        <Typography
          align="left"
          variant="subtitle1"
          sx={{ fontWeight: 700, color: "#b4b4b4" }}
        >
          PERSONAL DETAILS
        </Typography>
        <Divider />
        <Grid
          container
          spacing={4}
          sx={{
            textAlign: "left",
          }}
        >
          <Grid size={{ xs: 6, sm: 6, md: 6 }}>
            <Typography variant="caption" color="text.secondary">
              GIVEN NAME
            </Typography>
            <FormikTextField name="givenName" required />
          </Grid>

          <Grid size={{ xs: 6, sm: 6, md: 6 }}>
            <Typography variant="caption" color="text.secondary">
              SURNAME
            </Typography>
            <FormikTextField name="surName" required />
          </Grid>
          <Grid size={{ xs: 6, sm: 6, md: 6 }}>
            <Typography variant="caption" color="text.secondary">
              EMAIL
            </Typography>
            <FormikTextField name="email" required />
          </Grid>
          <Grid size={{ xs: 6, sm: 6, md: 6 }}>
            <Typography variant="caption" color="text.secondary">
              PHONE
            </Typography>
            <FormikTextField name="phone" required />
          </Grid>
        </Grid>
      </div>
    )
  }

  const renderReferralDetails = () => {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 4,
          mt: 2,
        }}
      >
        {renderPersonalDetails()}
        {renderAddressDetails()}
      </Box>
    )
  }

  const onCreateReferral = async (newReferral: IReferral) => {
    try {
      if (referralToEdit) {
        await dispatch(updateReferralApi(newReferral)).unwrap()
        clearEditing()
      } else {
        await dispatch(postReferralApi(newReferral)).unwrap()
      }
      await dispatch(getReferralsApi()).unwrap()
    } catch (e) {
      console.log(e)
    }
  }

  const renderActionButtons = (
    submitForm: () => Promise<void>,
    isValid: Boolean,
  ) => {
    return (
      <Grid container spacing={4} className={styles.actionButtons}>
        <Grid size={{ xs: 6, sm: 6, md: 6 }}>
          <Button
            fullWidth
            sx={{
              p: 2,
              background: "#ffff",
              color: "#bebebe",
              fontWeight: 600,
            }}
            variant="contained"
          >
            UPLOAD AVATAR
          </Button>
        </Grid>

        <Grid size={{ xs: 6, sm: 6, md: 6 }}>
          <Button
            fullWidth
            sx={{
              p: 2,
              background: "#6bdc80",
              fontWeight: 600,
            }}
            variant="contained"
            onClick={() => {
              submitForm()
            }}
            disabled={!isValid}
          >
            {buttonName}
          </Button>
        </Grid>
      </Grid>
    )
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(val, { resetForm }) => {
        const payload: IReferral = referralToEdit
          ? { ...referralToEdit, ...val }
          : { ...val, id: uuidv4() }

        onCreateReferral(payload)
        resetForm()
      }}
      enableReinitialize={true}
      validateOnMount={true}
      validate={values => {
        const errors: Partial<typeof values> = {}
        if (!values.givenName) errors.givenName = "Given Name is required"
        if (!values.surName) errors.surName = "Surname is required"
        if (!values.email) errors.email = "Email is required"
        if (!values.phone) errors.phone = "Phone is required"
        return errors
      }}
    >
      {({ submitForm, isValid }) => {
        return (
          <Form>
            <Grid size={{ xs: 12, md: 6 }}>
              <Paper
                sx={{
                  width: { xs: "100%", md: "40vw" },
                  height: { xs: "auto", md: "100vh" },
                  borderRadius: 0,
                  overflowY: "auto",
                  p: 2,
                }}
              >
                <div className={styles.container}>
                  <Typography align="left" variant="h4" mt={2}>
                    Referral Builder
                  </Typography>
                  <Box className={styles.referralBox}>
                    {renderReferralDetails()}
                    {renderActionButtons(submitForm, isValid)}
                  </Box>
                </div>
              </Paper>
            </Grid>
          </Form>
        )
      }}
    </Formik>
  )
}
