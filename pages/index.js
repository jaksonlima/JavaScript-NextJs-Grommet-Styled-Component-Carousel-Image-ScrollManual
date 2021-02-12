import { useCallback, useRef } from "react";
import { Box, Button, Image } from "grommet";
import { Next, Previous } from "grommet-icons";
import styled from "styled-components";

import Header from "../src/components/Header";

const BoxButton = styled(Box)`
  min-width: fit-content;
  background-color: #009dea94;
  border-radius: 4px;
  position: sticky;
  right: 0;
  left: 0;

  display: flex;
  justify-content: center;
`;
const BoxScrollContainer = styled(Box)`
  overflow-x: scroll;

  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }

  ::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.5);
  }
`;

function Home({ data }) {
  const refScroll = useRef(null);

  const handleScrollPrevius = useCallback(() => {
    refScroll.current.scrollLeft -= 100;
  }, []);

  const handleScrollNext = useCallback(() => {
    refScroll.current.scrollLeft += 100;
  }, []);

  return (
    <>
      <Header title="Image" />

      <Box direction="row" margin="small">
        <Box basis="medium" elevation="medium">
          Images
        </Box>

        <Box direction="row" margin={{ left: "5px" }} basis="1/2">
          <BoxScrollContainer direction="row" elevation="medium" ref={refScroll}>
            <BoxButton>
              <Button onClick={handleScrollPrevius} focusIndicator={false}>
                <Previous />
              </Button>
            </BoxButton>

            {data.slice(0, 10).map(({ id, thumbnailUrl }) => (
              <Box key={id} width={{ min: "fit-content" }}>
                <Image src={thumbnailUrl} />
              </Box>
            ))}

            <BoxButton>
              <Button onClick={handleScrollNext} focusIndicator={false}>
                <Next />
              </Button>
            </BoxButton>
          </BoxScrollContainer>
        </Box>
      </Box>
    </>
  );
}

Home.getInitialProps = async (ctx) => {
  const response = await fetch("https://jsonplaceholder.typicode.com/photos?albumId=1");
  const data = await response.json();

  return {
    data,
  };
};

export default Home;
