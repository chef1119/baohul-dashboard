import { ChangeEvent, FC, useEffect, useRef, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardHeader,
  Divider,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { ellipseText } from "src/library/DataItemLib";
import Label from "src/components/Label";
import { AccountStatus, FiterType } from "src/models/crypto_order";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import { useGlobalApiClient } from "../../../core/useApiClient";
import { AgentUser } from "src/core/api-clients";
import { ArrowBack } from "@mui/icons-material";
import ApproveConfirm from "src/content/pages/Components/Modals/ApproveConfirm";
import RejectConfirm from "src/content/pages/Components/Modals/RejectConfirm";
import Cookies from "universal-cookie";

interface DepositHistoryTableProps {
  className?: string;
}

// const applyPagination = (
//   userDatas: any,
//   page: number,
//   limit: number
// ) => {
//   return userDatas.slice(page * limit, page * limit + limit);
// };

const getStatusLabel = (accountStatus: AccountStatus): JSX.Element => {
  const map = {
    disabled: {
      text: "Disabled",
      color: "error",
    },
    active: {
      text: "Active",
      color: "success",
    },
  };

  const { text, color }: any = map[accountStatus];

  return <Label color={color}>{text}</Label>;
};

const DepositHistoryTable: FC<DepositHistoryTableProps> = () => {
  const [selectedUserDatas, setSelectedUserDatas] = useState<number[]>([]);
  const [page, setPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);

  const [agentList, setAgentList] = useState([]);
  const [totalCount, setTotalCount] = useState(0);

  const [isFilter, setIsFilter] = useState(false);
  const api = useGlobalApiClient();
  const cookies = new Cookies();

  let approvedById = cookies.get("agentId");

  const handleResponse = (response) => {
    if(response.success){
      response?.items ? setAgentList(response.items) : setAgentList(response);
      response?.total ? setTotalCount(response.total) : 0;
    } else{
      console.log(response.error)
    }
  };

  //   const paginatedUserDatas: AgentUser[] = applyPagination(
  //     agentList,
  //     page,
  //     limit
  // );

  useEffect(() => {
    getData();
  }, [page, limit]);

  console.log("agendId",approvedById);

  const getData = async () => {
    setIsFilter(false);
    const { response } = await api.credit_GetUser_Deposit_post({
      context: {
        filter: {
          status: {
            approvedById: approvedById? approvedById : null
          },
        },
      },
      params: {  page: page + 1, size: limit },
    });
    response
      ? handleResponse(response)
      : NotificationManager.warning("Data is not existed");
  };



  const handlePageChange = (event: any, newPage: number): void => {
    setPage(newPage);
  };

  const handleLimitChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setLimit(parseInt(event.target.value));
  };

  return (
    <>
      <Card sx={{ marginBottom: "30px" }}>
        <CardHeader title="Deposit history" />
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align="center">Avatar</TableCell>
                <TableCell align="center">Name</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Amount</TableCell>
                <TableCell align="center">Approving by Agent</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {agentList.map((userData) => {
                const isUserDataSelected = selectedUserDatas.includes(
                  userData.id
                );
                return (
                  <TableRow
                    hover
                    key={userData.id}
                    selected={isUserDataSelected}
                  >
                    <TableCell align="center">
                      <img src="https://img.icons8.com/fluency/48/null/user-male-circle.png" />
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {userData.name}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {userData.email}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                      <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {userData.amount}
                      </Typography>
                    </TableCell>
                    <TableCell align="center">
                    <Typography
                        variant="body1"
                        fontWeight="bold"
                        color="text.primary"
                        gutterBottom
                        noWrap
                      >
                        {userData.status.approvedById}
                      </Typography>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <Box p={2}>
          <TablePagination
            component="div"
            count={totalCount}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25, 30]}
          />
        </Box>
      </Card>
    </>
  );
};

export default DepositHistoryTable