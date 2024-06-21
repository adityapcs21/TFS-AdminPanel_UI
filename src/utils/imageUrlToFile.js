// Exporting the urlToObject function
export const ImageUrlToFile = async (image) => {
 const response = await fetch(image);
 const blob = await response.blob();
 const file = new File([blob], image, { type: blob.type });
 return file
}