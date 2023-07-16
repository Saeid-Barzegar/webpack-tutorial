export function getMotivationamPictures() {
  return new Promise(resolve => {
    setTimeout(() => {
      const mockResponseDev = [
        'images/motivational-pictures/mountain.jpg',
        'images/motivational-pictures/darts.jpg',
        'images/motivational-pictures/passion.jpg',
      ];
      const mockResponseProd = [
        'images/motivational-pictures/mountain.webp',
        'images/motivational-pictures/darts.webp',
        'images/motivational-pictures/passion.webp',
      ];
      resolve(process.env.NODE_ENV === "production" ? mockResponseProd : mockResponseDev);
    }, 700)
  })
}

