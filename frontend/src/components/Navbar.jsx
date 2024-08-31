// import { useState } from 'react';
// import Tabs from '@mui/material/Tabs';
// import Tab from '@mui/material/Tab';
// import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import { useNavigate } from 'react-router-dom';
// import { createTheme, ThemeProvider } from '@mui/material';

// const theme = createTheme({
//   palette: {
//     primary: {
//       light: '#757ce8',
//       main: '#01579b',
//       dark: '#002884',
//       contrastText: '#fff',
//     },
//     secondary: {
//       light: '#ff7961',
//       main: '#01579b',
//       dark: '#ba000d',
//       contrastText: '#000',
//     },
//   },
// });


// export default function Navbar(){

//   const [page, setPage] = useState("home");
//   const navigate = useNavigate()

//   const handleChange = (event, newValue) => {

//     setPage(newValue)

//     if (newValue === "home") {
//       navigate("/")
//     } else if (newValue === "signIn") {
//       navigate("/signin")
//     } else if (newValue === "signUp") {
//       navigate("/signup")
//     } else if (newValue === "about") {
//       navigate("/about")
//     } else if (newValue === "facts") {
//       navigate("/facts")
//     }
//   }

  

//   return (
//     <ThemeProvider theme={theme}>
//     <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center'}}>

//       <Tabs
//         value={page}
//         onChange={handleChange}
//         textColor="secondary"
//         indicatorColor="secondary"
//         aria-label="homePageMenu"
//         variant="scrollable"
//         scrollButtons="auto"
//       >
//         <Tab sx={{ mx: 2 }} value="home" label="Home" />
//         <Tab sx={{ mx: 2 }} value="signIn" label="Sign In" />
//         <Tab sx={{ mx: 2 }} value="signUp" label="Sign Up" />
//         <Tab sx={{ mx: 2 }} value="about" label="About" />
//         <Tab sx={{ mx: 2 }} value="facts" label="FAQ" />
//       </Tabs>
//     </Box>
//     </ThemeProvider>
//   )
// }
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';

const pages = ['home', 'sign in', 'sign up', 'about', 'FAQ'];

export default function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [page, setPage] = useState("home");
  const navigate = useNavigate()

  const handleChange = (event, newValue) => {

    setPage(newValue)

    if (newValue === "home") {
      navigate("/")
    } else if (newValue === "sign in") {
      navigate("/signin")
    } else if (newValue === "sign up") {
      navigate("/signup")
    } else if (newValue === "about") {
      navigate("/about")
    } else if (newValue === "FAQ") {
      navigate("/facts")
    }
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            // href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            WALLY
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} 
                onClick={() => {
                  handleChange(null, page);
                  handleCloseNavMenu();
                }}>
                <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
              </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            WALLY
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
              key={page}
              onClick={() => handleChange(null, page)}
              sx={{ my: 2, color: 'white', display: 'block' }}
            >
              {page}
            </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
