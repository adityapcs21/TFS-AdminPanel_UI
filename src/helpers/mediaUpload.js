import jwtInterceptor from "./jwtInterceptors";

let axiosConfig = {
 headers: {
  "Authorization": localStorage.getItem("token")
 }
};

export const getS3SignedUrl = async (data) => {
 try {
  const response = await jwtInterceptor.get(`https://rudf4zn65l.execute-api.ap-south-1.amazonaws.com/dev/getSignedUrl?mediaType=${data.mediaType}&fileName=${data.fileName}`, axiosConfig);
  if (response.data) {
   let filee = data.file
   let Url = response.data.data.s3SignedUrl
   let response2 = await jwtInterceptor.put(Url, filee)
   if (response2 && response.status === 200) {
    return response.data.data.url
   }
  }
 } catch (error) {
  console.error(error);
 }
}