import React, { useState } from 'react';
import { Box, Image, HStack, IconButton } from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

const ProductSlideshow = () => {
  const images = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150/0000FF',
    'https://via.placeholder.com/150/FF0000',
  ];
  
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNextClick = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <Box maxW="300px" mx="auto">
      <Image src={images[currentIndex]} alt={`Product Image ${currentIndex + 1}`} borderRadius="md" />
      <HStack mt={4} justifyContent="center" spacing={4}>
        <IconButton
          icon={<ChevronLeftIcon />}
          onClick={handlePrevClick}
          aria-label="Previous"
        />
        <HStack>
          {images.slice(0, 3).map((image, index) => (
            <Image
              key={index}
              src={image}
              alt={`Thumbnail ${index + 1}`}
              boxSize="50px"
              borderRadius="md"
              border={currentIndex === index ? '2px solid #3182ce' : 'none'}
              onClick={() => setCurrentIndex(index)}
              cursor="pointer"
            />
          ))}
        </HStack>
        <IconButton
          icon={<ChevronRightIcon />}
          onClick={handleNextClick}
          aria-label="Next"
        />
      </HStack>
    </Box>
  );
};

export default ProductSlideshow;
