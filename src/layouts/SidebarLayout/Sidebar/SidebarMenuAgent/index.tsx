import { useContext, useEffect, useState } from "react";

import {
  ListSubheader,
  alpha,
  Box,
  List,
  styled,
  Button,
  ListItem,
  Divider,
  useMediaQuery,
  Typography,
  Badge,
} from "@mui/material";
import { NavLink as RouterLink } from "react-router-dom";
import { SidebarContext } from "src/contexts/SidebarContext";
import TableChartTwoToneIcon from "@mui/icons-material/TableChartTwoTone";
import EditUserInfo from "src/content/pages/Components/Modals/EditUserInfo";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import { UserPriorityContext } from "src/contexts/UserPriorityProvider";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import AddAgentDialog from "src/content/pages/Components/Modals/AddAgent";
import AddUserDialog from "src/content/pages/Components/Modals/AddUser";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import EditIcon from "@mui/icons-material/Edit";
import DisplaySettingsIcon from "@mui/icons-material/DisplaySettings";
import TopUpDialog from "src/content/pages/Components/Modals/TopUpUser";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import MailIcon from "@mui/icons-material/Mail";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import RequestQuoteIcon from "@mui/icons-material/RequestQuote";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import Cookies from "universal-cookie";

const MenuWrapper = styled(Box)(
  ({ theme }) => `
  .MuiList-root {
    padding: ${theme.spacing(1)};

    & > .MuiList-root {
      padding: 0 ${theme.spacing(0)} ${theme.spacing(1)};
    }
  }

    .MuiListSubheader-root {
      text-transform: uppercase;
      font-weight: bold;
      font-size: ${theme.typography.pxToRem(12)};
      color: ${theme.colors.alpha.trueWhite[50]};
      padding: ${theme.spacing(0, 2.5)};
      line-height: 1.4;
    }
`
);

const SubMenuWrapper = styled(Box)(
  ({ theme }) => `
    .MuiList-root {
      .MuiListItem-root {
        padding: 1px 0;

        .MuiBadge-root {
          position: relative;
          left: 0px;

          .MuiBadge-standard {
            background: ${theme.colors.primary.main};
            font-size: ${theme.typography.pxToRem(10)};
            font-weight: bold;
            text-transform: uppercase;
            color: ${theme.palette.primary.contrastText};
          }
        }
    
        .MuiButton-root {
          display: flex;
          color: ${theme.colors.alpha.trueWhite[70]};
          background-color: transparent;
          width: 100%;
          justify-content: flex-start;
          padding: ${theme.spacing(1.2, 2)};

          .MuiButton-startIcon,
          .MuiButton-endIcon {
            transition: ${theme.transitions.create(["color"])};

            .MuiSvgIcon-root {
              font-size: inherit;
              transition: none;
            }
          }

          .MuiButton-startIcon {
            color: ${theme.colors.alpha.trueWhite[30]};
            font-size: ${theme.typography.pxToRem(20)};
            margin-right: ${theme.spacing(1)};
          }
          
          .MuiButton-endIcon {
            color: ${theme.colors.alpha.trueWhite[50]};
            margin-left: auto;
            opacity: .8;
            font-size: ${theme.typography.pxToRem(20)};
          }

          &.active,
          &:hover {
            background-color: ${alpha(theme.colors.alpha.trueWhite[100], 0.06)};
            color: ${theme.colors.alpha.trueWhite[100]};

            .MuiButton-startIcon,
            .MuiButton-endIcon {
              color: ${theme.colors.alpha.trueWhite[100]};
            }
          }
        }

        &.Mui-children {
          flex-direction: column;

          .MuiBadge-root {
            position: absolute;
            right: ${theme.spacing(7)};
          }
        }

        .MuiCollapse-root {
          width: 100%;

          .MuiList-root {
            padding: ${theme.spacing(1, 0)};
          }

          .MuiListItem-root {
            padding: 1px 0;

            .MuiButton-root {
              padding: ${theme.spacing(0.8, 3)};

              .MuiBadge-root {
                right: ${theme.spacing(3.2)};
              }

              &:before {
                content: ' ';
                background: ${theme.colors.alpha.trueWhite[100]};
                opacity: 0;
                transition: ${theme.transitions.create([
                  "transform",
                  "opacity",
                ])};
                width: 6px;
                height: 6px;
                transform: scale(0);
                transform-origin: center;
                border-radius: 20px;
                margin-right: ${theme.spacing(1.8)};
              }

              &.active,
              &:hover {

                &:before {
                  transform: scale(1);
                  opacity: 1;
                }
              }
            }
          }
        }
      }
    }
`
);

