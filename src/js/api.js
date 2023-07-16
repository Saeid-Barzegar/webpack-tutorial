export function getMotivationamPictures() {
  return new Promise(resolve => {
    setTimeout(() => {
      const mockResponse = [
        'images/motivational-pictures/mountain.jpg',
        'images/motivational-pictures/darts.jpg',
        'images/motivational-pictures/passion.jpg',
      ];
      resolve(mockResponse);
    }, 700)
  })
}

