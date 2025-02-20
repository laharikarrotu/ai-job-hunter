import { Box, CircularProgress } from '@mui/material'

const Loading = () => {
  return (
    <Box 
      className="flex items-center justify-center"
      sx={{ minHeight: '400px' }}
    >
      <CircularProgress />
    </Box>
  )
}

export default Loading 