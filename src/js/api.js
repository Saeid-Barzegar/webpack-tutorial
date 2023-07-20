export function getMotivationamPictures() {
  return new Promise(resolve => {
    setTimeout(() => {
      const mockResponseDev = [
        'static/images/motivational-pictures/mountain.jpg',
        'static/images/motivational-pictures/darts.jpg',
        'static/images/motivational-pictures/passion.jpg',
      ];
      const mockResponseProd = [
        'static/images/motivational-pictures/mountain.webp',
        'static/images/motivational-pictures/darts.webp',
        'static/images/motivational-pictures/passion.webp',
      ];
      resolve(process.env.NODE_ENV === "production" ? mockResponseProd : mockResponseDev);
    }, 700)
  })
}

