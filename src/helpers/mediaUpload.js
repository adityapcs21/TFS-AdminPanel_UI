import jwtInterceptor from "./jwtInterceptors";

let axiosConfig = {
 headers: {
  "Authorization": localStorage.getItem("token")
 }
};

export const getS3SignedUrl = async (data) => {
 try {
  const response = await jwtInterceptor.get(`${process.env.REACT_APP_API_ENDPOINT}getSignedUrl?mediaType=${data.mediaType}&fileName=${data.fileName}`, axiosConfig);
  if (response.data) {
   let filee = data.file
   let Url = response.data.data.s3SignedUrl
   let UID = response.data.data.uid
   let response2 = await jwtInterceptor.put(Url, filee)
   if (response2 && response.status === 200) {
    return { uid: UID, url: response.data.data.url }
   }
  }
 } catch (error) {
  console.error(error);
 }
}