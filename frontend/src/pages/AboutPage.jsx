import { Card, Container, Box}  from '@mui/material';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import aloyImage from "../assets/aloy.jpg"
import zephanImage from "../assets/zephan.jpg"
import mhImage from "../assets/mh.jpg"


export default function AboutPage() {

  return (<>
    <Box sx={{m: 2}}>
    <Typography sx={{textAlign: "center", fontSize: 60}}>Founders</Typography>
    </Box>
    <Container sx={{display: {xs: 'block', md: "flex"}, justifyContent: "space-around", alignItems: "center" }}> 
      <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
      <a href='https://github.com/zeffun'>
        <CardMedia
          component="img"
          height="300"
          image={zephanImage}
          alt="zephan"
        />
        </a>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Zephan
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Hello 
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
      <a href='https://github.com/Aloyleow'>
        <CardMedia
          component="img"
          height="300"
          image={aloyImage}
          alt="aloy"
        />
      </a>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Aloysious Leow
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Hello 
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
      <a href='https://github.com/gopperlie'>
        <CardMedia
          component="img"
          height="300"
          image={mhImage}
          alt="minghan"
        />
      </a>  
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Ming Han
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Hello 
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
    </Container>
    </>
  );
}
