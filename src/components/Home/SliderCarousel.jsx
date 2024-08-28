import React, { useState, useEffect } from "react";
import { Box, Flex, Text, IconButton } from "@chakra-ui/react";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import img1 from "../../assets/img1.png";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import img4 from "../../assets/img4.png";



const SliderCarousel = () => {
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const slidesLeft = [
        {
            title: "Nourriture et émotions : le lien essentiel",
            description: "Examinez comment votre alimentation influe sur vos émotions et votre stabilité mentale.",
            backgroundColor: "#697737"
        },
        {
            title: "Choix alimentaires pour se sentir mieux",
            description: "Améliorez votre bien-être en faisant des choix alimentaires qui soutiennent une humeur positive.",
            backgroundColor: "#F4C9A7"
        },
        {
            title: "L'impact de vos choix alimentaires sur votre bien-être",
            description: "Comprenez comment ce que vous mangez affecte votre état d'esprit et vos émotions.",
            backgroundColor: "#FFFFFF"
        },
        {
            title: "Nourrissez votre esprit et votre corps",
            description: "Voyez comment une bonne alimentation booste à la fois votre énergie physique et mentale.",
            backgroundColor: "#E4DFE5"
        },
    ];

    const slidesRight = [
        img1,
        img2,
        img3,
        img4,
    ];

    const slidesLength = slidesRight.length;

    const changeSlide = (direction) => {
        if (isTransitioning) return;

        setIsTransitioning(true);

        const newIndex = direction === "up"
            ? (activeSlideIndex + 1) % slidesLength
            : (activeSlideIndex - 1 + slidesLength) % slidesLength;

        setActiveSlideIndex(newIndex);

        setTimeout(() => {
            setIsTransitioning(false);
        }, 500);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            changeSlide("up");
        }, 5000);

       
        return () => clearInterval(interval);
    }, [activeSlideIndex, isTransitioning]);

    return (
        <Flex position="relative" height="100vh" overflow="hidden"
          userSelect="none"
         >

            <Flex
                flexDirection="column"
                position="absolute"
                top={`-${activeSlideIndex * 100}vh`}
                left="0"
                width="35%"
                height={`${slidesLength * 100}vh`}
                transition="top 1.5s ease-in-out"
            >
                {slidesLeft.map((slide, index) => (
                    <Flex
                        key={index}
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                        bg={slide.backgroundColor}
                        color="white"
                        height="100vh"
                        width="100%"
                        position="relative"
                        p="20px"
                    >
                        <Text
                            fontSize="30px"
                            mb="10px"
                            mt="-30px"
                            position="relative"
                           textAlign={"center"}
                           color="black"
                           fontWeight={700}
                        >
                           {slide.title}
                        </Text>
                        <Text fontSize="20px" textAlign="center"
                        color="black"
                       
                        >{slide.description}</Text>
                    </Flex>
                ))}
            </Flex>

            <Flex
                position="absolute"
                top={`-${activeSlideIndex * 100}vh`}
                right="0"
                width="65%"
                height={`${slidesLength * 100}vh`}
                transition="top 1s ease-in-out"
                flexDirection="column"
            >
                {slidesRight.map((slide, index) => (
                    <Box
                        key={index}
                        bgImage={`url(${slide})`}
                        bgRepeat="no-repeat"
                        bgSize="cover"
                        bgPosition="center"
                        height="100vh"
                        width="100%"
                    />
                ))}
            </Flex>

            <Flex
                position="absolute"
                left="35%"
                top="50%"
                transform="translateY(-50%)"
                zIndex="100"
                flexDirection="column"
            >
                <IconButton
                    aria-label="Previous Slide"
                    icon={<FaArrowUp />}
                    onClick={() => changeSlide("down")}
                    mb="4px"
                    borderRadius="0"
                   colorScheme="transparent"
                   
                    _hover={{   
                       
                        opacity: 0.5 }}
                  
                />
                <IconButton
                    aria-label="Next Slide"
                    icon={<FaArrowDown />}
                    onClick={() => changeSlide("up")}
                    borderRadius="0"
                    right="100%"
                    colorScheme="transparent"
                    
                    _hover={{ 
                       
                        opacity: 0.5
                         }}
                  
                />
            </Flex>
        </Flex>
    );
};

export default SliderCarousel;
