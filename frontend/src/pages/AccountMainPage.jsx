import { Box, Card, Container, Paper, Typography } from "@mui/material"



export default function AccountMainPage(){

    const accounts = [1,2,3,4,5,6,7,]



    return(<>
    <Container>
        <Box>
            {accounts.map((x) => (  
            <Card key = {x}>
                <Typography>{x}</Typography>
            </Card> 
            ))}             
        </Box>
        <Box>
            <Paper>
                <Typography>List of mapped transactions will be here</Typography>
            </Paper>
        </Box>
    </Container>
    
    </>)
}