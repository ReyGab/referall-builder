import React, { memo } from "react"
import TableCell from "@mui/material/TableCell"
import TableRow from "@mui/material/TableRow"
import IconButton from "@mui/material/IconButton"
import DeleteIcon from "@mui/icons-material/Delete"
import EditIcon from "@mui/icons-material/Edit"
import { IReferral } from "../../interfaces/referalls.interface"

interface ReferralRowProps {
  refObject: IReferral
  onEdit: (referral: IReferral) => void
  onDelete: (id: string) => void
}

const ReferralRow = memo(
  ({ refObject, onEdit, onDelete }: ReferralRowProps) => (
    <TableRow>
      <TableCell>{refObject.givenName}</TableCell>
      <TableCell>{refObject.surName}</TableCell>
      <TableCell>{refObject.email}</TableCell>
      <TableCell>{refObject.phone}</TableCell>
      <TableCell>
        <IconButton onClick={() => onEdit(refObject)}>
          <EditIcon />
        </IconButton>
        <IconButton onClick={() => onDelete(refObject.id)}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  ),
)

export default ReferralRow
