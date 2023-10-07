import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Stack,
  TextField,
  Typography,
  Unstable_Grid2 as Grid,
} from '@mui/material';

export const Welcome = () => (
  <>
    <Container
      maxWidth='sm'
      sx={{
        flex: 1,
        overflowY: 'auto',
      }}
    >
      <Grid
        container
        justifyContent='center'
        spacing={3}
        sx={{
          paddingTop: '2rem',
          paddingBottom: '2rem',
        }}
      >
        <Grid>
          <Typography
            variant='h5'
            style={{
              fontWeight: 'bold',
              textTransform: 'uppercase',
            }}
          >
            Droids of Republic
          </Typography>
        </Grid>
        <Grid xs={12}>
          <Card
            sx={{
              background: 'none',
            }}
          >
            <CardMedia
              sx={{ height: 340 }}
              image='/droid-scanner/welcome.png'
              title='green iguana'
            />
            <CardContent
              sx={{
                marginTop: '-6rem',
                borderRadius: '2rem',
                background: 'rgba(35, 45, 60, 0.4)',
                borderBottomLeftRadius: '1rem',
                borderBottomRightRadius: '1rem',
                backdropFilter: 'blur(8px)',
              }}
            >
              <Stack direction='column' gap={2}>
                <Typography
                  gutterBottom
                  variant='h5'
                  component='div'
                  align='center'
                >
                  Welcome to our ranks!
                </Typography>

                <TextField
                  label='What is your name, padawan?'
                  variant='outlined'
                  size='medium'
                />
                <Button variant='text' color='primary'>
                  Generate nickname
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid xs={12}>
          <Button fullWidth variant='contained' size='large'>
            Join Now!
          </Button>
        </Grid>
      </Grid>
    </Container>
  </>
);
