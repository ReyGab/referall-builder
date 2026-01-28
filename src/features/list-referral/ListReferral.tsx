import { useEffect } from "react"
import type { JSX } from "react"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid2"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"

import {
  deleteReferralApi,
  getReferralsApi,
} from "../list-referral/listReferralSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectedReferralInfo } from "./listReferralSlice"
import { IReferral } from "../../interfaces/referalls.interface"

type ListReferralProps = {
  setEditingReferral: (referral: IReferral | null) => void
}

export const ListReferral = ({
  setEditingReferral,
}: ListReferralProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const referralInfo = useAppSelector(selectedReferralInfo)

  useEffect(() => {
    dispatch(getReferralsApi())
  }, [dispatch])

  const onDeleteReferall = (id: string) => {
    dispatch(deleteReferralApi(id))
  }

  const renderReferralTbl = () => {
    return (
      <TableContainer sx={{ width: "100%" }}>
        <Table sx={{ m: 0, width: "100%" }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>GIVEN NAME</TableCell>
              <TableCell>SURNAME</TableCell>
              <TableCell>EMAIL</TableCell>
              <TableCell>PHONE</TableCell>
              <TableCell>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {referralInfo?.map(ref => (
              <TableRow key={ref.id}>
                <TableCell>{ref.givenName}</TableCell>
                <TableCell>{ref.surName}</TableCell>
                <TableCell>{ref.email}</TableCell>
                <TableCell>{ref.phone}</TableCell>
                <TableCell>
                  <IconButton onClick={() => setEditingReferral(ref)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDeleteReferall(ref.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  return (
    <Grid sx={{pt: 10}} size={{ xs: 12, md: 6 }}>
      <Paper
        sx={{
          width: { xs: "100%", md: "40vw" },
          height: { xs: 400, md: "80vh" },
          borderRadius: 0,
          overflowY: "auto",
          p: 2,
        }}
      >
        <div>{renderReferralTbl()}</div>
      </Paper>
    </Grid>
  )
}