function SidebarMenuAgent() {
  const { closeSidebar } = useContext(SidebarContext);
  const { userPriority } = useContext(UserPriorityContext);
  const [selectValue, setSelectValue] = useState(1);
  const [addAgent, setAddAgent] = useState(false);
  const [addUser, setAddUser] = useState(false);
  const [badgeNumber, setBadgeNumber] = useState(0);
  const [withdrawbadgeNumber, setWithdrawBadgeNumber] = useState(0);
  const matches = useMediaQuery("(min-width:600px)");
  const cookies = new Cookies();

  const signOut = () => {
    cookies.remove('agentId');
    cookies.remove("depositNum");
    cookies.remove("withdrawNum");
    closeSidebar();
  };

  useEffect(() => {
    cookies.get("depositNum")
      ? setBadgeNumber(cookies.get("depositNum"))
      : setBadgeNumber(0);
    cookies.get("withdrawNum")
      ? setWithdrawBadgeNumber(cookies.get("withdrawNum"))
      : setWithdrawBadgeNumber(0);
  });

  console.log("sdfsdfdsf===>",withdrawbadgeNumber);

  return (
    <>
      <MenuWrapper>
        <List component="div">
          <SubMenuWrapper>
            <List component="div">
              <ListItem
                component="div"
                sx={{ marginTop: "12px", marginBottom: "2px" }}
              >
                <ListSubheader
                  component="div"
                  style={{ fontSize: "1.25rem", color: "white" }}
                  disableSticky
                >
                  Agent Dashboard
                </ListSubheader>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        <Divider />
        {!matches && (
          <>
            <Box
              display={"flex"}
              alignItems={"center"}
              justifyContent={"center"}
              padding={"10px"}
            >
              <Button
                variant="contained"
                component={RouterLink}
                onClick={signOut}
                to="/agent"
              >
                Sign Out
              </Button>
            </Box>
            <Divider />
          </>
        )}
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Pending Withdraw and Depoist
            </ListSubheader>
          }
          sx={{ marginTop: "10px" }}
        >
          <Box
            sx={{
              padding: "10px 10px 5px 10px",
              margin: "10px 15px 0px 15px",
              border: "#272c48 solid 1px",
              borderRadius: "10px",
            }}
          >
            <SubMenuWrapper>
              <List component="div">
                <ListItem component="div">
                  <Button
                    fullWidth
                    sx={{ justifyContent: "flex-end" }}
                    component={RouterLink}
                    onClick={closeSidebar}
                    to="/agent/app/request/depositrequest"
                  >
                    <Badge badgeContent={badgeNumber} color="primary">
                      <NotificationsActiveIcon color="action" />
                    </Badge>
                    <Typography
                      sx={{
                        overflowWrap: "anywhere",
                        color: "white",
                        paddingLeft: "15px",
                      }}
                    >
                      Deposit Request
                    </Typography>
                  </Button>
                </ListItem>
              </List>
            </SubMenuWrapper>
            <SubMenuWrapper>
              <List component="div">
                <ListItem component="div">
                  <Button
                    fullWidth
                    sx={{ justifyContent: "flex-end", padding: "5px" }}
                    component={RouterLink}
                    onClick={closeSidebar}
                    to="/agent/app/request/withdrawalrequest"
                  >
                    <Badge badgeContent={withdrawbadgeNumber} color="info"> 
                      <NotificationsActiveIcon color="error" />
                    </Badge>
                    <Typography
                      sx={{
                        overflowWrap: "anywhere",
                        color: "white",
                        paddingLeft: "15px",
                      }}
                    >
                      WithDraw Request
                    </Typography>
                  </Button>
                </ListItem>
              </List>
            </SubMenuWrapper>
          </Box>
        </List>
        <List
          component="div"
          subheader={
            <ListSubheader component="div" disableSticky>
              Management
            </ListSubheader>
          }
        >
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/agent/app/management/users"
                  startIcon={<SupervisedUserCircleIcon />}
                >
                  User Management
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/agent/app/management/deposithistory"
                  startIcon={<MonetizationOnIcon />}
                >
                  Deposit History
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
          <SubMenuWrapper>
            <List component="div">
              <ListItem component="div">
                <Button
                  disableRipple
                  component={RouterLink}
                  onClick={closeSidebar}
                  to="/agent/app/management/withdrawalhistory"
                  startIcon={<RequestQuoteIcon />}
                >
                  WithDraw History
                </Button>
              </ListItem>
            </List>
          </SubMenuWrapper>
        </List>
        <Box sx={{ minWidth: 120, m: "0px 20px 0px 20px" }}>
          {/* <FormControl fullWidth sx={{ p: "0px" }}>
            <InputLabel
              id="demo-simple-select-label"
              sx={{ padding: "0px", color: "white", p: "0px 10px 0px 10px" }}
            >
              Add and Edit
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue={1}
              label="Add and Edit"
              sx={{
                "& .MuiSelect-select": {
                  padding: "0px",
                  paddingLeft: "10px",
                },
                "& .MuiInputBase-input": {
                  padding: "0px",
                },
              }}
            >
                <MenuItem value={1} sx={{padding:'unset'}}>
                <Button
                    sx={{
                      color: "#b8b9c2",
                      width: "100%",
                      height: "100%",
                      justifyContent: "left"
                    }}
                    disabled
                  >
                    &nbsp;&nbsp;Select Action
                  </Button>
              </MenuItem>
              <MenuItem value={10} sx={{padding:'unset'}}>
              </MenuItem>
              <MenuItem value={20} sx={{padding:'unset'}}>
                <Button
                  onClick={() => setAddUser(true)}
                  sx={{
                    color: "#b8b9c2",
                    width: "100%",
                    justifyContent: "left",
                    p: "2",
                  }}
                >
                  <PersonAddAltIcon />
                  &nbsp;&nbsp;Add user
                </Button>
              </MenuItem>
            </Select>
          </FormControl> */}
          <AddAgentDialog open={addAgent} onClose={() => setAddAgent(false)} />
          <AddUserDialog open={addUser} onClose={() => setAddUser(false)} />
          {/* <EditUserInfo
            open={editUserInfo}
            onClose={() => setEditUserInfo(false)}
          /> */}
        </Box>
      </MenuWrapper>
    </>
  );
}

export default SidebarMenuAgent;