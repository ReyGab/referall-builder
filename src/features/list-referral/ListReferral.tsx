import { useEffect, useCallback } from "react"
import type { JSX } from "react"
import Paper from "@mui/material/Paper"
import Grid from "@mui/material/Grid2"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import BasicTable from "../../common/components/BasicTable"
import ReferralRow from "../../common/components/ReferralRow"

import {
  deleteReferralApi,
  getReferralsApi,
} from "../list-referral/listReferralSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { selectedReferralInfo } from "./listReferralSlice"
import { IListReferralProps } from "../../interfaces/referalls.interface"

export const ListReferral = ({
  setEditingReferral,
}: IListReferralProps): JSX.Element => {
  const dispatch = useAppDispatch()
  const referralInfo = useAppSelector(selectedReferralInfo)

  useEffect(() => {
    dispatch(getReferralsApi())
  }, [dispatch])

  const onDeleteReferall = useCallback(
    (id: string) => {
      dispatch(deleteReferralApi(id))
    },
    [dispatch],
  )

  const renderReferralTbl = () => {
    const headerCells = (
      <>
        <TableCell>GIVEN NAME</TableCell>
        <TableCell>SURNAME</TableCell>
        <TableCell>EMAIL</TableCell>
        <TableCell>PHONE</TableCell>
        <TableCell>ACTIONS</TableCell>
      </>
    )

    return (
      <BasicTable headerCells={headerCells}>
        {referralInfo?.map(ref => (
          <ReferralRow
            key={ref.id}
            refObject={ref}
            onEdit={setEditingReferral}
            onDelete={onDeleteReferall}
          />
        ))}
      </BasicTable>
    )
  }

  return (
    <Grid sx={{ pt: 10 }} size={{ xs: 12, md: 6 }}>
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
