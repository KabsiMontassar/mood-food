import React, { useEffect } from "react";
import SliderCarousel from "../components/SliderCarousel";
import TherapyCards from "../components/Cards";
import ExpertsComponent from "../components/ExpertComponent";
import RecetteComponent from "../components/RecetteComponent";
import BienEtreComponent from "../components/BienEtreComponent";
import PlanComparison from "../components/PlanComparison";
import { Flex, Box, Img, Heading } from "@chakra-ui/react";
import logo from "../assets/logo.png";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
  useEffect(() => {
   
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
    sections.forEach((section , position) => {

        const isLast =  position === sections.length - 1;
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
            startAt: {filter: 'brightness(100%) contrast(100%)'},
            filter: isLast ? 'none' : 'brightness(60%) contrast(135%)',
            yPercent: isLast ? 0 : -15
        })
      
    });

    return () => window.removeEventListener("scroll", lenis.destroy);
  }, []);

  return (
    <Box className="container">
      <Flex
        width="100%"
        height="100vh"
        p="100px"
        justifyContent="center"
        alignItems="center"
      >
        <Box w="50%">
          <Heading as="h1" size="2xl" color="green.800" textAlign="center" letterSpacing={3}>
            Transformez votre humeur à chaque repas.
          </Heading>
          <br />
          <Heading as="h2" size="md" color="gray.500" textAlign="center">
            Découvrez l'harmonie parfaite entre la nutrition et le bien-être chez Mood and Food.
          </Heading>
        </Box>
        <Box w="25%" display="flex" justifyContent="flex-end">
          <Img width={300} src={logo} alt="logo" />
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
