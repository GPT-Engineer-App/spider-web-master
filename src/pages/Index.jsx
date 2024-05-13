import React, { useState, useEffect, useRef } from "react";
import { Container, Box, Image } from "@chakra-ui/react";
import { FaSpider } from "react-icons/fa";

const Index = () => {
  const [webs, setWebs] = useState([]);
  const spidermanRef = useRef(null);

  const handleMouseClick = (e) => {
    const rect = spidermanRef.current.getBoundingClientRect();
    const startX = rect.left + rect.width / 2;
    const startY = rect.top + rect.height / 2;
    const endX = e.clientX;
    const endY = e.clientY;

    setWebs([...webs, { startX, startY, endX, endY }]);
  };

  useEffect(() => {
    window.addEventListener("click", handleMouseClick);
    return () => {
      window.removeEventListener("click", handleMouseClick);
    };
  }, [webs]);

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center" position="relative">
      <Box ref={spidermanRef} position="absolute" top="50%" left="50%" transform="translate(-50%, -50%)">
        <Image src="https://images.unsplash.com/photo-1635805737707-575885ab0820?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w1MDcxMzJ8MHwxfHNlYXJjaHwxfHxzcGlkZXJtYW58ZW58MHx8fHwxNzE1NjQ0MzM2fDA&ixlib=rb-4.0.3&q=80&w=1080" alt="Spider-Man" boxSize="100px" />
      </Box>
      {webs.map((web, index) => (
        <Box key={index} position="absolute" left={web.startX} top={web.startY} width={`${Math.hypot(web.endX - web.startX, web.endY - web.startY)}px`} height="2px" backgroundColor="gray" transform={`rotate(${Math.atan2(web.endY - web.startY, web.endX - web.startX)}rad)`} transformOrigin="0 0" />
      ))}
    </Container>
  );
};

export default Index;
