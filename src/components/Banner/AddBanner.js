// import { Box, Button, Grid, IconButton, Typography } from '@mui/material'
// import React from 'react'

// export default function AddBanner() {
//  return (
//   <Grid container>

//    <Grid item xs={12}>
//     <Typography>Attachment</Typography>
//     <Box sx={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
//      <input
//       name="attachments"
//       multiple
//       type="file"
//       id="fileInput"
//       onChange={handleFileChange}
//       style={{ display: 'none' }}
//      />
//      <label htmlFor="fileInput">
//       <IconButton component="span">
//        <CloudUploadIcon />
//       </IconButton>
//      </label>
//      <Button sx={{ display: 'none' }} variant="contained" component="span" onClick={() => document.getElementById('fileInput').click()}>
//       Upload
//      </Button>
//      {file.length > 0 && (
//       <Grid display="flex">
//        {file.map((url, index) => (
//         <Grid >
//          <ImageWrapper key={index}>
//           <DisplayAttachment src={url} />
//           <CloseIconCont>
//            <CancelIcon onClick={() => handleRemoveImages(url)} />
//           </CloseIconCont>
//          </ImageWrapper>
//         </Grid>
//        ))}
//       </Grid>
//      )}
//     </Box>

//    </Grid>
//    <Grid item xs={12}>
//     <Box sx={{ display: "flex", justifyContent: 'flex-end', gap: '10px' }}>
//      <Button variant="contained" color="warning" onClick={onClose}>Cancel</Button>
//      <Button type="submit" variant="contained" color="primary">Add Blog</Button>
//     </Box>
//    </Grid>
//   </Grid >
//  )
// }
import React from 'react'

export default function AddBanner() {
 return (
  <div>AddBanner</div>
 )
}
