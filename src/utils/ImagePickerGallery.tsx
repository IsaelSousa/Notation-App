import { ImageLibraryOptions, launchImageLibrary } from 'react-native-image-picker';

let options: ImageLibraryOptions = {
  mediaType: 'mixed'
};

export const GalleryPicker = async () => {
  return await launchImageLibrary(options);
};