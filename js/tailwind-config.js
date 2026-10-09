/* Cấu hình theme Tailwind (màu + font).
   Nếu đổi màu ở đây, nhớ đổi cả biến CSS tương ứng ở đầu css/styles.css. */
tailwind.config = {
  theme: {
    extend: {
      colors: {
        burgundy: '#6B1D2F',
        rosegold: '#B87333',
        softrose: '#E8C5C8',
        creamy: '#FFFDF9',
        champagne: '#F7E7CE',
      },
      fontFamily: {
        dancing: ['"Dancing Script"', 'cursive'],
        playfair: ['"Playfair Display"', 'serif'],
        montserrat: ['"Montserrat"', 'sans-serif'],
      },
    },
  },
};
