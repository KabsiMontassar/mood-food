import React, { useEffect } from "react";
import SliderCarousel from "../components/Home/SliderCarousel";
import TherapyCards from "../components/Home/Cards";
import ExpertsComponent from "../components/Home/ExpertComponent";
import RecetteComponent from "../components/Home/RecetteComponent";
import BienEtreComponent from "../components/Home/BienEtreComponent";
import PlanComparison from "../components/Home/PlanComparison";
import { Flex, Box, Img, Heading } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
    // Check if the viewport is mobile
    const isMobile = window.innerWidth <= 768;

    if (!isMobile) {
      // Initialize Lenis and GSAP ScrollTrigger only for non-mobile devices
      const lenis = new Lenis({
        lerp: 0.2,
        smoothWheel: true,
      });

      lenis.on("scroll", () => ScrollTrigger.update());

      const scrollFn = (time) => {
        lenis.raf(time);
        requestAnimationFrame(scrollFn);
      };
      requestAnimationFrame(scrollFn);

      const sections = document.querySelectorAll(".container .section");
      sections.forEach((section, position) => {
        const isLast = position === sections.length - 1;
        gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=100%',
            scrub: true
          },
        })
          .to(section, {
            ease: 'none',
            startAt: { filter: 'brightness(100%) contrast(100%)' },
            filter: isLast ? 'none' : 'brightness(60%) contrast(135%)',
            yPercent: isLast ? 0 : -15
          });
      });

      return () => window.removeEventListener("scroll", lenis.destroy);
    }
  }, []);

  return (
    <Box className="container">
      <Flex
        width="100%"
        height={{ base: "auto", md: "100vh" }}
        p={{ base: "20px", md: "50px", lg: "100px" }}
        flexDirection={{ base: "column", md: "row" }}
        justifyContent="center"
        alignItems="center"
      >
        <Box
          w={{ base: "100%", md: "50%" }}
          textAlign="center"
          mb={{ base: "20px", md: "0" }}
        >
          <Heading as="h1" size={{ base: "xl", md: "2xl" }} color="green.800" letterSpacing={3}>
            Transformez votre humeur à chaque repas.
          </Heading>
          <br />
          <Heading as="h2" size={{ base: "md", md: "lg" }} color="gray.500">
            Découvrez l'harmonie parfaite entre la nutrition et le bien-être chez Mood and Food.
          </Heading>
        </Box>
        <Box
          w={{ base: "80%", md: "25%" }}
          display="flex"
          justifyContent="center"
        >
          <Img width={{ base: "200px", md: "300px" }} src={logo} alt="logo" />
        </Box>
      </Flex>
      <Box>
        <SliderCarousel />
      </Box>
      <Box className="section">
        <TherapyCards />
      </Box>
      <Box className="section">
        <ExpertsComponent />
      </Box>
      <Box className="section">
        <RecetteComponent />
      </Box>
      <Box className="section">
        <BienEtreComponent />
      </Box>
      <Box>
        <PlanComparison />
      </Box>
    </Box>
  );
};

export default Home;
