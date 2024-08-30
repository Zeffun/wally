import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { useNavigate } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';

const theme = createTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#01579b',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#01579b',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});


export default function Navbar(){

  const [page, setPage] = useState("home");
  const navigate = useNavigate()

  const handleChange = (event, newValue) => {

    setPage(newValue)

    if (newValue === "home") {
      navigate("/")
    } else if (newValue === "signIn") {
      navigate("/signin")
    } else if (newValue === "signUp") {
      navigate("/signup")
    } else if (newValue === "about") {
      navigate("/about")
    } else if (newValue === "facts") {
      navigate("/facts")
    }
  }

  

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center'}}>
      <Tabs
        value={page}
        onChange={handleChange}
        textColor="secondary"
        indicatorColor="secondary"
        aria-label="homePageMenu"
        variant="scrollable"
        scrollButtons="auto"
      >
        <Tab sx={{ mx: 2 }} value="home" label="Home" />
        <Tab sx={{ mx: 2 }} value="signIn" label="Sign In" />
        <Tab sx={{ mx: 2 }} value="signUp" label="Sign Up" />
        <Tab sx={{ mx: 2 }} value="about" label="About" />
        <Tab sx={{ mx: 2 }} value="facts" label="FAQ" />
      </Tabs>
    </Box>
    </ThemeProvider>
  )
}

// export default function MenuListComposition() {
//   const [open, setOpen] = React.useState(false);
//   const anchorRef = React.useRef(null);

//   const handleToggle = () => {
//     setOpen((prevOpen) => !prevOpen);
//   };

//   const handleClose = (event) => {
//     if (anchorRef.current && anchorRef.current.contains(event.target)) {
//       return;
//     }

//     setOpen(false);
//   };

//   function handleListKeyDown(event) {
//     if (event.key === "Tab") {
//       event.preventDefault();
//       setOpen(false);
//     } else if (event.key === "Escape") {
//       setOpen(false);
//     }
//   }

//   // return focus to the button when we transitioned from !open -> open
//   const prevOpen = React.useRef(open);
//   React.useEffect(() => {
//     if (prevOpen.current === true && open === false) {
//       anchorRef.current.focus();
//     }

//     prevOpen.current = open;
//   }, [open]);

//   return (
//     <Stack direction="row" spacing={2}>
//       <Paper>
//         <MenuList>
//           <MenuItem component={NavLink} to="/">
//             Home
//           </MenuItem>
//           <MenuItem component={NavLink} to="/">
//             Log in
//           </MenuItem>
//           <MenuItem component={NavLink} to="/">
//             Sign up
//           </MenuItem>
//           <MenuItem component={NavLink} to="/">
//             Accounts
//           </MenuItem>
//           <MenuItem component={NavLink} to="/">
//             FAQ
//           </MenuItem>
//         </MenuList>
//       </Paper>
//       <div>
//         <Button
//           ref={anchorRef}
//           id="composition-button"
//           aria-controls={open ? "composition-menu" : undefined}
//           aria-expanded={open ? "true" : undefined}
//           aria-haspopup="true"
//           onClick={handleToggle}
//         >
//           Dashboard
//         </Button>
//         <Popper
//           open={open}
//           anchorEl={anchorRef.current}
//           role={undefined}
//           placement="bottom-start"
//           transition
//           disablePortal
//         >
//           {({ TransitionProps, placement }) => (
//             <Grow
//               {...TransitionProps}
//               style={{
//                 transformOrigin:
//                   placement === "bottom-start" ? "left top" : "left bottom",
//               }}
//             >
//               <Paper>
//                 <ClickAwayListener onClickAway={handleClose}>
//                   <MenuList
//                     autoFocusItem={open}
//                     id="composition-menu"
//                     aria-labelledby="composition-button"
//                     onKeyDown={handleListKeyDown}
//                   >
//                     <MenuItem onClick={handleClose}>Home</MenuItem>
//                     <MenuItem onClick={handleClose}>Log in</MenuItem>
//                     <MenuItem onClick={handleClose}>Sign up</MenuItem>
//                   </MenuList>
//                 </ClickAwayListener>
//               </Paper>
//             </Grow>
//           )}
//         </Popper>
//       </div>
//     </Stack>
//   );
// }
