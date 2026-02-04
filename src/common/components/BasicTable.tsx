import React from "react"
import type { ReactNode } from "react"
import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"

interface BasicTableType {
  headerCells: ReactNode
  children: ReactNode
}

export const BasicTable = ({ headerCells, children }: BasicTableType) => {
  return (
    <TableContainer sx={{ width: "100%" }}>
      <Table sx={{ m: 0, width: "100%" }}>
        <TableHead>
          <TableRow>
            {headerCells}
          </TableRow>
        </TableHead>
        <TableBody>
          {children}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
