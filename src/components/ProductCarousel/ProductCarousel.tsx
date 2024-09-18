import Slider from 'react-slick';
import { Box, Image, Text } from "@chakra-ui/react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Product } from '../../api/types';
import { Link } from 'react-router-dom';


interface Props {
  title: string;
  products: Product[];
}


const ProductCarousel = ({ title, products }: Props) => {

  const slickStyles = `
  .slick-prev, .slick-next {
    color: green;
    z-index: 2;
  }
  .slick-prev:hover, .slick-next:hover {
    color: green;
  }
  .slick-prev::before, .slick-next::before {
    font-size: 30px;
    color: #008102;
  }
`;

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    draggable: false,
  };

  return (
    <Box
      width="70%" 
      p={10} 
      m="auto" 
      mt={10} 
      bg="white" 
      borderRadius="15px" 
      boxShadow="0 4px 20px rgba(0, 0, 0, 0.3)"

    >
      <Text
        fontSize={{
          base: "1rem",
          sm: "1rem",
          md: "1.2rem",
          lg: "1.5rem",
          xl: "1.5rem",
        }}
        color="black"
      >
        {title}
      </Text>
      <style>{slickStyles}</style>
      <Slider {...settings}>
        {products.map((product, index) => (
          <Box key={index} p={2}>
            <Link
              key={product.id}
              to={`/branch/menu/product/${product.id}`}
              state={{ categoryId: product.categoryId }}
            >
              <Image 
                src={product.productImage} 
                alt={product.name} 
                w="16rem"
                h="10rem"
                borderRadius="15px"
              />
              <Text mt={2}>{product.name}</Text>
            </Link>
          </Box>
        ))}
      </Slider>
    </Box>
  );
};

export default ProductCarousel;